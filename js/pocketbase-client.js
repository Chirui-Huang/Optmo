/**
 * PocketBase Client Configuration for OPTMO
 * Initialize PocketBase connection and user management
 */

// PocketBase URL supports runtime config and safe defaults.
// Set window.OPTMO_CONFIG.pocketbaseUrl in production if backend is on a different origin.
const POCKETBASE_URL =
    (window.OPTMO_CONFIG && window.OPTMO_CONFIG.pocketbaseUrl) ||
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8090'
        : window.location.origin);

// Initialize PocketBase
let pb;

// Wait for PocketBase SDK to load
function initPocketBase() {
    if (pb) {
        return true;
    }

    if (typeof PocketBase === 'undefined') {
        console.error('PocketBase SDK not loaded');
        return false;
    }
    
    pb = new PocketBase(POCKETBASE_URL);
    console.log('PocketBase initialized:', POCKETBASE_URL);
    return true;
}

/**
 * AUTHENTICATION FUNCTIONS
 */

// Sign up user
async function signUpUser(email, password, displayName) {
    try {
        if (!pb) initPocketBase();
        
        // Create user with auth
        const userData = await pb.collection('users').create({
            email: email,
            password: password,
            passwordConfirm: password,
            name: displayName
        });

        // Auto-login after signup
        const authData = await pb.collection('users').authWithPassword(email, password);
        
        // Track signup event
        await trackEvent(authData.record.id, 'user_signup', {
            email: email,
            display_name: displayName
        });

        // Store user in localStorage
        localStorage.setItem('optmo_user', JSON.stringify({
            id: authData.record.id,
            email: authData.record.email,
            displayName: authData.record.name
        }));
        localStorage.setItem('optmo_logged_in', 'true');

        return { success: true, user: authData.record };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
    }
}

// Login user
async function loginUser(email, password) {
    try {
        if (!pb) initPocketBase();
        
        const authData = await pb.collection('users').authWithPassword(email, password);

        // Track login event
        await trackEvent(authData.record.id, 'user_login', {});

        // Store user in localStorage
        localStorage.setItem('optmo_user', JSON.stringify({
            id: authData.record.id,
            email: authData.record.email,
            displayName: authData.record.name
        }));
        localStorage.setItem('optmo_logged_in', 'true');

        return { success: true, user: authData.record };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

// Get current user
function getCurrentUser() {
    try {
        if (!pb) initPocketBase();
        if (!pb || !pb.authStore || !pb.authStore.isValid) {
            return null;
        }
        return pb.authStore.record;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}

// Logout user
async function logoutUser() {
    try {
        if (!pb) initPocketBase();
        pb.authStore.clear();
        localStorage.removeItem('optmo_user');
        localStorage.removeItem('optmo_logged_in');
        console.log('User logged out');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

/**
 * USER PROFILE FUNCTIONS
 */

// Get user profile
async function getUserProfile(userId) {
    try {
        if (!pb) initPocketBase();

        let profileRecord = null;

        try {
            profileRecord = await pb.collection('user_profiles').getFirstListItem(`user = "${userId}"`);
        } catch (_) {
        }

        const userRecord = await pb.collection('users').getOne(userId);

        return {
            success: true,
            profile: {
                id: userRecord.id,
                email: userRecord.email,
                name: userRecord.name,
                display_name: profileRecord?.display_name || userRecord.name || '',
                full_name: profileRecord?.full_name || '',
                company: profileRecord?.company || ''
            }
        };
    } catch (error) {
        console.error('Get profile error:', error);
        return { success: false, error: error.message };
    }
}

// Update user profile
async function updateUserProfile(userId, updates) {
    try {
        if (!pb) initPocketBase();

        const userUpdatePayload = {};
        if (updates.name) {
            userUpdatePayload.name = updates.name;
        }

        let updatedUser = null;
        if (Object.keys(userUpdatePayload).length > 0) {
            updatedUser = await pb.collection('users').update(userId, userUpdatePayload);
        } else {
            updatedUser = await pb.collection('users').getOne(userId);
        }

        const profilePayload = {
            user: userId,
            display_name: updates.name || '',
            full_name: updates.full_name || '',
            company: updates.company || ''
        };

        let profileRecord = null;
        try {
            const existingProfile = await pb.collection('user_profiles').getFirstListItem(`user = "${userId}"`);
            profileRecord = await pb.collection('user_profiles').update(existingProfile.id, profilePayload);
        } catch (_) {
            profileRecord = await pb.collection('user_profiles').create(profilePayload);
        }

        // Update localStorage
        const currentUser = JSON.parse(localStorage.getItem('optmo_user') || '{}');
        localStorage.setItem('optmo_user', JSON.stringify({
            ...currentUser,
            displayName: updates.name || updatedUser.name || currentUser.displayName
        }));

        return { success: true, profile: { user: updatedUser, profile: profileRecord } };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * PROJECT FUNCTIONS
 */

// Create project
async function createProject(userId, projectName, category) {
    try {
        if (!pb) initPocketBase();
        
        const project = await pb.collection('projects').create({
            user: userId,
            name: projectName,
            category: category
        });

        // Track event
        await trackEvent(userId, 'project_created', {
            project_name: projectName,
            category: category
        });

        return { success: true, project: project };
    } catch (error) {
        console.error('Create project error:', error);
        return { success: false, error: error.message };
    }
}

// Get user projects
async function getUserProjects(userId) {
    try {
        if (!pb) initPocketBase();
        
        const projects = await pb.collection('projects').getFullList({
            filter: `user = "${userId}"`,
            sort: '-created'
        });

        return { success: true, projects: projects };
    } catch (error) {
        console.error('Get projects error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * ANALYTICS & EVENT TRACKING
 */

// Track user event
async function trackEvent(userId, eventType, eventData = {}) {
    try {
        if (!pb) initPocketBase();
        
        await pb.collection('user_events').create({
            user: userId,
            event_type: eventType,
            event_data: eventData,
            source: 'web'
        });

        console.log(`Event tracked: ${eventType}`);
    } catch (error) {
        console.error('Event tracking error:', error);
    }
}

// Get user events
async function getUserEvents(userId, limit = 100) {
    try {
        if (!pb) initPocketBase();
        
        const events = await pb.collection('user_events').getFullList({
            filter: `user = "${userId}"`,
            sort: '-created',
            limit: limit
        });

        return { success: true, events: events };
    } catch (error) {
        console.error('Get events error:', error);
        return { success: false, error: error.message };
    }
}

// Get user analytics summary
async function getUserAnalytics(userId) {
    try {
        if (!pb) initPocketBase();
        
        // Get login count
        const loginEvents = await pb.collection('user_events').getFullList({
            filter: `user = "${userId}" && event_type = "user_login"`,
            fields: 'id'
        });

        // Get project count
        const projects = await pb.collection('projects').getFullList({
            filter: `user = "${userId}"`,
            fields: 'id'
        });

        // Get other events
        const allEvents = await pb.collection('user_events').getFullList({
            filter: `user = "${userId}"`,
            fields: 'event_type,created',
            sort: '-created'
        });

        const analytics = {
            total_logins: loginEvents.length,
            total_projects: projects.length,
            total_events: allEvents.length,
            last_active: allEvents.length > 0 ? allEvents[0].created : null
        };

        return { success: true, analytics: analytics };
    } catch (error) {
        console.error('Get analytics error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * COMMUNITY FUNCTIONS
 */

// Create community post
async function createCommunityPost(userId, title, content, category = 'general', tags = []) {
    try {
        if (!pb) initPocketBase();

        const post = await pb.collection('community_posts').create({
            user: userId,
            title: title,
            content: content,
            category: category,
            tags: tags
        });

        await trackEvent(userId, 'community_post_created', {
            post_id: post.id,
            category: category
        });

        return { success: true, post: post };
    } catch (error) {
        console.error('Create community post error:', error);
        return { success: false, error: error.message };
    }
}

function escapePocketBaseFilterValue(value) {
    return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Get public community feed
async function getCommunityFeed(limit = 30, options = {}) {
    try {
        if (!pb) initPocketBase();

        const category = options.category || 'all';
        const search = (options.search || '').trim();
        const filters = [];

        if (category && category !== 'all') {
            filters.push(`category = "${escapePocketBaseFilterValue(category)}"`);
        }

        if (search) {
            const safeSearch = escapePocketBaseFilterValue(search);
            filters.push(`(title ~ "${safeSearch}" || content ~ "${safeSearch}" || tags ~ "${safeSearch}")`);
        }

        const posts = await pb.collection('community_posts').getList(1, limit, {
            sort: '-created',
            expand: 'user',
            fields: 'id,title,content,category,tags,created,user,expand.user.name,expand.user.email',
            filter: filters.length ? filters.join(' && ') : undefined
        });

        return { success: true, posts: posts.items || [] };
    } catch (error) {
        console.error('Get community feed error:', error);
        return { success: false, error: error.message };
    }
}

// Create comment for a community post
async function createCommunityComment(userId, postId, content) {
    try {
        if (!pb) initPocketBase();

        const comment = await pb.collection('community_comments').create({
            user: userId,
            post: postId,
            content: content
        });

        await trackEvent(userId, 'community_comment_created', {
            post_id: postId,
            comment_id: comment.id
        });

        return { success: true, comment: comment };
    } catch (error) {
        console.error('Create community comment error:', error);
        return { success: false, error: error.message };
    }
}

// Get comments for a set of posts
async function getCommunityCommentsForPosts(postIds = []) {
    try {
        if (!pb) initPocketBase();
        if (!Array.isArray(postIds) || postIds.length === 0) {
            return { success: true, commentsByPost: {} };
        }

        const safeIds = postIds.filter(Boolean).slice(0, 80);
        const filter = safeIds
            .map((id) => `post = "${escapePocketBaseFilterValue(id)}"`)
            .join(' || ');

        const comments = await pb.collection('community_comments').getFullList({
            sort: 'created',
            expand: 'user',
            fields: 'id,post,content,created,user,expand.user.name,expand.user.email',
            filter: filter
        });

        const commentsByPost = {};
        comments.forEach((comment) => {
            const postId = comment.post;
            if (!commentsByPost[postId]) commentsByPost[postId] = [];
            commentsByPost[postId].push(comment);
        });

        return { success: true, commentsByPost: commentsByPost };
    } catch (error) {
        console.error('Get community comments error:', error);
        return { success: false, error: error.message };
    }
}

// Toggle a like reaction on a post
async function toggleCommunityReaction(userId, postId, type = 'like') {
    try {
        if (!pb) initPocketBase();

        const safeUser = escapePocketBaseFilterValue(userId);
        const safePost = escapePocketBaseFilterValue(postId);
        const safeType = escapePocketBaseFilterValue(type);

        try {
            const existing = await pb.collection('community_reactions').getFirstListItem(
                `user = "${safeUser}" && post = "${safePost}" && type = "${safeType}"`
            );

            await pb.collection('community_reactions').delete(existing.id);
            return { success: true, active: false };
        } catch (_) {
            const reaction = await pb.collection('community_reactions').create({
                user: userId,
                post: postId,
                type: type
            });

            await trackEvent(userId, 'community_reaction_created', {
                post_id: postId,
                reaction_type: type,
                reaction_id: reaction.id
            });

            return { success: true, active: true };
        }
    } catch (error) {
        console.error('Toggle community reaction error:', error);
        return { success: false, error: error.message };
    }
}

// Get reaction summary for a set of posts
async function getCommunityReactionSummary(postIds = [], currentUserId = null) {
    try {
        if (!pb) initPocketBase();
        if (!Array.isArray(postIds) || postIds.length === 0) {
            return { success: true, summaryByPost: {} };
        }

        const safeIds = postIds.filter(Boolean).slice(0, 80);
        const filter = safeIds
            .map((id) => `post = "${escapePocketBaseFilterValue(id)}"`)
            .join(' || ');

        const reactions = await pb.collection('community_reactions').getFullList({
            filter: filter,
            fields: 'id,post,user,type'
        });

        const summaryByPost = {};
        reactions.forEach((reaction) => {
            const postId = reaction.post;
            if (!summaryByPost[postId]) {
                summaryByPost[postId] = {
                    likeCount: 0,
                    likedByCurrentUser: false
                };
            }

            if (reaction.type === 'like') {
                summaryByPost[postId].likeCount += 1;
                if (currentUserId && reaction.user === currentUserId) {
                    summaryByPost[postId].likedByCurrentUser = true;
                }
            }
        });

        return { success: true, summaryByPost: summaryByPost };
    } catch (error) {
        console.error('Get community reaction summary error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Initialize PocketBase on page load
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPocketBase);
} else {
    initPocketBase();
}

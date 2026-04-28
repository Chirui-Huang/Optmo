/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const usersCollection = app.findCollectionByNameOrId("users")
  const postsCollection = app.findCollectionByNameOrId("community_posts")

  const communityCommentsCollection = new Collection({
    "type": "base",
    "name": "community_comments",
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != ''",
    "updateRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id",
    "fields": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "collectionId": usersCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "post",
        "type": "relation",
        "required": true,
        "collectionId": postsCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "content",
        "type": "text",
        "required": true,
        "max": 2000
      }
    ],
    "indexes": [
      "CREATE INDEX idx_community_comments_post ON community_comments (post)",
      "CREATE INDEX idx_community_comments_created ON community_comments (created)"
    ]
  })

  app.save(communityCommentsCollection)

  const communityReactionsCollection = new Collection({
    "type": "base",
    "name": "community_reactions",
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != ''",
    "updateRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id",
    "fields": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "collectionId": usersCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "post",
        "type": "relation",
        "required": true,
        "collectionId": postsCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "type",
        "type": "text",
        "required": true,
        "max": 32
      }
    ],
    "indexes": [
      "CREATE INDEX idx_community_reactions_post ON community_reactions (post)",
      "CREATE UNIQUE INDEX idx_community_reactions_user_post_type ON community_reactions (user, post, type)"
    ]
  })

  app.save(communityReactionsCollection)
}, (app) => {
  const collectionsToDelete = ["community_reactions", "community_comments"]

  for (const name of collectionsToDelete) {
    try {
      const collection = app.findCollectionByNameOrId(name)
      app.delete(collection)
    } catch (_) {
    }
  }
})

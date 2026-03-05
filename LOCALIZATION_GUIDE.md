# OPTMO Localization Implementation Guide

## Overview
Your OPTMO website now has a complete multi-language localization system that automatically detects and adapts to user system language settings. The system supports **English**, **Chinese (中文)**, and **Spanish (Español)**.

## Key Features

### 1. **Automatic Language Detection**
   - The system automatically detects the user's browser language
   - Falls back to English if language is not supported
   - User selections are saved to localStorage for persistent preference

### 2. **Supported Languages**
   - **English (en)** - Default language
   - **Chinese (zh)** - Simplified Chinese
   - **Spanish (es)** - European Spanish

### 3. **Language Switcher**
   - A globe icon button (🌐) in the header of all pages
   - Click to toggle a dropdown menu with language options
   - Current language is marked with a checkmark (✓)
   - Language selection is instantly applied
   - Selection is saved and persists across page reloads

## How It Works

### System Language Detection
```javascript
// In main.js - getPreferredLanguage() function:
1. Checks localStorage for saved preference
2. If no saved preference, detects from browser:
   - Checks navigator.languages and navigator.language
   - Maps language codes: zh* → 'zh', es* → 'es', others → 'en'
```

### Translation Application
The `applySystemLanguage()` function applies translations to:
- Page titles and meta descriptions
- Navigation menus and sidebar items
- Hero sections and feature titles
- Service descriptions and pricing information
- Footer content
- Form labels and placeholders
- Form validation messages
- And 200+ other content elements

### Manual Language Switching
Users can click the language selector (🌐) to:
1. View available languages
2. Select their preferred language
3. Instantly update all page content
4. Selection is saved locally

## Files Modified

### HTML Files
- **index.html** - Added language switcher button in header
- **login.html** - Added language switcher button in header
- **account.html** - Added language switcher button in header
- **donate.html** - Added language switcher button in header

### JavaScript Files
- **js/main.js**
  - Enhanced `getPreferredLanguage()` with localStorage check
  - Added `setLanguage(lang)` for manual language switching
  - Added `initLanguageSwitcher()` to handle UI interactions
  - Added `updateLanguageCheckmarks()` to show current language
  - Added translation keys for login, donate, and account pages
  - Added Chinese and Spanish translations for all new keys

### CSS Files
- **css/styles.css**
  - Added `.language-menu` styling
  - Added `.language-dropdown` styling
  - Added `.language-option` styling for language buttons

## Translation Keys

### Available Translation Keys
The system includes translation keys for:

#### Main Navigation
- `account`, `home`, `portfolio`, `trending`
- `podcast`, `video`, `music`, `performances`, `parties`, `conferences`
- `projects`, `workflows`, `analytics`

#### Login Page
- `welcomeBack`, `loginToAccount`, `secureLogin`
- `emailAddressLabel`, `passwordLabel`, `loginBtn`
- `pleaseFillin`, `validEmail`, `passwordMinLength`, etc.

#### Donate Page
- `supportOptmo`, `donationDesc`, `choosePayment`
- `paypal`, `githubSponsors`, `donateNow`, `thankYouSupport`

#### Account Page
- `myAccount`, `profile`, `settings`, `billing`, `security`
- `editProfile`, `changePassword`, `saveChanges`
- `updateSuccessful`, `accountCreated`, `memberSince`

#### Language Switcher
- `language`, `selectLanguage`, `english`, `chinese`, `spanish`

## Adding New Translations

To add a new translation key:

1. **Add the key to all three language objects in `js/main.js`:**

```javascript
getTranslations() {
    return {
        en: {
            // ... existing keys ...
            newKey: 'English text here',
        },
        zh: {
            // ... existing keys ...
            newKey: '中文文本',
        },
        es: {
            // ... existing keys ...
            newKey: 'Texto en español aquí',
        }
    };
}
```

2. **Apply the translation using one of these methods:**

```javascript
// Method 1: Set text content
setText('.my-element', t.newKey);

// Method 2: Set HTML content (for content with HTML)
setHTML('.my-element', t.newKey);

// Method 3: Set attribute (for meta tags, placeholders, etc.)
setAttr('.my-element', 'placeholder', t.newKey);
```

## Important Notes

### About "OPTMO"
✓ The company name **"OPTMO" is NOT translated** and remains the same in all languages, as requested.

### Content Coverage
The localization system translates:
- ✓ All UI labels and buttons
- ✓ Navigation menus and links
- ✓ Section titles and headings
- ✓ Service descriptions
- ✓ Product features
- ✓ Form labels and placeholders
- ✓ Error messages
- ✓ Help text and instructions
- ✓ Footer content

### Search and Smart Features
The search functionality automatically:
- Uses current language for suggestions
- Translates search categories and labels
- Maintains search history with current language

## Browser Language Detection

The system respects user preferences:
- **First priority**: User's saved language choice (localStorage)
- **Second priority**: Browser language setting:
  - Chinese variants (zh-CN, zh-TW, etc.) → Chinese
  - Spanish variants (es-ES, es-MX, etc.) → Spanish
  - All others → English

## Testing the Localization

To test the localization system:

1. **Automatic Detection Test**
   - Open the website with different browser language settings
   - Content should automatically appear in the browser language

2. **Manual Switching Test**
   - Click the globe icon (🌐) in the header
   - Select a different language
   - All content should update instantly
   - Reload the page - language should persist

3. **Language Persistence Test**
   - Select a language
   - Navigate to different pages
   - Language selection should be maintained

## Troubleshooting

### Language not changing?
- Check browser console for errors (F12 → Console)
- Verify localStorage is enabled: `getItem('optmo_language')`
- Ensure main.js is loaded on the page

### Translations showing English text in wrong places?
- The translation key might be missing from `getTranslations()`
- Check if the HTML element selector is correct in `applySystemLanguage()`

### Language switcher not appearing?
- Check that:
  - `id="languageBtn"` exists in HTML
  - `id="languageDropdown"` exists in HTML
  - CSS for `.language-menu` is loaded
  - main.js is included before closing </body> tag

## Future Enhancements

Consider adding:
- Language flags instead of text
- Right-to-left (RTL) support for Arabic
- More languages (Japanese, Korean, etc.)
- Automatic language upgrade based on user profile
- Language analytics (track which language is used most)
- Community translation contributions

---

**Last Updated**: March 5, 2026
**Current Version**: 1.0
**Supported Languages**: English, Chinese (Simplified), Spanish

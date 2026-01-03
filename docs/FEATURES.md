# Features (機能詳細)

Detailed documentation of all features in the Daily Diary app.
(連用日記アプリの全機能の詳細説明)

---

## 🏠 Home Page (ホームページ)

The main dashboard of the app.

### Features:
- **Today's Date Display** - Current date in large, readable format (年月日と曜日を大きく表示)
- **Quick Access Menu** - Grid of 8 menu items with icons:
  - 日記を書く (Write Diary)
  - 過去の今日 (Past Today)
  - ランダム (Random)
  - 検索 (Search)
  - 統計 (Statistics)
  - カレンダー (Calendar)
  - タグ別 (By Tags)
  - エクスポート (Export)
- **Dark Mode Toggle** - Switch between light/dark themes (ダークモード切り替え)
- **Date Selector** - Navigate to different dates with arrow buttons (日付選択と矢印ボタン)
- **PWA Install Prompt** - Add to home screen on mobile (モバイルでホーム画面に追加)

---

## ✏️ Write Page (日記を書く)

Create and edit diary entries.

### Features:
- **Date Selector** - Choose any date (past, present, or future)
  - Default: Today's date
  - Manual input or arrow navigation (◀ 前の日 / 次の日 ▶)
  - Automatically loads existing entry for selected date
- **Mood Selector** - 9 emoji options + blank:
  - 😊 Happy / 😢 Sad / 😠 Angry / 😴 Tired / 🤔 Thinking
  - 😎 Cool / 😱 Shocked / 🤗 Loving / 😐 Neutral / (blank)
- **Content Editor** - Multi-line text area
  - Auto-resize as you type
  - Character count display
- **Tag Input** - Comma-separated tags (e.g., "仕事,家族,趣味")
- **Save Button** - Save/update entry
  - Shows success message at top of screen
  - Stays on page after saving (no auto-redirect)
- **"Past Today" Section** - Displays entries from the same date in previous years
  - Shows year, mood, content, tags
  - Each entry has "Edit" button to jump to that year's entry
  - Only appears if past entries exist

### Auto-Features:
- Existing entries are loaded automatically when date is selected
- Duplicate detection - updates existing entry instead of creating new one
- Automatic sorting by date (newest first)

---

## 📅 Past Today Page (過去の今日)

View all entries from the same month/day in previous years.

### Features:
- **Automatic Date Matching** - Shows today's date and finds all past entries
- **Entry Cards** - Each past entry displayed as:
  - Year (e.g., "2023年")
  - Day of week (e.g., "水曜日")
  - Mood emoji
  - Full content
  - Tags (if any)
  - "Edit" button to jump to that entry
- **Empty State** - Message when no past entries exist
- **Dark Mode Support** - Cards adapt to dark theme

---

## 🎲 Random Page (ランダム)

Rediscover forgotten memories.

### Features:
- **Random Entry Display** - Shows one random entry from all your diary data
  - Date and day of week
  - Mood emoji
  - Full content
  - Tags
- **"もう一度" Button** - Get another random entry (without page reload)
- **"日記を書く" Button** - Jump to Write page
- **Empty State** - Message when no entries exist

---

## 🔍 Search Page (検索)

Full-text search across all entries.

### Features:
- **Search Input** - Type keyword and press "検索" button
- **Keyword Highlighting** - Search terms highlighted in yellow (`<mark>` tag)
- **Search Scope** - Searches both:
  - Entry content (本文)
  - Tags (タグ)
- **Results Display** - Shows:
  - Date and day of week
  - Mood emoji
  - Content with highlighted keywords
  - Number of results found
- **Case-Insensitive** - Works with uppercase/lowercase
- **XSS Protection** - All output is HTML-escaped for security

---

## 📊 Statistics Page (統計)

Track your writing habits and mood trends.

### Statistics Displayed:

1. **Total Entries** (総記録数)
   - Total number of diary entries

2. **Days Since Start** (経過日数)
   - Days from first entry to latest entry

3. **Write Rate** (記録率)
   - Percentage: (Total Entries / Days Since Start) × 100%

4. **Current Streak** (現在の連続記録)
   - How many consecutive days you've written (including today)

5. **Max Streak** (最長連続記録)
   - Your longest streak ever

6. **Average Characters** (平均文字数)
   - Average entry length

7. **Mood Distribution** (気分の分布)
   - Bar chart showing count of each mood emoji
   - Sorted by frequency (most common first)

### Features:
- **Auto-calculation** - All stats computed automatically from spreadsheet data
- **Streak Detection** - Identifies consecutive writing days
- **Visual Display** - Bar chart for mood distribution
- **Empty State** - Message when no data exists

---

## 📆 Calendar Page (カレンダー)

Visual overview of all entries by date.

### Features:
- **Month/Year Selector** - Navigate months with ◀ ▶ buttons
- **Calendar Grid** - Standard calendar layout
  - Days with entries marked in purple
  - Current day highlighted
  - Click any date to view entry
- **Entry Preview Modal** - Clicking a date with entry opens modal showing:
  - Full date (e.g., "2025年01月01日 (水)")
  - Mood emoji
  - Full content
  - Tags
  - "Edit" button to jump to Write page for that date
  - "閉じる" (Close) button
- **Modal Interactions**:
  - Click background to close
  - Smooth slide-up animation
  - Mobile-optimized (scrollable if content is long)
- **Empty Dates** - Clicking dates without entries does nothing

---

## 🏷️ Tags Page (タグ別表示)

Browse and filter entries by tags.

### Features:
- **Tag Cloud** - All unique tags displayed as buttons
  - Sorted alphabetically
  - Click to filter entries
- **Filtered Results** - Shows entries containing selected tag:
  - Date and day of week
  - Mood emoji
  - Content preview
  - All tags for that entry
- **Tag Extraction** - Automatically extracts tags from all entries
- **Empty State** - Messages for:
  - No tags exist in any entry
  - No entries found for selected tag

---

## 📤 Export Page (エクスポート)

Export your diary data in multiple formats.

### Export Formats:

1. **JSON Format**
   - Complete data export
   - Machine-readable
   - Best for backup and data migration
   - Includes: date, year, monthDay, dayOfWeek, content, mood, tags

2. **CSV Format**
   - Spreadsheet-compatible
   - Open in Excel/Google Sheets
   - Columns: 日付, 年, 月日, 曜日, 内容, 気分, タグ
   - UTF-8 encoding with BOM (Excel-friendly)

3. **Markdown Format**
   - Human-readable
   - Beautiful formatting
   - Each entry formatted as:
     ```markdown
     # YYYY年MM月DD日 (曜日) MOOD

     Content...

     Tags: tag1, tag2

     ---
     ```

### Features:
- **One-Click Export** - Click button to download file
- **Auto-Filename** - Files named with timestamp (e.g., `diary_export_20250101.json`)
- **Browser Download** - Uses browser's native download (no server upload)
- **All Data Included** - Exports complete diary history

---

## ⚙️ Settings Page (設定)

App configuration and data management.

### Features:
- **Dark Mode Toggle** - Switch between light/dark themes
  - Saved to localStorage
  - Persists across sessions
- **App Info** - Display app name and current year (連用日記 2026)
- **Delete All Data** - Danger zone:
  - "全データ削除" button
  - Confirmation prompt before deletion
  - Deletes all entries from spreadsheet (keeps header row)
  - Returns to home page after deletion

---

## 🎨 Dark Mode (ダークモード)

System-wide dark theme support.

### Features:
- **Manual Toggle** - Switch via:
  - Home page header button (☾/☀️ icon)
  - Settings page toggle
- **Persistent** - Saved to localStorage
- **All Pages Supported** - Consistent dark theme across:
  - Home, Write, Past, Random, Search, Stats, Calendar, Tags, Export, Settings
- **Smart Colors**:
  - Light mode: Purple gradient background
  - Dark mode: Dark gray gradient background
  - Adjusted text colors for readability
  - Card backgrounds: White → Dark gray
- **No Flash** - Theme loaded before page render

---

## 📱 Mobile Optimization (モバイル最適化)

Designed for mobile-first experience.

### Features:
- **Large Touch Targets** - Buttons ≥ 48px height
- **Readable Fonts** - 16-18px base font size
- **Responsive Layout** - Adapts to screen width
- **No Horizontal Scroll** - Content fits screen
- **Viewport Meta Tag** - Prevents zoom on input focus
- **PWA Support** - Add to home screen
- **Touch-Friendly**:
  - Large mood emoji buttons
  - Easy-to-tap menu items
  - Optimized form inputs

---

## 🔒 Privacy & Security (プライバシーとセキュリティ)

### Data Storage:
- **Your Spreadsheet** - All data stored in YOUR Google Spreadsheet
- **No External Servers** - No data sent to third parties
- **Google Account Required** - Access controlled by Google authentication
- **Deployment Visibility** - You control who can access:
  - Only you
  - Anyone with Google account
  - Anyone (public)

### Security Features:
- **XSS Protection** - All user input is HTML-escaped
- **No SQL Injection** - Uses spreadsheet (not SQL database)
- **HTTPS Only** - Web app served over HTTPS
- **Authorization** - Google OAuth for access control

---

## 🚀 Performance (パフォーマンス)

### Optimizations:
- **Fast Loading** - Minimal external dependencies
- **Vanilla JavaScript** - No heavy frameworks
- **Efficient Sorting** - Spreadsheet sorted on save
- **Client-Side Rendering** - Dynamic HTML generation
- **Caching** - Browser caches static resources
- **Lazy Loading** - Data fetched only when needed

### Limitations:
- **Large Datasets** - Performance may degrade with >10,000 entries
- **Spreadsheet Limits** - Google Sheets has 10M cell limit

---

## 🌐 Browser Support (ブラウザサポート)

### Fully Supported:
- Chrome (Desktop & Mobile)
- Safari (iOS & macOS)
- Firefox
- Edge
- Mobile browsers (iOS Safari, Chrome Android)

### Requirements:
- JavaScript enabled
- Cookies enabled (for authentication)
- Modern browser (ES6+ support)

---

## 🔄 Data Structure (データ構造)

### Spreadsheet Schema:

| Column | Name | Type | Example | Description |
|--------|------|------|---------|-------------|
| A | 日時 | Date/Time | 2025-01-01 12:00:00 | Entry date and time |
| B | 年 | Number | 2025 | Year (for filtering) |
| C | 月日 | String | 01/01 | Month/Day (for "Past Today") |
| D | 曜日 | String | 水 | Day of week (月火水木金土日) |
| E | 内容 | Text | 今日は... | Diary content (unlimited length) |
| F | 気分 | String | 😊 | Mood emoji (or blank) |
| G | タグ | String | 仕事,家族 | Comma-separated tags |

### Data Flow:
1. User inputs data in web app
2. JavaScript calls `google.script.run.saveDiary()`
3. GAS function writes to spreadsheet
4. Spreadsheet auto-sorts by date (newest first)
5. Next page load fetches updated data

---

## ⚡ Advanced Features (高度な機能)

### 1. Iframe Navigation Fix
- **Problem**: GAS web apps run in iframe, breaking normal navigation
- **Solution**: Custom `navigateTo()` function using `window.top.location.href`
- **Result**: Seamless page transitions

### 2. Duplicate Detection
- When saving, checks if entry for that date already exists
- Updates existing entry instead of creating duplicate
- Ensures one entry per date

### 3. Auto-Resize Text Area
- Text area expands as you type
- No scrolling needed within text box

### 4. Graceful Error Handling
- Try-catch blocks in all functions
- User-friendly error messages
- Logs errors for debugging

### 5. Date Parsing
- Handles timezone correctly (JST)
- Prevents 9-hour offset bug
- Supports manual date input

---

## 💡 Tips & Tricks (コツとヒント)

### For Daily Use:
1. **Add to Home Screen** - Install as PWA for app-like experience
2. **Use Tags** - Tag entries for easy filtering later
3. **Export Regularly** - Backup your data monthly
4. **Past Today** - Check this page daily for reflection

### For Customization:
1. **Edit Colors** - Modify CSS in HTML files
2. **Add Features** - All code is open and modifiable
3. **Change Moods** - Edit `Code.gs` mood list
4. **Add Pages** - Create new HTML files and update navigation

### For Development:
1. **Use clasp** - Faster than manual copy-paste
2. **Check Logs** - `clasp logs` for debugging
3. **Test Locally** - Edit HTML/JS in browser DevTools
4. **Version Control** - Use git to track changes

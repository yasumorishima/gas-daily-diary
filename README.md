# Daily Diary Web App (連用日記)

Google Apps Script-based personal diary web application with mobile-optimized UI and dark mode support.
(Google Apps ScriptベースのWebアプリ。モバイル最適化UIとダークモード対応の個人用日記アプリ)

## 🎯 Key Features

- **Mobile-First Design:** Large fonts (16-18px), optimized touch targets for comfortable mobile use
- **Dark Mode Support:** System-aware theme switching across all pages
- **Privacy-Focused:** All data stored in your own Google Spreadsheet (no external servers)
- **Date Flexibility:** Write entries for past or future dates
- **Smart Features:**
  - "Past Today" view - See entries from the same date in previous years (同じ月日の過去の日記)
  - Random entry display - Rediscover forgotten memories
  - Tag-based filtering - Organize entries by topics
  - Full-text search - Find entries quickly
  - Calendar view - Visual overview with entry preview modal
  - Export options - JSON, CSV, Markdown formats
  - Statistics - Track your writing habits and mood trends

## 🛠️ Technical Stack

- **Backend:** Google Apps Script
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** Google Spreadsheet
- **Deployment:** clasp CLI for local development

## 📊 Data Structure

The app uses a simple spreadsheet structure:

| Column | Content | Example |
|--------|---------|---------|
| A | Date/Time | 2025-01-01 12:00:00 |
| B | Year | 2025 |
| C | Month/Day | 01/01 |
| D | Day of Week | 水 |
| E | Content | 今日は良い天気だった |
| F | Mood | 😊 |
| G | Tags | 仕事,家族 |

## 🚀 Setup

### Prerequisites

- Google account
- Node.js installed (for clasp CLI)
- Basic familiarity with Google Apps Script

### Installation Steps

1. **Create a new Google Spreadsheet**
   - Go to https://sheets.google.com/
   - Create a new spreadsheet
   - Note the spreadsheet ID from the URL

2. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/gas-daily-diary.git
   cd gas-daily-diary
   ```

3. **Install clasp CLI**
   ```bash
   npm install -g @google/clasp
   ```

4. **Login to Google**
   ```bash
   clasp login
   ```

5. **Create a new GAS project**
   ```bash
   clasp create --type standalone --title "Daily Diary"
   ```

6. **Push code to GAS**
   ```bash
   clasp push
   ```

7. **Deploy as Web App**
   - Open the GAS project: `clasp open`
   - Click "Deploy" → "New deployment"
   - Select type: "Web app"
   - Set "Execute as": Me
   - Set "Who has access": Anyone (or "Anyone with Google account" for privacy)
   - Click "Deploy"
   - Copy the web app URL

For detailed setup instructions, see [docs/SETUP.md](docs/SETUP.md)

## 🔧 Development

This project uses clasp CLI for efficient local development:

```bash
# Download latest code from GAS
clasp pull

# Edit files locally

# Upload to GAS
clasp push

# Open GAS editor in browser
clasp open
```

## 📱 Pages

1. **Home** - Today's entry overview and quick access menu
2. **Write** - Create/edit diary entries with mood and tags
3. **Past Today** - View entries from the same date in previous years
4. **Random** - Display a random entry for rediscovery
5. **Search** - Full-text search with keyword highlighting
6. **Calendar** - Visual calendar with entry preview
7. **Tags** - Filter and browse entries by tags
8. **Stats** - Writing statistics and mood trends
9. **Export** - Export data in JSON, CSV, or Markdown
10. **Settings** - App configuration and data management

## 🌐 Browser Support

- Chrome (recommended)
- Safari (iOS/macOS)
- Firefox
- Edge

## 🔗 Related Projects

| Version | Platform | Link |
|---------|----------|------|
| **Mobile App** | Flutter (Android) | [diary-app-flutter](https://github.com/yasumorishima/diary-app-flutter) / [Google Play](https://play.google.com/store/apps/details?id=com.diary.daily) |
| **Web App** | Google Apps Script | This repository |

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

This project was developed with assistance from AI pair programming tools, demonstrating how developers can efficiently build practical applications by combining domain knowledge with AI assistance.

---

## 日本語ドキュメント

### 特徴

- **モバイルファースト:** 大きなフォント、タップしやすいボタン配置
- **ダークモード:** システム設定に自動追従
- **プライバシー重視:** データは全て自分のGoogleスプレッドシートに保存
- **日付選択:** 過去や未来の日付でも日記を書ける
- **便利機能:**
  - 過去の今日表示
  - ランダム表示
  - タグ別フィルタリング
  - 全文検索
  - カレンダー表示
  - エクスポート（JSON, CSV, Markdown）
  - 統計情報

### セットアップ

詳細は [docs/SETUP.md](docs/SETUP.md) を参照してください。

### 開発

clasp CLIを使用してローカル開発：

```bash
clasp pull   # GASからダウンロード
clasp push   # GASへアップロード
clasp open   # ブラウザでGASエディタを開く
```

### ライセンス

MITライセンス - 詳細は [LICENSE](LICENSE) ファイルを参照

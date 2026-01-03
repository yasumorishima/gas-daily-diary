# Setup Guide (セットアップガイド)

Complete installation instructions for the Daily Diary web app.
(連用日記Webアプリの完全なインストール手順)

---

## Prerequisites (前提条件)

- Google account (Googleアカウント)
- Node.js installed (Node.jsインストール済み)
  - Download: https://nodejs.org/
- Basic familiarity with command line (コマンドライン操作の基本知識)

---

## Step 1: Create Google Spreadsheet (Googleスプレッドシート作成)

1. Go to https://sheets.google.com/
2. Click "Blank" to create a new spreadsheet
3. Name it "連用日記" or "Daily Diary"
4. **Note the Spreadsheet ID from the URL:**
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```
   Example: `1ABC...XYZ123` (between `/d/` and `/edit`)

---

## Step 2: Clone Repository (リポジトリをクローン)

```bash
git clone https://github.com/YOUR_USERNAME/gas-daily-diary.git
cd gas-daily-diary
```

---

## Step 3: Install clasp CLI (clasp CLIインストール)

```bash
npm install -g @google/clasp
```

Verify installation (インストール確認):
```bash
clasp --version
```

---

## Step 4: Login to Google (Googleにログイン)

```bash
clasp login
```

- A browser window will open
- Login with your Google account
- Grant permissions to clasp

---

## Step 5: Create GAS Project (GASプロジェクト作成)

```bash
clasp create --type standalone --title "Daily Diary"
```

This creates `.clasp.json` file with your script ID.
(スクリプトIDを含む`.clasp.json`ファイルが作成されます)

---

## Step 6: Push Code to GAS (コードをGASにアップロード)

```bash
clasp push
```

When prompted "Manifest file has been updated. Do you want to push and overwrite?", type `y` and press Enter.

---

## Step 7: Open GAS Editor (GASエディタを開く)

```bash
clasp open
```

Or manually navigate to:
https://script.google.com/

---

## Step 8: Update Spreadsheet ID (スプレッドシートID更新)

**IMPORTANT:** You need to link your spreadsheet to the script.

### Option A: Using Bound Script (推奨: バウンドスクリプト)

1. Open your Google Spreadsheet
2. Click "Extensions" → "Apps Script"
3. Delete the default `Code.gs`
4. Use `clasp push` to upload all files
5. **No manual ID configuration needed** (IDの手動設定不要)

### Option B: Using Standalone Script (スタンドアロンスクリプト)

If you created a standalone script, you need to specify the spreadsheet ID:

**Method 1: Script Properties (recommended)**

1. In GAS editor, click "Project Settings" (gear icon)
2. Scroll to "Script Properties"
3. Click "Add script property"
4. Key: `SPREADSHEET_ID`
5. Value: Your spreadsheet ID (from Step 1)

Then modify `Code.gs`:

```javascript
// At the top of Code.gs, replace:
const ss = SpreadsheetApp.getActiveSpreadsheet();

// With:
const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
```

**Method 2: Direct ID (simpler but less secure)**

Modify `Code.gs`:

```javascript
// Replace:
const ss = SpreadsheetApp.getActiveSpreadsheet();

// With (use your actual ID):
const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');
```

---

## Step 9: Deploy as Web App (Webアプリとしてデプロイ)

1. In GAS editor, click "Deploy" → "New deployment"
2. Click "Select type" → Choose "Web app"
3. Fill in deployment settings:
   - **Description:** "Initial deployment" or "v1"
   - **Execute as:** Me (your account)
   - **Who has access:** Choose one:
     - "Anyone" - Public, no login required
     - "Anyone with Google account" - Requires Google login
     - "Only myself" - Private, only you can access
4. Click "Deploy"
5. Review permissions and click "Authorize access"
6. **Copy the Web App URL** (important!)
   ```
   https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   ```

---

## Step 10: Test the App (アプリをテスト)

1. Open the Web App URL in your browser
2. You should see the home page
3. Try creating your first diary entry:
   - Click "日記を書く" (Write Diary)
   - Enter some text
   - Select a mood emoji
   - Add tags (optional)
   - Click "保存" (Save)
4. Check your Google Spreadsheet - new data should appear!

---

## Troubleshooting (トラブルシューティング)

### Error: "Exception: You do not have permission to call SpreadsheetApp.getActiveSpreadsheet"

**Solution:**
- You're using a standalone script without specifying spreadsheet ID
- Follow "Step 8: Option B" to add spreadsheet ID

### Error: "Authorization required"

**Solution:**
1. Click the error message
2. Click "Review permissions"
3. Select your Google account
4. Click "Advanced" → "Go to Daily Diary (unsafe)"
5. Click "Allow"

### Web app shows blank page

**Solution:**
1. Check browser console for errors (F12)
2. Verify all HTML files were uploaded (`clasp push`)
3. Try a different browser
4. Clear browser cache

### Changes not reflected after editing code

**Solution:**
1. Run `clasp push` to upload changes
2. Create a **new deployment** (don't update existing):
   - Deploy → New deployment
   - Use new deployment URL
3. Or update deployment:
   - Deploy → Manage deployments
   - Click pencil icon → New version → Deploy

---

## Development Workflow (開発ワークフロー)

### Editing Code Locally (ローカルでコード編集)

1. Edit files in your local `gas-daily-diary` folder
2. Push changes:
   ```bash
   clasp push
   ```
3. Test in browser (refresh web app)

### Pulling Latest Code from GAS (GASから最新コードを取得)

```bash
clasp pull
```

### Viewing Logs (ログ確認)

```bash
clasp logs
```

Or in GAS editor: View → Executions

---

## Updating the App (アプリの更新)

### For Users (General Updates)

1. Pull latest code from repository:
   ```bash
   cd gas-daily-diary
   git pull origin main
   ```
2. Push to your GAS project:
   ```bash
   clasp push
   ```
3. Create new deployment or update existing

### For Development (Major Changes)

1. Create a new branch:
   ```bash
   git checkout -b feature/new-feature
   ```
2. Make changes
3. Test thoroughly
4. Merge to main
5. Deploy

---

## Data Backup (データバックアップ)

Your diary data is stored in Google Spreadsheet, which is:
- Automatically backed up by Google
- Accessible even if the web app is deleted
- Exportable anytime via the Export page

**Recommendation:** Periodically export data using the Export page:
1. Go to "エクスポート" (Export)
2. Download JSON (complete backup)
3. Download Markdown (human-readable)
4. Store backups in a safe location

---

## Next Steps (次のステップ)

- Customize the app UI (colors, fonts)
- Add new features
- Share with friends (if using "Anyone" access)
- Contribute improvements back to the repository

---

## Support (サポート)

- GitHub Issues: Report bugs or request features
- Documentation: Check [README.md](../README.md)

---

## 日本語版セットアップ手順

詳細な日本語の説明は、各ステップの英語説明の下のカッコ内に記載されています。

主な流れ：
1. Googleスプレッドシート作成 (ID確認)
2. リポジトリをクローン
3. clasp CLIインストール
4. Googleにログイン
5. GASプロジェクト作成
6. コードをアップロード
7. スプレッドシートID設定
8. Webアプリとしてデプロイ
9. 動作確認

トラブルがある場合は、トラブルシューティングセクションを確認してください。

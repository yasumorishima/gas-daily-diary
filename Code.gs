// ========================================
// 連用日記 - Webアプリ版（改善版）
// Code.gs
// ========================================

// Webアプリのメインページを表示
function doGet(e) {
  try {
    // パラメータが存在しない場合の対処
    if (!e || !e.parameter) {
      Logger.log('doGet called without parameters, defaulting to home');
      e = { parameter: {} };
    }

    const page = e.parameter.page || 'home';
    Logger.log('doGet called with page: ' + page);

    // スプレッドシートを初期化
    try {
      initialize();
      Logger.log('Initialize successful');
    } catch (initError) {
      Logger.log('Initialize error: ' + initError.toString());
      return createErrorPage('初期化エラー', initError.toString());
    }

    switch(page) {
      case 'test':
        Logger.log('Showing test page');
        return testHtml();
      case 'home':
        Logger.log('Showing home page');
        return showHomePage();
      case 'write':
        Logger.log('Showing write page');
        const targetDate = e.parameter.date || null;  // 日付パラメータを取得
        return showWritePage(targetDate);
      case 'past':
        Logger.log('Showing past page');
        return showPastPage();
      case 'random':
        Logger.log('Showing random page');
        return showRandomPage();
      case 'search':
        Logger.log('Showing search page');
        return showSearchPage();
      case 'stats':
        Logger.log('Showing stats page');
        return showStatsPage();
      case 'calendar':
        Logger.log('Showing calendar page');
        return showCalendarPage();
      case 'export':
        Logger.log('Showing export page');
        return showExportPage();
      case 'settings':
        Logger.log('Showing settings page');
        return showSettingsPage();
      case 'tags':
        Logger.log('Showing tags page');
        return showTagsPage();
      default:
        Logger.log('Default: showing home page');
        return showHomePage();
    }
  } catch (error) {
    Logger.log('doGet error: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    return createErrorPage('予期しないエラー', error.toString() + '\n\n' + error.stack);
  }
}

// エラーページを作成
function createErrorPage(title, message) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>エラー</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f5f5f5;
          padding: 20px;
          margin: 0;
        }
        .error-container {
          max-width: 600px;
          margin: 50px auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        h1 {
          color: #d93025;
          margin-top: 0;
        }
        .error-message {
          background: #fce8e6;
          padding: 15px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 13px;
          white-space: pre-wrap;
          word-wrap: break-word;
          color: #5f6368;
          margin: 20px 0;
        }
        .back-btn {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <h1>⚠️ ${escapeHtml(String(title))}</h1>
        <p>エラーが発生しました。以下の情報を確認してください：</p>
        <div class="error-message">${escapeHtml(String(message))}</div>
        <a href="?page=home" class="back-btn">← ホームに戻る</a>
      </div>
    </body>
    </html>
  `;

  return HtmlService.createHtmlOutput(html)
    .setTitle('エラー')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// テスト用関数
function testHtml() {
  const html = '<html><body><h1 style="color: red;">テスト成功！</h1><p>このページが表示されれば、HTMLは正しく返されています。</p></body></html>';
  return HtmlService.createHtmlOutput(html);
}

// 初期設定
function initialize() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let diarySheet = ss.getSheetByName('日記');
  if (!diarySheet) {
    diarySheet = ss.insertSheet('日記');
    diarySheet.appendRow(['日時', '年', '月日', '曜日', '内容', '気分', 'タグ']);
    diarySheet.setFrozenRows(1);

    // ヘッダー行をフォーマット
    const headerRange = diarySheet.getRange(1, 1, 1, 7);
    headerRange.setBackground('#667eea');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
  }

  let settingsSheet = ss.getSheetByName('設定');
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet('設定');
    settingsSheet.appendRow(['項目', '値']);
    settingsSheet.appendRow(['通知時間', '20:00']);
    settingsSheet.appendRow(['通知有効', 'FALSE']);
  }
}

// ========================================
// ホームページ
// ========================================

function showHomePage() {
  return HtmlService.createHtmlOutputFromFile('Home')
    .setTitle('連用日記')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ========================================
// 日記入力ページ
// ========================================

function showWritePage(targetDate) {
  const template = HtmlService.createTemplateFromFile('Write');

  // 指定日付のデータを取得（指定がなければ今日）
  const entryData = getEntryByDate(targetDate);

  // テンプレート変数に代入
  template.dateStr = entryData.dateStr;
  template.dateValue = entryData.dateValue;  // YYYY-MM-DD形式
  template.existingContent = entryData.content;
  template.existingMood = entryData.mood;
  template.existingTags = entryData.tags;

  return template.evaluate()
    .setTitle('日記を書く')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 指定日付の日記エントリーを取得（内部関数）
function getEntryByDate(targetDate) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('日記');

  // 日付を取得（指定がなければ今日）
  let dateObj;
  if (targetDate) {
    dateObj = new Date(targetDate);
  } else {
    dateObj = new Date();
  }

  const dateStr = formatDateString(dateObj);
  const dateValue = formatDateValue(dateObj);  // YYYY-MM-DD形式

  let result = {
    dateStr: dateStr,
    dateValue: dateValue,
    content: '',
    mood: '',
    tags: ''
  };

  if (!sheet || sheet.getLastRow() <= 1) {
    return result;
  }

  try {
    const data = sheet.getDataRange().getValues();

    // 最新のデータから検索（効率化）
    for (let i = data.length - 1; i > 0; i--) {
      if (!data[i][0]) continue;

      const rowDate = new Date(data[i][0]);
      const rowDateStr = formatDateString(rowDate);

      if (rowDateStr === dateStr) {
        result.content = data[i][4] || '';
        result.mood = data[i][5] || '';
        result.tags = data[i][6] || '';
        break;
      }
    }
  } catch (e) {
    Logger.log('getEntryByDate エラー: ' + e.toString());
  }

  return result;
}

// 日記を保存
function saveDiary(content, mood, tags, targetDate) {
  // 二重タップ/複数タブの同時保存で同一日付が二重追加されるのを防ぐ
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    return {success: false, message: '他の保存処理が実行中です。少し待ってから再度お試しください'};
  }
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('日記');

    if (!sheet) {
      initialize();
      sheet = ss.getSheetByName('日記');
    }

    // 保存する日付を取得（指定がなければ今日）
    let saveDate;
    if (targetDate) {
      // YYYY-MM-DD形式の文字列をローカルタイムゾーンで正しくパース
      const parts = targetDate.split('-');
      saveDate = new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0); // 12:00に設定
    } else {
      saveDate = new Date();
    }

    const year = saveDate.getFullYear();
    const monthDay = Utilities.formatDate(saveDate, Session.getScriptTimeZone(), 'MM/dd');
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][saveDate.getDay()];
    const saveDateStr = formatDateString(saveDate);

    // 指定日付の既存データを検索
    let existingRowIndex = -1;
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (!data[i][0]) continue;

      const rowDate = new Date(data[i][0]);
      const rowDateStr = formatDateString(rowDate);

      if (rowDateStr === saveDateStr) {
        existingRowIndex = i + 1; // スプレッドシートは1始まり
        break;
      }
    }

    // 既存データがあれば更新、なければ追加
    if (existingRowIndex > 0) {
      sheet.getRange(existingRowIndex, 5).setValue(content);
      sheet.getRange(existingRowIndex, 6).setValue(mood);
      sheet.getRange(existingRowIndex, 7).setValue(tags);
    } else {
      sheet.appendRow([saveDate, year, monthDay, dayOfWeek, content, mood, tags]);
    }

    // 日付で降順ソート（最新が上）
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 7).sort({column: 1, ascending: false});
    }

    return {success: true, message: '保存しました！'};

  } catch (e) {
    Logger.log('saveDiary エラー: ' + e.toString());
    return {success: false, message: 'エラーが発生しました: ' + e.toString()};
  } finally {
    lock.releaseLock();
  }
}

// ========================================
// 過去の今日ページ
// ========================================

function showPastPage() {
  return HtmlService.createHtmlOutputFromFile('Past')
    .setTitle('過去の今日')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getPastToday() {
  try {
    Logger.log('========================================');
    Logger.log('getPastToday: 開始');
    Logger.log('========================================');
    const now = new Date();
    Logger.log('getPastToday: now = ' + now);

    const result = getPastEntriesForDate(now);
    Logger.log('getPastToday: 戻り値の件数 = ' + result.length);
    Logger.log('getPastToday: returnします');
    return result;
  } catch (e) {
    Logger.log('getPastToday エラー: ' + e.toString());
    Logger.log('getPastToday スタックトレース: ' + e.stack);
    return [];
  }
}

// 指定日付の過去の日記を取得（汎用関数）
function getPastEntriesForDate(targetDate) {
  try {
    Logger.log('getPastEntriesForDate: 開始');
    Logger.log('  引数 targetDate = ' + targetDate);
    Logger.log('  引数の型 = ' + typeof targetDate);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const diarySheet = ss.getSheetByName('日記');

    if (!diarySheet) {
      Logger.log('getPastEntriesForDate: シートが見つかりません');
      return [];
    }

    const lastRow = diarySheet.getLastRow();
    Logger.log('getPastEntriesForDate: 最終行 = ' + lastRow);

    if (lastRow <= 1) {
      Logger.log('getPastEntriesForDate: データなし（ヘッダーのみ）');
      return [];
    }

    // targetDateから月日を抽出
    const dateObj = new Date(targetDate);
    Logger.log('  dateObj = ' + dateObj);
    const targetMonthDay = Utilities.formatDate(dateObj, Session.getScriptTimeZone(), 'MM/dd');
    const targetYear = dateObj.getFullYear();
    Logger.log('getPastEntriesForDate: 検索対象の月日 = ' + targetMonthDay + ', 年 = ' + targetYear);

    const data = diarySheet.getDataRange().getValues();
    const pastEntries = [];

    for (let i = 1; i < data.length; i++) {
      if (!data[i][0]) continue;

      // A列（日付）から月日を抽出
      const rowDate = new Date(data[i][0]);
      const rowMonthDay = Utilities.formatDate(rowDate, Session.getScriptTimeZone(), 'MM/dd');
      const rowYear = rowDate.getFullYear();

      // 同じ月日で、かつ過去の年のみ（今年の今日は除外）
      if (rowMonthDay === targetMonthDay && rowYear < targetYear) {
        Logger.log('getPastEntriesForDate: マッチ！ 年=' + data[i][1]);
        // 全てのフィールドを文字列として確実に返す
        pastEntries.push({
          year: String(data[i][1] || ''),
          dayOfWeek: String(data[i][3] || ''),
          content: String(data[i][4] || ''),
          mood: String(data[i][5] || ''),
          tags: String(data[i][6] || '')
        });
      }
    }

    Logger.log('getPastEntriesForDate: 見つかった件数 = ' + pastEntries.length);

    // 返す前の最終チェック
    const result = pastEntries.reverse(); // 新しい順に
    Logger.log('getPastEntriesForDate: return直前のresult.length = ' + result.length);
    Logger.log('getPastEntriesForDate: 正常終了、returnします');
    return result;

  } catch (e) {
    Logger.log('getPastEntriesForDate エラー: ' + e.toString());
    Logger.log('スタックトレース: ' + e.stack);
    return [];
  }
}

// ========================================
// ランダム表示ページ
// ========================================

function showRandomPage() {
  return HtmlService.createHtmlOutputFromFile('Random')
    .setTitle('ランダム日記')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getRandomDiary() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const diarySheet = ss.getSheetByName('日記');

    if (!diarySheet || diarySheet.getLastRow() <= 1) {
      return null;
    }

    const data = diarySheet.getDataRange().getValues();

    // データ行のみを取得（ヘッダー除外）
    const dataRows = data.slice(1).filter(row => row[0]);

    if (dataRows.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * dataRows.length);
    const entry = dataRows[randomIndex];

    const date = new Date(entry[0]);
    const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy年MM月dd日');

    return {
      date: dateStr,
      dayOfWeek: entry[3],
      content: entry[4] || '',
      mood: entry[5] || '',
      tags: entry[6] || ''
    };

  } catch (e) {
    Logger.log('getRandomDiary エラー: ' + e.toString());
    return null;
  }
}

// ========================================
// 検索ページ
// ========================================

function showSearchPage() {
  return HtmlService.createHtmlOutputFromFile('Search')
    .setTitle('検索')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function searchDiary(query) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const diarySheet = ss.getSheetByName('日記');

    if (!diarySheet || diarySheet.getLastRow() <= 1) {
      return [];
    }

    const data = diarySheet.getDataRange().getValues();
    const results = [];
    const queryLower = query.toLowerCase();

    for (let i = 1; i < data.length; i++) {
      if (!data[i][0]) continue;

      const content = String(data[i][4] || '');
      const tags = String(data[i][6] || '');

      if (content.toLowerCase().includes(queryLower) || tags.toLowerCase().includes(queryLower)) {
        const date = new Date(data[i][0]);
        const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd (E)');

        // ハイライト処理（XSS対策）
        const escapedQuery = escapeHtml(query);
        const escapedContent = escapeHtml(content);
        const regex = new RegExp('(' + escapeRegex(escapedQuery) + ')', 'gi');
        const highlightedContent = escapedContent.replace(regex, '<mark>$1</mark>');

        results.push({
          date: dateStr,
          mood: data[i][5] ? data[i][5].split(' ')[0] : '',
          content: content,
          highlightedContent: highlightedContent
        });
      }
    }

    return results;

  } catch (e) {
    Logger.log('searchDiary エラー: ' + e.toString());
    return [];
  }
}

// ========================================
// 統計ページ
// ========================================

function showStatsPage() {
  return HtmlService.createHtmlOutputFromFile('Stats')
    .setTitle('統計')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getStatistics() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const diarySheet = ss.getSheetByName('日記');

    if (!diarySheet || diarySheet.getLastRow() <= 1) {
      return null;
    }

    const data = diarySheet.getDataRange().getValues();
    const dataRows = data.slice(1).filter(row => row[0]);

    if (dataRows.length === 0) {
      return null;
    }

    const totalEntries = dataRows.length;
    const firstDate = new Date(dataRows[dataRows.length - 1][0]);
    const lastDate = new Date(dataRows[0][0]);
    const daysSinceStart = Math.floor((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1;
    const writeRate = ((totalEntries / daysSinceStart) * 100).toFixed(1);

    // 連続記録の計算（dataRows は日付降順ソート済み前提）
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // 現在の連続記録: 最新エントリが今日または昨日なら継続中とみなし、
    // そこから日付が1日ずつ連続する限りさかのぼって数える
    let currentStreak = 0;
    if (dataRows.length > 0) {
      const latest = new Date(dataRows[0][0]);
      latest.setHours(0, 0, 0, 0);
      const gapFromToday = Math.floor((today - latest) / MS_PER_DAY);
      if (gapFromToday <= 1) {
        currentStreak = 1;
        for (let i = 0; i < dataRows.length - 1; i++) {
          const d1 = new Date(dataRows[i][0]);
          const d2 = new Date(dataRows[i + 1][0]);
          d1.setHours(0, 0, 0, 0);
          d2.setHours(0, 0, 0, 0);
          if (Math.floor((d1 - d2) / MS_PER_DAY) === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }

    // 最長連続記録
    let maxStreak = 0;
    let tempStreak = 1;
    for (let i = 0; i < dataRows.length - 1; i++) {
      const date1 = new Date(dataRows[i][0]);
      const date2 = new Date(dataRows[i + 1][0]);
      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      if (Math.floor((date1 - date2) / MS_PER_DAY) === 1) {
        tempStreak++;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 1;
      }
    }
    maxStreak = Math.max(maxStreak, tempStreak);

    // 気分カウント
    const moodCounts = {};
    let totalChars = 0;

    for (let i = 0; i < dataRows.length; i++) {
      const mood = dataRows[i][5] || '未設定';
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      totalChars += String(dataRows[i][4] || '').length;
    }

    const avgChars = Math.round(totalChars / totalEntries);

    return {
      totalEntries: totalEntries,
      writeRate: writeRate,
      currentStreak: currentStreak,
      maxStreak: maxStreak,
      avgChars: avgChars,
      daysSinceStart: daysSinceStart,
      moodCounts: moodCounts
    };

  } catch (e) {
    Logger.log('getStatistics エラー: ' + e.toString());
    return null;
  }
}

// ========================================
// ユーティリティ関数
// ========================================

// 日付を文字列にフォーマット（yyyy/MM/dd形式）
function formatDateString(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd');
}

// 日付をYYYY-MM-DD形式に変換（input type="date"用）
function formatDateValue(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

// HTMLエスケープ（XSS対策）
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ========================================
// カレンダーページ
// ========================================

function showCalendarPage() {
  return HtmlService.createHtmlOutputFromFile('Calendar')
    .setTitle('カレンダー')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ========================================
// エクスポートページ
// ========================================

function showExportPage() {
  return HtmlService.createHtmlOutputFromFile('Export')
    .setTitle('エクスポート')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ========================================
// 設定ページ
// ========================================

function showSettingsPage() {
  return HtmlService.createHtmlOutputFromFile('Settings')
    .setTitle('設定')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ========================================
// タグ別表示ページ
// ========================================

function showTagsPage() {
  return HtmlService.createHtmlOutputFromFile('Tags')
    .setTitle('タグ別表示')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ========================================
// 追加データ取得関数
// ========================================

/**
 * 全日記エントリーを取得
 * @returns {Array} 全日記エントリー
 */
function getAllDiaryEntries() {
  try {
    Logger.log('getAllDiaryEntries: 開始');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const diarySheet = ss.getSheetByName('日記');

    if (!diarySheet) {
      Logger.log('getAllDiaryEntries: シートが見つかりません');
      return [];
    }

    const lastRow = diarySheet.getLastRow();
    Logger.log('getAllDiaryEntries: 最終行 = ' + lastRow);

    if (lastRow <= 1) {
      Logger.log('getAllDiaryEntries: データなし（ヘッダーのみ）');
      return [];
    }

    const data = diarySheet.getDataRange().getValues();
    const entries = [];

    for (let i = 1; i < data.length; i++) {
      if (!data[i][0]) continue;

      const date = new Date(data[i][0]);
      const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy/MM/dd');

      // 全てのフィールドを文字列として確実に返す
      entries.push({
        date: dateStr,
        year: String(data[i][1] || ''),
        monthDay: String(data[i][2] || ''),
        dayOfWeek: String(data[i][3] || ''),
        content: String(data[i][4] || ''),
        mood: String(data[i][5] || ''),
        tags: String(data[i][6] || '')
      });
    }

    Logger.log('getAllDiaryEntries: 完了。件数 = ' + entries.length);
    return entries;

  } catch (e) {
    Logger.log('getAllDiaryEntries エラー: ' + e.toString());
    Logger.log('スタックトレース: ' + e.stack);
    return [];
  }
}

/**
 * 全日記データを削除
 * @returns {Object} 結果
 */
function deleteAllDiaryData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const diarySheet = ss.getSheetByName('日記');

    if (!diarySheet) {
      return {success: false, message: 'シートが見つかりません'};
    }

    // データ行を削除（ヘッダーは残す）
    const lastRow = diarySheet.getLastRow();
    if (lastRow > 1) {
      diarySheet.deleteRows(2, lastRow - 1);
    }

    return {success: true, message: '全てのデータを削除しました'};

  } catch (e) {
    Logger.log('deleteAllDiaryData エラー: ' + e.toString());
    return {success: false, message: 'エラーが発生しました: ' + e.toString()};
  }
}

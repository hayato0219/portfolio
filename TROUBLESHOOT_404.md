# 404エラー 解決チェックリスト ✅

## エラー内容
```
Failed to load resource: the server responded with a status of 404
Error calling Gemini API: Error: API Error: 404
```

## 🔍 原因
このエラーは通常、以下のいずれかが原因です：
1. ❌ APIキーが設定されていない
2. ❌ APIキーが無効または期限切れ
3. ❌ APIエンドポイントのバージョンが間違っている（v1 vs v1beta）
4. ❌ .envファイルの形式が間違っている
5. ❌ 開発サーバーが.envを読み込んでいない

## 🆕 最新のAPI仕様（重要！）
Gemini APIは `v1` エンドポイントを使用します：
```
✅ 正しい: https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
❌ 古い: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

最新のコードでは `v1` を使用するように修正済みです。

## ✅ 解決手順

### ステップ 1: APIキーを取得
1. https://aistudio.google.com/app/apikey を開く（新しいURL！）
2. Googleアカウントでログイン
3. 「Create API key」をクリック
4. 「Create API key in new project」を選択
5. 生成されたAPIキーをコピー（`AIzaSy...` で始まる文字列）

**⚠️ 注意：** 古いURL（makersuite.google.com）ではなく、新しいURL（aistudio.google.com）を使用してください！

### ステップ 2: .envファイルを作成/確認
1. プロジェクトのルートディレクトリ（package.jsonと同じ場所）に `.env` ファイルを作成
2. 以下の内容を記述：
```
REACT_APP_GEMINI_API_KEY=AIzaSy...（ここにコピーしたキーを貼り付け）
```

**重要な注意点：**
- ❌ `=` の前後にスペースを入れない
- ❌ 引用符（`"` や `'`）で囲まない
- ❌ 改行を入れない
- ✅ `AIzaSy` で始まる完全なキーを貼り付ける

### ステップ 3: 開発サーバーを再起動
```bash
# 現在実行中のサーバーを停止（Ctrl+C）
# その後、再起動
npm start
# または
npm run dev
```

### ステップ 4: ブラウザをリフレッシュ
- `Ctrl+Shift+R` (Windows/Linux)
- `Cmd+Shift+R` (Mac)

### ステップ 5: ブラウザのコンソールを確認
1. F12キーを押して開発者ツールを開く
2. Consoleタブを選択
3. 以下のメッセージを確認：
```
API Key exists: true
API Key length: 39  (例: 実際の長さ)
API Key first 10 chars: AIzaSy...
```

## 🧪 テスト方法
1. チャットボタン（💬）をクリック
2. 簡単な質問を送信（例: "スキルは？"）
3. AIからの応答が返ってくればOK！

## 🆘 それでも動かない場合

### デバッグコマンド
ターミナルで以下を実行して環境変数を確認：

**Windows (PowerShell):**
```powershell
Get-Content .env
```

**Mac/Linux:**
```bash
cat .env
```

出力例（正しい場合）:
```
REACT_APP_GEMINI_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

### よくある間違い

❌ **間違い 1: .envファイルの場所が違う**
```
正しい場所: portfolio/.env
間違い: portfolio/src/.env
```

❌ **間違い 2: ファイル名が違う**
```
正しい: .env
間違い: .env.txt, env, .env.local
```

❌ **間違い 3: キーの形式が違う**
```
正しい: REACT_APP_GEMINI_API_KEY=AIzaSy...
間違い: REACT_APP_GEMINI_API_KEY="AIzaSy..."
間違い: REACT_APP_GEMINI_API_KEY = AIzaSy...
間違い: GEMINI_API_KEY=AIzaSy...  (REACT_APP_ が必要)
```

## 📁 ファイル構造の確認
```
portfolio/
├── .env                    ← ここに配置！
├── .env.example
├── package.json
├── README.md
├── node_modules/
└── src/
    ├── App.jsx
    └── Components/
        └── Chatbot.jsx
```

## ✅ 成功のサイン
チャットボットからこんな応答が来たら成功です：
- 自然な日本語/英語の回答
- ポートフォリオの内容に基づいた具体的な回答
- エラーメッセージが表示されない

頑張ってください！🚀

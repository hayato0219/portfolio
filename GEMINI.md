# プロジェクト： 個人ポートフォリオウェブサイト

これは、関勇人の個人ポートフォリオウェブサイトです。

## 技術スタック

*   **フレームワーク**: React.js
*   **ビルドツール**: Parcel
*   **スタイリング**: CSS (インラインスタイル使用)
*   **エフェクト**: react-tsparticles

## ディレクトリ構造

```
.
├── .devcontainer          # 開発コンテナの設定
├── .github                # GitHub関連のファイル (ワークフローなど)
├── .parcel-cache          # Parcelのキャッシュ
├── dist                   # ビルド後のファイル
├── node_modules           # 依存関係
├── src                    # ソースコード
│   ├── Components         # Reactコンポーネント
│   │   ├── About.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   └── Portfolio.jsx
│   ├── images             # 画像ファイル
│   │   ├── socials        # SNSアイコン
│   │   └── ...
│   ├── App.jsx            # メインのReactコンポーネント
│   ├── index.html         # HTMLエントリーポイント
│   ├── index.js           # JavaScriptエントリーポイント
│   └── styles.css         # スタイルシート
├── translations           # 翻訳ファイル
├── .eslintrc              # ESLintの設定ファイル
├── .gitignore             # Gitの無視ファイル
├── .prettierrc            # Prettierの設定ファイル
├── CODE_OF_CONDUCT.md     # 行動規範
├── GEMINI.md              # このファイル
├── LICENSE                # ライセンス
├── package-lock.json      # 依存関係のロックファイル
├── package.json           # プロジェクト情報と依存関係
├── README.md              # READMEファイル
├── SECURITY.md            # セキュリティポリシー
├── slides.pptx            # プレゼンテーションスライド
└── SUPPORT.md             # サポート情報
```

## プロジェクト構成

このプロジェクトは、以下のコンポーネントを持つシングルページアプリケーションとして構成されています。

*   `App.jsx`: 他のすべてのコンポーネントをレンダリングし、サイト全体のプロパティを管理するメインアプリケーションコンポーネント。
*   `Header.jsx`: ページ内の各セクションへのリンクを持つ固定ナビゲーションバー。
*   `Home.jsx`: ページの最上部セクションで、背景画像、名前、肩書き、プロフィール画像を表示します。
*   `About.jsx`: スキル、サービス、ツール、連絡先情報（メールとGitHub）など、詳細な自己紹介のためのセクション。
*   `Portfolio.jsx`: タイトル、説明、リンク付きのプロジェクトリストを展示するセクション。
*   `Footer.jsx`: 様々なソーシャルメディアプロファイルへのリンクと作成者の名前を含むページのフッター。

## 主な機能

*   **シングルページアプリケーション**: すべてのコンテンツが1つのページに表示され、セクション間をスムーズにスクロールできます。
*   **コンポーネントベースのアーキテクチャ**: アプリケーションは再利用可能なReactコンポーネントで構築されています。
*   **動的コンテンツ**: 個人情報やプロジェクトの詳細などのコンテンツのほとんどは、`src/App.jsx`内の中心的な`siteProps`オブジェクトを介して管理されており、更新が容易です。
*   **パーティクルエフェクト**: このウェブサイトでは、`react-tsparticles`を使用して、背景にアニメーション化されたパーティクルエフェクトを表示します。
*   **ソーシャルメディア連携**: フッターには、さまざまなソーシャルメディアプラットフォームへのリンクが含まれています。

## プロジェクトの実行方法

1.  依存関係のインストール: `npm install`
2.  開発サーバーの起動: `npm start`
3.  本番用にビルド: `npm run build`
4.  GitHub Pages用にビルド: `npm run build-gh`
5.  GitHub Pagesへのデプロイ: `npm run deploy`

## カスタマイズ

ポートフォリオをカスタマイズするには、`src/App.jsx`内の`siteProps`オブジェクトを自分の情報で編集する必要があります。また、`src/Components/Portfolio.jsx`のプロジェクトリストや`src/Components/About.jsx`のスキルと説明を更新することもできます。画像は、各コンポーネントのimport文を更新することで置き換えられます。
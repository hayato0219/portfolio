import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </Head>
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

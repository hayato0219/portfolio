import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hayato Seki - Graduate Student Portfolio',
  description: 'Personal portfolio of Hayato Seki, a graduate student majoring in Informatics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}

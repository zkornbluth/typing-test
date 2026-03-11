/**
 * @author Zachary Kornbluth <github.com/zkornbluth>
 */

import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  title: 'Typing Speed Test',
  icons: {
    icon: `${basePath}keyboard.png`, // This lets the tab icon work both locally and hosted via GitHub Pages
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

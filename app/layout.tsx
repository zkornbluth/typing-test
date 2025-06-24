export const metadata = {
  title: 'Typing Test',
  description: 'See how fast you can type',
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

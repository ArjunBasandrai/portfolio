export const metadata = {
  title: 'Arjun Basandrai - Software Engineer',
  description: 'Arjun Basandrai is a Software Engineer based in Punjab, India. He is passionate about working with large datasets to create real world applications and in his free time he loves to photograph the wildlife around him',
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

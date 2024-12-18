import Navbar from "@/components/Navbar"
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Arjun Basandrai - Software Engineer',
  description: 'Arjun Basandrai is a Software Engineer based in Punjab, India. He is passionate about working with large datasets to create real world applications and in his free time he loves to photograph the wildlife around him',
  icons: [{ rel: "icon", url: "/favicon.ico"}],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
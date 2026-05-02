import './globals.css'

export const metadata = {
  title: 'The Voice Lab — Voice Coaching for Founders and Executives',
  description: 'I help leaders close the gap between how they think and how they\'re heard. A 10-day communication sprint for founders and executives.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
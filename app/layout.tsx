import './styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Career AI',
  description: 'AI-powered career recommendation platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags */}
        <script
          id="chatling-config"
          dangerouslySetInnerHTML={{
            __html: `window.chtlConfig = { chatbotId: "2323443923" };`,
          }}
        />
        <script
          src="https://chatling.ai/js/embed.js"
          data-id="2323443923"
          id="chatling-embed-script"
          async
        ></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import AppQueryProvider from "@/contexts/QueryClientProvider";
import { UserProvider } from "@/contexts/UserContext";
import { TodoProvider } from "@/contexts/TodoContext";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <UserProvider>
          <TodoProvider>
            <AppQueryProvider>
              <Providers>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  {children}
                  <Analytics />
                </ThemeProvider>
              </Providers>
            </AppQueryProvider>
          </TodoProvider>
        </UserProvider>
      </body>
    </html>
  );
}

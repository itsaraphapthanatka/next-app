"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import "./globals.css";
import { ConfigProvider } from "antd";

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en">
      <body  className="antialiased">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FC8D2B',
            },
          }}
        >
          <SessionProvider>
            {children}
          </SessionProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}

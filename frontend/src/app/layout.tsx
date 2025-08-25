import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Blog App",
//   description: "A simple blog application with user management",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#3b82f6",
              },
            }}
          >
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { App as AntdApp, ConfigProvider } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

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
            <AntdApp>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  {children}
                </main>
              </div>
            </AntdApp>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

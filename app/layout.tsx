import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@/lib/query-provider";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

// Metadata for the application
export const metadata: Metadata = {
  title: "CloudHive Feature Idea Portal",
  description:
    "Internal tool for CloudHive employees to propose and vote on feature ideas for Integration Hub.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <QueryClientProvider>
          {/* Main header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                  CloudHive Feature Idea Portal
                </h1>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white mt-auto py-6 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                CloudHive Footer
              </p>
            </div>
          </footer>
        </QueryClientProvider>
      </body>
    </html>
  );
}

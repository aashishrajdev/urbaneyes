// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "UrbanEye - Smart City Surveillance",
//   description:
//     "A smart city surveillance system for managing and monitoring cameras",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UrbanEye - Smart City Surveillance",
  description: "A modern smart city surveillance system for managing and monitoring cameras with advanced analytics and real-time insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <header className="glass-effect border-b border-white/20 backdrop-blur-xl">
              <div className="container-page">
                <div className="flex justify-end items-center py-4 gap-4">
                  <SignedOut>
                    <SignInButton>
                      <button className="btn-secondary">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="btn-primary">
                        Get Started
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 ring-2 ring-white/20",
                        }
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </header>
            <Navigation />
            <main className="relative">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

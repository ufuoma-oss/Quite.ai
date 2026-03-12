import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quitee - AI That Frees You From Bad Addiction",
  description: "The smartest way to quit smoking, porn, gambling, and more. Simple. Honest. Always there. AI that helps you quit the habits you don't want anymore.",
  keywords: ["Quit smoking", "Quit porn", "Quit gambling", "Habit breaking", "AI assistant", "Addiction recovery", "Quitee"],
  authors: [{ name: "Quitee Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Quitee - AI That Frees You From Bad Addiction",
    description: "The smartest way to quit smoking, porn, gambling, and more. Simple. Honest. Always there.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quitee - AI That Frees You From Bad Addiction",
    description: "The smartest way to quit smoking, porn, gambling, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

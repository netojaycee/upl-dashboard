import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FirebaseProvider from "@/lib/FirebaseProvider";
import { ThemeProvider } from "@/components/local/theme-provider";
// import { ActiveThemeProvider } from "@/components/local/active-theme";
// import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

// const META_THEME_COLORS = {
//   light: "#ffffff",
//   dark: "#09090b",
// };

//
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "UPL Dashboard",
  description: "Admin Dashboard for managing UPL activities",
};

// const fontVariables = `${geistSans.variable} ${geistMono.variable}`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();
  // const activeThemeValue = cookieStore.get("active_theme")?.value;
  // const isScaled = activeThemeValue?.endsWith("-scaled");
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        // className={cn(
        //   "bg-background overscroll-none font-sans antialiased",
        //   activeThemeValue ? `theme-${activeThemeValue}` : "",
        //   isScaled ? "theme-scaled" : ""
        // )}
        className={cn("bg-background overscroll-none font-sans antialiased")}
      >
        <FirebaseProvider>
          {" "}
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            {/* <ActiveThemeProvider initialTheme={activeThemeValue}> */}
            {children}
            <Toaster richColors closeButton />
            {/* <Analytics />  */}
            {/* </ActiveThemeProvider> */}
          </ThemeProvider>
        </FirebaseProvider>{" "}
      </body>
    </html>
  );
}

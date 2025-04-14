"use client";

import useAuthStore from "@/lib/store";
import LoaderComponent from "../loading";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";

import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {  isLoading } = useAuthStore();
  const pathname = usePathname();

  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, isLoading, router]);

  if (isLoading) return <LoaderComponent />;

  // if (!user) return null; // Redirecting
  //capitalise first character
  const pageTitle =
    pathname.replace("/", "").charAt(0).toUpperCase() +
    pathname.replace("/", "").slice(1);

  return (
    <div>
      {" "}
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant='floating' />
        <SidebarInset>
          <SiteHeader pageTitle={pageTitle} />
          <div className='flex flex-1 flex-col'>
            <div className='@container/main flex flex-1 flex-col gap-2 py-8 px-3'>
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

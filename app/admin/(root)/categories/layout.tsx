"use client";

import { SidebarTrigger } from "@/components/atoms/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 1. Header: Removed 'fixed' to prevent overlap, added border for UI depth */}
      <header className="sticky top-17 z-10 flex h-16 w-full items-center border-b bg-background/95 px-4 backdrop-blur md:px-10">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-6 w-px bg-border mx-2" />{" "}
          {/* Small visual separator */}
          <nav className="text-xl font-semibold tracking-tight">Categories</nav>
        </div>
      </header>

      {/* 2. Main Content: Using flex-1 to push the footer down if you add one later */}
      <main className="px-10 pt-5 pb-10">
          {/* Constraining the width here ensures the form isn't 100% wide on ultra-wide monitors */}
          {children}
      </main>
    </div>
  );
};

export default Layout;

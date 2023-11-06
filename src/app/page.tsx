"use client";

import { HeaderBar } from "./(public)/header-bar";
import { UserWatcher } from "./(public)/user-watcher";

import "./home.css";

export default function Page() {
  return (
    <div className="homeBgImg h-screen w-screen">
      <UserWatcher />
      <HeaderBar />
      <main></main>
    </div>
  );
}

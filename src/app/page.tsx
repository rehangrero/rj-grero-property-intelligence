"use client";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />
      <Sidebar />
      <main className="pt-16 pl-64">
        <Dashboard />
      </main>
    </div>
  );
}

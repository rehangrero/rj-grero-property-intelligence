"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="pt-16 pl-64">
        <Dashboard activeSection={activeSection} />
      </main>
    </div>
  );
}

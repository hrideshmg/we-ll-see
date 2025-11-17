"use client";

import Home from "@/components/svg/home";

export default function NavPanel() {
  const mainLinks = [
    { label: "Home", icon: <Home /> },
    { label: "Search", icon: <Home /> },
    { label: "Explore", icon: <Home /> },
    { label: "Reels", icon: <Home /> },
    { label: "Messages", icon: <Home /> },
  ];

  const bottomLinks = [
    { label: "Settings", icon: <Home /> },
    { label: "Profile", icon: <Home /> },
  ];

  return (
    <div className="min-h-screen border-r border-stone-800 sticky top-0 flex flex-col w-60 p-4 text-white">
      {/* Logo / Title */}
      <div className="text-2xl font-bold mb-6">Well See</div>

      {/* Main navigation */}
      <div className="flex flex-col gap-3 flex-1">
        {mainLinks.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-3 mt-4">
        {bottomLinks.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

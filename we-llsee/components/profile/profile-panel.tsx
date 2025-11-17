"use client";

import Home from "@/components/svg/home";
import Heart from "../svg/heart";

export default function ProfilePanel() {
  const suggestions = [
    { name: "user_one", icon: <div className="w-10 h-10 bg-neutral-600 rounded-full" /> },
    { name: "cool_dev", icon: <div className="w-10 h-10 bg-neutral-600 rounded-full" /> },
    { name: "random_user", icon: <div className="w-10 h-10 bg-neutral-600 rounded-full" /> },
    { name: "hooman42", icon: <div className="w-10 h-10 bg-neutral-600 rounded-full" /> },
    { name: "dev_master", icon: <div className="w-10 h-10 bg-neutral-600 rounded-full" /> },
  ];

  const bottomLinks = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
  ];

  return (
    <div className="min-h-screen sticky top-0 flex flex-col w-80 p-4 text-white bg-black">

      {/* Username Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-neutral-600 rounded-full" />
        <div className="font-semibold text-lg">amansxcalibur</div>
      </div>

      {/* Suggested Section */}
      <div className="text-sm text-white/80 mb-3">Suggested for you</div>

      <div className="flex flex-col gap-4 flex-1">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div>{item.icon}</div>
              <span>{item.name}</span>
            </div>

            <button className="text-blue-300 text-sm hover:text-blue-400">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Links */}
      <div className="mt-6 text-xs text-white/70 flex flex-wrap gap-2">
        {bottomLinks.map((link, index) => (
          <span key={index} className="cursor-pointer hover:underline">
            {link}
          </span>
        ))}
      </div>

      <div className="text-xs mt-4 text-white/60">
        © {new Date().getFullYear()} Instagram Clone
      </div>

    </div>
  );
}

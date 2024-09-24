"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/chat", label: "Chat" },
    { href: "/assistant", label: "Assistant" },
    { href: "/document", label: "Document" },
    { href: "/settings", label: "Settings" },
    { href: "/news", label: "News" },
    { href: "/library", label: "Library" },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block p-2 rounded
                  ${pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700'
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

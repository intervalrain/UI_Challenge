"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Bot,
  FileText,
  Settings,
  Newspaper,
  SquareLibrary,
  ChevronFirst,
  ChevronLast
} from "lucide-react";
import SidebarItem from "./SidebarItem";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  alert?: boolean;
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: "/chat", label: "Chat", icon: <MessageSquare size={20} /> },
    { href: "/assistant", label: "Assistant", icon: <Bot size={20} /> },
    { href: "/document", label: "Document", icon: <FileText size={20} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
    { href: "/news", label: "News", icon: <Newspaper size={20} />, alert: true },
    { href: "/library", label: "Library", icon: <SquareLibrary size={20} /> },
  ];

  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${expanded ? "w-64" : "w-16"}`}>
      <div className="pt-2 flex justify-center items-center">
        {expanded && (
        <h2 className={`pt-2 px-4 font-semibold text-2xl transition-all duration-300
          ${expanded ? "w-48 opacity-100" : "w-0 opacity-0"}`}>
          DSM Bot
        </h2>)}
        <button
          onClick={() => setExpanded((expanded => !expanded))}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600">
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <nav className="p-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <SidebarItem
                  icon={item.icon}
                  text={item.label}
                  active={item.href === pathname}
                  alert={item.alert && item.href !== pathname}
                  expanded={expanded}
                ></SidebarItem>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

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
  ChevronLast,
  Sun, 
  Moon
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import Avatar from "@/utils/Avatar";
import { useTheme } from "@/store/hooks";

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
    { href: "/news", label: "News", icon: <Newspaper size={20} />, alert: true, },
    { href: "/library", label: "Library", icon: <SquareLibrary size={20} /> },
  ];

  const [expanded, setExpanded] = useState(true);
  const { theme, setTheme } = useTheme();
  const user = {
    name: "Rain Hu",
    email: "intervalrain@gmail.com",
  };

  return (
    <aside
      className={`bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      }`}
    >
      <div className="pt-2 flex justify-center items-center">
        {expanded && (
          <h2
            className={`pt-2 px-4 font-semibold text-2xl transition-all duration-300
          ${expanded ? "w-48 opacity-100" : "w-0 opacity-0"}`}
          >
            DSM Bot
          </h2>
        )}
        <button
          onClick={() => setExpanded((expanded) => !expanded)}
          className="p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-128px)]">
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
        <div className="flex p-3">
          <Avatar name={user.name as string} className="w-10 h-10" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user.name}</h4>
              <span className="text-xs text-gray-400">{user.email}</span>
            </div>
            <div className="mr-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

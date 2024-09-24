import Link from 'next/link';
import React from 'react';

const routes = [
  { path: '/chat', label: 'Chat' },
  { path: '/assistant', label: 'Assistant' },
  { path: '/document', label: 'Document' },
  { path: '/settings', label: 'Settings' },
  { path: '/news', label: 'News' },
  { path: '/library', label: 'Library' },
]

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          {routes.map(route => (
            <li><Link href={route.path} className="block p-2 hover:bg-gray-700 rounded">{route.label}</Link></li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
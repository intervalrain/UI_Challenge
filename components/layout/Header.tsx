import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold">AI ChatBot</Link>
            <div>
                <Link href="/about" className="mr-4">About</Link>
                <Link href="contact" className="mr-4">Contact</Link>
            </div>
        </nav>
    </header>
  );
};

export default Header;
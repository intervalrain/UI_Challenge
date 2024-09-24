import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-semibold">AI ChatBot</Link>
      <nav>
        <Link href="/about" className="mr-4">About</Link>
        <Link href="mailto:intervalrain@gmail.com" className="mr-4">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;

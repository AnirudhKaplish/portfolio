import React from 'react';
const Footer: React.FC = () => (
  <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
    <p>© {new Date().getFullYear()} Anirudh Kaplish · Built with React, Vite and Tailwind</p>
  </footer>
);
export default Footer;

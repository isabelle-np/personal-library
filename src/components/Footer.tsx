import React from 'react';

export const Footer = () => {
  return (
    <footer className="text-center mt-16 sm:mt-20 pb-8">
      <blockquote className="text-amber-200 text-sm sm:text-base italic">
        "The mind is not a vessel to be filled but a fire to be kindled."
      </blockquote>
      <cite className="text-amber-300 text-xs sm:text-sm mt-2 block">
        — Plutarch
      </cite>
      <div className="mt-6 text-xs text-amber-400 opacity-75">
        © {new Date().getFullYear()} Isabelle's Library. All rights reserved.
      </div>
      <a
        href="https://www.linkedin.com/in/isabellenguyenphuoc/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-400 underline mt-4 block"
      >
        Connect with me on LinkedIn
      </a>
    </footer>
  );
};
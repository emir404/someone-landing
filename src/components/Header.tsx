"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Logo from "./Logo";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: easeOutExpo }}
      className="w-full py-12 flex items-center justify-between"
    >
      <Link href="/">
        <Logo className="text-white" />
      </Link>
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-white/80 transition-colors duration-200"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </motion.header>
  );
}

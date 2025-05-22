'use client'
import React from "react";
import Link from "next/link";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { useDarkMode } from "@/hooks/useDarkMode";

const categories = [
  { name: "Next.js", color: "bg-blue-100 text-blue-800" },
  { name: "React", color: "bg-green-100 text-green-800" },
  { name: "JavaScript", color: "bg-yellow-100 text-yellow-800" },
];

export default function Header() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Blog App
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/posts"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                All Posts
              </Link>
              <Link
                href="/posts/new"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                New Post
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/category/${category.name}`}
                  className={`${category.color} px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Toggle
              pressed={darkMode}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? "🌙" : "☀️"}
            </Toggle>
          </div>
        </div>
      </nav>
    </header>
  );
} 
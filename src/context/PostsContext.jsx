'use client'
import React, { createContext, useContext, useState } from "react";

const initialPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    description: "A beginner's guide to building web apps with Next.js.",
    content: "Next.js is a React framework that enables server-side rendering and static site generation.",
    category: "Next.js",
    author: "John Doe",
    createdAt: "2024-03-20",
  },
  {
    id: 2,
    title: "React Hooks Explained",
    description: "Understand how to use React Hooks in your projects.",
    content: "React Hooks are functions that let you use state and other React features in functional components.",
    category: "React",
    author: "Jane Smith",
    createdAt: "2024-03-19",
  },
  {
    id: 3,
    title: "Modern JavaScript Features",
    description: "Explore the latest features in JavaScript ES6+.",
    content: "ES6+ features that every JavaScript developer should know.",
    category: "JavaScript",
    author: "Mike Johnson",
    createdAt: "2024-03-18",
  },
];

const PostsContext = createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (post) => {
    setPosts((prev) => [
      { ...post, id: Date.now(), createdAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  const editPost = (id, updated) => {
    setPosts((prev) => prev.map((p) => (p.id === Number(id) ? { ...p, ...updated } : p)));
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== Number(id)));
  };

  const getPostById = (id) => posts.find((p) => p.id === Number(id));

  return (
    <PostsContext.Provider value={{ posts, addPost, editPost, deletePost, getPostById }}>
      {children}
    </PostsContext.Provider>
  );
} 
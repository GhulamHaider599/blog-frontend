'use client'
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { fetchPosts } from "@/api/posts";
import LoadingSpinner from "@/components/LoadingSpinner";

const categories = [
  { name: "Next.js", color: "bg-blue-100 text-blue-800" },
  { name: "React", color: "bg-green-100 text-green-800" },
  { name: "JavaScript", color: "bg-yellow-100 text-yellow-800" },
];

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const featuredPosts = posts.slice(0, 3);

  if (loading) return <LoadingSpinner text="Loading post..."  />
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 text-center mb-10 bg-gradient-to-r from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 dark:bg-gradient-to-r">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Welcome to BlogApp</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">Discover the latest articles on Next.js, React, JavaScript, and more!</p>
        <Button asChild size="lg">
          <Link href="/posts">Browse All Posts</Link>
        </Button>
      </section>
      {/* Featured Posts */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Card key={post._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.content.substring(0, 100)}...</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${categories.find(c => c.name === post.category)?.color}`}>{post.category}</span>
                  <span className="text-xs text-gray-500">By {post.author}</span>
                  <span className="text-xs text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/posts/${post._id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Categories Section */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-4">
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
      </section>
    </>
  );
}

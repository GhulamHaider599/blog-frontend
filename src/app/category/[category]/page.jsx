'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { fetchPosts } from "@/api/posts";
import { Toaster, toast } from 'react-hot-toast';
import LoadingSpinner from "@/components/LoadingSpinner";

const categories = [
  { name: "Next.js", color: "bg-blue-100 text-blue-800" },
  { name: "React", color: "bg-green-100 text-green-800" },
  { name: "JavaScript", color: "bg-yellow-100 text-yellow-800" },
];

export default function CategoryPage() {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(params.category);
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [params.category]);

  if (loading) return <LoadingSpinner text="Loading posts..." />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  const category = categories.find(cat => cat.name === params.category);

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {params.category} Posts
            </h1>
            <div className={`inline-block ${category?.color} px-3 py-1 rounded-full text-sm font-medium`}>
              {params.category}
            </div>
          </div>
          <Button asChild>
            <Link href="/posts/new">Create New Post</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No posts found in this category.
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post._id} className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.content.substring(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${category?.color}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">By {post.author}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </div>
                <CardFooter className="flex gap-2 justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/posts/${post._id}`}>Read More</Link>
                  </Button>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/posts/${post._id}/edit`}>Edit</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
} 
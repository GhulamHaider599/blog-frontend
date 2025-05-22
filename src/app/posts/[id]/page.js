'use client'
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fetchPost } from "@/api/posts";
import LoadingSpinner from "@/components/LoadingSpinner";
import Header from "@/components/Header";

const categories = [
  { name: "Next.js", color: "bg-blue-100 text-blue-800" },
  { name: "React", color: "bg-green-100 text-green-800" },
  { name: "JavaScript", color: "bg-yellow-100 text-yellow-800" },
];

export default function SinglePostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost(params.id)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <LoadingSpinner text="Loading post..."  />
  if (!post) return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-16 text-center text-gray-500">Post not found.</div>
    </>
  );

  return (
    <>
      
      <div className="max-w-2xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl mb-2">{post.title}</CardTitle>
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${categories.find(c => c.name === post.category)?.color}`}>{post.category}</span>
              <span className="text-xs text-gray-500">By {post.author}</span>
              <span className="text-xs text-gray-400">{post.createdAt}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none mb-6">
              <p>{post.content}</p>
            </div>
            <Button variant="outline" onClick={() => router.push('/posts')}>Back to All Posts</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
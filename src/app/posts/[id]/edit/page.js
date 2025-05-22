'use client'
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fetchPost, updatePost } from "@/api/posts";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast, Toaster } from 'react-hot-toast';
import LoadingSpinner from "@/components/LoadingSpinner";

const categories = [
  { name: "Next.js", color: "bg-blue-100 text-blue-800" },
  { name: "React", color: "bg-green-100 text-green-800" },
  { name: "JavaScript", color: "bg-yellow-100 text-yellow-800" },
];

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: categories[0].name,
  });

  useEffect(() => {
    fetchPost(params.id)
      .then((post) => {
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category,
        });
      })
      .catch((err) => {
        setError("Failed to load post");
        toast.error("Failed to load post");
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updatePost(params.id, formData);
      toast.success("Post updated successfully!");
      router.push(`/posts/${params.id}`);
    } catch (err) {
      setError("Failed to update post");
      toast.error("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <LoadingSpinner text="Loading post..." />;

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter post title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Write your post content"
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/posts/${params.id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="small" text="" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
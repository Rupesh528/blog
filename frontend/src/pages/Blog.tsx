import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";
import { getUserIdFromToken } from "../utils/auth";

interface Blog {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author: {
    name: string;
  };
}

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  
  // Get current user ID and ensure it's a number
  const currentUserId = getUserIdFromToken();
  const isAuthor = blog && currentUserId !== null && Number(blog.authorId) === Number(currentUserId);

  useEffect(() => {
    if (id) {
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`)
        .then(response => {
          setBlog(response.data.blog);
          setLoading(false);
          // Debug logging
          const userId = getUserIdFromToken();
          console.log("Blog authorId:", response.data.blog.authorId);
          console.log("Current userId:", userId);
          console.log("Is author:", userId !== null && Number(response.data.blog.authorId) === Number(userId));
        })
        .catch(error => {
          console.error("Error fetching blog:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to delete this blog");
      navigate("/signin");
      return;
    }

    setDeleting(true);
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/blogs");
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      alert(error.response?.data?.message || "Failed to delete blog");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Blog not found</p>
          <button
            onClick={() => navigate("/blogs")}
            className="text-blue-600 hover:underline"
          >
            Go back to blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <article>
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                {blog.title}
              </h1>
              
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div 
                    onClick={() => navigate(`/author/${blog.authorId}/blogs`)}
                    className="text-gray-900 font-medium hover:underline cursor-pointer"
                  >
                    {blog.author.name}
                  </div>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-600 text-sm">3 min read</span>
                </div>
                
                {isAuthor && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/blog/${id}/edit`)}
                      className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="px-4 py-1.5 text-sm bg-red-50 text-red-600 rounded-full hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-8 whitespace-pre-wrap text-lg">
                {blog.content}
              </div>
            </div>
          </article>
        </div>
      </div>
      <Quote />
    </div>
  );
};

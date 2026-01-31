import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all published blogs
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)
      .then(response => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Blogs</h1>
            <p className="text-gray-600">Read stories from our community</p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No blogs published yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content.length > 150 
                      ? blog.content.substring(0, 150) + "..." 
                      : blog.content}
                  </p>
                  <div className="text-sm text-gray-500">
                    By {blog.author.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Quote />
    </div>
  );
};


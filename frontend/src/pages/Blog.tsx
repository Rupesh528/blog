import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";

interface Blog {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string;
  };
}

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`)
        .then(response => {
          setBlog(response.data.blog);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching blog:", error);
          setLoading(false);
        });
    }
  }, [id]);

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/blogs")}
            className="text-blue-600 hover:underline mb-6"
          >
            ← Back to blogs
          </button>

          <article className="bg-white p-8 rounded-lg border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            
            <div className="text-gray-600 mb-8 pb-6 border-b border-gray-200">
              By {blog.author.name}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </p>
            </div>
          </article>
        </div>
      </div>
      <Quote />
    </div>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";

export const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to create a blog");
      navigate("/signin");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content, published },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (published) {
        navigate(`/blog/${response.data.id}`);
      } else {
        navigate("/blogs");
      }
    } catch (error: any) {
      console.error("Error creating blog:", error);
      alert(error.response?.data?.message || "Failed to create blog");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none focus:outline-none"
                placeholder="Title"
              />
            </div>

            <div className="mb-8">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={20}
                className="w-full text-lg text-gray-800 placeholder-gray-400 border-none outline-none focus:outline-none resize-none leading-relaxed"
                placeholder="Tell your story..."
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <label htmlFor="published" className="text-sm text-gray-700 cursor-pointer">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/blogs")}
                  className="px-5 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Publishing..." : "Publish"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Quote />
    </div>
  );
};


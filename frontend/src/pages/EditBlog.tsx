import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";
import { getUserIdFromToken } from "../utils/auth";

export const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/blogs");
      return;
    }

    // Fetch the blog to edit
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`)
      .then(response => {
        const blog = response.data.blog;
        const currentUserId = getUserIdFromToken();
        
        // Check if user is the author
        if (!currentUserId || Number(blog.authorId) !== Number(currentUserId)) {
          alert("You don't have permission to edit this blog");
          navigate(`/blog/${id}`);
          return;
        }

        setTitle(blog.title);
        setContent(blog.content);
        setPublished(blog.published);
        setFetching(false);
      })
      .catch(error => {
        console.error("Error fetching blog:", error);
        alert("Failed to load blog");
        navigate("/blogs");
      });
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to edit this blog");
      navigate("/signin");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { id: Number(id), title, content, published },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      navigate(`/blog/${id}`);
    } catch (error: any) {
      console.error("Error updating blog:", error);
      alert(error.response?.data?.message || "Failed to update blog");
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading blog...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Blog</h1>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Enter blog title..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                Publish this blog
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Blog"}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/blog/${id}`)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Quote />
    </div>
  );
};



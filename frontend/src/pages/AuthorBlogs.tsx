import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Quote } from "../components/Quote";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    id: number;
  };
}

export const AuthorBlogs = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [authorName, setAuthorName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authorId) {
      axios.get(`${BACKEND_URL}/api/v1/blog/author/${authorId}`)
        .then(response => {
          setBlogs(response.data.blogs);
          setAuthorName(response.data.author?.name || "Unknown Author");
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching author blogs:", error);
          setLoading(false);
        });
    }
  }, [authorId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading blogs...(coldstart may take 20-30 sec if u start for the first time</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {authorName}
            </h1>
            <p className="text-gray-600">
              {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'} published
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No published blogs by this author yet.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {blogs.map((blog, index) => (
                <div key={blog.id}>
                  <article
                    className="cursor-pointer group py-8"
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:underline leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {blog.content.length > 200 
                        ? blog.content.substring(0, 200) + "..." 
                        : blog.content}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>3 min read</span>
                    </div>
                  </article>
                  {index < blogs.length - 1 && (
                    <div className="border-b border-gray-200"></div>
                  )}
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


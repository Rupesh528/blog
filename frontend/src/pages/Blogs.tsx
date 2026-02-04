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
    id: number;
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
        <div className="text-gray-500">Loading blogs...(may take 20-30 sec for the first time due to cold start</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No blogs published yet.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {blogs.map((blog, index) => (
                <div key={blog.id}>
                  <article
                    className="cursor-pointer group py-8"
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div 
                          className="text-sm text-gray-600 mb-2 hover:text-gray-900 inline-block"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/author/${blog.author.id}/blogs`);
                          }}
                        >
                          {blog.author.name}
                        </div>
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
                      </div>
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


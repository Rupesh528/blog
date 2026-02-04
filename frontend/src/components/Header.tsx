import { Link, useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utils/auth";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentUserId = getUserIdFromToken();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/blogs" className="text-xl font-bold text-gray-900">
          BlogBox
        </Link>

        <nav className="flex items-center gap-6">
          {token ? (
            <>
              <Link
                to="/create"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Write
              </Link>
              <Link
                to="/blogs"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Blogs
              </Link>
              {currentUserId && (
                <Link
                  to={`/author/${currentUserId}/blogs`}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  My Blogs
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-full hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};


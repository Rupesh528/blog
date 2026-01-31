import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/blogs" className="text-2xl font-bold text-gray-900">
          Blog
        </Link>

        <nav className="flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/create"
                className="text-gray-700 hover:text-gray-900"
              >
                Write
              </Link>
              <Link
                to="/blogs"
                className="text-gray-700 hover:text-gray-900"
              >
                Blogs
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
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


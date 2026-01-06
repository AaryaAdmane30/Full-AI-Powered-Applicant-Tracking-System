import React from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

function Navbar() {
  const { isLoading, auth } = usePuterStore();
  const { user, isAuthenticated, signOut } = auth;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              RESUMIND
            </p>
          </Link>

          {/* Right: Navigation & Auth */}
          <div className="flex items-center gap-4">

            {/* Upload Resume - visible only when logged in */}
            {!isLoading && isAuthenticated && (
              <Link
                to="/upload"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200"
              >
                Upload Resume
              </Link>
            )}

            {/* Auth Section */}
            {isLoading ? (
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>

                {/* Username */}
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-gray-400 dark:text-gray-500">Welcome</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user?.username || "User"}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="navbar bg-[#F9FAFB]">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold main-col">
            uniConnect
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link 
                to="/" 
                className={`transition-all duration-300 rounded-lg ${isActive('/') ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-500' : 'hover:bg-yellow-50'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`transition-all duration-300 rounded-lg ${isActive('/about') ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-500' : 'hover:bg-yellow-50'}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blood-donation"
                className={`transition-all duration-300 rounded-lg ${isActive('/blood-donation') ? 'bg-red-100 text-red-700 font-semibold shadow-sm border-l-4 border-red-500' : 'text-red-600 hover:bg-red-50'}`}
              >
                Blood Bank
              </Link>
            </li>
            <li>
              <Link 
                to="/lost-found" 
                className={`transition-all duration-300 rounded-lg ${isActive('/lost-found') ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-500' : 'hover:bg-blue-50'}`}
              >
                Lost & Found
              </Link>
            </li>
            <li>
              <Link 
                to="/events" 
                className={`transition-all duration-300 rounded-lg ${isActive('/events') ? 'bg-yellow-100 text-yellow-700 font-semibold shadow-sm border-l-4 border-yellow-500' : 'hover:bg-yellow-50'}`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link 
                to="/auction" 
                className={`transition-all duration-300 rounded-lg ${isActive('/auction') ? 'bg-purple-100 text-purple-700 font-semibold shadow-sm border-l-4 border-purple-500' : 'hover:bg-purple-50'}`}
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link 
                to="/bulletin" 
                className={`transition-all duration-300 rounded-lg ${isActive('/bulletin') ? 'bg-orange-100 text-orange-700 font-semibold shadow-sm border-l-4 border-orange-500' : 'hover:bg-orange-50'}`}
              >
                Bulletin
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-2">
          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                ></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link 
                  to="/blood-donation"
                  className={`transition-all duration-200 ${isActive('/blood-donation') ? 'bg-red-100 text-red-700 font-semibold border-l-4 border-red-500' : 'text-red-600 hover:bg-red-50'}`}
                >
                  🩸 Blood Donation
                </Link>
              </li>
              <li>
                <Link 
                  to="/lost-found"
                  className={`transition-all duration-200 ${isActive('/lost-found') ? 'bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500' : 'hover:bg-blue-50'}`}
                >
                  🔍 Lost & Found
                </Link>
              </li>
              <li>
                <Link 
                  to="/flood-relief"
                  className={`transition-all duration-200 ${isActive('/flood-relief') ? 'bg-teal-100 text-teal-700 font-semibold border-l-4 border-teal-500' : 'hover:bg-teal-50'}`}
                >
                  🌊 Flood Relief
                </Link>
              </li>
              <li>
                <Link 
                  to="/medical-aid"
                  className={`transition-all duration-200 ${isActive('/medical-aid') ? 'bg-green-100 text-green-700 font-semibold border-l-4 border-green-500' : 'hover:bg-green-50'}`}
                >
                  🏥 Medical Aid
                </Link>
              </li>
              <li>
                <Link 
                  to="/events"
                  className={`transition-all duration-200 ${isActive('/events') ? 'bg-yellow-100 text-yellow-700 font-semibold border-l-4 border-yellow-500' : 'hover:bg-yellow-50'}`}
                >
                  🎉 Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/auction"
                  className={`transition-all duration-200 ${isActive('/auction') ? 'bg-purple-100 text-purple-700 font-semibold border-l-4 border-purple-500' : 'hover:bg-purple-50'}`}
                >
                  🛒 Marketplace
                </Link>
              </li>
              <li>
                <Link 
                  to="/bulletin"
                  className={`transition-all duration-200 ${isActive('/bulletin') ? 'bg-orange-100 text-orange-700 font-semibold border-l-4 border-orange-500' : 'hover:bg-orange-50'}`}
                >
                  📢 Bulletin
                </Link>
              </li>
              <li>
                <Link 
                  to="/about"
                  className={`transition-all duration-200 ${isActive('/about') ? 'bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500' : 'hover:bg-gray-100'}`}
                >
                  ℹ️ About
                </Link>
              </li>
            </ul>
          </div>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li className="menu-title">
                  <span className="text-xs text-gray-500">Welcome, {user?.name}</span>
                </li>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge badge-sm">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/my-donations">My Donations</Link>
                </li>
                <li>
                  <Link to="/my-listings">My Listings</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to logout?')) {
                        logout();
                      }
                    }} 
                    className="text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth" className="btn btn-outline btn-primary btn-sm">
                Sign In
              </Link>
              <Link to="/auth" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold main-col">uniConnect</Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link to="/blood-donation" className="text-red-600 hover:bg-red-50">
                🩸 Blood Bank
              </Link>
            </li>
            <li>
              <Link to="/lost-found" className="hover:bg-blue-50">
                🔍 Lost & Found
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:bg-yellow-50">
                🎉 Events
              </Link>
            </li>
            <li>
              <Link to="/auction" className="hover:bg-purple-50">
                🛒 Marketplace
              </Link>
            </li>
            <li>
              <Link to="/bulletin" className="hover:bg-orange-50">
                📢 Bulletin
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-2">
          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/blood-donation">🩸 Blood Donation</Link></li>
              <li><Link to="/lost-found">🔍 Lost & Found</Link></li>
              <li><Link to="/flood-relief">🌊 Flood Relief</Link></li>
              <li><Link to="/medical-aid">🏥 Medical Aid</Link></li>
              <li><Link to="/events">🎉 Events</Link></li>
              <li><Link to="/auction">🛒 Marketplace</Link></li>
              <li><Link to="/bulletin">📢 Bulletin</Link></li>
            </ul>
          </div>

          {/* User Menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/my-donations">My Donations</Link></li>
              <li><Link to="/my-listings">My Listings</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

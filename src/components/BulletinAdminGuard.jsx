import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const BulletinAdminGuard = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access this page.
          </p>
          <Link to="/auth" className="btn btn-primary btn-lg">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role !== 'bulletin_admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center max-w-lg mx-auto p-8">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Bulletin Admin Only</h1>
          <p className="text-gray-600 mb-6">
            This is a restricted area. Only the designated Bulletin Administrator can access this dashboard.
          </p>
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-yellow-800 mb-2">🔑 Admin Access Credentials:</h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>Email:</strong> admin@bulletin.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
          <div className="space-y-3">
            <Link to="/auth" className="btn btn-primary btn-wide">
              Sign In as Admin
            </Link>
            <Link to="/" className="btn btn-outline btn-wide">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default BulletinAdminGuard;

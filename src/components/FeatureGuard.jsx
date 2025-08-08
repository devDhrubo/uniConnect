import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const FeatureGuard = ({ children, featureName, className = "" }) => {
  const { isAuthenticated } = useAuth();

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      document.getElementById('login-modal').showModal();
    }
  };

  return (
    <>
      <div className={`${className} ${!isAuthenticated ? 'relative' : ''}`} onClick={handleClick}>
        {children}
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-black/30">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg border border-gray-200">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Login Required</p>
              <p className="text-xs text-gray-600">Sign in to access {featureName}</p>
            </div>
          </div>
        )}
      </div>

      {/* Login Prompt Modal */}
      <dialog id="login-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="text-center py-4">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="font-bold text-xl mb-3">Authentication Required</h3>
            <p className="text-gray-600 mb-6">
              You need to sign in to access <span className="font-semibold text-primary">{featureName}</span> and other features.
            </p>
            
            <div className="space-y-3">
              <Link to="/auth" className="btn btn-primary btn-wide">
                Sign In / Sign Up
              </Link>
              <form method="dialog">
                <button className="btn btn-outline btn-wide">
                  Continue Browsing
                </button>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default FeatureGuard;

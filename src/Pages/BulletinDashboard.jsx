import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const BulletinDashboard = () => {
  const { user } = useAuth();
  const [bulletins, setBulletins] = useState([
    {
      id: 1,
      title: "Mid-Semester Examination Schedule - Spring 2024",
      content: "The mid-semester examinations for Spring 2024 will commence from March 15, 2024.",
      category: "academic",
      priority: "high",
      date: "2024-01-16",
      status: "published",
      views: 1250,
      pinned: true
    },
    {
      id: 2,
      title: "Emergency: Campus Water Supply Disruption",
      content: "Due to maintenance work, water supply will be temporarily disrupted.",
      category: "emergency",
      priority: "critical",
      date: "2024-01-16",
      status: "published",
      views: 2340,
      pinned: true
    },
    {
      id: 3,
      title: "Merit Scholarship Applications Now Open",
      content: "Applications for merit-based scholarships are now open.",
      category: "scholarships",
      priority: "medium",
      date: "2024-01-15",
      status: "draft",
      views: 890,
      pinned: false
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBulletin, setNewBulletin] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    pinned: false
  });

  const [stats, setStats] = useState({
    totalBulletins: bulletins.length,
    publishedBulletins: bulletins.filter(b => b.status === 'published').length,
    draftBulletins: bulletins.filter(b => b.status === 'draft').length,
    totalViews: bulletins.reduce((sum, b) => sum + b.views, 0),
    pinnedBulletins: bulletins.filter(b => b.pinned).length
  });

  const handleCreateBulletin = () => {
    if (!newBulletin.title.trim() || !newBulletin.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const bulletin = {
      id: Date.now(),
      ...newBulletin,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      views: 0,
      author: user.name
    };

    setBulletins([bulletin, ...bulletins]);
    setNewBulletin({
      title: '',
      content: '',
      category: 'general',
      priority: 'medium',
      pinned: false
    });
    setShowCreateForm(false);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalBulletins: prev.totalBulletins + 1,
      draftBulletins: prev.draftBulletins + 1
    }));
  };

  const handleDeleteBulletin = (id) => {
    if (confirm('Are you sure you want to delete this bulletin?')) {
      const bulletinToDelete = bulletins.find(b => b.id === id);
      setBulletins(bulletins.filter(b => b.id !== id));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalBulletins: prev.totalBulletins - 1,
        publishedBulletins: bulletinToDelete.status === 'published' ? prev.publishedBulletins - 1 : prev.publishedBulletins,
        draftBulletins: bulletinToDelete.status === 'draft' ? prev.draftBulletins - 1 : prev.draftBulletins,
        totalViews: prev.totalViews - bulletinToDelete.views,
        pinnedBulletins: bulletinToDelete.pinned ? prev.pinnedBulletins - 1 : prev.pinnedBulletins
      }));
    }
  };

  const handlePublishBulletin = (id) => {
    setBulletins(bulletins.map(b => 
      b.id === id ? { ...b, status: b.status === 'published' ? 'draft' : 'published' } : b
    ));
    
    const bulletin = bulletins.find(b => b.id === id);
    setStats(prev => ({
      ...prev,
      publishedBulletins: bulletin.status === 'draft' ? prev.publishedBulletins + 1 : prev.publishedBulletins - 1,
      draftBulletins: bulletin.status === 'draft' ? prev.draftBulletins - 1 : prev.draftBulletins + 1
    }));
  };

  const handleTogglePin = (id) => {
    setBulletins(bulletins.map(b => 
      b.id === id ? { ...b, pinned: !b.pinned } : b
    ));
    
    const bulletin = bulletins.find(b => b.id === id);
    setStats(prev => ({
      ...prev,
      pinnedBulletins: bulletin.pinned ? prev.pinnedBulletins - 1 : prev.pinnedBulletins + 1
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📢 Bulletin Dashboard</h1>
          <p className="text-gray-600">Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span></p>
          <div className="badge badge-primary badge-sm mt-2">Bulletin Administrator</div>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create Bulletin
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="stat bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="stat-figure text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div className="stat-title text-blue-700">Total Bulletins</div>
          <div className="stat-value text-blue-800">{stats.totalBulletins}</div>
        </div>

        <div className="stat bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="stat-figure text-green-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title text-green-700">Published</div>
          <div className="stat-value text-green-800">{stats.publishedBulletins}</div>
        </div>

        <div className="stat bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
          <div className="stat-figure text-yellow-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <div className="stat-title text-yellow-700">Drafts</div>
          <div className="stat-value text-yellow-800">{stats.draftBulletins}</div>
        </div>

        <div className="stat bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <div className="stat-figure text-purple-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
          <div className="stat-title text-purple-700">Total Views</div>
          <div className="stat-value text-purple-800">{stats.totalViews.toLocaleString()}</div>
        </div>

        <div className="stat bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
          <div className="stat-figure text-red-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
          </div>
          <div className="stat-title text-red-700">Pinned</div>
          <div className="stat-value text-red-800">{stats.pinnedBulletins}</div>
        </div>
      </div>

      {/* Create Bulletin Modal */}
      {showCreateForm && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-2xl">📝 Create New Bulletin</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="btn btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Title *</span>
                </label>
                <input
                  type="text"
                  value={newBulletin.title}
                  onChange={(e) => setNewBulletin({...newBulletin, title: e.target.value})}
                  placeholder="Enter bulletin title"
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Content *</span>
                </label>
                <textarea
                  value={newBulletin.content}
                  onChange={(e) => setNewBulletin({...newBulletin, content: e.target.value})}
                  placeholder="Enter bulletin content"
                  className="textarea textarea-bordered h-32 focus:textarea-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select
                    value={newBulletin.category}
                    onChange={(e) => setNewBulletin({...newBulletin, category: e.target.value})}
                    className="select select-bordered focus:select-primary"
                  >
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="administrative">Administrative</option>
                    <option value="events">Events</option>
                    <option value="emergency">Emergency</option>
                    <option value="scholarships">Scholarships</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Priority</span>
                  </label>
                  <select
                    value={newBulletin.priority}
                    onChange={(e) => setNewBulletin({...newBulletin, priority: e.target.value})}
                    className="select select-bordered focus:select-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold">Pin to top</span>
                  <input
                    type="checkbox"
                    checked={newBulletin.pinned}
                    onChange={(e) => setNewBulletin({...newBulletin, pinned: e.target.checked})}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowCreateForm(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBulletin}
                className="btn btn-primary"
              >
                Create Bulletin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulletins List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Manage Bulletins</h2>
        
        {bulletins.map((bulletin) => (
          <div key={bulletin.id} className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="card-title text-lg">{bulletin.title}</h3>
                    {bulletin.pinned && (
                      <div className="badge badge-error badge-sm">📌 Pinned</div>
                    )}
                    <div className={`badge badge-sm border ${getPriorityColor(bulletin.priority)}`}>
                      {bulletin.priority.toUpperCase()}
                    </div>
                    <div className={`badge badge-sm ${bulletin.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                      {bulletin.status.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{bulletin.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 {bulletin.date}</span>
                    <span>📊 {bulletin.views.toLocaleString()} views</span>
                    <span>🏷️ {bulletin.category}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTogglePin(bulletin.id)}
                    className={`btn btn-sm ${bulletin.pinned ? 'btn-error' : 'btn-outline'}`}
                    title={bulletin.pinned ? 'Unpin' : 'Pin'}
                  >
                    📌
                  </button>
                  <button
                    onClick={() => handlePublishBulletin(bulletin.id)}
                    className={`btn btn-sm ${bulletin.status === 'published' ? 'btn-warning' : 'btn-success'}`}
                  >
                    {bulletin.status === 'published' ? '📝 Draft' : '📢 Publish'}
                  </button>
                  <button
                    onClick={() => handleDeleteBulletin(bulletin.id)}
                    className="btn btn-sm btn-error"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {bulletins.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bulletins yet</h3>
            <p className="text-gray-500">Create your first bulletin to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulletinDashboard;

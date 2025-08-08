import { useState } from "react";

const Auction = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showCreateListing, setShowCreateListing] = useState(false);

  const categories = [
    "all", "books", "electronics", "furniture", "clothing", "sports", "stationery", "bikes", "other"
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: "Calculus Textbook - 8th Edition",
      description: "Stewart's Calculus textbook in excellent condition. Used for one semester only. All pages intact, minimal highlighting.",
      price: 2500,
      originalPrice: 4500,
      category: "books",
      condition: "excellent",
      seller: "Sarah Wilson",
      sellerRating: 4.8,
      location: "Dorm Block A",
      posted: "2 hours ago",
      views: 23,
      image: "📚",
      tags: ["mathematics", "calculus", "engineering"],
      negotiable: true,
      urgent: false
    },
    {
      id: 2,
      title: "iPhone 12 - 64GB Blue",
      description: "Selling my iPhone 12 in great condition. Battery health 89%. Includes original charger and protective case.",
      price: 45000,
      originalPrice: 65000,
      category: "electronics",
      condition: "good",
      seller: "Ahmed Hassan",
      sellerRating: 4.9,
      location: "Campus Center",
      posted: "1 day ago",
      views: 78,
      image: "📱",
      tags: ["iphone", "apple", "smartphone"],
      negotiable: true,
      urgent: false
    },
    {
      id: 3,
      title: "Study Desk with Chair",
      description: "Wooden study desk with matching chair. Perfect for dorm room. Some minor scratches but very sturdy.",
      price: 3500,
      originalPrice: 6000,
      category: "furniture",
      condition: "fair",
      seller: "Lisa Chen",
      sellerRating: 4.7,
      location: "Near Library",
      posted: "3 days ago",
      views: 45,
      image: "🪑",
      tags: ["furniture", "desk", "study"],
      negotiable: true,
      urgent: true
    },
    {
      id: 4,
      title: "Mountain Bike - 21 Speed",
      description: "Red mountain bike in good working condition. Recently serviced. Great for campus commuting and weekend rides.",
      price: 8500,
      originalPrice: 12000,
      category: "bikes",
      condition: "good",
      seller: "Mike Johnson",
      sellerRating: 4.6,
      location: "Sports Complex",
      posted: "5 days ago",
      views: 67,
      image: "🚲",
      tags: ["bike", "mountain", "transport"],
      negotiable: true,
      urgent: false
    },
    {
      id: 5,
      title: "Programming Books Bundle",
      description: "Complete set of programming books: Java, Python, Data Structures. All books in good condition.",
      price: 4200,
      originalPrice: 8000,
      category: "books",
      condition: "good",
      seller: "David Park",
      sellerRating: 4.8,
      location: "IT Building",
      posted: "1 week ago",
      views: 92,
      image: "💻",
      tags: ["programming", "java", "python", "computer science"],
      negotiable: false,
      urgent: true
    },
    {
      id: 6,
      title: "Gaming Laptop - ASUS ROG",
      description: "ASUS ROG gaming laptop with GTX 1660Ti, 16GB RAM, 512GB SSD. Perfect for gaming and development work.",
      price: 85000,
      originalPrice: 120000,
      category: "electronics",
      condition: "excellent",
      seller: "Anonymous",
      sellerRating: 4.9,
      location: "Engineering Block",
      posted: "2 weeks ago",
      views: 156,
      image: "💻",
      tags: ["gaming", "laptop", "asus", "high-performance"],
      negotiable: true,
      urgent: false
    }
  ];

  const myListings = [
    {
      id: 101,
      title: "Chemistry Lab Manual",
      price: 800,
      views: 12,
      interested: 3,
      status: "active",
      posted: "1 day ago"
    },
    {
      id: 102,
      title: "Bluetooth Headphones",
      price: 2200,
      views: 28,
      interested: 7,
      status: "sold",
      posted: "1 week ago"
    }
  ];

  const getFilteredItems = () => {
    let filtered = marketplaceItems;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    switch (sortBy) {
      case "price_low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price_high":
        return filtered.sort((a, b) => b.price - a.price);
      case "popular":
        return filtered.sort((a, b) => b.views - a.views);
      default:
        return filtered.sort((a, b) => new Date(b.posted) - new Date(a.posted));
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "excellent": return "badge-success";
      case "good": return "badge-info";
      case "fair": return "badge-warning";
      default: return "badge-ghost";
    }
  };

  const getSavings = (price, originalPrice) => {
    const savings = ((originalPrice - price) / originalPrice) * 100;
    return Math.round(savings);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="main-col">🛒 Campus Marketplace</span>
        </h1>
        <p className="text-lg text-gray-600">
          Buy and sell second-hand items within the university community
        </p>
      </div>

      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-figure text-blue-600">📦</div>
          <div className="stat-title">Active Listings</div>
          <div className="stat-value text-blue-600">{marketplaceItems.length}</div>
          <div className="stat-desc">Items for sale</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-green-600">💰</div>
          <div className="stat-title">Total Savings</div>
          <div className="stat-value text-green-600">
            ৳{marketplaceItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0).toLocaleString()}
          </div>
          <div className="stat-desc">From buying used</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-purple-600">👥</div>
          <div className="stat-title">Active Sellers</div>
          <div className="stat-value text-purple-600">89</div>
          <div className="stat-desc">This semester</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-yellow-600">⭐</div>
          <div className="stat-title">Avg Rating</div>
          <div className="stat-value text-yellow-600">4.8</div>
          <div className="stat-desc">Seller satisfaction</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs tabs-lifted mb-6">
        <button 
          className={`tab tab-lg ${activeTab === "browse" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("browse")}
        >
          🔍 Browse Items
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "my-listings" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("my-listings")}
        >
          📋 My Listings
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "wishlist" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("wishlist")}
        >
          💝 Wishlist
        </button>
      </div>

      {/* Browse Items Tab */}
      {activeTab === "browse" && (
        <>
          {/* Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`btn btn-sm ${
                    selectedCategory === category ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <select 
                className="select select-bordered select-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
              
              <button 
                className="btn btn-success btn-sm"
                onClick={() => setShowCreateListing(true)}
              >
                + Sell Item
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredItems().map((item) => (
              <div key={item.id} className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body p-4">
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <div className="badge badge-outline badge-sm">{item.category}</div>
                          <div className={`badge badge-sm ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.urgent && (
                      <div className="badge badge-error badge-sm">Urgent</div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-green-600">৳{item.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">৳{item.originalPrice.toLocaleString()}</span>
                    <div className="badge badge-success badge-sm">
                      {getSavings(item.price, item.originalPrice)}% off
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{item.description}</p>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <span>👤</span>
                      <span>{item.seller}</span>
                      <div className="rating rating-xs">
                        <input type="radio" className="mask mask-star-2 bg-orange-400" disabled checked />
                      </div>
                      <span>{item.sellerRating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📍</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="badge badge-ghost badge-xs">{tag}</span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>👁️ {item.views} views</span>
                    <span>📅 {item.posted}</span>
                    {item.negotiable && <span className="text-blue-600">💬 Negotiable</span>}
                  </div>

                  {/* Actions */}
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-sm">💝 Save</button>
                    <button className="btn btn-outline btn-sm">💬 Chat</button>
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* My Listings Tab */}
      {activeTab === "my-listings" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">My Listings</h3>
            <button 
              className="btn btn-success"
              onClick={() => setShowCreateListing(true)}
            >
              + Create New Listing
            </button>
          </div>

          <div className="space-y-4">
            {myListings.map((listing) => (
              <div key={listing.id} className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{listing.title}</h4>
                      <p className="text-2xl font-bold text-green-600 mt-2">৳{listing.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className={`badge ${listing.status === 'sold' ? 'badge-success' : 'badge-info'}`}>
                        {listing.status.toUpperCase()}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Posted {listing.posted}</p>
                    </div>
                  </div>

                  <div className="flex gap-6 text-sm text-gray-600 mt-4">
                    <div className="flex items-center gap-1">
                      <span>👁️</span>
                      <span>{listing.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span>{listing.interested} interested</span>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-outline btn-sm">Edit</button>
                    <button className="btn btn-outline btn-sm">View</button>
                    {listing.status === 'active' && (
                      <button className="btn btn-error btn-sm">Mark as Sold</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === "wishlist" && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h3>
          <p className="text-gray-600 mb-6">
            Save items you're interested in to your wishlist for easy access later.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab("browse")}
          >
            Browse Items
          </button>
        </div>
      )}

      {/* Create Listing Modal */}
      {showCreateListing && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Create New Listing</h3>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="e.g., iPhone 12, Calculus Textbook..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select className="select select-bordered" required>
                    <option value="">Select Category</option>
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Condition</span>
                  </label>
                  <select className="select select-bordered" required>
                    <option value="">Select Condition</option>
                    <option value="excellent">Excellent - Like New</option>
                    <option value="good">Good - Minor Wear</option>
                    <option value="fair">Fair - Visible Wear</option>
                    <option value="poor">Poor - Heavy Wear</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Describe your item in detail..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Selling Price (৳)</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="Enter price"
                    min="1"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Original Price (৳)</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="What did you pay?"
                    min="1"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pickup Location</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Where can buyers meet you?"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tags (comma separated)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="textbook, engineering, excellent condition..."
                />
              </div>

              <div className="flex gap-4">
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                  <span className="label-text ml-2">Price is negotiable</span>
                </label>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-warning" />
                  <span className="label-text ml-2">Urgent sale</span>
                </label>
              </div>

              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => setShowCreateListing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Create Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auction;

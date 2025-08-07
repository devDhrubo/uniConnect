import React, { useState } from "react";

const LostFound = () => {
  const [activeTab, setActiveTab] = useState("lost");
  const [formData, setFormData] = useState({
    type: "lost", // lost or found
    itemName: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contactEmail: "",
    contactPhone: "",
    reward: ""
  });

  const categories = [
    "Electronics", "Books", "Clothing", "Accessories", "Documents", 
    "Keys", "Sports Equipment", "Bags", "Jewelry", "Other"
  ];

  const lostItems = [
    {
      id: 1,
      itemName: "iPhone 13 Pro",
      category: "Electronics",
      description: "Blue iPhone 13 Pro with a clear case. Has a crack on the screen.",
      location: "Library - 2nd Floor",
      date: "2024-01-15",
      timeAgo: "2 hours ago",
      contact: "john.doe@university.edu",
      reward: "$50",
      image: "📱",
      status: "active"
    },
    {
      id: 2,
      itemName: "Calculus Textbook",
      category: "Books",
      description: "Calculus: Early Transcendentals by Stewart, 8th Edition. Name 'Sarah' written inside.",
      location: "Engineering Building",
      date: "2024-01-14",
      timeAgo: "1 day ago",
      contact: "sarah.wilson@university.edu",
      reward: "No reward",
      image: "📚",
      status: "active"
    },
    {
      id: 3,
      itemName: "Silver Watch",
      category: "Accessories",
      description: "Silver Casio digital watch with black strap. Sentimental value.",
      location: "Sports Complex",
      date: "2024-01-13",
      timeAgo: "2 days ago",
      contact: "mike.johnson@university.edu",
      reward: "$30",
      image: "⌚",
      status: "found"
    }
  ];

  const foundItems = [
    {
      id: 1,
      itemName: "Red Backpack",
      category: "Bags",
      description: "Red JanSport backpack with university keychain. Contains notebooks and pens.",
      location: "Student Center",
      date: "2024-01-15",
      timeAgo: "3 hours ago",
      contact: "admin@university.edu",
      image: "🎒",
      status: "unclaimed"
    },
    {
      id: 2,
      itemName: "Car Keys",
      category: "Keys",
      description: "Toyota car keys with blue keychain. House keys attached.",
      location: "Parking Lot B",
      date: "2024-01-14",
      timeAgo: "1 day ago",
      contact: "security@university.edu",
      image: "🗝️",
      status: "unclaimed"
    },
    {
      id: 3,
      itemName: "Prescription Glasses",
      category: "Accessories",
      description: "Black-framed prescription glasses in a blue case.",
      location: "Chemistry Lab",
      date: "2024-01-12",
      timeAgo: "3 days ago",
      contact: "lab.assistant@university.edu",
      image: "👓",
      status: "claimed"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(`${formData.type === 'lost' ? 'Lost item' : 'Found item'} report submitted successfully!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "found": return "badge-success";
      case "claimed": return "badge-info";
      case "active": return "badge-warning";
      default: return "badge-ghost";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="main-col">🔍 Lost & Found</span>
        </h1>
        <p className="text-lg text-gray-600">
          Help reunite lost items with their owners in our campus community
        </p>
      </div>

      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-figure text-blue-600">🔍</div>
          <div className="stat-title">Items Lost</div>
          <div className="stat-value text-blue-600">47</div>
          <div className="stat-desc">This month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-green-600">✅</div>
          <div className="stat-title">Items Found</div>
          <div className="stat-value text-green-600">52</div>
          <div className="stat-desc">This month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-purple-600">🤝</div>
          <div className="stat-title">Reunited</div>
          <div className="stat-value text-purple-600">41</div>
          <div className="stat-desc">Success stories</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-yellow-600">⏰</div>
          <div className="stat-title">Avg. Recovery</div>
          <div className="stat-value text-yellow-600">2.3</div>
          <div className="stat-desc">Days</div>
        </div>
      </div>

      {/* Report Form */}
      <div className="card bg-white shadow-lg mb-8">
        <div className="card-body">
          <h3 className="card-title text-blue-600 mb-4">Report Lost or Found Item</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="lost"
                  checked={formData.type === "lost"}
                  onChange={handleInputChange}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">I Lost Something</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="found"
                  checked={formData.type === "found"}
                  onChange={handleInputChange}
                  className="radio radio-success"
                />
                <span className="label-text ml-2">I Found Something</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="e.g., iPhone, Textbook, Keys..."
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered"
                placeholder="Detailed description including color, brand, distinctive features..."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Where was it lost/found?"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Email</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="your.email@university.edu"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Phone</span>
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {formData.type === "lost" && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reward (Optional)</span>
                </label>
                <input
                  type="text"
                  name="reward"
                  value={formData.reward}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="$20, Free coffee, etc."
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              Submit Report
            </button>
          </form>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs tabs-lifted mb-6">
        <button 
          className={`tab tab-lg ${activeTab === "lost" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("lost")}
        >
          🔍 Lost Items ({lostItems.length})
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "found" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("found")}
        >
          ✨ Found Items ({foundItems.length})
        </button>
      </div>

      {/* Items List */}
      {activeTab === "lost" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Lost Items</h3>
            <div className="join">
              <input className="input input-bordered join-item" placeholder="Search items..." />
              <button className="btn join-item">Search</button>
            </div>
          </div>

          {lostItems.map((item) => (
            <div key={item.id} className="card bg-white shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold">{item.itemName}</h4>
                        <div className="badge badge-outline mb-2">{item.category}</div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>📍 {item.location}</span>
                          <span>📅 {item.date}</span>
                          <span>⏰ {item.timeAgo}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`badge ${getStatusColor(item.status)} mb-2`}>
                          {item.status.toUpperCase()}
                        </div>
                        {item.reward && item.reward !== "No reward" && (
                          <div className="text-green-600 font-bold">{item.reward}</div>
                        )}
                      </div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-outline btn-sm">Share</button>
                      <button className="btn btn-primary btn-sm">I Found This</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "found" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Found Items</h3>
            <div className="join">
              <input className="input input-bordered join-item" placeholder="Search items..." />
              <button className="btn join-item">Search</button>
            </div>
          </div>

          {foundItems.map((item) => (
            <div key={item.id} className="card bg-white shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold">{item.itemName}</h4>
                        <div className="badge badge-outline badge-success mb-2">{item.category}</div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>📍 Found at: {item.location}</span>
                          <span>📅 {item.date}</span>
                          <span>⏰ {item.timeAgo}</span>
                        </div>
                        <p className="text-sm text-blue-600 mt-2">
                          Contact: {item.contact}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`badge ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-outline btn-sm">Share</button>
                      {item.status === "unclaimed" && (
                        <button className="btn btn-success btn-sm">This is Mine</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Tips for Success</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-blue-50 shadow">
            <div className="card-body text-center">
              <div className="text-3xl mb-2">📝</div>
              <h4 className="font-bold">Be Detailed</h4>
              <p className="text-sm">Include specific details, colors, brands, and distinctive features</p>
            </div>
          </div>
          <div className="card bg-green-50 shadow">
            <div className="card-body text-center">
              <div className="text-3xl mb-2">⏰</div>
              <h4 className="font-bold">Report Quickly</h4>
              <p className="text-sm">Report lost or found items as soon as possible for better chances</p>
            </div>
          </div>
          <div className="card bg-yellow-50 shadow">
            <div className="card-body text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-bold">Check Regularly</h4>
              <p className="text-sm">Check the listings frequently as new items are added daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostFound;

import { useState } from "react";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const eventCategories = [
    "all", "academic", "cultural", "sports", "workshop", "seminar", "competition", "social", "volunteer"
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Tech Fest 2024",
      description: "Join us for the biggest technology festival of the year featuring programming contests, robotics competitions, and tech exhibitions.",
      date: "2024-02-15",
      time: "09:00 AM",
      endDate: "2024-02-17",
      endTime: "06:00 PM",
      location: "University Auditorium",
      category: "academic",
      organizer: "Computer Science Department",
      attendees: 450,
      maxAttendees: 500,
      price: "Free",
      image: "💻",
      tags: ["technology", "programming", "robotics"],
      status: "open"
    },
    {
      id: 2,
      title: "Cultural Night - Spring Edition",
      description: "An evening of music, dance, and cultural performances by talented students from various departments.",
      date: "2024-02-20",
      time: "06:00 PM",
      endDate: "2024-02-20",
      endTime: "10:00 PM",
      location: "Open Air Theatre",
      category: "cultural",
      organizer: "Cultural Committee",
      attendees: 287,
      maxAttendees: 300,
      price: "৳50",
      image: "🎭",
      tags: ["music", "dance", "performance"],
      status: "filling_fast"
    },
    {
      id: 3,
      title: "Career Fair 2024",
      description: "Meet with top employers, attend career workshops, and explore job opportunities in various fields.",
      date: "2024-02-25",
      time: "10:00 AM",
      endDate: "2024-02-25",
      endTime: "05:00 PM",
      location: "Main Campus Ground",
      category: "academic",
      organizer: "Career Services",
      attendees: 156,
      maxAttendees: 1000,
      price: "Free",
      image: "💼",
      tags: ["career", "jobs", "networking"],
      status: "open"
    },
    {
      id: 4,
      title: "Inter-University Football Tournament",
      description: "Watch our university team compete against other universities in this exciting football championship.",
      date: "2024-03-01",
      time: "02:00 PM",
      endDate: "2024-03-03",
      endTime: "06:00 PM",
      location: "University Sports Complex",
      category: "sports",
      organizer: "Sports Committee",
      attendees: 89,
      maxAttendees: 200,
      price: "৳30",
      image: "⚽",
      tags: ["football", "sports", "tournament"],
      status: "open"
    },
    {
      id: 5,
      title: "AI & Machine Learning Workshop",
      description: "Hands-on workshop covering fundamentals of AI and ML with practical projects and expert guidance.",
      date: "2024-03-05",
      time: "09:00 AM",
      endDate: "2024-03-05",
      endTime: "05:00 PM",
      location: "Computer Lab 3",
      category: "workshop",
      organizer: "IEEE Student Branch",
      attendees: 45,
      maxAttendees: 50,
      price: "৳200",
      image: "🤖",
      tags: ["AI", "machine learning", "workshop"],
      status: "filling_fast"
    }
  ];

  const pastEvents = [
    {
      id: 6,
      title: "Blood Donation Drive",
      description: "Successful blood donation camp that collected 150+ units of blood.",
      date: "2024-01-10",
      attendees: 175,
      category: "volunteer",
      image: "🩸",
      status: "completed"
    },
    {
      id: 7,
      title: "Winter Programming Contest",
      description: "Competitive programming contest with participants from 15 universities.",
      date: "2024-01-05",
      attendees: 89,
      category: "competition",
      image: "🏆",
      status: "completed"
    }
  ];

  const getFilteredEvents = (events) => {
    if (selectedCategory === "all") return events;
    return events.filter(event => event.category === selectedCategory);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "filling_fast": return "badge-warning";
      case "sold_out": return "badge-error";
      case "completed": return "badge-success";
      default: return "badge-info";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "filling_fast": return "Filling Fast";
      case "sold_out": return "Sold Out";
      case "completed": return "Completed";
      default: return "Open";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilEvent = (dateStr) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Past event";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="attention-grabbing">🎉 Campus Events</span>
        </h1>
        <p className="text-lg text-gray-600">
          Discover exciting events, workshops, and activities happening around campus
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-figure text-blue-600">📅</div>
          <div className="stat-title">This Month</div>
          <div className="stat-value text-blue-600">{upcomingEvents.length}</div>
          <div className="stat-desc">Upcoming events</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-green-600">👥</div>
          <div className="stat-title">Total Attendees</div>
          <div className="stat-value text-green-600">
            {upcomingEvents.reduce((sum, event) => sum + event.attendees, 0)}
          </div>
          <div className="stat-desc">Registered participants</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-purple-600">🎯</div>
          <div className="stat-title">Categories</div>
          <div className="stat-value text-purple-600">{eventCategories.length - 1}</div>
          <div className="stat-desc">Event types</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-yellow-600">🏆</div>
          <div className="stat-title">This Year</div>
          <div className="stat-value text-yellow-600">45</div>
          <div className="stat-desc">Events organized</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {eventCategories.map((category) => (
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

        <button 
          className="btn btn-success"
          onClick={() => setShowCreateEvent(true)}
        >
          + Create Event
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="tabs tabs-lifted mb-6">
        <button 
          className={`tab tab-lg ${activeTab === "upcoming" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          📅 Upcoming ({upcomingEvents.length})
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "past" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          📚 Past Events ({pastEvents.length})
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "calendar" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("calendar")}
        >
          📆 Calendar View
        </button>
      </div>

      {/* Upcoming Events */}
      {activeTab === "upcoming" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {getFilteredEvents(upcomingEvents).map((event) => (
            <div key={event.id} className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{event.image}</div>
                    <div>
                      <h3 className="card-title text-lg">{event.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <div className="badge badge-outline">{event.category}</div>
                        <div className={`badge ${getStatusColor(event.status)}`}>
                          {getStatusText(event.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">
                      {getDaysUntilEvent(event.date)}
                    </div>
                    <div className="text-xs text-gray-500">to go</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{formatDate(event.date)} at {event.time}</span>
                    {event.endDate !== event.date && (
                      <span>to {formatDate(event.endDate)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👨‍🏫</span>
                    <span>{event.organizer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="font-semibold text-green-600">{event.price}</span>
                  </div>
                </div>

                {/* Attendees Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{event.attendees} registered</span>
                    <span>{event.maxAttendees} max capacity</span>
                  </div>
                  <progress 
                    className="progress progress-primary w-full" 
                    value={event.attendees} 
                    max={event.maxAttendees}
                  ></progress>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="badge badge-ghost badge-sm">{tag}</span>
                  ))}
                </div>

                <div className="card-actions justify-end">
                  <button className="btn btn-outline btn-sm">Share</button>
                  <button className="btn btn-outline btn-sm">Details</button>
                  {event.status !== "sold_out" && (
                    <button className="btn btn-primary btn-sm">Register</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past Events */}
      {activeTab === "past" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredEvents(pastEvents).map((event) => (
            <div key={event.id} className="card bg-gray-50 shadow-lg">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{event.image}</div>
                  <div>
                    <h4 className="font-bold">{event.title}</h4>
                    <div className="badge badge-success">Completed</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>📅 {formatDate(event.date)}</span>
                  <span>👥 {event.attendees} attended</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-sm">View Photos</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {activeTab === "calendar" && (
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4">Event Calendar</h3>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold p-2 bg-gray-100 rounded">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid - Simplified */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6; // Adjust for month start
                const isToday = day === new Date().getDate();
                const hasEvent = upcomingEvents.some(event => 
                  new Date(event.date).getDate() === day
                );
                
                return (
                  <div 
                    key={i} 
                    className={`p-3 min-h-[60px] border rounded ${
                      day > 0 && day <= 31 ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-100'
                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    {day > 0 && day <= 31 && (
                      <>
                        <div className="font-semibold">{day}</div>
                        {hasEvent && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Create New Event</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Event Title</span>
                  </label>
                  <input type="text" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select className="select select-bordered" required>
                    <option value="">Select Category</option>
                    {eventCategories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea className="textarea textarea-bordered" rows="3" required></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Date</span>
                  </label>
                  <input type="date" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Time</span>
                  </label>
                  <input type="time" className="input input-bordered" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">End Date</span>
                  </label>
                  <input type="date" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">End Time</span>
                  </label>
                  <input type="time" className="input input-bordered" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input type="text" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Max Attendees</span>
                  </label>
                  <input type="number" className="input input-bordered" min="1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price (৳)</span>
                  </label>
                  <input type="number" className="input input-bordered" min="0" placeholder="0 for free events" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Organizer</span>
                  </label>
                  <input type="text" className="input input-bordered" required />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tags (comma separated)</span>
                </label>
                <input type="text" className="input input-bordered" placeholder="technology, workshop, beginner" />
              </div>

              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => setShowCreateEvent(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Bulletin = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const bulletinCategories = [
    "all", "academic", "administrative", "events", "deadlines", "scholarships", "jobs", "announcements", "emergency"
  ];

  const bulletinNotices = [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule - Spring 2024",
      content: "The mid-semester examinations for Spring 2024 will commence from March 15, 2024. Students are advised to check their respective department websites for detailed schedules.",
      category: "academic",
      priority: "high",
      author: "Academic Office",
      department: "Academic Affairs",
      date: "2024-01-16",
      time: "10:30 AM",
      validUntil: "2024-03-20",
      tags: ["examination", "mid-semester", "spring2024"],
      attachments: ["exam_schedule.pdf", "guidelines.pdf"],
      views: 1250,
      pinned: true
    },
    {
      id: 2,
      title: "Emergency: Campus Water Supply Disruption",
      content: "Due to maintenance work, water supply will be temporarily disrupted in Blocks A, B, and C from 2:00 PM to 6:00 PM today. Alternative arrangements have been made at the main cafeteria.",
      category: "emergency",
      priority: "critical",
      author: "Maintenance Department",
      department: "Facilities Management",
      date: "2024-01-16",
      time: "08:00 AM",
      validUntil: "2024-01-16",
      tags: ["emergency", "water supply", "maintenance"],
      attachments: [],
      views: 2340,
      pinned: true
    },
    {
      id: 3,
      title: "Merit Scholarship Applications Now Open",
      content: "Applications for merit-based scholarships for the academic year 2024-25 are now open. Eligible students can apply through the student portal by February 28, 2024.",
      category: "scholarships",
      priority: "medium",
      author: "Financial Aid Office",
      department: "Student Services",
      date: "2024-01-15",
      time: "02:15 PM",
      validUntil: "2024-02-28",
      tags: ["scholarship", "financial aid", "application"],
      attachments: ["scholarship_guide.pdf"],
      views: 890,
      pinned: false
    },
    {
      id: 4,
      title: "Tech Fest 2024: Call for Volunteers",
      content: "We are looking for enthusiastic students to volunteer for the upcoming Tech Fest 2024. Volunteers will receive certificates and special perks. Register through the events portal.",
      category: "events",
      priority: "medium",
      author: "Student Activities Committee",
      department: "Student Affairs",
      date: "2024-01-15",
      time: "11:45 AM",
      validUntil: "2024-02-10",
      tags: ["tech fest", "volunteers", "events"],
      attachments: [],
      views: 567,
      pinned: false
    },
    {
      id: 5,
      title: "Library Extended Hours During Exam Period",
      content: "The central library will remain open 24/7 from March 10-25, 2024 to support students during the examination period. Additional study spaces have been arranged in the ground floor.",
      category: "academic",
      priority: "medium",
      author: "Library Administration",
      department: "Library Services",
      date: "2024-01-14",
      time: "04:30 PM",
      validUntil: "2024-03-25",
      tags: ["library", "extended hours", "exam period"],
      attachments: [],
      views: 721,
      pinned: false
    },
    {
      id: 6,
      title: "Career Fair 2024 - Company Registration Open",
      content: "Companies interested in participating in our annual Career Fair 2024 can now register. The event will feature job opportunities, internships, and networking sessions.",
      category: "jobs",
      priority: "medium",
      author: "Career Services",
      department: "Career Development",
      date: "2024-01-14",
      time: "09:20 AM",
      validUntil: "2024-02-20",
      tags: ["career fair", "jobs", "internships"],
      attachments: ["company_registration_form.pdf"],
      views: 445,
      pinned: false
    },
    {
      id: 7,
      title: "Updated COVID-19 Health Guidelines",
      content: "Following recent health department recommendations, updated COVID-19 guidelines are now in effect. Masks are recommended in crowded indoor spaces.",
      category: "administrative",
      priority: "low",
      author: "Health Center",
      department: "Student Health Services",
      date: "2024-01-13",
      time: "03:10 PM",
      validUntil: "2024-06-30",
      tags: ["covid-19", "health guidelines", "safety"],
      attachments: ["health_guidelines.pdf"],
      views: 623,
      pinned: false
    },
    {
      id: 8,
      title: "Semester Registration Deadline Reminder",
      content: "Reminder: The last date for course registration for Spring 2024 semester is January 25, 2024. Late registrations will incur additional fees.",
      category: "deadlines",
      priority: "high",
      author: "Registrar Office",
      department: "Academic Records",
      date: "2024-01-12",
      time: "01:45 PM",
      validUntil: "2024-01-25",
      tags: ["registration", "deadline", "spring 2024"],
      attachments: [],
      views: 1100,
      pinned: false
    }
  ];

  const getFilteredNotices = () => {
    let filtered = bulletinNotices;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(notice => notice.category === selectedCategory);
    }

    switch (activeTab) {
      case "pinned":
        return filtered.filter(notice => notice.pinned);
      case "recent":
        return filtered.filter(notice => {
          const noticeDate = new Date(notice.date);
          const threeDaysAgo = new Date();
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
          return noticeDate >= threeDaysAgo;
        });
      case "urgent":
        return filtered.filter(notice => notice.priority === "critical" || notice.priority === "high");
      default:
        return filtered.sort((a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical": return "badge-error";
      case "high": return "badge-warning";
      case "medium": return "badge-info";
      default: return "badge-ghost";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "critical": return "🚨";
      case "high": return "⚠️";
      case "medium": return "ℹ️";
      default: return "📌";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: "bg-blue-50 border-blue-200",
      administrative: "bg-gray-50 border-gray-200",
      events: "bg-purple-50 border-purple-200",
      deadlines: "bg-red-50 border-red-200",
      scholarships: "bg-green-50 border-green-200",
      jobs: "bg-yellow-50 border-yellow-200",
      announcements: "bg-indigo-50 border-indigo-200",
      emergency: "bg-red-100 border-red-300"
    };
    return colors[category] || "bg-white border-gray-200";
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

  const isExpiringSoon = (validUntil) => {
    const expiryDate = new Date(validUntil);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isExpired = (validUntil) => {
    const expiryDate = new Date(validUntil);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1"></div>
          <h1 className="text-4xl font-bold flex-1">
            <span className="attention-grabbing">📢 University Bulletin Board</span>
          </h1>
          <div className="flex-1 flex justify-end">
            {isAuthenticated && user?.role === 'bulletin_admin' && (
              <Link 
                to="/bulletin-dashboard" 
                className="btn btn-primary btn-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
        <p className="text-lg text-gray-600">
          Stay updated with official announcements, notices, and important information
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-figure text-blue-600">📋</div>
          <div className="stat-title">Active Notices</div>
          <div className="stat-value text-blue-600">
            {bulletinNotices.filter(notice => !isExpired(notice.validUntil)).length}
          </div>
          <div className="stat-desc">Currently valid</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-red-600">🚨</div>
          <div className="stat-title">Urgent</div>
          <div className="stat-value text-red-600">
            {bulletinNotices.filter(notice => notice.priority === "critical" || notice.priority === "high").length}
          </div>
          <div className="stat-desc">High priority</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-green-600">📌</div>
          <div className="stat-title">Pinned</div>
          <div className="stat-value text-green-600">
            {bulletinNotices.filter(notice => notice.pinned).length}
          </div>
          <div className="stat-desc">Important notices</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-purple-600">👁️</div>
          <div className="stat-title">Total Views</div>
          <div className="stat-value text-purple-600">
            {bulletinNotices.reduce((sum, notice) => sum + notice.views, 0).toLocaleString()}
          </div>
          <div className="stat-desc">This month</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {bulletinCategories.map((category) => (
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

      {/* Tab Navigation */}
      <div className="tabs tabs-lifted mb-6">
        <button 
          className={`tab tab-lg ${activeTab === "all" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          📋 All Notices
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "pinned" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("pinned")}
        >
          📌 Pinned
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "urgent" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("urgent")}
        >
          🚨 Urgent
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "recent" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("recent")}
        >
          🆕 Recent
        </button>
      </div>

      {/* Notices List */}
      <div className="space-y-6">
        {getFilteredNotices().map((notice) => (
          <div 
            key={notice.id} 
            className={`card shadow-lg border-2 ${getCategoryColor(notice.category)} 
              ${notice.pinned ? 'ring-2 ring-blue-300' : ''} 
              ${isExpired(notice.validUntil) ? 'opacity-60' : ''}`}
          >
            <div className="card-body">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getPriorityIcon(notice.priority)}</span>
                    <h3 className="card-title text-lg">{notice.title}</h3>
                    {notice.pinned && <div className="badge badge-success">Pinned</div>}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="badge badge-outline">{notice.category}</div>
                    <div className={`badge ${getPriorityColor(notice.priority)}`}>
                      {notice.priority.toUpperCase()}
                    </div>
                    {isExpiringSoon(notice.validUntil) && (
                      <div className="badge badge-warning">Expiring Soon</div>
                    )}
                    {isExpired(notice.validUntil) && (
                      <div className="badge badge-ghost">Expired</div>
                    )}
                  </div>
                </div>

                <div className="text-right text-sm text-gray-500">
                  <p>👁️ {notice.views} views</p>
                  <p>📅 {formatDate(notice.date)}</p>
                  <p>⏰ {notice.time}</p>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{notice.content}</p>
              </div>

              {/* Meta Information */}
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  <p><span className="font-semibold">Author:</span> {notice.author}</p>
                  <p><span className="font-semibold">Department:</span> {notice.department}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Valid Until:</span> {formatDate(notice.validUntil)}</p>
                  {notice.attachments.length > 0 && (
                    <p><span className="font-semibold">Attachments:</span> {notice.attachments.length} file(s)</p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {notice.tags.map((tag, index) => (
                  <span key={index} className="badge badge-ghost badge-sm">#{tag}</span>
                ))}
              </div>

              {/* Attachments */}
              {notice.attachments.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-semibold mb-2">📎 Attachments:</h5>
                  <div className="flex flex-wrap gap-2">
                    {notice.attachments.map((attachment, index) => (
                      <button key={index} className="btn btn-outline btn-sm">
                        📄 {attachment}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="card-actions justify-end">
                <button className="btn btn-outline btn-sm">🔗 Share</button>
                <button className="btn btn-outline btn-sm">💾 Save</button>
                <button className="btn btn-primary btn-sm">📖 Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {getFilteredNotices().length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold mb-4">No Notices Found</h3>
          <p className="text-gray-600 mb-6">
            No notices match your current filter criteria. Try adjusting your filters or check back later.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setActiveTab("all");
              setSelectedCategory("all");
            }}
          >
            Show All Notices
          </button>
        </div>
      )}

      {/* Quick Actions Sidebar */}
      <div className="fixed right-4 bottom-4 space-y-2">
        <div className="tooltip tooltip-left" data-tip="Subscribe to notifications">
          <button className="btn btn-circle btn-primary">🔔</button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Submit feedback">
          <button className="btn btn-circle btn-secondary">💬</button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Back to top">
          <button 
            className="btn btn-circle btn-ghost"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ⬆️
          </button>
        </div>
      </div>

      {/* Footer Information */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold mb-2">📞 Contact Information</h4>
            <p>Academic Office: +880-1234-567890</p>
            <p>Student Services: +880-1234-567891</p>
            <p>Emergency Line: +880-1234-567892</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📧 Email Contacts</h4>
            <p>General Inquiries: info@university.edu</p>
            <p>Academic Matters: academic@university.edu</p>
            <p>Student Affairs: students@university.edu</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🔔 Notification Settings</h4>
            <p>Get notified about important updates</p>
            <button className="btn btn-outline btn-sm mt-2">Manage Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bulletin;

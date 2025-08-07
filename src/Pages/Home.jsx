import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "Blood Donation",
      description: "Connect blood donors with those in need. Join our community to save lives.",
      icon: "🩸",
      color: "blood-highlight",
      link: "/blood-donation",
      bgColor: "bg-red-50 hover:bg-red-100"
    },
    {
      title: "Lost & Found",
      description: "Lost something on campus? Found something? Help reconnect items with their owners.",
      icon: "🔍",
      color: "main-col",
      link: "/lost-found",
      bgColor: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "Flood Relief",
      description: "Contribute to flood relief efforts. Every donation counts in times of crisis.",
      icon: "🌊",
      color: "donation-highlight",
      link: "/flood-relief",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Medical Aid",
      description: "Support students facing serious illnesses. Community care for health emergencies.",
      icon: "🏥",
      color: "donation-highlight",
      link: "/medical-aid",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Campus Events",
      description: "Discover upcoming events, workshops, and activities happening around campus.",
      icon: "🎉",
      color: "attention-grabbing",
      link: "/events",
      bgColor: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      title: "Item Auction",
      description: "Buy or sell second-hand items like books, electronics, and more.",
      icon: "🛒",
      color: "main-col",
      link: "/auction",
      bgColor: "bg-purple-50 hover:bg-purple-100"
    },
    {
      title: "Bulletin Board",
      description: "Stay updated with official announcements, notices, and important information.",
      icon: "📢",
      color: "attention-grabbing",
      link: "/bulletin",
      bgColor: "bg-orange-50 hover:bg-orange-100"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-12">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold main-col mb-4">uniConnect</h1>
            <p className="text-lg text-gray-600 mb-6">
              A unified platform connecting students for causes, events, and exchanges
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/blood-donation" className="btn btn-primary bg-red-600 border-red-600 hover:bg-red-700">
                🩸 Donate Blood
              </Link>
              <Link to="/events" className="btn btn-outline">
                🎉 View Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 main-col">Explore Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="block">
              <div className={`card ${feature.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                <div className="card-body">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className={`card-title text-lg font-bold ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button className={`btn btn-sm btn-outline border-current hover:bg-current hover:text-white`}>
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-white">
        <div className="stat">
          <div className="stat-figure text-red-600">
            <svg className="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div className="stat-title">Blood Donors</div>
          <div className="stat-value text-red-600">150+</div>
          <div className="stat-desc">Lives saved this semester</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-green-600">
            <svg className="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div className="stat-title">Items Returned</div>
          <div className="stat-value text-green-600">89%</div>
          <div className="stat-desc">Success rate</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-600">
            <svg className="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title">Active Events</div>
          <div className="stat-value text-blue-600">25</div>
          <div className="stat-desc">This month</div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import FeatureGuard from "../components/FeatureGuard";

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
    <div className="container mx-auto px-4 py-4 font-inter">
      {/* Enhanced Hero Section */}
      <div className="hero min-h-[70vh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-xl mb-12 relative overflow-hidden p-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 bg-indigo-400 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 right-10 w-12 h-12 bg-pink-400 rounded-full blur-md animate-bounce delay-500"></div>
        </div>
        
        <div className="hero-content text-center relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-block mb-6 animate-fadeIn">
              <div className="badge badge-lg bg-white/20 backdrop-blur-sm text-blue-800 border-blue-200 p-3">
                🎓 University Community Platform
              </div>
            </div>
            
            {/* Main Title with Animation */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slideUp">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                uni
              </span>
              <span className="text-gray-800">Connect</span>
            </h1>
            
            {/* Subtitle with Typing Effect Style */}
            <div className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-300">
              <p className="mb-2">Connecting university communities through</p>
              <div className="flex flex-wrap justify-center gap-2 text-lg">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">🩸 Blood Donation</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">🔍 Lost & Found</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">🌊 Relief Aid</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">🎉 Events</span>
              </div>
            </div>

            {/* Interactive Stats Preview */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeIn delay-500">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-red-600">450+</div>
                <div className="text-sm text-gray-600">Lives Saved</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-green-600">৳6L+</div>
                <div className="text-sm text-gray-600">Funds Raised</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-blue-600">2,500+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn delay-700">
              <Link 
                to="/blood-donation" 
                className="btn btn-lg bg-gradient-to-r from-red-500 to-red-600 border-none text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">🩸</span>
                  Save Lives Today
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </Link>
              
              <Link 
                to="/events" 
                className="btn btn-lg btn-outline border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <span>🎉</span>
                  Explore Events
                </span>
              </Link>
              
              <Link 
                to="/about" 
                className="btn btn-lg bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <span>ℹ️</span>
                  Learn More
                </span>
              </Link>
            </div>

            {/* Emergency Banner */}
            <div className="mt-8 animate-fadeIn delay-1000">
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-orange-800">
                  <span className="animate-pulse">🚨</span>
                  <span className="font-semibold">Emergency?</span>
                  <span>Call 999 or contact university security immediately</span>
                  <span className="animate-pulse">🚨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 main-col animate-fadeIn">Explore Our Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeIn delay-300">
            Discover powerful tools designed to strengthen your university community and create lasting impact
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureGuard 
              key={index}
              featureName={feature.title}
              className="block group animate-fadeIn"
            >
              <div style={{animationDelay: `${index * 0.1}s`}}>
                <Link to={feature.link} className="block h-full">
                  <div className={`card ${feature.bgColor} shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 border-2 border-transparent hover:border-white/50 relative overflow-hidden`}>
                {/* Animated Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Icon Background */}
                <div className="absolute -top-4 -right-4 text-6xl opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500">
                  {feature.icon}
                </div>
                
                <div className="card-body relative z-10 p-8">
                  {/* Animated Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 animate-float" style={{animationDelay: `${index * 0.2}s`}}>
                    {feature.icon}
                  </div>
                  
                  {/* Title with Gradient Effect */}
                  <h3 className={`card-title text-xl font-bold mb-3 ${feature.color} group-hover:text-gray-800 transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Enhanced Action Button */}
                  <div className="card-actions justify-end mt-auto">
                    <div className="btn btn-sm bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent hover:shadow-lg transform hover:scale-105 transition-all duration-300 group">
                      <span className="flex items-center gap-2">
                        Explore
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  {/* Feature Stats/Badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="badge badge-sm bg-white/90 text-gray-700 border-none font-semibold">
                      {index === 0 && "245 Donors"}
                      {index === 1 && "89% Success"}
                      {index === 2 && "৳4.2L Raised"}
                      {index === 3 && "23 Cases"}
                      {index === 4 && "32 Events"}
                      {index === 5 && "156 Items"}
                      {index === 6 && "47 Notices"}
                    </div>
                  </div>
                </div>
                
                {/* Ripple Effect on Hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </div>
              </div>
                </Link>
              </div>
            </FeatureGuard>
          ))}
        </div>
        
      </div>

      {/* Enhanced Platform Statistics Dashboard */}
      <div className="mb-12 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-0 w-28 h-28 bg-green-400 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="inline-block mb-4">
            <div className="badge badge-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none p-4 animate-fadeIn">
              📊 Real-time Analytics
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-slideUp">
            Platform Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn delay-300">
            See the real-time impact of our community initiatives
          </p>
        </div>
        
        {/* Enhanced Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Blood Donation Stats */}
          <div className="stats-card bg-gradient-to-br from-red-50 via-red-100 to-red-200 rounded-xl p-6 shadow-lg border border-red-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.1s'}}>
            {/* Stable Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="stats-icon text-red-600 text-3xl">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="badge badge-sm bg-red-200 text-red-800 border-none">+15 today</div>
              </div>
              
              <div className="text-sm font-semibold text-red-800 mb-2">Blood Bank</div>
              <div className="text-3xl font-bold text-red-600 mb-1 number-pulse">245</div>
              <div className="text-xs text-red-700 mb-4">Active Donors</div>
              
              <div className="w-full bg-red-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full animate-progressFill shadow-lg" style={{'--progress-width': '78%', width: '78%'}}></div>
              </div>
              <div className="text-xs text-red-600 mt-1 font-medium">78% capacity</div>
            </div>
            
            {/* Stable Floating Icons */}
            <div className="absolute -top-2 -right-2 text-4xl opacity-10 pointer-events-none">❤️</div>
          </div>

          {/* Lost & Found Stats */}
          <div className="stats-card bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-xl p-6 shadow-lg border border-blue-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="stats-icon text-blue-600 text-3xl">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="badge badge-sm bg-blue-200 text-blue-800 border-none">+8 found</div>
              </div>
              
              <div className="text-sm font-semibold text-blue-800 mb-2">Lost & Found</div>
              <div className="text-3xl font-bold text-blue-600 mb-1 number-pulse">89%</div>
              <div className="text-xs text-blue-700 mb-4">Success Rate</div>
              
              <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full animate-progressFill shadow-lg" style={{'--progress-width': '89%', width: '89%'}}></div>
              </div>
              <div className="text-xs text-blue-600 mt-1 font-medium">Outstanding performance</div>
            </div>
            
            <div className="absolute -top-2 -right-2 text-4xl opacity-10 pointer-events-none">🔍</div>
          </div>

          {/* Emergency Aid Stats */}
          <div className="stats-card bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-xl p-6 shadow-lg border border-green-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.3s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="stats-icon text-green-600 text-3xl">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="badge badge-sm bg-green-200 text-green-800 border-none">+50K today</div>
              </div>
              
              <div className="text-sm font-semibold text-green-800 mb-2">Relief Funds</div>
              <div className="text-3xl font-bold text-green-600 mb-1 number-pulse">৳4.2L</div>
              <div className="text-xs text-green-700 mb-4">Total Raised</div>
              
              <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full animate-progressFill shadow-lg" style={{'--progress-width': '84%', width: '84%'}}></div>
              </div>
              <div className="text-xs text-green-600 mt-1 font-medium">84% of monthly goal</div>
            </div>
            
            <div className="absolute -top-2 -right-2 text-4xl opacity-10 pointer-events-none">💚</div>
          </div>

          {/* Events Stats */}
          <div className="stats-card bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 rounded-xl p-6 shadow-lg border border-yellow-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="stats-icon text-yellow-600 text-3xl">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="badge badge-sm bg-yellow-200 text-yellow-800 border-none">5 upcoming</div>
              </div>
              
              <div className="text-sm font-semibold text-yellow-800 mb-2">Events</div>
              <div className="text-3xl font-bold text-yellow-600 mb-1 number-pulse">32</div>
              <div className="text-xs text-yellow-700 mb-4">This Month</div>
              
              <div className="w-full bg-yellow-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full animate-progressFill shadow-lg" style={{'--progress-width': '64%', width: '64%'}}></div>
              </div>
              <div className="text-xs text-yellow-600 mt-1 font-medium">More events coming</div>
            </div>
            
            <div className="absolute -top-2 -right-2 text-4xl opacity-10 pointer-events-none">🎉</div>
          </div>
        </div>

        {/* Enhanced Secondary Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Marketplace Stats */}
          <div className="stats-card bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 shadow-xl rounded-xl border border-purple-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.5s'}}>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-transparent to-pink-400/10 animate-pulse"></div>
            
            <div className="card-body relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="card-title text-purple-800 text-lg font-bold flex items-center gap-2">
                  <span className="text-2xl animate-bounce">🛒</span>
                  Marketplace Activity
                </h3>
                <div className="badge badge-sm bg-purple-200 text-purple-800 border-none animate-pulse">Live</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-purple-700 transition-colors">Active Listings</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-purple-700 text-lg number-pulse">156</span>
                    <div className="badge badge-xs bg-green-200 text-green-700 border-none">+12</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-purple-700 transition-colors">Items Sold</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-purple-700 text-lg number-pulse">89</span>
                    <div className="badge badge-xs bg-blue-200 text-blue-700 border-none">+5</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-purple-700 transition-colors">Avg. Price</span>
                  <span className="font-bold text-purple-700 text-lg number-pulse">৳2,450</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-600">Satisfaction Rate</span>
                    <span className="text-purple-700 font-semibold">72%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full animate-progressFill shadow-lg relative" style={{'--progress-width': '72%', width: '72%'}}>
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-2 right-2 text-3xl opacity-20 animate-float">💼</div>
          </div>

          {/* Medical Aid Stats */}
          <div className="stats-card bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 shadow-xl rounded-xl border border-teal-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.6s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-transparent to-emerald-400/10 animate-pulse"></div>
            
            <div className="card-body relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="card-title text-teal-800 text-lg font-bold flex items-center gap-2">
                  <span className="text-2xl animate-pulse">🏥</span>
                  Medical Aid Impact
                </h3>
                <div className="badge badge-sm bg-teal-200 text-teal-800 border-none animate-bounce">Active</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Cases Supported</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-700 text-lg number-pulse">23</span>
                    <div className="badge badge-xs bg-red-200 text-red-700 border-none">Urgent</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Funds Raised</span>
                  <span className="font-bold text-teal-700 text-lg number-pulse">৳1.8L</span>
                </div>
                
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Contributors</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-700 text-lg number-pulse">342</span>
                    <div className="badge badge-xs bg-yellow-200 text-yellow-700 border-none">+28</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-teal-600">Goal Achievement</span>
                    <span className="text-teal-700 font-semibold">91%</span>
                  </div>
                  <div className="w-full bg-teal-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full animate-progressFill shadow-lg relative" style={{'--progress-width': '91%', width: '91%'}}>
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 text-3xl opacity-20 animate-bounce">⚕️</div>
          </div>

          {/* Bulletin Board Stats */}
          <div className="stats-card bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 shadow-xl rounded-xl border border-orange-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.7s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-transparent to-yellow-400/10 animate-pulse"></div>
            
            <div className="card-body relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="card-title text-orange-800 text-lg font-bold flex items-center gap-2">
                  <span className="text-2xl animate-pulse">📢</span>
                  Bulletin Engagement
                </h3>
                <div className="badge badge-sm bg-orange-200 text-orange-800 border-none animate-bounce delay-300">Hot</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-orange-700 transition-colors">Active Notices</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-700 text-lg number-pulse">47</span>
                    <div className="badge badge-xs bg-green-200 text-green-700 border-none">New</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-orange-700 transition-colors">Daily Views</span>
                  <span className="font-bold text-orange-700 text-lg number-pulse">1,234</span>
                </div>
                
                <div className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600 group-hover:text-orange-700 transition-colors">Interactions</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-700 text-lg number-pulse">567</span>
                    <div className="badge badge-xs bg-purple-200 text-purple-700 border-none">+89</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-orange-600">Engagement Rate</span>
                    <span className="text-orange-700 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full animate-progressFill shadow-lg relative" style={{'--progress-width': '85%', width: '85%'}}>
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 text-3xl opacity-20 animate-bounce delay-700">📊</div>
          </div>
        </div>

        {/* Enhanced Overall Impact Summary */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-indigo-200 relative overflow-hidden animate-fadeIn" style={{animationDelay: '0.8s'}}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 bg-indigo-400 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-8 right-8 w-12 h-12 bg-purple-400 rounded-full blur-lg animate-bounce"></div>
            <div className="absolute bottom-4 left-1/2 w-20 h-20 bg-pink-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="badge badge-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none p-4">
                  🎯 Community Impact Dashboard
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Overall Community Impact
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how our platform is transforming university communities across the nation
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
              <div className="group cursor-pointer animate-fadeIn" style={{animationDelay: '0.9s'}}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-red-200 hover:border-red-300">
                  <div className="text-2xl mb-3 animate-bounce">❤️</div>
                  <div className="text-4xl font-bold text-red-600 mb-2 number-pulse">450+</div>
                  <div className="text-sm text-gray-600 font-medium">Lives Saved</div>
                  <div className="mt-3 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Through blood donation network
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer animate-fadeIn" style={{animationDelay: '1.0s'}}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-200 hover:border-green-300">
                  <div className="text-2xl mb-3 animate-pulse">💰</div>
                  <div className="text-4xl font-bold text-green-600 mb-2 number-pulse">৳6L+</div>
                  <div className="text-sm text-gray-600 font-medium">Total Funds</div>
                  <div className="mt-3 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Emergency & relief donations
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer animate-fadeIn" style={{animationDelay: '1.1s'}}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-blue-200 hover:border-blue-300">
                  <div className="text-2xl mb-3 animate-bounce delay-300">👥</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2 number-pulse">2,500+</div>
                  <div className="text-sm text-gray-600 font-medium">Active Users</div>
                  <div className="mt-3 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Growing community daily
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer animate-fadeIn" style={{animationDelay: '1.2s'}}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-yellow-200 hover:border-yellow-300">
                  <div className="text-2xl mb-3 animate-pulse delay-500">📦</div>
                  <div className="text-4xl font-bold text-yellow-600 mb-2 number-pulse">850+</div>
                  <div className="text-sm text-gray-600 font-medium">Items Recovered</div>
                  <div className="mt-3 text-xs text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Lost & found success stories
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer animate-fadeIn" style={{animationDelay: '1.3s'}}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-purple-200 hover:border-purple-300">
                  <div className="text-2xl mb-3 animate-bounce delay-700">⭐</div>
                  <div className="text-4xl font-bold text-purple-600 mb-2 number-pulse">95%</div>
                  <div className="text-sm text-gray-600 font-medium">User Satisfaction</div>
                  <div className="mt-3 text-xs text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Excellent user experience
                  </div>
                </div>
              </div>
            </div>
            
            {/* Real-time Updates Ticker */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white animate-fadeIn" style={{animationDelay: '1.4s'}}>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                  <span>Live Updates</span>
                </div>
                <span className="hidden md:block">|</span>
                <span className="animate-fadeIn">🩸 New donor registered 2 min ago</span>
                <span className="hidden md:block">|</span>
                <span className="animate-fadeIn delay-300">💰 ৳5,000 donated 5 min ago</span>
                <span className="hidden md:block">|</span>
                <span className="animate-fadeIn delay-500">📱 Phone found and returned 8 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced How It Works Section */}
      <div className="mb-12 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-4">
            <div className="badge badge-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none p-4 animate-fadeIn">
              🚀 Simple Process
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-slideUp">
            How uniConnect Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeIn delay-300">
            Join our community in just three simple steps and start making a difference today
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connection Lines for Desktop */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5">
            <div className="flex justify-between items-center h-full">
              <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-blue-300 to-blue-400 animate-pulse"></div>
              <div className="w-1/2 h-px bg-gradient-to-r from-blue-400 via-indigo-300 to-transparent animate-pulse delay-500"></div>
            </div>
          </div>
          
          {/* Step 1: Join Community */}
          <div className="text-center group animate-stepReveal" style={{animationDelay: '0.2s'}}>
            <div className="step-card bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-100 hover:border-blue-300 relative overflow-hidden">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-numberCount" style={{animationDelay: '0.4s'}}>
                1
              </div>
              
              <div className="relative z-10">
                {/* Animated Icon Container */}
                <div className="step-icon bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full animate-pulse"></div>
                  <span className="text-3xl relative z-10">👥</span>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  Join Community
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Create your profile and become part of the uniConnect community. It takes just 2 minutes to get started!
                </p>
                
                {/* Interactive Elements */}
                <div className="mt-6 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center justify-center text-sm text-blue-600">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    2,500+ Active Members
                  </div>
                  <div className="text-xs text-gray-500">Join today and get welcome bonus!</div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500">
                ✨
              </div>
            </div>
          </div>
          
          {/* Step 2: Connect & Help */}
          <div className="text-center group animate-stepReveal" style={{animationDelay: '0.4s'}}>
            <div className="step-card bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100 hover:border-green-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-numberCount" style={{animationDelay: '0.6s'}}>
                2
              </div>
              
              <div className="relative z-10">
                <div className="step-icon bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full animate-pulse"></div>
                  <span className="text-3xl relative z-10">🤝</span>
                  
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  Connect & Help
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Find opportunities to help others or seek assistance when needed. Our smart matching system connects you instantly.
                </p>
                
                <div className="mt-6 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center justify-center text-sm text-green-600">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
                    450+ Lives Saved
                  </div>
                  <div className="text-xs text-gray-500">Real-time notifications & matching</div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500">
                💫
              </div>
            </div>
          </div>
          
          {/* Step 3: Make Impact */}
          <div className="text-center group animate-stepReveal" style={{animationDelay: '0.6s'}}>
            <div className="step-card bg-white rounded-2xl p-8 shadow-xl border-2 border-yellow-100 hover:border-yellow-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-numberCount" style={{animationDelay: '0.8s'}}>
                3
              </div>
              
              <div className="relative z-10">
                <div className="step-icon bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
                  <span className="text-3xl relative z-10">🎯</span>
                  
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-700 transition-colors duration-300">
                  Make Impact
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Create positive change in your university community. Track your contributions and see the real difference you make.
                </p>
                
                <div className="mt-6 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center justify-center text-sm text-orange-600">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                    95% Satisfaction Rate
                  </div>
                  <div className="text-xs text-gray-500">Measurable community impact</div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500">
                🌟
              </div>
            </div>
          </div>
        </div>
\      </div>

      {/* Enhanced Recent Activities Section */}
      <div className="mb-12 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8 w-24 h-24 bg-red-400 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-green-400 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="inline-block mb-4">
            <div className="badge badge-lg bg-gradient-to-r from-orange-500 to-red-500 text-white border-none p-4 animate-fadeIn">
              ⚡ Live Updates
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-slideUp">
            Recent Community Activities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeIn delay-300">
            See what's happening in your university community right now
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Emergency Blood Request - Urgent */}
          <div className="activity-card bg-gradient-to-br from-red-50 to-red-100 shadow-xl border-l-4 border-red-400 rounded-xl relative overflow-hidden animate-activitySlideIn" style={{animationDelay: '0.1s'}}>
            {/* Urgency Indicator */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full"></div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">🩸</div>
            </div>
            
            <div className="card-body p-8 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="activity-badge badge bg-red-500 text-white border-none px-4 py-2 text-sm font-semibold">
                    <span className="animate-pulse mr-2">🩸</span>
                    URGENT
                  </div>
                  <div className="activity-urgency badge badge-outline border-red-300 text-red-600 text-xs">
                    Emergency
                  </div>
                </div>
                <span className="activity-time text-sm text-red-600 font-medium">2 hours ago</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors duration-300">
                Emergency Blood Request - B+ Needed
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                <span className="font-semibold text-red-700">Ahmed Rahman</span> urgently needs B+ blood for surgery. 
                <span className="block mt-1 text-gray-600">📍 Location: Dhaka Medical College Hospital</span>
                <span className="block mt-1 text-red-600 font-medium">⏰ Required: Within 4 hours</span>
              </p>
              
              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-red-600 font-medium">Response Rate</span>
                  <span className="text-red-700 font-bold">12 volunteers responding</span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full animate-progressFill shadow-sm" style={{'--progress-width': '60%', width: '60%'}}></div>
                </div>
              </div>
              
              <div className="card-actions justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    12 Responding
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    B+ Compatible
                  </span>
                </div>
                
                <Link 
                  to="/blood-donation" 
                  className="activity-button btn btn-error btn-sm hover:btn-error shadow-lg px-6 transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <span className="animate-pulse">❤️</span>
                    Help Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                </Link>
              </div>
              
              {/* Floating Action Indicator */}
              <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-red-100 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <div className="w-6 h-6 bg-red-100 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <div className="w-6 h-6 bg-red-200 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-xs text-red-600 font-bold">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lost & Found Success */}
          <div className="activity-card bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl border-l-4 border-blue-400 rounded-xl relative overflow-hidden animate-activitySlideIn" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">🔍</div>
            </div>
            
            <div className="card-body p-8 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="activity-badge badge bg-blue-500 text-white border-none px-4 py-2 text-sm font-semibold">
                    <span className="mr-2">🔍</span>
                    FOUND
                  </div>
                  <div className="badge badge-outline border-green-300 text-green-600 text-xs">
                    Success Story
                  </div>
                </div>
                <span className="activity-time text-sm text-blue-600 font-medium">4 hours ago</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Found: MacBook Pro near Library
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                <span className="font-semibold text-blue-700">Silver MacBook Pro (2021)</span> found near the central library main entrance.
                <span className="block mt-1 text-gray-600">📍 Found by: Sarah Ahmed (CSE Dept)</span>
                <span className="block mt-1 text-blue-600 font-medium">🔒 Secure pickup available</span>
              </p>
              
              {/* Item Details */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <div className="font-semibold text-blue-700">Item Details</div>
                    <div className="text-gray-600 mt-1">MacBook Pro 13"</div>
                    <div className="text-gray-600">Silver Color</div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <div className="font-semibold text-green-700">Status</div>
                    <div className="text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Safe & Secure
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-actions justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                    3 Claims Pending
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    Verified Finder
                  </span>
                </div>
                
                <Link 
                  to="/lost-found" 
                  className="activity-button btn btn-info btn-sm shadow-lg px-6 transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <span>🔍</span>
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Flood Relief Success */}
          <div className="activity-card bg-gradient-to-br from-green-50 to-green-100 shadow-xl border-l-4 border-green-400 rounded-xl relative overflow-hidden animate-activitySlideIn" style={{animationDelay: '0.3s'}}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">🌊</div>
            </div>
            
            <div className="card-body p-8 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="activity-badge badge bg-green-500 text-white border-none px-4 py-2 text-sm font-semibold">
                    <span className="mr-2">🌊</span>
                    SUCCESS
                  </div>
                  <div className="badge badge-outline border-yellow-300 text-yellow-600 text-xs">
                    Goal Achieved
                  </div>
                </div>
                <span className="activity-time text-sm text-green-600 font-medium">1 day ago</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Flood Relief Drive Successful
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Successfully raised <span className="font-bold text-green-700">৳50,000</span> for flood victims in Sylhet region.
                <span className="block mt-1 text-gray-600">🎯 Goal: ৳45,000 (111% achieved)</span>
                <span className="block mt-1 text-green-600 font-medium">✅ Funds transferred to relief organizations</span>
              </p>
              
              {/* Contribution Stats */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="font-bold text-green-700 text-lg number-pulse">127</div>
                    <div className="text-gray-600">Contributors</div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3 text-center">
                    <div className="font-bold text-blue-700 text-lg number-pulse">৳394</div>
                    <div className="text-gray-600">Avg. Donation</div>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-3 text-center">
                    <div className="font-bold text-yellow-700 text-lg number-pulse">111%</div>
                    <div className="text-gray-600">Goal Achieved</div>
                  </div>
                </div>
              </div>
              
              <div className="card-actions justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Funds Delivered
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    Impact Verified
                  </span>
                </div>
                
                <Link 
                  to="/flood-relief" 
                  className="activity-button btn btn-success btn-sm shadow-lg px-6 transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <span>💝</span>
                    Donate More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tech Workshop Event */}
          <div className="activity-card bg-gradient-to-br from-yellow-50 to-orange-100 shadow-xl border-l-4 border-yellow-400 rounded-xl relative overflow-hidden animate-activitySlideIn" style={{animationDelay: '0.4s'}}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">🎉</div>
            </div>
            
            <div className="card-body p-8 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="activity-badge badge bg-yellow-500 text-white border-none px-4 py-2 text-sm font-semibold">
                    <span className="mr-2">🎉</span>
                    EVENT
                  </div>
                  <div className="badge badge-outline border-orange-300 text-orange-600 text-xs">
                    Hot Registration
                  </div>
                </div>
                <span className="activity-time text-sm text-yellow-600 font-medium">2 days ago</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Tech Workshop: AI & Machine Learning
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Join us for an exciting workshop on <span className="font-semibold text-yellow-700">AI fundamentals</span> this Saturday!
                <span className="block mt-1 text-gray-600">🗓️ Date: Saturday, 2:00 PM - 5:00 PM</span>
                <span className="block mt-1 text-orange-600 font-medium">👨‍🏫 Expert: Dr. Rahman (Google AI)</span>
              </p>
              
              {/* Registration Stats */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-yellow-600 font-medium">Registration Progress</span>
                  <span className="text-xs text-yellow-700 font-bold">45/60 seats</span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full animate-progressFill shadow-sm relative" style={{'--progress-width': '75%', width: '75%'}}>
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-2 text-gray-600">
                  <span>15 spots remaining</span>
                  <span className="text-orange-600 font-medium">Filling fast!</span>
                </div>
              </div>
              
              <div className="card-actions justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Free Event
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    Certificate Provided
                  </span>
                </div>
                
                <Link 
                  to="/events" 
                  className="activity-button btn btn-warning btn-sm shadow-lg px-6 transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <span>📝</span>
                    Register
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Real-time Activity Feed */}
        <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-xl animate-fadeIn" style={{animationDelay: '0.5s'}}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <span className="animate-pulse">📡</span>
              Live Activity Feed
              <span className="badge badge-sm bg-green-500 text-white border-none animate-bounce">LIVE</span>
            </h3>
            <p className="text-gray-600">Real-time updates from your university community</p>
          </div>
          
          <div className="space-y-4 max-h-64 overflow-y-auto">
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm animate-slideUp">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-red-600">Blood Request:</span> O+ needed at Square Hospital
                </span>
                <div className="text-xs text-gray-400">Just now</div>
              </div>
              <div className="badge badge-xs bg-red-100 text-red-600">Emergency</div>
            </div>
            
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm animate-slideUp" style={{animationDelay: '0.1s'}}>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">Found Item:</span> iPhone 13 near cafeteria
                </span>
                <div className="text-xs text-gray-400">2 minutes ago</div>
              </div>
              <div className="badge badge-xs bg-blue-100 text-blue-600">New</div>
            </div>
            
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm animate-slideUp" style={{animationDelay: '0.2s'}}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">Donation:</span> ৳1,000 contributed to flood relief
                </span>
                <div className="text-xs text-gray-400">5 minutes ago</div>
              </div>
              <div className="badge badge-xs bg-green-100 text-green-600">Thanks</div>
            </div>
            
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm animate-slideUp" style={{animationDelay: '0.3s'}}>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-yellow-600">Event:</span> 5 new registrations for AI workshop
                </span>
                <div className="text-xs text-gray-400">8 minutes ago</div>
              </div>
              <div className="badge badge-xs bg-yellow-100 text-yellow-600">Popular</div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              to="/activities" 
              className="btn btn-outline border-2 border-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-800 transform hover:scale-105 transition-all duration-300"
            >
              View All Activities
            </Link>
          </div>
        </div>
      </div>


      {/* Community Highlights */}
      {/* <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 main-col">Community Impact</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-gradient-to-br from-purple-50 to-indigo-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-purple-800">🏆 This Month's Heroes</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="badge badge-error mr-2">🩸</div>
                  <span className="text-sm">Top Blood Donor: <strong>Abdullah Rahman</strong> (5 donations)</span>
                </div>
                <div className="flex items-center">
                  <div className="badge badge-success mr-2">🌊</div>
                  <span className="text-sm">Highest Contributor: <strong>Ayesha Begum</strong> (৳15,000)</span>
                </div>
                <div className="flex items-center">
                  <div className="badge badge-info mr-2">🔍</div>
                  <span className="text-sm">Lost & Found Helper: <strong>Karim Ahmed</strong> (8 items returned)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card bg-gradient-to-br from-green-50 to-teal-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-green-800">📊 Impact Numbers</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">450+</div>
                  <div className="text-xs text-gray-500">Lives Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">৳2.5L</div>
                  <div className="text-xs text-gray-500">Funds Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">320+</div>
                  <div className="text-xs text-gray-500">Items Returned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">180+</div>
                  <div className="text-xs text-gray-500">Events Hosted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


    </div>
  );
}

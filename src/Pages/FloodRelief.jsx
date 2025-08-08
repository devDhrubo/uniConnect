import { useState } from "react";

const FloodRelief = () => {
  const [activeTab, setActiveTab] = useState("donate");
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("money");

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const reliefCampaigns = [
    {
      id: 1,
      title: "Sylhet Flood Relief 2024",
      description: "Immediate relief for flood-affected families in Sylhet division. Providing food, clean water, and shelter.",
      location: "Sylhet, Bangladesh",
      raised: 75000,
      goal: 100000,
      donors: 245,
      daysLeft: 15,
      urgency: "critical",
      image: "🌊",
      needs: ["Food Packets", "Clean Water", "Blankets", "Medicine"]
    },
    {
      id: 2,
      title: "Rangpur Emergency Aid",
      description: "Supporting displaced families with essential supplies and temporary shelter arrangements.",
      location: "Rangpur, Bangladesh", 
      raised: 42000,
      goal: 80000,
      donors: 156,
      daysLeft: 22,
      urgency: "urgent",
      image: "🏠",
      needs: ["Tents", "Food", "Clothing", "First Aid"]
    },
    {
      id: 3,
      title: "Chittagong Recovery Fund",
      description: "Long-term rehabilitation and reconstruction efforts for flood-damaged infrastructure.",
      location: "Chittagong, Bangladesh",
      raised: 28000,
      goal: 60000,
      donors: 89,
      daysLeft: 35,
      urgency: "moderate",
      image: "🔧",
      needs: ["Building Materials", "Tools", "Seeds", "Livestock"]
    }
  ];

  const recentDonations = [
    { name: "Anonymous", amount: 500, time: "2 minutes ago", message: "Stay strong!" },
    { name: "Sarah Wilson", amount: 100, time: "15 minutes ago", message: "Prayers for everyone affected" },
    { name: "Mohammed Ali", amount: 250, time: "1 hour ago", message: "Every little bit helps" },
    { name: "Anonymous", amount: 50, time: "2 hours ago", message: "" },
    { name: "Lisa Chen", amount: 75, time: "3 hours ago", message: "Hope this helps the families in need" }
  ];

  const impactStats = [
    { metric: "Families Helped", value: "1,250+", icon: "👨‍👩‍👧‍👦" },
    { metric: "Meals Provided", value: "15,000+", icon: "🍽️" },
    { metric: "Shelters Built", value: "85", icon: "🏠" },
    { metric: "Medical Aid", value: "500+ cases", icon: "🏥" }
  ];

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount || donationAmount;
    alert(`Thank you for your $${amount} donation to flood relief!`);
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical": return "badge-error";
      case "urgent": return "badge-warning";
      default: return "badge-info";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="donation-highlight">🌊 Flood Relief Hub</span>
        </h1>
        <p className="text-lg text-gray-600">
          Join our community in providing emergency aid to flood-affected areas
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {impactStats.map((stat, index) => (
          <div key={index} className="stat bg-green-50 rounded-lg">
            <div className="stat-figure text-2xl">{stat.icon}</div>
            <div className="stat-title text-green-600">{stat.metric}</div>
            <div className="stat-value text-green-700 text-lg lg:text-2xl">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="tabs tabs-lifted mb-8">
        <button 
          className={`tab tab-lg ${activeTab === "donate" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("donate")}
        >
          💰 Donate Now
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "campaigns" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("campaigns")}
        >
          🌊 Active Campaigns
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "impact" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("impact")}
        >
          📊 Our Impact
        </button>
      </div>

      {/* Donation Tab */}
      {activeTab === "donate" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-green-600 mb-6">Make a Donation</h3>
                
                {/* Donation Type */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-semibold">I want to donate:</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="donationType"
                        value="money"
                        checked={donationType === "money"}
                        onChange={(e) => setDonationType(e.target.value)}
                        className="radio radio-success"
                      />
                      <span className="label-text ml-2">💰 Money</span>
                    </label>
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="donationType"
                        value="supplies"
                        checked={donationType === "supplies"}
                        onChange={(e) => setDonationType(e.target.value)}
                        className="radio radio-success"
                      />
                      <span className="label-text ml-2">📦 Supplies</span>
                    </label>
                  </div>
                </div>

                {donationType === "money" ? (
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    {/* Amount Selection */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Select Amount (USD)</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {predefinedAmounts.map((amount) => (
                          <label key={amount} className="label cursor-pointer">
                            <input
                              type="radio"
                              name="donationAmount"
                              value={amount}
                              checked={donationAmount === amount.toString()}
                              onChange={(e) => {
                                setDonationAmount(e.target.value);
                                setCustomAmount("");
                              }}
                              className="radio radio-success sr-only"
                            />
                            <span 
                              className={`btn btn-outline w-full ${
                                donationAmount === amount.toString() ? 'btn-success' : ''
                              }`}
                            >
                              ${amount}
                            </span>
                          </label>
                        ))}
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Custom Amount</span>
                        </label>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setDonationAmount("");
                          }}
                          className="input input-bordered"
                          placeholder="Enter custom amount"
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Donor Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Full Name</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          className="input input-bordered"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Anonymous Option */}
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-3">
                        <input type="checkbox" className="checkbox checkbox-success" />
                        <span className="label-text">Donate anonymously</span>
                      </label>
                    </div>

                    {/* Message */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Message (Optional)</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered"
                        placeholder="Leave a message of support..."
                        rows="3"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-success w-full btn-lg"
                      disabled={!donationAmount && !customAmount}
                    >
                      Donate ${customAmount || donationAmount || 0} Now
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="alert alert-info">
                      <div className="flex-1">
                        <h4 className="font-bold">Donate Supplies</h4>
                        <p className="text-sm">Contact our coordination team to arrange supply donations.</p>
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">What supplies can you donate?</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered"
                        placeholder="List the supplies you want to donate (food, clothing, blankets, etc.)"
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Name</span>
                        </label>
                        <input type="text" className="input input-bordered" placeholder="Full name" />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Phone Number</span>
                        </label>
                        <input type="tel" className="input input-bordered" placeholder="+1234567890" />
                      </div>
                    </div>

                    <button className="btn btn-success w-full btn-lg">
                      Submit Supply Donation Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="space-y-6">
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h4 className="card-title text-green-600">Recent Donations</h4>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="flex justify-between items-start p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{donation.name}</p>
                        <p className="text-xs text-gray-500">{donation.time}</p>
                        {donation.message && (
                          <p className="text-sm text-gray-600 italic">"{donation.message}"</p>
                        )}
                      </div>
                      <span className="font-bold text-green-600">${donation.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-green-100 to-blue-100 shadow-lg">
              <div className="card-body text-center">
                <h4 className="card-title justify-center">💡 Did You Know?</h4>
                <p className="text-sm">
                  $25 can provide emergency food for a family of 4 for 3 days
                </p>
                <p className="text-sm">
                  $50 can supply clean water for 10 people for a week
                </p>
                <p className="text-sm">
                  $100 can provide temporary shelter materials for a family
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          {reliefCampaigns.map((campaign) => (
            <div key={campaign.id} className="card bg-white shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-6">
                  <div className="text-6xl">{campaign.image}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                        <div className={`badge ${getUrgencyColor(campaign.urgency)} mb-2`}>
                          {campaign.urgency.toUpperCase()}
                        </div>
                        <p className="text-gray-600 mb-2">{campaign.description}</p>
                        <p className="text-sm text-blue-600">📍 {campaign.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          ${campaign.raised.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          of ${campaign.goal.toLocaleString()} goal
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{campaign.donors} donors</span>
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                      <progress 
                        className="progress progress-success w-full" 
                        value={getProgressPercentage(campaign.raised, campaign.goal)} 
                        max="100"
                      ></progress>
                    </div>

                    {/* Needs */}
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Immediate Needs:</h5>
                      <div className="flex flex-wrap gap-2">
                        {campaign.needs.map((need, index) => (
                          <span key={index} className="badge badge-outline">{need}</span>
                        ))}
                      </div>
                    </div>

                    <div className="card-actions justify-end">
                      <button className="btn btn-outline btn-sm">Share</button>
                      <button className="btn btn-outline btn-sm">Learn More</button>
                      <button className="btn btn-success btn-sm">Donate Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Impact Tab */}
      {activeTab === "impact" && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Our Collective Impact</h3>
            <p className="text-gray-600 mb-8">See how your donations are making a real difference</p>
          </div>

          {/* Impact Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-green-50 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
                <div className="stat-value text-green-600">1,250</div>
                <div className="stat-title">Families Supported</div>
              </div>
            </div>
            <div className="card bg-blue-50 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-2">🍽️</div>
                <div className="stat-value text-blue-600">15,000</div>
                <div className="stat-title">Meals Provided</div>
              </div>
            </div>
            <div className="card bg-purple-50 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-2">🏠</div>
                <div className="stat-value text-purple-600">85</div>
                <div className="stat-title">Temporary Shelters</div>
              </div>
            </div>
            <div className="card bg-red-50 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-2">🏥</div>
                <div className="stat-value text-red-600">500</div>
                <div className="stat-title">Medical Treatments</div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div>
            <h4 className="text-xl font-bold mb-6">Success Stories</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">The Rahman Family</h5>
                  <p className="text-sm text-gray-600 mb-4">
                    "Thanks to the quick response from uniConnect donors, our family received emergency 
                    food supplies and temporary shelter when floods destroyed our home. The support helped 
                    us get back on our feet during the most difficult time."
                  </p>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">- Rescued from Sylhet floods</span>
                  </div>
                </div>
              </div>
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Local School Rehabilitation</h5>
                  <p className="text-sm text-gray-600 mb-4">
                    "The donation funds helped us rebuild our school that was damaged in the floods. 
                    Now 200 children can continue their education in a safe environment. This support 
                    means everything to our community."
                  </p>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">- Rangpur Primary School</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloodRelief;

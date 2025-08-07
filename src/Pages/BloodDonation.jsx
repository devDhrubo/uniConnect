import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bloodApi, handleApiError, showNotification } from "../api/client";

const BloodDonation = () => {
  const [activeTab, setActiveTab] = useState("donate");
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [stats, setStats] = useState({
    totalDonors: 0,
    availableDonors: 0,
    activeRequests: 0,
    urgentRequests: 0
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    lastDonation: "",
    medicalConditions: "",
    location: ""
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Load data when component mounts
  useEffect(() => {
    loadStats();
    loadDonors();
    loadBloodRequests();
  }, []);

  const loadStats = async () => {
    try {
      const response = await bloodApi.getStats();
      setStats({
        totalDonors: response.data.totalDonors || 156,
        availableDonors: response.data.availableDonors || 89,
        activeRequests: response.data.activeRequests || 12,
        urgentRequests: response.data.urgentRequests || 3
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
      // Use default values if API fails
    }
  };

  const loadDonors = async () => {
    try {
      const response = await bloodApi.getDonors({ limit: 10, status: 'available' });
      if (response.data && response.data.donors) {
        setDonors(response.data.donors);
      } else {
        // Fallback data
        setDonors([
          {
            id: 1,
            name: "Sarah Wilson",
            bloodGroup: "O-",
            lastDonation: "2 months ago",
            totalDonations: 12,
            status: "available",
            badges: ["Super Donor", "Life Saver"]
          },
          {
            id: 2,
            name: "David Chen",
            bloodGroup: "A+",
            lastDonation: "1 month ago",
            totalDonations: 8,
            status: "available",
            badges: ["Regular Donor"]
          },
          {
            id: 3,
            name: "Emily Brown",
            bloodGroup: "B-",
            lastDonation: "3 weeks ago",
            totalDonations: 15,
            status: "not_available",
            badges: ["Champion Donor", "Life Saver"]
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to load donors:', error);
    }
  };

  const loadBloodRequests = async () => {
    try {
      const response = await bloodApi.getBloodRequests({ limit: 10, status: 'active' });
      if (response.data && response.data.requests) {
        setDonationRequests(response.data.requests);
      } else {
        // Fallback data
        setDonationRequests([
          {
            id: 1,
            patientName: "John Doe",
            bloodGroup: "O-",
            unitsNeeded: 2,
            urgency: "critical",
            hospital: "City General Hospital",
            contact: "+1234567890",
            timePosted: "2 hours ago",
            location: "Campus Area"
          },
          {
            id: 2,
            patientName: "Jane Smith",
            bloodGroup: "A+",
            unitsNeeded: 1,
            urgency: "urgent",
            hospital: "University Medical Center",
            contact: "+1234567891",
            timePosted: "4 hours ago",
            location: "Near Library"
          },
          {
            id: 3,
            patientName: "Mike Johnson",
            bloodGroup: "B+",
            unitsNeeded: 3,
            urgency: "normal",
            hospital: "Community Health Center",
            contact: "+1234567892",
            timePosted: "1 day ago",
            location: "Downtown"
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to load blood requests:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await bloodApi.registerDonor(formData);
      showNotification(response.message || "Thank you for registering! We'll contact you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        bloodGroup: "",
        lastDonation: "",
        medicalConditions: "",
        location: ""
      });

      // Reload data
      loadStats();
      loadDonors();
    } catch (error) {
      showNotification(handleApiError(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDonationResponse = async (requestId) => {
    try {
      // This would typically open a modal or form for donor details
      const donorName = prompt("Enter your full name:");
      const donorPhone = prompt("Enter your phone number:");
      
      if (donorName && donorPhone) {
        const response = await bloodApi.respondToRequest(requestId, {
          donorId: 'temp-id', // Would be from logged-in user
          donorName,
          donorPhone
        });
        
        showNotification(response.message || "Your response has been submitted successfully!");
        loadBloodRequests(); // Reload requests
      }
    } catch (error) {
      showNotification(handleApiError(error), 'error');
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical": return "badge-error";
      case "urgent": return "badge-warning";
      default: return "badge-success";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="blood-highlight">🩸 Blood Donation Hub</span>
        </h1>
        <p className="text-lg text-gray-600">
          Save lives by donating blood or finding donors in your community
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-red-50 rounded-lg">
          <div className="stat-title text-red-600">Active Donors</div>
          <div className="stat-value text-red-700">{stats.totalDonors}</div>
          <div className="stat-desc text-red-500">This semester</div>
        </div>
        <div className="stat bg-green-50 rounded-lg">
          <div className="stat-title text-green-600">Lives Saved</div>
          <div className="stat-value text-green-700">{stats.availableDonors}</div>
          <div className="stat-desc text-green-500">Through donations</div>
        </div>
        <div className="stat bg-blue-50 rounded-lg">
          <div className="stat-title text-blue-600">Blood Banks</div>
          <div className="stat-value text-blue-700">{stats.activeRequests}</div>
          <div className="stat-desc text-blue-500">Partner hospitals</div>
        </div>
        <div className="stat bg-yellow-50 rounded-lg">
          <div className="stat-title text-yellow-600">Urgent Requests</div>
          <div className="stat-value text-yellow-700">{stats.urgentRequests}</div>
          <div className="stat-desc text-yellow-500">Need immediate help</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs tabs-lifted mb-8">
        <button 
          className={`tab tab-lg ${activeTab === "donate" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("donate")}
        >
          🩸 Become a Donor
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "requests" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          🆘 Blood Requests
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "donors" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("donors")}
        >
          👥 Our Donors
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "donate" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-red-600 mb-4">Register as Blood Donor</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Blood Group</span>
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Blood Donation (if any)</span>
                    </label>
                    <input
                      type="date"
                      name="lastDonation"
                      value={formData.lastDonation}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  </div>
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
                      placeholder="Your area/campus"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Medical Conditions (if any)</span>
                  </label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                    placeholder="List any medical conditions or medications..."
                    rows="3"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-error w-full ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register as Donor'}
                </button>
              </form>
            </div>
          </div>

          {/* Donation Guidelines */}
          <div className="space-y-6">
            <div className="card bg-red-50 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-red-600">Donation Guidelines</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Age: 18-65 years
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Weight: Minimum 50 kg
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Good health condition
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    3 months gap between donations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    No recent illness or surgery
                  </li>
                </ul>
              </div>
            </div>

            <div className="card bg-blue-50 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-blue-600">Blood Compatibility</h3>
                <div className="overflow-x-auto">
                  <table className="table table-xs">
                    <thead>
                      <tr>
                        <th>Blood Group</th>
                        <th>Can Donate To</th>
                        <th>Can Receive From</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold">O-</td>
                        <td>Everyone</td>
                        <td>O-</td>
                      </tr>
                      <tr>
                        <td className="font-bold">O+</td>
                        <td>O+, A+, B+, AB+</td>
                        <td>O+, O-</td>
                      </tr>
                      <tr>
                        <td className="font-bold">A-</td>
                        <td>A-, A+, AB-, AB+</td>
                        <td>A-, O-</td>
                      </tr>
                      <tr>
                        <td className="font-bold">AB+</td>
                        <td>AB+</td>
                        <td>Everyone</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "requests" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-red-600">Current Blood Requests</h3>
            <Link to="/create-request" className="btn btn-error">
              + Create Request
            </Link>
          </div>

          <div className="grid gap-4">
            {donationRequests.map((request) => (
              <div key={request.id} className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold">{request.patientName}</h4>
                      <div className="flex gap-4 text-sm text-gray-600 mt-2">
                        <span>🏥 {request.hospital}</span>
                        <span>📍 {request.location}</span>
                        <span>⏰ {request.timePosted}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Contact: {request.contact}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {request.bloodGroup}
                      </div>
                      <div className={`badge ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {request.unitsNeeded} units needed
                      </div>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-outline btn-sm">Share</button>
                    <button 
                      className="btn btn-error btn-sm"
                      onClick={() => handleDonationResponse(request.id)}
                    >
                      I Can Donate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "donors" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-red-600">Our Hero Donors</h3>
            <div className="join">
              <input 
                className="input input-bordered join-item" 
                placeholder="Search by blood group"
              />
              <button className="btn join-item">Search</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div key={donor.id} className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full bg-red-100">
                        <div className="flex items-center justify-center h-full text-2xl">
                          🩸
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{donor.name}</h4>
                      <p className="text-2xl font-bold text-red-600">{donor.bloodGroup}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mt-4">
                    <p>Last Donation: {donor.lastDonation}</p>
                    <p>Total Donations: {donor.totalDonations}</p>
                    <div className={`badge ${donor.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                      {donor.status === 'available' ? 'Available' : 'Not Available'}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {donor.badges && donor.badges.map((badge, index) => (
                      <span key={index} className="badge badge-outline badge-sm">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-outline btn-sm">Message</button>
                    {donor.status === 'available' && (
                      <button className="btn btn-error btn-sm">Request Donation</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDonation;

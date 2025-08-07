import React, { useState } from "react";

const MedicalAid = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [showCreateCase, setShowCreateCase] = useState(false);

  const medicalCases = [
    {
      id: 1,
      patientName: "Sarah Ahmed",
      studentId: "2021-CS-156",
      condition: "Acute Leukemia",
      treatmentCost: 250000,
      raised: 185000,
      description: "Sarah is a 3rd year Computer Science student who was recently diagnosed with acute leukemia. She needs immediate chemotherapy treatment.",
      hospital: "Dhaka Medical College Hospital",
      urgency: "critical",
      daysLeft: 12,
      donors: 89,
      updates: [
        { date: "2024-01-15", message: "Started chemotherapy session 2/8" },
        { date: "2024-01-10", message: "Successfully admitted to oncology ward" }
      ]
    },
    {
      id: 2,
      patientName: "Mohammad Hasan",
      studentId: "2020-EEE-223",
      condition: "Heart Surgery",
      treatmentCost: 180000,
      raised: 95000,
      description: "Mohammad needs emergency heart surgery due to a congenital heart defect that has worsened recently.",
      hospital: "National Heart Foundation",
      urgency: "urgent",
      daysLeft: 25,
      donors: 67,
      updates: [
        { date: "2024-01-12", message: "Pre-surgery tests completed" },
        { date: "2024-01-08", message: "Consultation with cardiac surgeon scheduled" }
      ]
    },
    {
      id: 3,
      patientName: "Fatima Rahman",
      studentId: "2019-BBA-087",
      condition: "Kidney Transplant",
      treatmentCost: 300000,
      raised: 120000,
      description: "Fatima has been on dialysis for 2 years and urgently needs a kidney transplant to save her life.",
      hospital: "BIRDEM General Hospital",
      urgency: "critical",
      daysLeft: 45,
      donors: 134,
      updates: [
        { date: "2024-01-14", message: "Compatible donor found, surgery scheduled" },
        { date: "2024-01-05", message: "Added to kidney transplant waiting list" }
      ]
    }
  ];

  const recentDonors = [
    { name: "Anonymous", amount: 5000, time: "5 minutes ago" },
    { name: "Dr. Rahman", amount: 10000, time: "1 hour ago" },
    { name: "Alumni Association", amount: 25000, time: "3 hours ago" },
    { name: "Faculty Members", amount: 15000, time: "5 hours ago" },
    { name: "Student Council", amount: 8000, time: "1 day ago" }
  ];

  const getProgressPercentage = (raised, total) => {
    return Math.min((raised / total) * 100, 100);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical": return "badge-error";
      case "urgent": return "badge-warning";
      default: return "badge-info";
    }
  };

  const getUrgencyBgColor = (urgency) => {
    switch (urgency) {
      case "critical": return "border-l-red-500";
      case "urgent": return "border-l-yellow-500";
      default: return "border-l-blue-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="donation-highlight">🏥 Medical Aid Fund</span>
        </h1>
        <p className="text-lg text-gray-600">
          Supporting our university community members facing serious health challenges
        </p>
      </div>

      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-figure text-red-600">🏥</div>
          <div className="stat-title">Active Cases</div>
          <div className="stat-value text-red-600">{medicalCases.length}</div>
          <div className="stat-desc">Ongoing treatments</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-green-600">💰</div>
          <div className="stat-title">Total Raised</div>
          <div className="stat-value text-green-600">
            ৳{medicalCases.reduce((sum, case_) => sum + case_.raised, 0).toLocaleString()}
          </div>
          <div className="stat-desc">This semester</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-600">👥</div>
          <div className="stat-title">Lives Saved</div>
          <div className="stat-value text-blue-600">23</div>
          <div className="stat-desc">Successful treatments</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-purple-600">🤝</div>
          <div className="stat-title">Community Support</div>
          <div className="stat-value text-purple-600">
            {medicalCases.reduce((sum, case_) => sum + case_.donors, 0)}
          </div>
          <div className="stat-desc">Total donors</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs tabs-lifted mb-8">
        <button 
          className={`tab tab-lg ${activeTab === "cases" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("cases")}
        >
          🏥 Active Cases
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "donate" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("donate")}
        >
          💰 Make Donation
        </button>
        <button 
          className={`tab tab-lg ${activeTab === "resources" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("resources")}
        >
          📚 Resources
        </button>
      </div>

      {/* Active Cases Tab */}
      {activeTab === "cases" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Current Medical Cases</h3>
            <button 
              className="btn btn-success"
              onClick={() => setShowCreateCase(true)}
            >
              + Submit New Case
            </button>
          </div>

          <div className="space-y-6">
            {medicalCases.map((case_) => (
              <div key={case_.id} className={`card bg-white shadow-lg border-l-4 ${getUrgencyBgColor(case_.urgency)}`}>
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold">{case_.patientName}</h4>
                        <div className={`badge ${getUrgencyColor(case_.urgency)}`}>
                          {case_.urgency.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Student ID: {case_.studentId} | {case_.condition}
                      </p>
                      <p className="text-gray-700 mb-3">{case_.description}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>🏥 {case_.hospital}</span>
                        <span>⏰ {case_.daysLeft} days left</span>
                        <span>👥 {case_.donors} donors</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ৳{case_.raised.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        of ৳{case_.treatmentCost.toLocaleString()} needed
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <progress 
                      className="progress progress-success w-full" 
                      value={getProgressPercentage(case_.raised, case_.treatmentCost)} 
                      max="100"
                    ></progress>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>{Math.round(getProgressPercentage(case_.raised, case_.treatmentCost))}% funded</span>
                      <span>৳{(case_.treatmentCost - case_.raised).toLocaleString()} remaining</span>
                    </div>
                  </div>

                  {/* Recent Updates */}
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Recent Updates:</h5>
                    <div className="space-y-2">
                      {case_.updates.slice(0, 2).map((update, index) => (
                        <div key={index} className="bg-blue-50 p-2 rounded text-sm">
                          <span className="text-blue-600 font-medium">{update.date}:</span>
                          <span className="ml-2">{update.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-sm">Share</button>
                    <button className="btn btn-outline btn-sm">More Details</button>
                    <button className="btn btn-success btn-sm">Donate Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Donate Tab */}
      {activeTab === "donate" && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-green-600 mb-6">Make a Medical Aid Donation</h3>
                
                <form className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Select Case to Support</span>
                    </label>
                    <select className="select select-bordered">
                      <option value="">Choose a medical case</option>
                      {medicalCases.map((case_) => (
                        <option key={case_.id} value={case_.id}>
                          {case_.patientName} - {case_.condition}
                        </option>
                      ))}
                      <option value="general">General Medical Aid Fund</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Donation Amount (৳)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[1000, 2500, 5000, 10000, 25000, 50000].map((amount) => (
                        <label key={amount} className="label cursor-pointer">
                          <input
                            type="radio"
                            name="amount"
                            value={amount}
                            className="radio radio-success sr-only"
                          />
                          <span className="btn btn-outline w-full">
                            ৳{amount.toLocaleString()}
                          </span>
                        </label>
                      ))}
                    </div>
                    <input
                      type="number"
                      className="input input-bordered"
                      placeholder="Custom amount"
                      min="100"
                    />
                  </div>

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

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      className="input input-bordered"
                      placeholder="+880 1234567890"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-success" />
                      <span className="label-text">I want to remain anonymous</span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Message of Support (Optional)</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered"
                      placeholder="Leave an encouraging message for the patient..."
                      rows="3"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-success w-full btn-lg">
                    Donate Now
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="space-y-6">
            <div className="card bg-white shadow-lg">
              <div className="card-body">
                <h4 className="card-title text-green-600">Recent Donations</h4>
                <div className="space-y-3">
                  {recentDonors.map((donor, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{donor.name}</p>
                        <p className="text-xs text-gray-500">{donor.time}</p>
                      </div>
                      <span className="font-bold text-green-600">৳{donor.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-green-100 to-blue-100 shadow-lg">
              <div className="card-body text-center">
                <h4 className="card-title justify-center">🎯 Impact of Your Donation</h4>
                <div className="space-y-2 text-sm">
                  <p>৳1,000 = One day of medication</p>
                  <p>৳5,000 = Laboratory tests</p>
                  <p>৳10,000 = One week of treatment</p>
                  <p>৳25,000 = Medical procedure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === "resources" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Medical Support Resources</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card bg-blue-50 shadow-lg">
                <div className="card-body">
                  <h4 className="card-title text-blue-600">🏥 Partner Hospitals</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Dhaka Medical College Hospital</li>
                    <li>• Square Hospital</li>
                    <li>• United Hospital</li>
                    <li>• BIRDEM General Hospital</li>
                    <li>• National Heart Foundation</li>
                  </ul>
                  <div className="card-actions">
                    <button className="btn btn-outline btn-sm">View All</button>
                  </div>
                </div>
              </div>

              <div className="card bg-green-50 shadow-lg">
                <div className="card-body">
                  <h4 className="card-title text-green-600">💊 Available Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Emergency medical funding</li>
                    <li>• Insurance claim assistance</li>
                    <li>• Hospital liaison support</li>
                    <li>• Medicine procurement help</li>
                    <li>• Family counseling services</li>
                  </ul>
                  <div className="card-actions">
                    <button className="btn btn-outline btn-sm">Get Help</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">How to Apply for Medical Aid</h4>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker bg-primary text-primary-content">1</div>
                <div className="timeline-content">
                  <h5 className="timeline-title">Submit Application</h5>
                  <p className="timeline-description">
                    Fill out the medical aid application with required documents
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker bg-secondary text-secondary-content">2</div>
                <div className="timeline-content">
                  <h5 className="timeline-title">Medical Review</h5>
                  <p className="timeline-description">
                    Our medical committee reviews the case and verifies documentation
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker bg-accent text-accent-content">3</div>
                <div className="timeline-content">
                  <h5 className="timeline-title">Case Approval</h5>
                  <p className="timeline-description">
                    Approved cases are published on the platform for community support
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker bg-success text-success-content">4</div>
                <div className="timeline-content">
                  <h5 className="timeline-title">Fund Distribution</h5>
                  <p className="timeline-description">
                    Collected funds are directly transferred to the hospital or patient
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-yellow-50 shadow-lg">
            <div className="card-body">
              <h4 className="card-title text-yellow-600">📞 Emergency Contact</h4>
              <p className="mb-4">
                If you or someone you know needs immediate medical assistance, contact our 24/7 helpline:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">Medical Emergency Hotline</p>
                  <p className="text-lg font-mono">+880-1700-000000</p>
                </div>
                <div>
                  <p className="font-bold">Email Support</p>
                  <p>medical.aid@uniconnect.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Case Modal */}
      {showCreateCase && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Submit New Medical Case</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Patient Name</span>
                  </label>
                  <input type="text" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Student ID</span>
                  </label>
                  <input type="text" className="input input-bordered" required />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Medical Condition</span>
                </label>
                <input type="text" className="input input-bordered" required />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Treatment Cost (৳)</span>
                </label>
                <input type="number" className="input input-bordered" required />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea className="textarea textarea-bordered" rows="4" required></textarea>
              </div>
              
              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => setShowCreateCase(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Submit Case</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalAid;

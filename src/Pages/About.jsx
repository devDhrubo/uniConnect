
const About = () => {
  const developers = [
    {
      name: "Dhrubo Dev",
      role: "Full Stack Developer",
      image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/devDhrubo",
      linkedin: "https://linkedin.com/in/devdhrubo"
    },
    {
      name: "Team Member 2",
      role: "Frontend Developer",
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      skills: ["React", "TailwindCSS", "JavaScript", "UI/UX"],
      github: "https://github.com/teammember2",
      linkedin: "https://linkedin.com/in/teammember2"
    },
    {
      name: "Team Member 3",
      role: "Backend Developer",
      image: "https://img.daisyui.com/images/stock/photo-1472099645785-5658abf4ff4e.webp",
      skills: ["Node.js", "MongoDB", "API Design", "Database"],
      github: "https://github.com/teammember3",
      linkedin: "https://linkedin.com/in/teammember3"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-blue-600">uniConnect</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting university communities through innovative solutions for campus life, 
          emergency support, and student engagement.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Mission */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl text-blue-800 mb-4">
              🎯 Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To create a comprehensive digital platform that enhances university life by 
              facilitating blood donations, emergency aid, lost item recovery, and community 
              engagement. We aim to build stronger, more connected campus communities where 
              students can easily help each other and access essential services.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl text-purple-800 mb-4">
              🌟 Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To become the leading platform for university community management across 
              Bangladesh and beyond. We envision a future where every campus has access 
              to digital tools that promote safety, solidarity, and seamless communication 
              among students, faculty, and staff.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-red-800 mb-2">Community</h3>
            <p className="text-sm text-gray-600">Building stronger connections within university ecosystems</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold text-green-800 mb-2">Innovation</h3>
            <p className="text-sm text-gray-600">Leveraging technology to solve real campus problems</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-bold text-yellow-800 mb-2">Impact</h3>
            <p className="text-sm text-gray-600">Creating meaningful change in students' daily lives</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-blue-800 mb-2">Trust</h3>
            <p className="text-sm text-gray-600">Ensuring secure and reliable platform experiences</p>
          </div>
        </div>
      </div>

      {/* Developer Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Meet Our Team
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We're a passionate team of developers committed to creating innovative solutions 
          for university communities. Our diverse skills and shared vision drive us to 
          build exceptional digital experiences.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {developers.map((developer, index) => (
            <div key={index} className="card bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-10 pt-10">
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl text-gray-800">
                  {developer.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {developer.role}
                </p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {developer.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="badge badge-outline badge-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="card-actions">
                  <a
                    href={developer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    GitHub
                  </a>
                  <a
                    href={developer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline btn-info"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Platform Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-red-50 border border-red-200">
            <div className="card-body">
              <h3 className="card-title text-red-700">🩸 Blood Bank</h3>
              <p className="text-gray-600">Donor registration and blood request management system</p>
            </div>
          </div>
          <div className="card bg-blue-50 border border-blue-200">
            <div className="card-body">
              <h3 className="card-title text-blue-700">🔍 Lost & Found</h3>
              <p className="text-gray-600">Report and find lost items across campus</p>
            </div>
          </div>
          <div className="card bg-green-50 border border-green-200">
            <div className="card-body">
              <h3 className="card-title text-green-700">🌊 Emergency Aid</h3>
              <p className="text-gray-600">Flood relief and medical aid donation coordination</p>
            </div>
          </div>
          <div className="card bg-yellow-50 border border-yellow-200">
            <div className="card-body">
              <h3 className="card-title text-yellow-700">🎉 Events</h3>
              <p className="text-gray-600">Campus event discovery and management</p>
            </div>
          </div>
          <div className="card bg-purple-50 border border-purple-200">
            <div className="card-body">
              <h3 className="card-title text-purple-700">🛒 Marketplace</h3>
              <p className="text-gray-600">Buy, sell, and auction student items</p>
            </div>
          </div>
          <div className="card bg-orange-50 border border-orange-200">
            <div className="card-body">
              <h3 className="card-title text-orange-700">📢 Bulletin</h3>
              <p className="text-gray-600">Important announcements and notices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-600 mb-6">
          Have questions, suggestions, or want to contribute to uniConnect? 
          We'd love to hear from you!
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary">
            📧 Contact Us
          </button>
          <button className="btn btn-outline btn-primary">
            🐙 Contribute on GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

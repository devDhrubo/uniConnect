import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white mt-16">
        <div className="container mx-auto px-6 py-8 ">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 main-col">uniConnect</h3>
              <p className="text-gray-600 text-sm">
                A unified platform connecting students for causes, events, and
                exchanges.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/blood-donation" className="hover:text-red-600">
                    Blood Donation
                  </a>
                </li>
                <li>
                  <a href="/lost-found" className="hover:text-blue-600">
                    Lost & Found
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-yellow-600">
                    Campus Events
                  </a>
                </li>
                <li>
                  <a href="/auction" className="hover:text-purple-600">
                    Marketplace
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/flood-relief" className="hover:text-green-600">
                    Flood Relief
                  </a>
                </li>
                <li>
                  <a href="/medical-aid" className="hover:text-green-600">
                    Medical Aid
                  </a>
                </li>
                <li>
                  <a href="/bulletin" className="hover:text-orange-600">
                    Bulletin Board
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📧 uniconnect.diu.ac</li>
                <li>📞 +880-1234-567890</li>
                <li>📍 Permanent Campus, Satarkul 1212</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
            <p>
              &copy; 2025 uniConnect. Built with ❤️ for university communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

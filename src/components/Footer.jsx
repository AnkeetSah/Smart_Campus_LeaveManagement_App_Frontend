import React, { useState } from "react";
import {
  RiLeafLine,
  RiFacebookFill,
  RiTwitterFill,
  RiLinkedinFill,
  RiInstagramFill,
  RiUserLine,
} from "react-icons/ri";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-blue-300 via-blue-200 to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-black pt-14 pb-12 overflow-hidden border-t border-gray-200/40 dark:border-gray-800">
     

      

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <RiLeafLine className="text-white text-xl" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                University Leave Management
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Streamlining leave management for students, faculty, and staff
              with a secure and efficient platform.
            </p>

            <div className="flex space-x-3">
              {[
                { icon: RiFacebookFill, hover: "hover:text-blue-600" },
                { icon: RiTwitterFill, hover: "hover:text-sky-500" },
                { icon: RiLinkedinFill, hover: "hover:text-blue-700" },
                { icon: RiInstagramFill, hover: "hover:text-pink-500" },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg ${s.hover} dark:hover:text-blue-400`}
                >
                  <s.icon className="text-lg text-gray-600 dark:text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-4 border-b border-blue-500/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {["Student Login", "Faculty Login", "Warden Login", "Guard Login"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    <RiUserLine className="mr-2 text-blue-500 dark:text-blue-400 w-4 h-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-4 border-b border-blue-500/20 pb-2">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              {["User Guide", "FAQs", "Policy", "Support"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 mr-2"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-4 border-b border-blue-500/20 pb-2">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to get announcements and updates directly in your inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col space-y-3 bg-white/60 dark:bg-gray-800/70 backdrop-blur-md p-4 rounded-lg shadow-md"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="w-full py-2 text-sm font-medium rounded bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200/40 dark:border-gray-700/40 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 University Leave Portal. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

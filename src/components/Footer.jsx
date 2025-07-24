import React from 'react'
import { RiLeafLine } from "react-icons/ri";

const Footer = () => {
  return (
   <footer className="relative bg-gradient-to-b from-blue-300 via-blue-200 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-black py-12 z-10 border-t border-gray-200/50 dark:border-gray-700/50">
  <div className="absolute -top-6 left-0 right-0 flex justify-center">
    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-full flex items-center justify-center shadow-lg dark:shadow-xl">
      <RiLeafLine className="text-white text-2xl" />
    </div>
  </div>
  
  <div className=" px-4">
    <div className="flex flex-col md:flex-row  md:justify-between md:items-center">
      <div className="flex items-center space-x-3 mb-6 md:mb-0">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 rounded-lg flex items-center justify-center shadow-sm dark:shadow-lg">
          <RiLeafLine className="text-white text-lg" />
        </div>
        <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">University Leave Management</span>
      </div>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-black dark:text-gray-300 font-semibold dark:font-normal transition-colors duration-200">Student Login</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-black dark:text-gray-300 transition-colors duration-200">Faculty Login</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-black dark:text-gray-300 transition-colors duration-200">Warden Login</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-black dark:text-gray-300 transition-colors duration-200">Guard Login</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-black dark:text-gray-300 transition-colors duration-200">User Guide</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-black dark:text-gray-300 transition-colors duration-200">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 text-black dark:text-gray-300 transition-colors duration-200">Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center justify-center md:justify-start">
              <svg className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              support@university.edu
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <svg className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              +91-XXXX-XXXXXX
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <svg className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Admin Block, Room 12
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
      <p>© 2024 University Leave Portal. All rights reserved.</p>
    </div>
  </div>
</footer>
  )
}

export default Footer
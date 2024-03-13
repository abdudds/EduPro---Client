import React from 'react'

function Footer() {
  return (
    <footer className="bg-black py-24 pl-10 relative z-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          <div className="text-white pr-10">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              EduPro is your premier e-learning platform dedicated to providing
              high-quality education to students worldwide.
            </p>
          </div>

          <div className="text-white">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">Email: contact@edupro.com</p>
            <p className="text-gray-300">Phone: +1 (123) 456-7890</p>
            <p className="text-gray-300">Address: 123 Main Street, City, Country</p>
          </div>

          <div className="text-white">
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <ul className="list-none">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-accent text-2xl w-6 h-6"
              >
                <path d="M10 15a7 7 0 1 0 0-10 7 7 0 0 0 0 10z"></path>
                <path d="M17.67 10a6.09 6.09 0 0 0-3.05-3.92"></path>
                <path d="M17.67 10H20v.5"></path>
                <path d="M14 10h2.5"></path>
                <path d="M20 16.5V10"></path>
                <path d="M10 20v-5"></path>
                <path d="M16 20a2 2 0 0 0 4 0v-3a8 8 0 0 0-4-7"></path>
                <path d="M20 20v1"></path>
              </svg>
              <h2 className="font-display font-bold text-xl">Flavour Fusion</h2>
            </div>
            <p className="text-neutral-300 text-sm mb-4">Revolutionizing meal preparation with AI-powered ingredient identification and flavor pairing.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="font-accent font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#" className="hover:text-white transition">Ingredient Identification</a></li>
              <li><a href="#" className="hover:text-white transition">Flavor Analysis</a></li>
              <li><a href="#" className="hover:text-white transition">Pairing Recommendations</a></li>
              <li><a href="#" className="hover:text-white transition">Recipe Suggestions</a></li>
              <li><a href="#" className="hover:text-white transition">Waste Reduction</a></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="font-accent font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Flavor Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Recipe Database</a></li>
              <li><a href="#" className="hover:text-white transition">Cooking Techniques</a></li>
              <li><a href="#" className="hover:text-white transition">Sustainability Tips</a></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h3 className="font-accent font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Flavour Fusion. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

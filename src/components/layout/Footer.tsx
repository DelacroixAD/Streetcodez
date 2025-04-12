
import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-medishare-600" />
              <span className="text-lg font-bold text-medishare-700 dark:text-medishare-300">
                MediShare Secure Vault
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              HIPAA-compliant platform for secure medical document sharing between patients and healthcare providers.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/shared" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Shared
                </Link>
              </li>
              <li>
                <Link to="/activity" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Activity
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/hipaa" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300 text-sm">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} MediShare Secure Vault. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0
                  01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0
                  003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-medishare-600 dark:text-gray-400 dark:hover:text-medishare-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11
                  19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4
                  0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

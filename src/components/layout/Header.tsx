
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, UserCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/lib/stores/userStore";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { toast } = useToast();
  const { user, logout } = useUserStore();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been securely logged out of your account",
    });
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-medishare-600" />
          <span className="text-xl font-bold text-medishare-700 dark:text-medishare-300">
            MediShare Secure Vault
          </span>
        </Link>

        {/* Welcome message for logged in users */}
        {user && (
          <div className="hidden md:flex text-medishare-600 font-medium mx-4">
            Welcome, {user.name}!
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-medishare-600 dark:text-gray-300 dark:hover:text-medishare-300">
            Dashboard
          </Link>
          <Link to="/documents" className="text-gray-600 hover:text-medishare-600 dark:text-gray-300 dark:hover:text-medishare-300">
            Documents
          </Link>
          <Link to="/shared" className="text-gray-600 hover:text-medishare-600 dark:text-gray-300 dark:hover:text-medishare-300">
            Shared
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="ghost" className="text-gray-600 hover:text-medishare-600 dark:text-gray-300 dark:hover:text-medishare-300">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-800 animate-fadeIn">
          <nav className="flex flex-col space-y-3 py-3">
            {user && (
              <div className="text-medishare-600 font-medium px-3 py-2">
                Welcome, {user.name}!
              </div>
            )}
            <Link
              to="/dashboard"
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/documents"
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              Documents
            </Link>
            <Link
              to="/shared"
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              Shared
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMobileMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={toggleMobileMenu}>
                  <Button className="w-full justify-start">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

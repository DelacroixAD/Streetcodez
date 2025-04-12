
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <FileQuestion className="h-20 w-20 text-medishare-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Oops! The page you are looking for could not be found.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page might have been removed, renamed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/">
              <Button>
                Return to Home
              </Button>
            </Link>
            <Link to="/documents">
              <Button variant="outline">
                Go to Documents
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;

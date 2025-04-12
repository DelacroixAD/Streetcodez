
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Lock, FileText, Users, Activity, ArrowRight } from "lucide-react";
import EncryptionVisualizer from "@/components/encryption/EncryptionVisualizer";
import { useUserStore } from "@/lib/stores/userStore";

const Index = () => {
  const { user } = useUserStore();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-medishare-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center bg-medishare-100 dark:bg-medishare-900/50 text-medishare-800 dark:text-medishare-200 rounded-full px-3 py-1 text-sm font-medium mb-6">
                <Shield className="h-4 w-4 mr-1" />
                HIPAA Compliant Security
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Secure Medical Document Sharing Made Simple
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                End-to-end encrypted platform for patients and healthcare providers to safely exchange sensitive medical information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="w-full sm:w-auto">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
              {user && (
                <p className="mt-4 text-green-600 font-medium">
                  Welcome back, {user.name}!
                </p>
              )}
            </div>
            <div className="md:w-1/2">
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Secure Medical Document Sharing" 
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Protected Health Information Exchange</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform ensures your medical data remains secure and private while enabling efficient collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="h-14 w-14 rounded-full bg-medishare-100 dark:bg-medishare-900/50 flex items-center justify-center mb-4">
                <Lock className="h-7 w-7 text-medishare-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Military-grade AES-256 encryption ensures your files are secure from upload to storage to sharing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="h-14 w-14 rounded-full bg-medishare-100 dark:bg-medishare-900/50 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-medishare-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Granular File Permissions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Control exactly who can access your medical documents with precise role-based permissions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="h-14 w-14 rounded-full bg-medishare-100 dark:bg-medishare-900/50 flex items-center justify-center mb-4">
                <Activity className="h-7 w-7 text-medishare-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Audit Logging</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track every view, edit, and share with detailed audit trails for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How MediShare Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A simple, secure process for managing your medical documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-medishare-100 dark:bg-medishare-900/50 flex items-center justify-center">
                  <span className="text-medishare-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Upload Documents Securely</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Documents are encrypted before they leave your device, ensuring maximum security from the start.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-medishare-100 dark:bg-medishare-900/50 flex items-center justify-center">
                  <span className="text-medishare-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Manage Access Controls</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose which healthcare providers can access specific documents and for how long.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-medishare-100 dark:bg-medishare-900/50 flex items-center justify-center">
                  <span className="text-medishare-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Monitor Document Activity</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track when your documents are viewed or downloaded with detailed audit logs.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <EncryptionVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose MediShare Secure Vault?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform is built from the ground up with security and HIPAA compliance in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {/* Feature 1 */}
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">HIPAA Compliant</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Built to meet all requirements for handling Protected Health Information (PHI).
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  AES-256 encryption ensures data is secure in transit and at rest.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Detailed Audit Logs</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track every access, download, and share with comprehensive logging.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Granular permissions ensure only authorized users can access specific documents.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Secure Document Sharing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Share documents with specific providers without compromising security.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">User Activity Monitoring</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time alerts for suspicious activity or unauthorized access attempts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useUserStore } from "@/lib/stores/userStore";
import { useToast } from "@/components/ui/use-toast";

const Pricing = () => {
  const { user } = useUserStore();
  const { toast } = useToast();

  const handleSubscribe = (plan: "free" | "professional" | "enterprise") => {
    // In a real app, this would redirect to a payment processor
    toast({
      title: "Subscription Updated",
      description: `You have successfully subscribed to the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Secure Storage Plan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Flexible pricing options designed to fit the needs of patients and healthcare providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>For individual patients</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Store up to 10 medical documents</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic encryption</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Share with 1 healthcare provider</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>7-day activity history</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {user ? (
                <Button className="w-full" onClick={() => handleSubscribe("free")}>
                  Get Started
                </Button>
              ) : (
                <Link to="/register" className="w-full">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              )}
            </CardFooter>
          </Card>

          {/* Professional Plan */}
          <Card className="border-2 border-medishare-500 hover:shadow-lg transition-shadow relative">
            <div className="absolute top-0 left-0 right-0 bg-medishare-500 text-white text-center py-1 text-sm font-medium">
              Most Popular
            </div>
            <CardHeader className="pt-8">
              <CardTitle className="text-2xl">Professional</CardTitle>
              <CardDescription>For patients with complex needs</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Store unlimited medical documents</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Advanced end-to-end encryption</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Share with up to 5 healthcare providers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>1-year activity history</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Batch document upload</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Secure document categories</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {user ? (
                <Button className="w-full" onClick={() => handleSubscribe("professional")}>
                  Upgrade Now
                </Button>
              ) : (
                <Link to="/register" className="w-full">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              )}
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>For healthcare providers</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29.99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>All Professional features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Manage unlimited patients</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Patient grouping and organization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>HIPAA compliance reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Audit trail exports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom branding options</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {user ? (
                <Button className="w-full" onClick={() => handleSubscribe("enterprise")}>
                  Contact Sales
                </Button>
              ) : (
                <Link to="/register" className="w-full">
                  <Button className="w-full">Contact Sales</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-medishare-600 mr-3" />
            <h2 className="text-2xl font-bold">Enterprise-Grade Security for Everyone</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            All plans include our base security features: AES-256 encryption at rest, TLS encryption in transit, 
            two-factor authentication, and regular security audits to ensure your medical information stays protected.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Us For Custom Plans</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pricing;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/lib/stores/userStore";
import { Shield, Lock } from "lucide-react";
import RoleSelector from "@/components/auth/RoleSelector";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"patient" | "provider">("patient");
  const [step, setStep] = useState(1);
  
  const { login, isLoading } = useUserStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as "patient" | "provider");
  };

  const handleNextStep = () => {
    if (!role) {
      toast({
        title: "Please select a role",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Email and password are required",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await login(email, password, role);
      toast({
        title: "Login successful",
        description: "Welcome back to MediShare Secure Vault",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-screen-lg mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-medishare-100 dark:bg-medishare-900/50 mb-4">
                <Lock className="h-8 w-8 text-medishare-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Log in to access your secure medical documents
              </p>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                <RoleSelector selectedRole={role} onRoleChange={handleRoleChange} />
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleNextStep}
                >
                  Continue
                </Button>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-medishare-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <CardDescription>
                      You're logging in as a {role === "patient" ? "Patient" : "Healthcare Provider"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-medishare-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;

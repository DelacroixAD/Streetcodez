
import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/stores/userStore";
import { useToast } from "@/components/ui/use-toast";
import { User, Shield, Phone, Mail, MapPin, Calendar, Save } from "lucide-react";

const Profile = () => {
  const { user, updateProfile } = useUserStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved",
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{user.name}'s Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input 
                          id="name" 
                          type="text" 
                          className="pl-10" 
                          defaultValue={user.name}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input 
                          id="email" 
                          type="email" 
                          className="pl-10" 
                          defaultValue={user.email}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input 
                          id="phone" 
                          type="text" 
                          className="pl-10" 
                          defaultValue={user.phoneNumber}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input 
                          id="dob" 
                          type="date" 
                          className="pl-10" 
                          defaultValue={user.dateOfBirth}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input 
                          id="address" 
                          type="text" 
                          className="pl-10" 
                          defaultValue={user.address}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your account details and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Account Type</h3>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-medishare-600" />
                    <span className="capitalize">{user.role}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Account Security</h3>
                  <Button variant="outline" className="w-full mb-2">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Two-Factor Authentication
                  </Button>
                </div>
                
                {user.role === "provider" && (
                  <div>
                    <h3 className="font-medium mb-2">Provider Details</h3>
                    <div className="space-y-2">
                      <Label htmlFor="speciality">Speciality</Label>
                      <Input 
                        id="speciality" 
                        type="text" 
                        defaultValue={user.speciality}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;

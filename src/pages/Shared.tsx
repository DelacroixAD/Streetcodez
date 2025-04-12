
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, UserPlus, Clock, MoreHorizontal, ShieldCheck } from "lucide-react";
import DocumentCard from "@/components/documents/DocumentCard";
import { useUserStore } from "@/lib/stores/userStore";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

const Shared = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) {
    navigate("/login");
    return null;
  }

  const connections = user.connections;
  const filteredConnections = connections.filter(conn => 
    conn.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = () => {
    toast({
      title: "Invitation Sent",
      description: "A secure invitation has been sent to add a new connection",
    });
  };

  const handleRemoveConnection = (connectionName: string) => {
    toast({
      title: "Connection Removed",
      description: `${connectionName} has been removed from your connections`,
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {user.role === "patient" ? "My Healthcare Providers" : "My Patients"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {user.role === "patient" 
                ? "Manage healthcare providers with access to your documents" 
                : "View and manage patients who have shared documents with you"}
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0"
            onClick={handleShare}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {user.role === "patient" ? "Add Provider" : "Invite Patient"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>
                  {user.role === "patient" ? "My Providers" : "My Patients"}
                </CardTitle>
                <CardDescription>
                  {user.role === "patient" 
                    ? "Healthcare professionals with access to your records" 
                    : "Patients who have shared their medical documents"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder={`Search ${user.role === "patient" ? "providers" : "patients"}...`}
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Tabs defaultValue="active" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                  </TabsList>

                  <TabsContent value="active">
                    <div className="space-y-4">
                      {filteredConnections
                        .filter(conn => conn.status === "active")
                        .map((connection) => (
                          <div key={connection.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback className="bg-medishare-100 dark:bg-medishare-800 text-medishare-800 dark:text-medishare-100">
                                  {connection.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{connection.name}</div>
                                <div className="text-sm text-gray-500 flex items-center">
                                  {connection.role === "provider" && connection.speciality ? (
                                    <span>{connection.speciality}</span>
                                  ) : (
                                    <span>Patient</span>
                                  )}
                                  <span className="mx-2">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Last active {formatDistanceToNow(connection.lastActivity, { addSuffix: true })}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" className="hidden sm:flex">
                                <ShieldCheck className="h-4 w-4 mr-1 text-medishare-600" />
                                Manage Access
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Shared Documents</DropdownMenuItem>
                                  <DropdownMenuItem>Manage Access</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleRemoveConnection(connection.name)} className="text-red-600">
                                    Remove Connection
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                        
                      {filteredConnections.filter(conn => conn.status === "active").length === 0 && (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                          <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No active connections</h3>
                          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            {user.role === "patient" 
                              ? "You haven't added any healthcare providers yet" 
                              : "No patients have shared documents with you"}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="pending">
                    <div className="space-y-4">
                      {filteredConnections
                        .filter(conn => conn.status === "pending")
                        .map((connection) => (
                          <div key={connection.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100">
                                  {connection.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{connection.name}</div>
                                <div className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center">
                                  <span>Pending invitation</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" className="hidden sm:flex">
                                Resend Invitation
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleRemoveConnection(connection.name)} className="text-red-600">
                                    Cancel Invitation
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                        
                      {filteredConnections.filter(conn => conn.status === "pending").length === 0 && (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                          <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No pending invitations</h3>
                          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            {user.role === "patient" 
                              ? "You don't have any pending invitations to healthcare providers" 
                              : "No pending patient invitations"}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">
              {user.role === "provider" ? "Recently Shared With You" : "Recently Shared By You"}
            </h2>
            
            <div className="space-y-4">
              {user.documents.slice(0, 3).map((doc) => (
                <DocumentCard key={doc.id} {...doc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shared;


import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockActivities } from "@/lib/data/mockData";
import ActivityLog from "@/components/activity/ActivityLog";
import { useUserStore } from "@/lib/stores/userStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Activity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not logged in - in a real app would use a proper auth guard
  if (!user) {
    navigate("/login");
    return null;
  }

  // Filter activities based on search term
  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.documentName
      ? activity.documentName.toLowerCase().includes(searchTerm.toLowerCase())
      : activity.type.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Apply date filter
    if (dateFilter === "today") {
      const today = new Date();
      return (
        matchesSearch &&
        activity.timestamp.getDate() === today.getDate() &&
        activity.timestamp.getMonth() === today.getMonth() &&
        activity.timestamp.getFullYear() === today.getFullYear()
      );
    }
    
    if (dateFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesSearch && activity.timestamp >= weekAgo;
    }
    
    if (dateFilter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return matchesSearch && activity.timestamp >= monthAgo;
    }
    
    return matchesSearch;
  });

  const handleExportLog = () => {
    toast({
      title: "Audit Log Exported",
      description: "The activity log has been exported to a secure encrypted file",
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Activity Log</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive audit trail of all document and security activities
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={handleExportLog}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Log
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>
                  HIPAA-compliant activity logging
                </CardDescription>
              </div>
              <div className="flex items-center mt-4 sm:mt-0">
                <AlertCircle className="h-4 w-4 text-medishare-600 mr-2" />
                <span className="text-sm text-medishare-600">All actions are permanently logged</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search activities..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Activity</TabsTrigger>
                <TabsTrigger value="access">Access Events</TabsTrigger>
                <TabsTrigger value="document">Document Events</TabsTrigger>
                <TabsTrigger value="security">Security Events</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <ActivityLog activities={filteredActivities} />
              </TabsContent>

              <TabsContent value="access">
                <ActivityLog
                  activities={filteredActivities.filter(
                    activity => activity.type === "access" || activity.type === "login" || activity.type === "logout"
                  )}
                />
              </TabsContent>

              <TabsContent value="document">
                <ActivityLog
                  activities={filteredActivities.filter(
                    activity => activity.type === "upload" || activity.type === "download" || activity.type === "share"
                  )}
                />
              </TabsContent>

              <TabsContent value="security">
                <ActivityLog
                  activities={filteredActivities.filter(
                    activity => activity.type === "login" || activity.type === "logout"
                  )}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Activity;

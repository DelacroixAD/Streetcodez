
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, LockIcon, UnlockIcon, UserIcon, EyeIcon, DownloadIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUserStore } from "@/lib/stores/userStore";

export interface ActivityItem {
  id: string;
  type: "upload" | "access" | "share" | "download" | "login" | "logout" | "export" | "view";
  documentName?: string;
  user?: string;
  userRole: "patient" | "provider";
  timestamp: Date;
  details?: string;
}

interface ActivityLogProps {
  activities: ActivityItem[];
  maxHeight?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities, maxHeight = "600px" }) => {
  const { user } = useUserStore();
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
  
  // Add real-time polling for activity updates
  useEffect(() => {
    // Update activities with current user info if needed
    const updatedActivities = activities.map(activity => ({
      ...activity,
      user: activity.user || (user ? user.name : "Unknown User"),
      userRole: activity.userRole || (user ? user.role : "patient")
    }));
    
    setActivityItems(updatedActivities);
    
    // Set up polling to simulate real-time updates
    const intervalId = setInterval(() => {
      setActivityItems(prev => [...prev]);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [activities, user]);

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "upload":
        return <FileIcon className="h-4 w-4 text-green-500" />;
      case "access":
        return <EyeIcon className="h-4 w-4 text-blue-500" />;
      case "share":
        return <UnlockIcon className="h-4 w-4 text-yellow-500" />;
      case "download":
        return <DownloadIcon className="h-4 w-4 text-purple-500" />;
      case "login":
        return <UserIcon className="h-4 w-4 text-medishare-600" />;
      case "logout":
        return <LockIcon className="h-4 w-4 text-gray-500" />;
      case "export":
        return <DownloadIcon className="h-4 w-4 text-blue-500" />;
      case "view":
        return <EyeIcon className="h-4 w-4 text-blue-500" />;
      default:
        return <FileIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityDescription = (activity: ActivityItem) => {
    switch (activity.type) {
      case "upload":
        return `uploaded a new document: "${activity.documentName}"`;
      case "access":
        return `viewed document: "${activity.documentName}"`;
      case "share":
        return `shared document: "${activity.documentName}"`;
      case "download":
        return `downloaded document: "${activity.documentName}"`;
      case "login":
        return "logged into their account";
      case "logout":
        return "logged out of their account";
      case "export":
        return `exported logs: ${activity.details || ""}`;
      case "view":
        return `viewed document: "${activity.documentName}"`;
      default:
        return "performed an unknown action";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`h-full max-h-[${maxHeight}]`}>
          <div className="space-y-4">
            {activityItems.map((activity) => (
              <div key={activity.id} className="flex space-x-3">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    <span className="capitalize">{activity.userRole}</span>: {activity.user || user?.name || "Unknown"}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getActivityDescription(activity)}
                  </p>
                  {activity.details && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.details}
                    </p>
                  )}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;

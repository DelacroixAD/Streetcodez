
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileIcon, Users, Activity, Shield, Lock, FileUp, UserCircle } from "lucide-react";
import { useUserStore } from "@/lib/stores/userStore";
import { useToast } from "@/components/ui/use-toast";
import DocumentCard from "@/components/documents/DocumentCard";
import ActivityLog from "@/components/activity/ActivityLog";
import EncryptionVisualizer from "@/components/encryption/EncryptionVisualizer";
import DocumentUploader from "@/components/documents/DocumentUploader";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { user, exportLogs, addActivity } = useUserStore();
  const { toast } = useToast();
  const [exportEmail, setExportEmail] = useState("");
  const [exportPasskey, setExportPasskey] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [activityItems, setActivityItems] = useState<any[]>([]);

  // Redirect if not logged in
  if (!user) {
    return (
      <PageLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Map activities to ActivityItem format
  useEffect(() => {
    if (user && user.activities) {
      const mappedActivities = user.activities.map(activity => ({
        ...activity,
        user: user.name,
        userRole: user.role
      }));
      setActivityItems(mappedActivities);
    }
  }, [user]);

  const handleExportLogs = async () => {
    if (!exportEmail || !exportPasskey) {
      toast({
        title: "Required fields missing",
        description: "Please enter both email and passkey",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportLogs(exportEmail, exportPasskey);
      
      // Add activity
      addActivity({
        id: `act-${Date.now()}`,
        type: "export",
        description: `Exported logs to ${exportEmail}`,
        timestamp: new Date()
      });
      
      toast({
        title: "Logs Exported",
        description: "Your logs have been encrypted and sent",
      });
      
      setExportEmail("");
      setExportPasskey("");
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your logs",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Get only the most recent documents
  const recentDocuments = user.documents.slice(0, 3);

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{user.name}'s Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your secure medical documents dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Documents</CardTitle>
              <CardDescription>
                Manage your secure medical files
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">{user.documents.length}</div>
              <p className="text-sm text-gray-500">Encrypted documents</p>
            </CardContent>
            <CardFooter>
              <Link to="/documents" className="w-full">
                <Button variant="outline" className="w-full">
                  <FileIcon className="h-4 w-4 mr-2" />
                  View All Documents
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {user.role === "patient" ? "My Providers" : "My Patients"}
              </CardTitle>
              <CardDescription>
                {user.role === "patient" 
                  ? "Healthcare providers with access" 
                  : "Patients sharing documents with you"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">
                {user.connections.length}
              </div>
              <p className="text-sm text-gray-500">
                {user.role === "patient" ? "Connected providers" : "Connected patients"}
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/shared" className="w-full">
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Connections
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity Log</CardTitle>
              <CardDescription>
                Document access and security events
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">{user.activities.length}</div>
              <p className="text-sm text-gray-500">Logged events</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/activity" className="flex-1 mr-2">
                <Button variant="outline" className="w-full">
                  <Activity className="h-4 w-4 mr-2" />
                  View Activity
                </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 ml-2">
                    <FileUp className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Export Encrypted Logs</DialogTitle>
                    <DialogDescription>
                      Your logs will be encrypted and shared securely.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="export-email">Email</Label>
                      <Input 
                        id="export-email" 
                        type="email" 
                        placeholder="Enter recipient email" 
                        value={exportEmail}
                        onChange={(e) => setExportEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="export-passkey">Encryption Passkey</Label>
                      <Input 
                        id="export-passkey" 
                        type="password" 
                        placeholder="Create a secure passkey" 
                        value={exportPasskey}
                        onChange={(e) => setExportPasskey(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleExportLogs} disabled={isExporting}>
                      {isExporting ? (
                        "Encrypting & Exporting..."
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Export Securely
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Documents</h2>
              <Link to="/documents">
                <Button variant="link" className="text-medishare-600">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc) => (
                  <DocumentCard key={doc.id} {...doc} />
                ))
              ) : (
                <p className="col-span-2 text-center text-gray-500 py-8">
                  No documents yet. Upload your first document below.
                </p>
              )}
              <Card className="border-dashed border-2 hover:border-medishare-300 transition-colors flex flex-col items-center justify-center p-6 cursor-pointer"
                onClick={() => toast({
                  title: "Upload Documents",
                  description: "Use the document uploader below to securely upload files",
                })}
              >
                <div className="rounded-full bg-medishare-100 dark:bg-medishare-900/50 p-3 mb-3">
                  <Upload className="h-6 w-6 text-medishare-600" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                  Upload New Document
                </p>
              </Card>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            {activityItems.length > 0 ? (
              <ActivityLog activities={activityItems.slice(0, 5)} maxHeight="330px" />
            ) : (
              <div className="text-center text-gray-500 py-8 border rounded-lg">
                <Activity className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No activity logged yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DocumentUploader />
          </div>
          <div>
            {user.role === "provider" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Provider Tools</CardTitle>
                  <CardDescription>
                    Special tools for healthcare providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/patients">
                    <Button className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      View All Patients
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Access Controls
                  </Button>
                </CardContent>
              </Card>
            )}
            <EncryptionVisualizer />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;


import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, UserPlus, Clock, MoreHorizontal, Eye, FileText, Activity, Folders } from "lucide-react";
import { useUserStore } from "@/lib/stores/userStore";
import { useNavigate, Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import DocumentCard from "@/components/documents/DocumentCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patientDocuments, setPatientDocuments] = useState<any[]>([]);
  const [showDocuments, setShowDocuments] = useState(false);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) {
    navigate("/login");
    return null;
  }

  // Only providers can access this page
  if (user.role !== "provider") {
    navigate("/dashboard");
    return null;
  }

  const patients = user.connections.filter(conn => conn.role === "patient");
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate random documents for a patient
  const generatePatientDocuments = (patientName: string) => {
    const docTypes = ["Blood Test", "X-Ray", "MRI Report", "Prescription", "Vaccination Record"];
    const securityLevels: ["encrypted", "protected", "public"] = ["encrypted", "protected", "public"];
    
    return Array(Math.floor(Math.random() * 5) + 2).fill(null).map((_, idx) => {
      const docType = docTypes[Math.floor(Math.random() * docTypes.length)];
      return {
        id: `pat-doc-${Date.now()}-${idx}`,
        name: `${patientName} - ${docType}.pdf`,
        type: "PDF",
        size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
        updatedAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))),
        securityLevel: securityLevels[Math.floor(Math.random() * securityLevels.length)]
      };
    });
  };

  const handleInvitePatient = () => {
    toast({
      title: "Invitation Sent",
      description: "A secure invitation has been sent to the patient",
    });
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    const docs = generatePatientDocuments(patient.name);
    setPatientDocuments(docs);
    setShowDocuments(true);
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Patients</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and access your patients' medical records
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0"
            onClick={handleInvitePatient}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite New Patient
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Patient Directory</CardTitle>
            <CardDescription>
              Securely access and manage patient records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search patients by name..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <Card key={patient.id} className="overflow-hidden">
                    <div className="border-l-4 border-medishare-500">
                      <div className="flex flex-col sm:flex-row justify-between p-4">
                        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-medishare-100 dark:bg-medishare-800 text-medishare-800 dark:text-medishare-100 text-lg">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{patient.name}</h3>
                            <div className="text-sm text-gray-500 flex items-center flex-wrap">
                              <span>Patient</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1 inline" />
                              <span>Last active {formatDistanceToNow(patient.lastActivity, { addSuffix: true })}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button onClick={() => handleViewPatient(patient)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Records
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewPatient(patient)}>
                                <FileText className="h-4 w-4 mr-2" />
                                View Documents
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Activity className="h-4 w-4 mr-2" />
                                View Activity
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Remove Access
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50">
                        <div>
                          <div className="text-xs text-gray-500">Last Document</div>
                          <div className="text-sm font-medium">Blood Test Report.pdf</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Shared Documents</div>
                          <div className="text-sm font-medium">5 documents</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Last Interaction</div>
                          <div className="text-sm font-medium">2 days ago</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No patients found</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    You don't have any patients yet or your search returned no results
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Patient Documents Dialog */}
        <Dialog open={showDocuments} onOpenChange={setShowDocuments}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center">
                  <Folders className="h-5 w-5 mr-2 text-medishare-600" />
                  {selectedPatient?.name}'s Documents
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {patientDocuments.map(doc => (
                <DocumentCard key={doc.id} {...doc} />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Patients;

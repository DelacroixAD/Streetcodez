
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Upload, ListFilter } from "lucide-react";
import DocumentCard from "@/components/documents/DocumentCard";
import DocumentUploader from "@/components/documents/DocumentUploader";
import { useUserStore } from "@/lib/stores/userStore";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploader, setShowUploader] = useState(false);
  const { user } = useUserStore();
  const navigate = useNavigate();

  // Redirect if not logged in - in a real app would use a proper auth guard
  if (!user) {
    navigate("/login");
    return null;
  }

  const filteredDocuments = user.documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}'s Documents</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and share your encrypted medical documents
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => setShowUploader(!showUploader)}
          >
            <Upload className="h-4 w-4 mr-2" />
            {showUploader ? "Hide Uploader" : "Upload Documents"}
          </Button>
        </div>

        {showUploader && (
          <div className="mb-8">
            <DocumentUploader />
          </div>
        )}

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Document Library</CardTitle>
            <CardDescription>
              All your medical documents in one secure place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <TabsList>
                  <TabsTrigger value="all">All Documents</TabsTrigger>
                  <TabsTrigger value="encrypted">Encrypted</TabsTrigger>
                  <TabsTrigger value="protected">Protected</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                </TabsList>
                
                <div className="flex w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search documents..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="ml-2">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="all">
                {filteredDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredDocuments.map((doc) => (
                      <DocumentCard key={doc.id} {...doc} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No documents found. Try adjusting your search or upload a new document.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="encrypted">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredDocuments
                    .filter(doc => doc.securityLevel === "encrypted")
                    .map((doc) => (
                      <DocumentCard key={doc.id} {...doc} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="protected">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredDocuments
                    .filter(doc => doc.securityLevel === "protected")
                    .map((doc) => (
                      <DocumentCard key={doc.id} {...doc} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="shared">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredDocuments
                    .filter(doc => doc.securityLevel === "public")
                    .map((doc) => (
                      <DocumentCard key={doc.id} {...doc} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Documents;

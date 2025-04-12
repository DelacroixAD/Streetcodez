import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/lib/stores/userStore";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    name: string;
    type: string;
    url?: string;
    source?: "google" | "local" | "imported";
    thumbnail?: string;
  } | null;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ isOpen, onClose, document }) => {
  const { toast } = useToast();
  const { addActivity } = useUserStore();

  if (!document) return null;

  const handleDownload = () => {
    if (document.url) {
      // In a real app, this would trigger a download
      toast({
        title: "Download Started",
        description: `${document.name} is being downloaded securely`,
      });

      // Log activity
      addActivity({
        id: `act-${Date.now()}`,
        type: "download",
        description: `Downloaded document: ${document.name}`,
        timestamp: new Date(),
        documentName: document.name
      });
    } else {
      toast({
        title: "Document Unavailable",
        description: "This document is currently unavailable for download",
        variant: "destructive"
      });
    }
  };

  const handleOpenInGoogle = () => {
    if (document.url && document.source === "google") {
      // Open the document in a new tab
      window.open(document.url, "_blank");
      
      // Log activity
      addActivity({
        id: `act-${Date.now()}`,
        type: "external-view",
        description: `Viewed document in Google Drive: ${document.name}`,
        timestamp: new Date(),
        documentName: document.name
      });
    }
  };

  const renderDocumentPreview = () => {
    // For Google documents with URLs, show thumbnail and offer to open in Google
    if (document.source === "google" && document.url) {
      return (
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-md p-4 flex flex-col items-center justify-center">
          {document.thumbnail ? (
            <img 
              src={document.thumbnail} 
              alt={document.name} 
              className="max-h-60 max-w-full object-contain mb-4"
            />
          ) : (
            <div className="text-5xl text-blue-600 mb-4">G</div>
          )}
          <p className="text-lg mb-2">{document.name}</p>
          <p className="text-sm text-gray-500 mb-4">{document.type} Document (Google Drive)</p>
          <div className="flex space-x-3">
            <Button onClick={handleOpenInGoogle} className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Google
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      );
    }
    
    // For other documents, keep the existing logic
    if (!document.url) {
      return (
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-md p-4 flex flex-col items-center justify-center">
          <div className="text-5xl text-red-600 mb-4">PDF</div>
          <p className="text-lg mb-2">{document.name}</p>
          <p className="text-sm text-gray-500 mb-4">PDF Document</p>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download to View
          </Button>
        </div>
      );
    }

    if (document.type === "PDF") {
      return (
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-md p-4 flex flex-col items-center justify-center">
          <div className="text-5xl text-red-600 mb-4">PDF</div>
          <p className="text-lg mb-2">{document.name}</p>
          <p className="text-sm text-gray-500 mb-4">PDF Document</p>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download to View
          </Button>
        </div>
      );
    }

    if (["JPG", "JPEG", "PNG", "Image"].includes(document.type)) {
      return (
        <div className="h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
          <img 
            src={document.url} 
            alt={document.name} 
            className="max-h-full max-w-full object-contain" 
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="text-center">
          <p className="text-lg mb-2">{document.name}</p>
          <p className="text-sm text-gray-500 mb-4">{document.type} Document</p>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download to View
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">{document.name}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="mt-4">
          {renderDocumentPreview()}
        </div>
        
        <div className="flex justify-end mt-4">
          {document.source === "google" && document.url ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleOpenInGoogle} className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Google
              </Button>
            </div>
          ) : (
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;

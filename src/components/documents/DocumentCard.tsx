import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileLock, 
  FileText, 
  Download, 
  Clock, 
  EyeIcon,
  FileSpreadsheet,
  FileSliders,
  FileImage,
  ExternalLink,
  Shield
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/lib/stores/userStore";
import DocumentViewer from "./DocumentViewer";

interface DocumentCardProps {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: Date;
  securityLevel: "encrypted" | "protected" | "public";
  url?: string;
  source?: "google" | "local" | "imported";
  thumbnail?: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ 
  id, 
  name, 
  type, 
  size, 
  updatedAt, 
  securityLevel, 
  url,
  source,
  thumbnail
}) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const { toast } = useToast();
  const { addActivity, user } = useUserStore();

  const getDocumentIcon = () => {
    const iconColor = securityLevel === "encrypted" 
      ? "text-red-500" 
      : securityLevel === "protected" 
        ? "text-yellow-500" 
        : "text-green-500";
    
    if (type === "XLSX" || type === "XLS" || type === "CSV") {
      return <FileSpreadsheet className={`h-8 w-8 ${iconColor}`} />;
    } else if (type === "Slides" || type === "PPT" || type === "PPTX") {
      return <FileSliders className={`h-8 w-8 ${iconColor}`} />;
    } else if (type === "Image" || type === "JPG" || type === "JPEG" || type === "PNG") {
      return <FileImage className={`h-8 w-8 ${iconColor}`} />;
    } else if (securityLevel === "encrypted" || securityLevel === "protected") {
      return <FileLock className={`h-8 w-8 ${iconColor}`} />;
    } else {
      return <FileText className={`h-8 w-8 ${iconColor}`} />;
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    
    toast({
      title: "Downloading Document",
      description: `${name} is being prepared for download`,
    });

    addActivity({
      id: `act-${Date.now()}`,
      type: "download",
      description: `Downloaded document: ${name}`,
      timestamp: new Date(),
      documentName: name
    });
  };

  const handleViewDocument = () => {
    setViewerOpen(true);

    addActivity({
      id: `act-${Date.now()}`,
      type: "view",
      description: `Viewed document: ${name}`,
      timestamp: new Date(),
      documentName: name
    });
  };

  return (
    <>
      <Card
        className="overflow-hidden border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleViewDocument}
      >
        <CardContent className="p-0">
          <div className={`h-2 ${
            securityLevel === "encrypted" 
              ? "bg-red-500" 
              : securityLevel === "protected" 
                ? "bg-yellow-500" 
                : "bg-green-500"
          }`} />
          
          <div className="p-4">
            {thumbnail ? (
              <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden h-28 flex items-center justify-center">
                <img 
                  src={thumbnail} 
                  alt={`${name} thumbnail`} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const iconElement = getDocumentIcon();
                      parent.appendChild(document.createElement('div')).appendChild(iconElement as unknown as Node);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-between items-start mb-4">
                {getDocumentIcon()}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div>
              <div className="flex items-center mb-1">
                <Shield className="h-4 w-4 mr-2 text-primary" />
                <h3 className="font-medium text-sm line-clamp-1" title={name}>{name}</h3>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{type} • {size}</span>
              </div>
              
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>Updated {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}</span>
              </div>
              
              {source === "google" && (
                <div className="mt-1 text-xs text-blue-500 flex items-center">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Google Drive</span>
                </div>
              )}
              
              <div className="mt-3 flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={handleViewDocument}
                >
                  <EyeIcon className="h-3 w-3 mr-1" />
                  View Document
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <DocumentViewer 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        document={{ id, name, type, url, source, thumbnail }}
      />
    </>
  );
};

export default DocumentCard;
export type { DocumentCardProps };

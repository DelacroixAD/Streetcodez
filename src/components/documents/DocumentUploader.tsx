
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Lock, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/lib/stores/userStore";

const DocumentUploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const { addDocument, addActivity } = useUserStore();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      handleFiles(newFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      handleFiles(newFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Filter for document files
    const validFiles = newFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, Word documents, and images are allowed",
        variant: "destructive"
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
    
    // Initialize progress for new files
    const newProgress: Record<string, number> = {};
    validFiles.forEach(file => {
      newProgress[file.name] = 0;
    });
    setUploadProgress(prev => ({ ...prev, ...newProgress }));

    // Simulate progress for demonstration
    validFiles.forEach(file => {
      simulateFileUpload(file);
    });
  };

  const simulateFileUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        
        // When upload completes
        setTimeout(() => {
          // Add the document to the user's document list
          const newDocument = {
            id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            type: file.type.split('/')[1].toUpperCase(),
            size: formatFileSize(file.size),
            updatedAt: new Date(),
            securityLevel: Math.random() > 0.5 ? "encrypted" : "protected" as "encrypted" | "protected" | "public",
            url: URL.createObjectURL(file)
          };
          
          addDocument(newDocument);
          
          // Log the activity
          addActivity({
            id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: "upload",
            description: `Uploaded document: ${file.name}`,
            timestamp: new Date(),
            documentName: file.name
          });
          
          toast({
            title: "Upload Complete",
            description: `${file.name} was encrypted and uploaded securely`,
          });
        }, 500);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: progress
      }));
    }, 300);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  const handleCompleteUpload = () => {
    // This would perform any final operations in a real app
    setFiles([]);
    setUploadProgress({});
    toast({
      title: "All Uploads Complete",
      description: "Your documents are now securely stored and encrypted",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Upload className="h-5 w-5 mr-2 text-medishare-600" />
          Secure Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-medishare-500 bg-medishare-50 dark:bg-medishare-900/20' : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto flex flex-col items-center justify-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-medishare-100 dark:bg-medishare-900/50 flex items-center justify-center">
              <Lock className="h-6 w-6 text-medishare-600" />
            </div>
            <h3 className="text-base font-medium">Drag files here or click to upload</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your files will be encrypted before upload
            </p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <Button asChild variant="outline" className="mt-2">
              <label htmlFor="file-upload">Select Files</label>
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-medium mb-2">Files</h4>
            {files.map((file, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium truncate max-w-[80%]">{file.name}</div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => removeFile(file.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {formatFileSize(file.size)}
                </div>
                <Progress value={uploadProgress[file.name] || 0} className="h-2" />
                {uploadProgress[file.name] === 100 && (
                  <div className="flex items-center mt-1">
                    <Lock className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">Encrypted & Uploaded</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      {files.length > 0 && (
        <CardFooter>
          <div className="w-full flex justify-end">
            <Button variant="outline" className="mr-2" onClick={() => setFiles([])}>
              Cancel
            </Button>
            <Button onClick={handleCompleteUpload}>
              <Lock className="h-4 w-4 mr-2" />
              Complete Upload
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default DocumentUploader;

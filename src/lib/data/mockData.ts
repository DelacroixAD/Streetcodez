
import { ActivityItem } from "@/components/activity/ActivityLog";
import { DocumentCardProps } from "@/components/documents/DocumentCard";

// Helper function to generate a random date within the last 30 days
const randomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  now.setDate(now.getDate() - daysAgo);
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  
  return now;
};

// Mock documents
export const mockDocuments: DocumentCardProps[] = [
  {
    id: "doc-1",
    name: "Blood Test Results",
    type: "PDF",
    size: "2.3 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "encrypted"
  },
  {
    id: "doc-2",
    name: "Medical History",
    type: "DOCX",
    size: "1.1 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "encrypted"
  },
  {
    id: "doc-3",
    name: "MRI Scan",
    type: "DICOM",
    size: "15.7 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "encrypted"
  },
  {
    id: "doc-4",
    name: "Prescription",
    type: "PDF",
    size: "0.5 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "protected"
  },
  {
    id: "doc-5",
    name: "Vaccination Record",
    type: "PDF",
    size: "1.2 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "public"
  },
  {
    id: "doc-6",
    name: "Consultation Notes",
    type: "DOCX",
    size: "0.8 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "protected"
  }
];

// Mock shared documents (for providers)
export const mockSharedDocuments: DocumentCardProps[] = [
  {
    id: "shared-1",
    name: "Emma Wilson's Allergy Report",
    type: "PDF",
    size: "1.5 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "encrypted"
  },
  {
    id: "shared-2",
    name: "James Miller's Lab Results",
    type: "PDF",
    size: "3.2 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "encrypted"
  },
  {
    id: "shared-3",
    name: "Sarah Johnson's Medical History",
    type: "DOCX",
    size: "2.1 MB",
    updatedAt: randomRecentDate(),
    securityLevel: "encrypted"
  }
];

// Mock activity log
export const mockActivities: ActivityItem[] = [
  {
    id: "act-1",
    type: "upload",
    documentName: "Blood Test Results",
    user: "John Doe",
    userRole: "patient",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    details: "Document encrypted with AES-256"
  },
  {
    id: "act-2",
    type: "share",
    documentName: "Blood Test Results",
    user: "John Doe",
    userRole: "patient",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1.5)),
    details: "Shared with Dr. Sarah Mitchell"
  },
  {
    id: "act-3",
    type: "access",
    documentName: "Blood Test Results",
    user: "Dr. Sarah Mitchell",
    userRole: "provider",
    timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 45)),
    details: "Access granted via secure key exchange"
  },
  {
    id: "act-4",
    type: "download",
    documentName: "Blood Test Results",
    user: "Dr. Sarah Mitchell",
    userRole: "provider",
    timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 30)),
    details: "Document decrypted on secure endpoint"
  },
  {
    id: "act-5",
    type: "login",
    user: "John Doe",
    userRole: "patient",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: "act-6",
    type: "upload",
    documentName: "Vaccination Record",
    user: "John Doe",
    userRole: "patient",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1))
  },
  {
    id: "act-7",
    type: "share",
    documentName: "Medical History",
    user: "John Doe",
    userRole: "patient",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
    details: "Shared with Dr. James Wilson"
  },
  {
    id: "act-8",
    type: "access",
    documentName: "Medical History",
    user: "Dr. James Wilson",
    userRole: "provider",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3))
  }
];


import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "provider";
  phoneNumber?: string;
  address?: string;
  speciality?: string;
  dateOfBirth?: string;
  documents: Document[];
  activities: Activity[];
  connections: Connection[];
}

export interface Document {
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

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  documentName?: string;
  user?: string;
}

export interface Connection {
  id: string;
  name: string;
  role: "patient" | "provider";
  speciality?: string;
  lastActivity: Date;
  status: "active" | "pending";
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: "patient" | "provider") => Promise<void>;
  register: (name: string, email: string, password: string, role: "patient" | "provider") => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addDocument: (document: Document) => void;
  addActivity: (activity: Activity) => void;
  exportLogs: (email: string, passkey: string) => Promise<void>;
}

// Google-like documents to add to users
const googleDocuments = [
  {
    name: "Health Insurance Policy.pdf",
    type: "PDF",
    size: "2.8 MB",
    securityLevel: "encrypted",
    source: "google",
    thumbnail: "https://lh3.googleusercontent.com/d/1CFs0bbndIaHVLz_QiUlxV_OMuJgPgJxD"
  },
  {
    name: "Medical History Summary.docx",
    type: "DOCX",
    size: "1.3 MB",
    securityLevel: "protected",
    source: "google",
    url: "https://docs.google.com/document/d/1KdJkMnasZXtU2SnR_gXjU9l5FYdR9bT_YUIXi0XQrmo/edit",
    thumbnail: "https://lh3.googleusercontent.com/d/1FV5SmT9BZeBcK0WKS5XuaH1EQw3cCLFV"
  },
  {
    name: "Lab Results March 2025.xlsx",
    type: "XLSX",
    size: "843 KB",
    securityLevel: "protected",
    source: "google",
    url: "https://docs.google.com/spreadsheets/d/1x8nJkSj_U3Y6m1ChLMx7h27MRZ4Ngzdt/edit",
    thumbnail: "https://lh3.googleusercontent.com/d/1BbvnshxKGpQQMgNoHqOPK9H2iQfWysmr"
  },
  {
    name: "COVID Vaccination Certificate.pdf",
    type: "PDF",
    size: "564 KB",
    securityLevel: "public",
    source: "google",
    url: "https://drive.google.com/file/d/1xW8nRSj_U3Y6m1ChLMx7h27MRZ4Ngzdt/view",
    thumbnail: "https://lh3.googleusercontent.com/d/1fkjXiQTZeMvB76Y1ChxUW_HGnnZ9Wqt2"
  },
  {
    name: "Prescription Jan 2025.jpg",
    type: "Image",
    size: "1.1 MB",
    securityLevel: "protected",
    source: "google",
    url: "https://drive.google.com/file/d/1BvnshxKGpQQMgNoHqOPK9H2iQfWysmr/view",
    thumbnail: "https://lh3.googleusercontent.com/d/1PzYMmJf6RCT3nZ9qL8V_H2iQfWysmr"
  },
  {
    name: "Hospital Discharge Summary.pdf",
    type: "PDF",
    size: "3.2 MB", 
    securityLevel: "encrypted",
    source: "google",
    thumbnail: "https://lh3.googleusercontent.com/d/1LsTZeMvB76Y1ChxUW_HGnnZ9Wqt2"
  },
  {
    name: "Family Medical History.slides",
    type: "Slides",
    size: "4.7 MB",
    securityLevel: "public",
    source: "google",
    url: "https://docs.google.com/presentation/d/1UZvPQQMgNoHqOPK9H2iQfWysmr/edit",
    thumbnail: "https://lh3.googleusercontent.com/d/18nJkSj_U3Y6m1ChLMx7h27MRZ4Ngzdt"
  }
];

// Provider-specific documents
const providerDocuments = [
  {
    name: "Patient Treatment Guidelines.pdf",
    type: "PDF",
    size: "2.4 MB",
    securityLevel: "protected",
    source: "google",
    url: "https://drive.google.com/file/d/1JdKGpQQMgNoHqOPK9H2iQfWysmr/view",
    thumbnail: "https://lh3.googleusercontent.com/d/1QzTZHMvB76Y1ChxUW_HGnnZ9Wqt2"
  },
  {
    name: "Medical Research Analysis.slides",
    type: "Slides",
    size: "5.9 MB",
    securityLevel: "public",
    source: "google",
    url: "https://docs.google.com/presentation/d/1RTB5SmT9BZeBcK0WKS5XuaH1EQw3cCLFV/edit",
    thumbnail: "https://lh3.googleusercontent.com/d/1WRjXiQTZeMvB76Y1ChxUW_HGnnZ9Wqt2"
  },
  {
    name: "Pharmacy Prescription Protocols.docx",
    type: "DOCX",
    size: "1.7 MB",
    securityLevel: "protected",
    source: "google",
    url: "https://docs.google.com/document/d/1QiUlxV_OMuJgPgJxD_gXjU9l5FYdR9bT_YUI/edit",
    thumbnail: "https://lh3.googleusercontent.com/d/1KGs0bbndIaHVLz_QiUlxV_OMuJgPgJxD"
  },
  {
    name: "Hospital Staff Directory.xlsx",
    type: "XLSX",
    size: "1.2 MB",
    securityLevel: "encrypted",
    source: "google",
    thumbnail: "https://lh3.googleusercontent.com/d/1TFRj_U3Y6m1ChLMx7h27MRZ4Ngzdt"
  }
];

// Sample user data for demo purposes
const createMockPatient = (name: string, email: string): User => {
  const id = `user-${Date.now()}`;
  
  // Get 3-5 random Google documents for patients
  const numDocs = Math.floor(Math.random() * 3) + 3;
  const googleDocs = [...googleDocuments]
    .sort(() => Math.random() - 0.5)
    .slice(0, numDocs)
    .map((doc, index) => ({
      id: `gdoc-${id}-${index}`,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      updatedAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))),
      securityLevel: doc.securityLevel as "encrypted" | "protected" | "public",
      source: doc.source as "google" | "local" | "imported",
      url: doc.url,
      thumbnail: doc.thumbnail
    }));
  
  // Original documents
  const originalDocs = [
    {
      id: `doc-${id}-1`,
      name: "Blood Test Report.pdf",
      type: "PDF",
      size: "1.2 MB",
      updatedAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))),
      securityLevel: "encrypted" as "encrypted" | "protected" | "public",
      source: "local" as "google" | "local" | "imported"
    },
    {
      id: `doc-${id}-2`,
      name: "X-Ray Results.jpg",
      type: "Image",
      size: "3.5 MB",
      updatedAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10))),
      securityLevel: "protected" as "encrypted" | "protected" | "public",
      url: "https://example.com/xray.jpg",
      source: "local" as "google" | "local" | "imported"
    }
  ];
  
  // Combine original documents with Google documents
  const allDocuments = [...originalDocs, ...googleDocs];
  
  return {
    id,
    name,
    email,
    role: "patient",
    phoneNumber: "+91 " + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0'),
    address: "Mumbai, Maharashtra, India",
    dateOfBirth: `${1970 + Math.floor(Math.random() * 30)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    documents: allDocuments,
    activities: [
      {
        id: `act-${id}-1`,
        type: "upload",
        description: "Uploaded new document",
        timestamp: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 5))),
        documentName: "Blood Test Report.pdf"
      },
      {
        id: `act-${id}-2`,
        type: "share",
        description: "Shared document with provider",
        timestamp: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 3))),
        documentName: "X-Ray Results.jpg"
      },
      {
        id: `act-${id}-3`,
        type: "import",
        description: "Imported documents from Google Drive",
        timestamp: new Date(),
        documentName: googleDocs[0]?.name
      }
    ],
    connections: []
  };
};

const createMockProvider = (name: string, email: string): User => {
  const id = `provider-${Date.now()}`;
  const patients = [
    "Amit Sharma", 
    "Priya Patel", 
    "Raj Kumar", 
    "Sneha Gupta", 
    "Vikram Singh"
  ];
  
  // Get 2-4 random provider documents
  const numDocs = Math.floor(Math.random() * 3) + 2;
  const googleDocs = [...providerDocuments]
    .sort(() => Math.random() - 0.5)
    .slice(0, numDocs)
    .map((doc, index) => ({
      id: `gdoc-${id}-${index}`,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      updatedAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 15))),
      securityLevel: doc.securityLevel as "encrypted" | "protected" | "public",
      source: doc.source as "google" | "local" | "imported",
      url: doc.url,
      thumbnail: doc.thumbnail
    }));
  
  // Original document
  const originalDoc = {
    id: `doc-${id}-1`,
    name: "Patient Treatment Guidelines.pdf",
    type: "PDF",
    size: "2.4 MB",
    updatedAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 15))),
    securityLevel: "protected" as "encrypted" | "protected" | "public",
    url: "https://example.com/guidelines.pdf",
    source: "local" as "google" | "local" | "imported"
  };
  
  // Combine all documents
  const allDocuments = [originalDoc, ...googleDocs];
  
  return {
    id,
    name,
    email,
    role: "provider",
    phoneNumber: "+91 " + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0'),
    address: "Delhi, India",
    speciality: ["Cardiologist", "General Practitioner", "Neurologist", "Orthopedist", "Pediatrician"][Math.floor(Math.random() * 5)],
    documents: allDocuments,
    activities: [
      {
        id: `act-${id}-1`,
        type: "view",
        description: "Viewed patient document",
        timestamp: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 2))),
        documentName: "Blood Test Report.pdf",
        user: patients[Math.floor(Math.random() * patients.length)]
      },
      {
        id: `act-${id}-2`,
        type: "import",
        description: "Imported documents from Google Drive",
        timestamp: new Date(),
        documentName: googleDocs[0]?.name
      }
    ],
    connections: patients.map((name, index) => ({
      id: `conn-${id}-${index}`,
      name,
      role: "patient",
      lastActivity: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10))),
      status: Math.random() > 0.2 ? "active" : "pending"
    }))
  };
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      
      login: async (email, password, role) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, create user based on email and role
          let mockUser: User;
          
          const name = email.split('@')[0].split('.').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
          
          if (role === "patient") {
            mockUser = createMockPatient(name, email);
          } else {
            mockUser = createMockProvider(name, email);
          }
          
          console.log(`User logged in: ${email} as ${role}`);
          
          set({ user: mockUser, isLoading: false });
        } catch (error) {
          console.error("Login error:", error);
          set({ isLoading: false });
          throw error;
        }
      },
      
      register: async (name, email, password, role) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, create user based on input data and role
          let mockUser: User;
          
          if (role === "patient") {
            mockUser = createMockPatient(name, email);
          } else {
            mockUser = createMockProvider(name, email);
          }
          
          console.log(`User registered: ${email} as ${role}`);
          
          set({ user: mockUser, isLoading: false });
        } catch (error) {
          console.error("Registration error:", error);
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      },

      addDocument: (document) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            documents: [document, ...(state.user.documents || [])]
          } : null
        }));
      },

      addActivity: (activity) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            activities: [activity, ...(state.user.activities || [])]
          } : null
        }));
      },

      exportLogs: async (email, passkey) => {
        // This would be implemented with actual encryption in a real app
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Logs exported with encryption to ${email} using passkey`);
      }
    }),
    {
      name: "medishare-user-storage",
    }
  )
);

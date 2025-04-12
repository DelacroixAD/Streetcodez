
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Key } from "lucide-react";

const EncryptionVisualizer: React.FC = () => {
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [animationPhase, setAnimationPhase] = useState<number>(0);
  
  // Original text to encrypt for visualization
  const originalText = "Protected Health Information - HIPAA Compliant";
  
  // Simple visual encryption for demonstration
  const visualEncrypt = (text: string): string => {
    return text
      .split("")
      .map(() => {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
        return chars.charAt(Math.floor(Math.random() * chars.length));
      })
      .join("");
  };
  
  useEffect(() => {
    // Animation sequence
    const timer = setTimeout(() => {
      if (animationPhase < 4) {
        setAnimationPhase(animationPhase + 1);
      } else {
        setAnimationPhase(0); // Reset the animation
      }
    }, 2000);
    
    // Update the encrypted text display
    if (animationPhase === 1) {
      setEncryptedText(visualEncrypt(originalText));
    }
    
    return () => clearTimeout(timer);
  }, [animationPhase]);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-medishare-500 to-medishare-600 text-white">
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          End-to-End Encryption
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="encryption-animation bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col items-center">
            {/* Phase 0: Original data */}
            <div className={`transition-opacity duration-500 ${animationPhase === 0 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="mb-4 text-center">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Unencrypted Data</div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-center">
                  {originalText}
                </div>
              </div>
            </div>
            
            {/* Phase 1: Encryption process */}
            <div className={`transition-opacity duration-500 ${animationPhase === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="flex flex-col items-center mb-4">
                <Key className="h-8 w-8 text-medishare-600 mb-2 animate-pulse" />
                <div className="text-sm font-medium text-medishare-600 mb-2">Encrypting with your key...</div>
                <div className="h-2 w-full encryption-animation-bg rounded-full"></div>
              </div>
            </div>
            
            {/* Phase 2: Encrypted data */}
            <div className={`transition-opacity duration-500 ${animationPhase === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="mb-4 text-center">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Encrypted Data in Transit</div>
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 font-mono text-xs overflow-x-auto">
                  {encryptedText}
                </div>
              </div>
            </div>
            
            {/* Phase 3: Server storage */}
            <div className={`transition-opacity duration-500 ${animationPhase === 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-medishare-600" />
                  </div>
                </div>
                <div className="ml-3 text-sm">
                  <div className="font-medium">Secure Storage</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">Data remains encrypted at rest</div>
                </div>
              </div>
            </div>
            
            {/* Phase 4: Authorized access */}
            <div className={`transition-opacity duration-500 ${animationPhase === 4 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="text-center mb-4">
                <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Only Authorized Access</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  All document access is logged and requires proper authorization
                </div>
              </div>
            </div>
            
            {/* Permanent footer info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 w-full">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Encryption</div>
                  <div className="text-sm font-semibold text-medishare-600">AES-256</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Compliance</div>
                  <div className="text-sm font-semibold text-medishare-600">HIPAA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EncryptionVisualizer;

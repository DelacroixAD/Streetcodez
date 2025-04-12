
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserRound, Stethoscope } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Select Your Role</CardTitle>
        <CardDescription>
          Choose your role to customize your experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedRole} onValueChange={onRoleChange} className="space-y-4">
          <div className={`flex items-center space-x-4 rounded-lg border p-4 transition-all ${selectedRole === 'patient' ? 'border-medishare-500 bg-medishare-50 dark:bg-medishare-900/20' : 'border-gray-200 dark:border-gray-800'}`}>
            <RadioGroupItem value="patient" id="patient" className="border-medishare-500" />
            <Label htmlFor="patient" className="flex flex-1 items-center cursor-pointer">
              <UserRound className="h-5 w-5 mr-3 text-medishare-600" />
              <div>
                <div className="font-medium">Patient</div>
                <div className="text-sm text-muted-foreground">
                  Access and share your medical documents
                </div>
              </div>
            </Label>
          </div>
          
          <div className={`flex items-center space-x-4 rounded-lg border p-4 transition-all ${selectedRole === 'provider' ? 'border-medishare-500 bg-medishare-50 dark:bg-medishare-900/20' : 'border-gray-200 dark:border-gray-800'}`}>
            <RadioGroupItem value="provider" id="provider" className="border-medishare-500" />
            <Label htmlFor="provider" className="flex flex-1 items-center cursor-pointer">
              <Stethoscope className="h-5 w-5 mr-3 text-medishare-600" />
              <div>
                <div className="font-medium">Healthcare Provider</div>
                <div className="text-sm text-muted-foreground">
                  Securely receive and manage patient records
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default RoleSelector;

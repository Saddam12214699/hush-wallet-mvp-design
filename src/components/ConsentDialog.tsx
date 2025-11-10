import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle, Eye, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentDialogProps {
  open: boolean;
  onClose: () => void;
  onConsent: (level: string, remember: boolean) => void;
  requestedBy: string;
  cardName: string;
  requestedFields: string[];
}

export function ConsentDialog({
  open,
  onClose,
  onConsent,
  requestedBy,
  cardName,
  requestedFields,
}: ConsentDialogProps) {
  const [rememberChoice, setRememberChoice] = useState(false);

  const handleConsent = (level: string) => {
    onConsent(level, rememberChoice);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary-soft">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Consent Request</DialogTitle>
              <DialogDescription className="text-xs">
                <span className="font-medium text-foreground">{requestedBy}</span> wants to access your data
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  Review what's being requested
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  You control exactly what information is shared
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Requested from {cardName}:
            </h4>
            <div className="space-y-2">
              {requestedFields.map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{field}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30">
            <Checkbox
              id="remember"
              checked={rememberChoice}
              onCheckedChange={(checked) => setRememberChoice(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm text-foreground cursor-pointer flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-muted-foreground" />
              Always allow for this service
            </label>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={() => handleConsent("standard")}
            className="w-full bg-gradient-privacy hover:opacity-90"
          >
            <Shield className="w-4 h-4 mr-2" />
            Grant Access
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Deny
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

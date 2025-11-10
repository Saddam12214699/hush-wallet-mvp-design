import { Eye, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type PrivacyLevel = "basic" | "standard" | "detailed";

interface PrivacyLevelSelectorProps {
  selectedLevel: PrivacyLevel;
  onSelect: (level: PrivacyLevel) => void;
  cardType: string;
}

const levels = {
  basic: {
    icon: Eye,
    title: "Basic",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    description: "Minimal information, no consent needed",
    examples: ["First name only", "City (no address)", "Derived sizes"]
  },
  standard: {
    icon: Shield,
    title: "Standard",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    description: "Contextual information for service providers",
    examples: ["Full name", "Brand-specific sizes", "Dietary preferences"]
  },
  detailed: {
    icon: Lock,
    title: "Detailed",
    color: "text-primary",
    bgColor: "bg-primary-soft",
    borderColor: "border-primary/30",
    description: "Complete information, requires explicit consent",
    examples: ["Exact measurements", "Medical allergies", "Contact info"]
  }
};

export function PrivacyLevelSelector({
  selectedLevel,
  onSelect,
  cardType,
}: PrivacyLevelSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Privacy Level</h3>
          <p className="text-sm text-muted-foreground">
            Choose what information to share
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {(Object.keys(levels) as PrivacyLevel[]).map((level) => {
          const { icon: Icon, title, color, bgColor, borderColor, description, examples } = levels[level];
          const isSelected = selectedLevel === level;

          return (
            <Card
              key={level}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? `${borderColor} border-2 shadow-md`
                  : "border-border hover:border-border/80"
              }`}
              onClick={() => onSelect(level)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${bgColor}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{title} Level</h4>
                      {isSelected && (
                        <span className="text-xs font-medium text-primary">Selected</span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {description}
                    </p>
                    
                    <div className="space-y-1">
                      {examples.map((example, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mr-2" />
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

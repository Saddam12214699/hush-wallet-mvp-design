import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye } from "lucide-react";

export type BadgeLevel = "bronze" | "silver" | "gold" | "platinum";
export type PrivacyLevel = "basic" | "standard" | "detailed";

interface WalletCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge: BadgeLevel;
  description: string;
  completeness: number;
  privacyLevel?: PrivacyLevel;
}

const badgeColors = {
  bronze: "bg-badge-bronze text-white",
  silver: "bg-badge-silver text-white",
  gold: "bg-badge-gold text-white",
  platinum: "bg-badge-platinum text-foreground",
};

const badgeLabels = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

const privacyIcons = {
  basic: Eye,
  standard: Shield,
  detailed: Lock,
};

export function WalletCard({
  id,
  title,
  icon,
  badge,
  description,
  completeness,
  privacyLevel = "basic",
}: WalletCardProps) {
  const PrivacyIcon = privacyIcons[privacyLevel];

  return (
    <Link to={`/card/${id}`}>
      <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden bg-gradient-card border-border/50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {icon}
            </div>
            <div className="flex gap-2 items-center">
              <Badge className={`${badgeColors[badge]} border-0`}>
                {badgeLabels[badge]}
              </Badge>
              <div className="p-2 rounded-lg bg-muted">
                <PrivacyIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Completeness</span>
              <span className="font-medium">{completeness}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-privacy transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletCard } from "@/components/WalletCard";
import { ConsentDialog } from "@/components/ConsentDialog";
import {
  User,
  Shirt,
  Footprints,
  Watch,
  Palette,
  Heart,
  UtensilsCrossed,
  Plane,
  Calendar,
  Gift,
  QrCode,
  Shield,
  History,
  Plus,
} from "lucide-react";
import heroImage from "@/assets/hero-wallet.jpg";
import { useToast } from "@/hooks/use-toast";

const walletCards = [
  {
    id: "personal",
    title: "Personal Basics & Consent",
    icon: <User className="w-6 h-6" />,
    badge: "platinum" as const,
    description: "Identity, contact preferences, and privacy controls",
    completeness: 95,
    privacyLevel: "basic" as const,
  },
  {
    id: "fashion",
    title: "Fashion Fit & Style",
    icon: <Shirt className="w-6 h-6" />,
    badge: "gold" as const,
    description: "Body measurements and brand-specific size mappings",
    completeness: 85,
    privacyLevel: "standard" as const,
  },
  {
    id: "footwear",
    title: "Footwear & Accessories",
    icon: <Footprints className="w-6 h-6" />,
    badge: "silver" as const,
    description: "Shoe sizes, belt, glove, and hat measurements",
    completeness: 70,
    privacyLevel: "basic" as const,
  },
  {
    id: "jewelry",
    title: "Jewelry & Watch Fit",
    icon: <Watch className="w-6 h-6" />,
    badge: "gold" as const,
    description: "Ring sizes, wrist measurements, and metal allergies",
    completeness: 80,
    privacyLevel: "standard" as const,
  },
  {
    id: "style",
    title: "Color & Style Preferences",
    icon: <Palette className="w-6 h-6" />,
    badge: "silver" as const,
    description: "Personal color palette and style archetypes",
    completeness: 65,
    privacyLevel: "basic" as const,
  },
  {
    id: "brand",
    title: "Brand Affinity & Wishlist",
    icon: <Heart className="w-6 h-6" />,
    badge: "bronze" as const,
    description: "Favorite brands and shopping preferences",
    completeness: 45,
    privacyLevel: "standard" as const,
  },
  {
    id: "food",
    title: "Food & Beverage",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    badge: "platinum" as const,
    description: "Dietary restrictions, allergies, and preferences",
    completeness: 100,
    privacyLevel: "standard" as const,
  },
  {
    id: "travel",
    title: "Travel & Hospitality",
    icon: <Plane className="w-6 h-6" />,
    badge: "gold" as const,
    description: "Hotel preferences, flight seating, and loyalty programs",
    completeness: 75,
    privacyLevel: "standard" as const,
  },
  {
    id: "events",
    title: "Events & Access",
    icon: <Calendar className="w-6 h-6" />,
    badge: "silver" as const,
    description: "Badge information, dietary needs, and swag sizing",
    completeness: 60,
    privacyLevel: "basic" as const,
  },
  {
    id: "gifting",
    title: "Gifting Profile",
    icon: <Gift className="w-6 h-6" />,
    badge: "bronze" as const,
    description: "Gift preferences and size consolidation",
    completeness: 50,
    privacyLevel: "standard" as const,
  },
];

export default function Index() {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const { toast } = useToast();

  const handleScanQR = () => {
    setShowConsentDialog(true);
  };

  const handleConsent = (level: string, remember: boolean) => {
    toast({
      title: "Access Granted",
      description: `Standard level access granted${remember ? " and remembered" : ""}.`,
    });
    setShowConsentDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-soft text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Privacy-First Digital Wallet
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Preferences,
              <br />
              <span className="bg-gradient-privacy bg-clip-text text-transparent">
                Your Control
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Carry your personal context everywhere. Share on your terms with selective disclosure. 
              Never repeat yourself again.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleScanQR}
                className="bg-gradient-privacy hover:opacity-90 text-white shadow-glow"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Scan to Share
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <a href="/audit">
                  <History className="w-5 h-5 mr-2" />
                  View Audit Log
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="text-4xl font-bold text-primary mb-2">10</div>
            <div className="text-sm text-muted-foreground">Active Cards</div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="text-4xl font-bold text-success mb-2">73%</div>
            <div className="text-sm text-muted-foreground">Avg Completeness</div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card text-center">
            <div className="text-4xl font-bold text-amber-500 mb-2">24</div>
            <div className="text-sm text-muted-foreground">Trusted Services</div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Your Wallet
            </h2>
            <p className="text-muted-foreground">
              Manage your preference cards and privacy settings
            </p>
          </div>
          
          <Button className="bg-gradient-privacy hover:opacity-90 text-white">
            <Plus className="w-5 h-5 mr-2" />
            Add Card
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {walletCards.map((card) => (
            <WalletCard key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* Consent Dialog */}
      <ConsentDialog
        open={showConsentDialog}
        onClose={() => setShowConsentDialog(false)}
        onConsent={handleConsent}
        requestedBy="Fashion Store Associate"
        cardName="Fashion Fit & Style"
        requestedFields={[
          "Brand-specific sizes (Zara, H&M, Nike)",
          "Fit preferences (regular/slim)",
          "Preferred colors",
        ]}
      />
    </div>
  );
}

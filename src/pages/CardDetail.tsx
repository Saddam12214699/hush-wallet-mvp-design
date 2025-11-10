import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrivacyLevelSelector } from "@/components/PrivacyLevelSelector";
import {
  ArrowLeft,
  Shield,
  Edit,
  QrCode,
  Download,
  Share2,
  Eye,
  Clock,
  MapPin,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCode from "react-qr-code";

type PrivacyLevel = "basic" | "standard" | "detailed";

const cardData: Record<string, any> = {
  fashion: {
    title: "Fashion Fit & Style",
    badge: "gold",
    description: "Your complete fashion profile with brand-specific sizing",
    fields: {
      basic: [
        { label: "Top Size", value: "M" },
        { label: "Bottom Size", value: "32W x 30L" },
        { label: "Fit Preference", value: "Regular Fit" },
      ],
      standard: [
        { label: "Top Size", value: "M" },
        { label: "Bottom Size", value: "32W x 30L" },
        { label: "Fit Preference", value: "Regular Fit" },
        { label: "Zara Size", value: "M" },
        { label: "H&M Size", value: "L" },
        { label: "Nike Size", value: "L" },
        { label: "Preferred Fabrics", value: "Cotton, Linen" },
      ],
      detailed: [
        { label: "Top Size", value: "M" },
        { label: "Bottom Size", value: "32W x 30L" },
        { label: "Fit Preference", value: "Regular Fit" },
        { label: "Zara Size", value: "M" },
        { label: "H&M Size", value: "L" },
        { label: "Nike Size", value: "L" },
        { label: "Chest", value: "40 inches" },
        { label: "Waist", value: "32 inches" },
        { label: "Hip", value: "38 inches" },
        { label: "Shoulder Width", value: "17 inches" },
        { label: "Preferred Fabrics", value: "Cotton, Linen" },
        { label: "Avoid Patterns", value: "Low-rise, Cropped" },
      ],
    },
  },
  food: {
    title: "Food & Beverage Preferences",
    badge: "platinum",
    description: "Dietary restrictions and food preferences for safe dining",
    fields: {
      basic: [
        { label: "Dietary Pattern", value: "Vegetarian" },
        { label: "Spice Tolerance", value: "3/5 (Medium)" },
      ],
      standard: [
        { label: "Dietary Pattern", value: "Vegetarian" },
        { label: "Spice Tolerance", value: "3/5 (Medium)" },
        { label: "Allergies", value: "Tree nuts, Shellfish" },
        { label: "Dislikes", value: "Cilantro, Mushrooms" },
      ],
      detailed: [
        { label: "Dietary Pattern", value: "Vegetarian" },
        { label: "Spice Tolerance", value: "3/5 (Medium)" },
        { label: "Allergies", value: "Tree nuts (Anaphylaxis), Shellfish (Moderate)" },
        { label: "Dislikes", value: "Cilantro, Mushrooms" },
        { label: "Favorite Cuisines", value: "Italian, Thai, Indian" },
        { label: "Usual Coffee Order", value: "Oat milk latte, no sugar, extra shot" },
        { label: "Alcohol Preference", value: "Red wine, Craft beer" },
      ],
    },
  },
  personal: {
    title: "Personal Basics & Consent",
    badge: "platinum",
    description: "Your identity and privacy control center",
    fields: {
      basic: [
        { label: "Preferred Name", value: "Alex" },
        { label: "City", value: "San Francisco" },
      ],
      standard: [
        { label: "Preferred Name", value: "Alex" },
        { label: "Full Name", value: "Alex Johnson" },
        { label: "City", value: "San Francisco, CA" },
        { label: "Pronouns", value: "they/them" },
        { label: "Masked Email", value: "****@gmail.com" },
      ],
      detailed: [
        { label: "Preferred Name", value: "Alex" },
        { label: "Full Name", value: "Alex Johnson" },
        { label: "City", value: "San Francisco, CA" },
        { label: "Pronouns", value: "they/them" },
        { label: "Email", value: "alex.johnson@gmail.com" },
        { label: "Phone", value: "+1 (555) 123-4567" },
        { label: "Age Range", value: "25-34" },
        { label: "Emergency Contact", value: "Available on request" },
      ],
    },
  },
};

export default function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>("basic");
  
  const card = cardData[id || ""] || cardData.fashion;
  const fields = card.fields[privacyLevel] || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{card.title}</h1>
              <Badge className="bg-badge-gold text-white border-0">
                {card.badge.charAt(0).toUpperCase() + card.badge.slice(1)}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{card.description}</p>
          </div>
          
          <Button variant="outline" size="icon" className="rounded-full">
            <Edit className="w-5 h-5" />
          </Button>
        </div>

        <Tabs defaultValue="view" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="view">View Data</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Privacy Level Selector */}
              <div>
                <PrivacyLevelSelector
                  selectedLevel={privacyLevel}
                  onSelect={setPrivacyLevel}
                  cardType={card.title}
                />
              </div>

              {/* Data Display */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      Data at {privacyLevel.charAt(0).toUpperCase() + privacyLevel.slice(1)} Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {fields.map((field: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start p-3 rounded-lg bg-muted/50"
                      >
                        <span className="text-sm font-medium text-muted-foreground">
                          {field.label}
                        </span>
                        <span className="text-sm text-foreground font-medium text-right">
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                  <div className="p-6 bg-white rounded-2xl">
                    <QRCode
                      value={`https://hushh.wallet/${id}/share?token=abc123`}
                      size={200}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Scan this code to share your {card.title.toLowerCase()} data
                  </p>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button className="flex-1 bg-gradient-privacy text-white">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Active Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">Fashion Boutique</h4>
                        <p className="text-sm text-muted-foreground">Standard Level</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Revoke
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Granted 2 hours ago</span>
                      <MapPin className="w-3 h-3 ml-2" />
                      <span>Downtown Store</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">Online Retailer</h4>
                        <p className="text-sm text-muted-foreground">Basic Level</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Revoke
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Always allowed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Access History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    service: "Fashion Boutique",
                    level: "Standard",
                    time: "2 hours ago",
                    location: "Downtown Store",
                  },
                  {
                    service: "Restaurant",
                    level: "Basic",
                    time: "1 day ago",
                    location: "Mission District",
                  },
                  {
                    service: "Online Retailer",
                    level: "Basic",
                    time: "3 days ago",
                    location: "Web (Safari)",
                  },
                ].map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{event.service}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.level} Level • {event.location}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{event.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

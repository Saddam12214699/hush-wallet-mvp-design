import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  Shield,
  Lock,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const auditEvents = [
  {
    id: 1,
    timestamp: "2024-11-10 14:32:15",
    service: "Fashion Boutique",
    card: "Fashion Fit & Style",
    level: "Standard",
    status: "granted",
    location: "Downtown Store, SF",
    fields: ["Brand sizes", "Fit preferences", "Preferred colors"],
    icon: Eye,
  },
  {
    id: 2,
    timestamp: "2024-11-10 12:15:48",
    service: "Restaurant Bella",
    card: "Food & Beverage",
    level: "Standard",
    status: "granted",
    location: "Mission District",
    fields: ["Dietary pattern", "Spice level", "Allergies"],
    icon: Shield,
  },
  {
    id: 3,
    timestamp: "2024-11-09 18:45:22",
    service: "Online Retailer",
    card: "Personal Basics",
    level: "Basic",
    status: "granted",
    location: "Web (Safari, macOS)",
    fields: ["Preferred name", "City"],
    icon: Eye,
  },
  {
    id: 4,
    timestamp: "2024-11-09 16:20:33",
    service: "Hotel Grand",
    card: "Travel & Hospitality",
    level: "Detailed",
    status: "granted",
    location: "Check-in Desk",
    fields: ["Room preferences", "Loyalty ID", "Contact info"],
    icon: Lock,
  },
  {
    id: 5,
    timestamp: "2024-11-08 21:10:55",
    service: "Unknown Scanner",
    card: "Personal Basics",
    level: "Basic",
    status: "denied",
    location: "Unknown Location",
    fields: ["Attempted access"],
    icon: XCircle,
  },
  {
    id: 6,
    timestamp: "2024-11-08 19:30:12",
    service: "Tech Conference",
    card: "Events & Access",
    level: "Standard",
    status: "granted",
    location: "Moscone Center",
    fields: ["Badge name", "T-shirt size", "Dietary needs"],
    icon: Shield,
  },
];

const statusColors = {
  granted: "bg-success/10 text-success border-success/20",
  denied: "bg-destructive/10 text-destructive border-destructive/20",
  revoked: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

const statusIcons = {
  granted: CheckCircle,
  denied: XCircle,
  revoked: AlertCircle,
};

export default function AuditLog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCard, setFilterCard] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredEvents = auditEvents.filter((event) => {
    const matchesSearch =
      event.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.card.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCard = filterCard === "all" || event.card === filterCard;
    const matchesStatus = filterStatus === "all" || event.status === filterStatus;

    return matchesSearch && matchesCard && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h1 className="text-3xl font-bold text-foreground">Audit Log</h1>
            <p className="text-muted-foreground mt-1">
              Complete transparency of all data access
            </p>
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Log
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by service or card..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterCard} onValueChange={setFilterCard}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by card" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cards</SelectItem>
                  <SelectItem value="Personal Basics">Personal Basics</SelectItem>
                  <SelectItem value="Fashion Fit & Style">Fashion Fit</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Travel & Hospitality">Travel</SelectItem>
                  <SelectItem value="Events & Access">Events</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="granted">Granted</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-1">45</div>
              <div className="text-sm text-muted-foreground">Total Accesses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-success mb-1">42</div>
              <div className="text-sm text-muted-foreground">Granted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-destructive mb-1">3</div>
              <div className="text-sm text-muted-foreground">Denied</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-amber-500 mb-1">0</div>
              <div className="text-sm text-muted-foreground">Revoked</div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const StatusIcon = statusIcons[event.status as keyof typeof statusIcons];
            const LevelIcon = event.icon;

            return (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-soft">
                      <LevelIcon className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {event.service}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Accessed {event.card}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={statusColors[event.status as keyof typeof statusColors]}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">{event.level}</Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {event.fields.map((field, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No events found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

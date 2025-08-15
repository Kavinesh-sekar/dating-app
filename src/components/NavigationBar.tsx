import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, User, Settings, Video } from "lucide-react";

interface NavigationBarProps {
  activeTab: "discover" | "matches" | "profile" | "settings";
  onTabChange: (tab: "discover" | "matches" | "profile" | "settings") => void;
  matchCount?: number;
  messageCount?: number;
}

export function NavigationBar({ 
  activeTab, 
  onTabChange, 
  matchCount = 0, 
  messageCount = 0 
}: NavigationBarProps) {
  const tabs = [
    {
      id: "discover" as const,
      icon: Heart,
      label: "Discover",
      count: 0
    },
    {
      id: "matches" as const,
      icon: MessageCircle,
      label: "Matches",
      count: messageCount
    },
    {
      id: "profile" as const,
      icon: User,
      label: "Profile",
      count: 0
    },
    {
      id: "settings" as const,
      icon: Settings,
      label: "Settings",
      count: 0
    }
  ];

  return (
    <div className="bg-background border-t border-border/50 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 relative ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
                {tab.count > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 text-white border-0"
                  >
                    {tab.count > 99 ? "99+" : tab.count}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Bell, Shield, Heart, LogOut } from "lucide-react";

export function SettingsScreen() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="matches">New matches</Label>
            <Switch id="matches" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="messages">Messages</Label>
            <Switch id="messages" defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          Privacy
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="distance">Show distance</Label>
            <Switch id="distance" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="online">Show online status</Label>
            <Switch id="online" defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Heart className="w-4 h-4 mr-2" />
            Help & Support
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
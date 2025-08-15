import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";

export function ProfileScreen() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <Card className="p-6">
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Your Profile</h2>
            <p className="text-muted-foreground">Looking great! 😊</p>
          </div>
          <Button variant="love">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-semibold mb-2 flex items-center">
          <Heart className="w-4 h-4 mr-2" />
          Your Stats
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">42</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Matches</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">15</p>
            <p className="text-sm text-muted-foreground">Super Likes</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SwipeCard } from "./SwipeCard";
import { MatchModal } from "./MatchModal";
import { Heart, X, Star, RotateCcw, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock profile data
const mockProfiles = [
  {
    id: "1",
    name: "Emma",
    age: 25,
    photos: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop"
    ],
    bio: "Adventure seeker, coffee lover, and weekend hiker. Looking for someone to explore the world with! 🌍☕",
    location: "New York",
    distance: 2,
    occupation: "Graphic Designer",
    education: "NYU",
    interests: ["Photography", "Travel", "Coffee", "Hiking", "Art"],
    verified: true
  },
  {
    id: "2",
    name: "Alex",
    age: 28,
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop"
    ],
    bio: "Software engineer by day, chef by night. Love trying new restaurants and cooking for friends.",
    location: "Brooklyn",
    distance: 5,
    occupation: "Software Engineer",
    education: "MIT",
    interests: ["Cooking", "Tech", "Food", "Music", "Gaming"],
    verified: false
  },
  {
    id: "3",
    name: "Sofia",
    age: 23,
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop"
    ],
    bio: "Yoga instructor and wellness coach. Let's find balance together! 🧘‍♀️✨",
    location: "Manhattan",
    distance: 3,
    occupation: "Yoga Instructor",
    education: "Columbia",
    interests: ["Yoga", "Meditation", "Wellness", "Nature", "Reading"],
    verified: true
  }
];

interface SwipeInterfaceProps {
  onOpenChat: () => void;
}

export function SwipeInterface({ onOpenChat }: SwipeInterfaceProps) {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: "left" | "right", profile: any) => {
    if (direction === "right") {
      // Simulate match probability (30% chance)
      const isMatch = Math.random() > 0.7;
      if (isMatch) {
        setMatchedProfile(profile);
        toast({
          title: "It's a Match! 💕",
          description: `You and ${profile.name} liked each other!`,
        });
      } else {
        toast({
          title: "Like sent! 💖",
          description: `${profile.name} will see that you liked them.`,
        });
      }
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleSuperLike = (profile: any) => {
    // Super like has higher match probability (60% chance)
    const isMatch = Math.random() > 0.4;
    if (isMatch) {
      setMatchedProfile(profile);
      toast({
        title: "Super Match! ⭐",
        description: `${profile.name} was impressed by your Super Like!`,
      });
    } else {
      toast({
        title: "Super Like sent! ⭐",
        description: `${profile.name} will see your Super Like!`,
      });
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleAction = (action: "like" | "nope" | "superlike") => {
    if (!currentProfile) return;

    switch (action) {
      case "like":
        handleSwipe("right", currentProfile);
        break;
      case "nope":
        handleSwipe("left", currentProfile);
        break;
      case "superlike":
        handleSuperLike(currentProfile);
        break;
    }
  };

  const reloadProfiles = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProfiles([...mockProfiles]);
      setCurrentIndex(0);
      setIsLoading(false);
      toast({
        title: "New profiles loaded!",
        description: "Fresh matches are waiting for you.",
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No more profiles!</h2>
          <p className="text-muted-foreground mb-6">
            You've seen everyone in your area. Check back later for new profiles!
          </p>
          <Button variant="love" onClick={reloadProfiles} size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Load More Profiles
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Cards Stack */}
      <div className="flex-1 relative p-4">
        <AnimatePresence>
          {profiles.slice(currentIndex, currentIndex + 3).map((profile, index) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              onSwipe={handleSwipe}
              onSuperLike={handleSuperLike}
              zIndex={3 - index}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="p-6">
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="nope"
            size="action-button"
            onClick={() => handleAction("nope")}
            className="hover:scale-110"
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="superlike"
            size="action-button"
            onClick={() => handleAction("superlike")}
            className="hover:scale-110"
          >
            <Star className="w-6 h-6" />
          </Button>

          <Button
            variant="like"
            size="action-button"
            onClick={() => handleAction("like")}
            className="hover:scale-110"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="ghost" onClick={onOpenChat} size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            View Matches
          </Button>
        </div>
      </div>

      {/* Match Modal */}
      <MatchModal
        isOpen={!!matchedProfile}
        profile={matchedProfile}
        onClose={() => setMatchedProfile(null)}
        onSendMessage={onOpenChat}
      />
    </div>
  );
}
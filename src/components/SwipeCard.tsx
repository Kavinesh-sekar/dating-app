import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, X, Star, Briefcase, GraduationCap } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  location: string;
  distance: number;
  occupation?: string;
  education?: string;
  interests: string[];
  verified?: boolean;
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right", profile: Profile) => void;
  onSuperLike: (profile: Profile) => void;
  zIndex: number;
}

export function SwipeCard({ profile, onSwipe, onSuperLike, zIndex }: SwipeCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragEnd = (info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      if (offset > 0 || velocity > 0) {
        onSwipe("right", profile);
      } else {
        onSwipe("left", profile);
      }
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev < profile.photos.length - 1 ? prev + 1 : 0
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev > 0 ? prev - 1 : profile.photos.length - 1
    );
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => handleDragEnd(info)}
      onDrag={(_, info) => setDragOffset({ x: info.offset.x, y: info.offset.y })}
      className="absolute inset-0"
      style={{ zIndex }}
      whileDrag={{ 
        rotate: dragOffset.x * 0.1,
        scale: 1.05 
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        x: dragOffset.x > 0 ? 1000 : -1000,
        rotate: dragOffset.x * 0.5,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="h-full relative overflow-hidden card-shadow cursor-grab active:cursor-grabbing border-2 border-border/50">
        {/* Photo Stack with Indicators */}
        <div className="relative h-2/3">
          <img
            src={profile.photos[currentPhotoIndex]}
            alt={`${profile.name} - Photo ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Photo Navigation Overlay */}
          <div className="absolute inset-0 flex">
            <button
              onClick={prevPhoto}
              className="flex-1 bg-transparent"
              aria-label="Previous photo"
            />
            <button
              onClick={nextPhoto}
              className="flex-1 bg-transparent"
              aria-label="Next photo"
            />
          </div>

          {/* Photo Indicators */}
          {profile.photos.length > 1 && (
            <div className="absolute top-4 left-4 right-4 flex space-x-1">
              {profile.photos.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded ${
                    index === currentPhotoIndex 
                      ? "bg-white" 
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Verified Badge */}
          {profile.verified && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-blue-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}

          {/* Distance */}
          <div className="absolute bottom-4 right-4">
            <Badge variant="secondary" className="bg-black/50 text-white border-0">
              <MapPin className="w-3 h-3 mr-1" />
              {profile.distance}km away
            </Badge>
          </div>

          {/* Swipe Indicators */}
          {Math.abs(dragOffset.x) > 20 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`p-4 rounded-full border-4 ${
                  dragOffset.x > 0 
                    ? "border-green-500 text-green-500" 
                    : "border-red-500 text-red-500"
                }`}
              >
                {dragOffset.x > 0 ? (
                  <Heart className="w-12 h-12" />
                ) : (
                  <X className="w-12 h-12" />
                )}
              </motion.div>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="p-6 h-1/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold">{profile.name}</h3>
              <span className="text-xl text-muted-foreground">{profile.age}</span>
            </div>

            {profile.occupation && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <Briefcase className="w-4 h-4" />
                <span>{profile.occupation}</span>
              </div>
            )}

            {profile.education && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>{profile.education}</span>
              </div>
            )}

            <p className="text-sm text-muted-foreground line-clamp-2">
              {profile.bio}
            </p>
          </div>

          {/* Interests */}
          {profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {profile.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {profile.interests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{profile.interests.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
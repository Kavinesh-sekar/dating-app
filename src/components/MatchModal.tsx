import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, X } from "lucide-react";

interface MatchModalProps {
  isOpen: boolean;
  profile: any;
  onClose: () => void;
  onSendMessage: () => void;
}

export function MatchModal({ isOpen, profile, onClose, onSendMessage }: MatchModalProps) {
  if (!isOpen || !profile) return null;

  const handleSendMessage = () => {
    onSendMessage();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden border-0 card-shadow">
            {/* Header with close button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                className="bg-black/20 text-white hover:bg-black/40"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Match Animation Background */}
            <div className="relative h-80 love-gradient overflow-hidden">
              {/* Animated Hearts */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/30"
                    initial={{ 
                      x: Math.random() * 300,
                      y: 400,
                      scale: 0,
                      rotate: 0
                    }}
                    animate={{
                      y: -50,
                      scale: [0, 1, 0],
                      rotate: 360
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    <Heart className="w-6 h-6" />
                  </motion.div>
                ))}
              </div>

              {/* Profile Images */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  {/* User's photo placeholder */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-lg">You</span>
                  </motion.div>

                  {/* Heart animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-white rounded-full p-3"
                  >
                    <Heart className="w-8 h-8 text-red-500 fill-current" />
                  </motion.div>

                  {/* Match's photo */}
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-20 h-20 rounded-full overflow-hidden border-4 border-white"
                  >
                    <img
                      src={profile.photos[0]}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Match Content */}
            <div className="p-6 text-center space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold match-gradient bg-clip-text text-transparent mb-2">
                  It's a Match!
                </h2>
                <p className="text-lg text-muted-foreground">
                  You and <span className="font-semibold text-foreground">{profile.name}</span> liked each other
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                <Button
                  variant="match"
                  size="lg"
                  onClick={handleSendMessage}
                  className="w-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={onClose}
                  className="w-full"
                >
                  Keep Swiping
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
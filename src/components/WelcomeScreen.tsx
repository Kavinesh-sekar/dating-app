import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, MessageCircle, Video, Shield } from "lucide-react";
import heroImage from "@/assets/hero-couple.jpg";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: Heart,
      title: "Find Your Perfect Match",
      description: "Advanced matching algorithm connects you with compatible hearts"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Instant messaging with read receipts and media sharing"
    },
    {
      icon: Video,
      title: "Video & Voice Calls",
      description: "Connect face-to-face with secure video calling"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy and safety are our top priorities"
    }
  ];

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md w-full"
        >
          {/* Logo/Title */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Heart className="w-16 h-16 text-white mx-auto mb-4 animate-heartbeat" />
            <h1 className="text-4xl font-bold text-white mb-2">LoveMate</h1>
            <p className="text-white/80 text-lg">Where Hearts Connect</p>
          </motion.div>

          {/* Feature Cards */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Card className="card-gradient p-4 border-0 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="love-gradient p-2 rounded-full">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGetStarted}
              className="w-full"
            >
              Start Finding Love
            </Button>
            
            <p className="text-white/60 text-sm">
              Join millions finding meaningful connections
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-8 flex justify-center space-x-6 text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">10M+ Users</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs">1M+ Matches</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs">100% Secure</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Heart,
  Camera,
  Mic,
  Gift
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "gift";
}

interface Match {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  online: boolean;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

// Mock data
const mockMatches: Match[] = [
  {
    id: "1",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    lastMessage: "Hey! How's your day going? 😊",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 2,
    online: true
  },
  {
    id: "2",
    name: "Alex",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Would love to grab coffee sometime!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    online: false
  },
  {
    id: "3",
    name: "Sofia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "Thanks for the super like! ⭐",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    unreadCount: 1,
    online: true
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    content: "Hey! How's your day going? 😊",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "text"
  },
  {
    id: "2",
    senderId: "me",
    content: "It's been great! Just finished a morning workout. How about you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "text"
  },
  {
    id: "3",
    senderId: "1",
    content: "Nice! I went for a hike earlier. The weather is perfect today ☀️",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: "text"
  },
  {
    id: "4",
    senderId: "me",
    content: "That sounds amazing! I love hiking. Where did you go?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "text"
  }
];

export function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMatch) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "me",
      content: newMessage,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That's so cool! 😄",
        "I'd love to hear more about that!",
        "You seem really interesting!",
        "Would you like to meet up sometime?",
        "I'm having such a great time talking with you! 💕"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedMatch.id,
        content: randomResponse,
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  if (selectedMatch) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon-sm" onClick={() => setSelectedMatch(null)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Avatar className="relative">
              <AvatarImage src={selectedMatch.avatar} alt={selectedMatch.name} />
              <AvatarFallback>{selectedMatch.name[0]}</AvatarFallback>
              {selectedMatch.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedMatch.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedMatch.online ? "Online now" : "Active recently"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon-sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${message.senderId === "me" ? "order-2" : "order-1"}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.senderId === "me"
                      ? "love-gradient text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-2">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-muted p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border/50 bg-card">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon-sm">
              <Camera className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Gift className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon-sm">
              <Mic className="w-4 h-4" />
            </Button>
            <Button 
              variant="love" 
              size="icon-sm" 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon-sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold">Matches</h1>
        </div>
        <Badge variant="secondary">
          {mockMatches.length} matches
        </Badge>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto">
        {mockMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No matches yet</h2>
            <p className="text-muted-foreground">
              Start swiping to find your perfect match!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {mockMatches.map((match) => (
              <motion.div
                key={match.id}
                whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                className="p-4 cursor-pointer smooth-transition"
                onClick={() => setSelectedMatch(match)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="relative">
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback>{match.name[0]}</AvatarFallback>
                    {match.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{match.name}</h3>
                      <div className="flex items-center space-x-2">
                        {match.lastMessageTime && (
                          <span className="text-xs text-muted-foreground">
                            {formatLastMessageTime(match.lastMessageTime)}
                          </span>
                        )}
                        {match.unreadCount > 0 && (
                          <Badge className="h-5 w-5 p-0 text-xs bg-red-500 text-white">
                            {match.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {match.lastMessage && (
                      <p className="text-sm text-muted-foreground truncate">
                        {match.lastMessage}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
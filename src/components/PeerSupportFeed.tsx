import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send, Users, Sparkles } from "lucide-react";

interface PeerMessage {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  likes: number;
  isAnonymous: boolean;
  mood: string;
}

const sampleMessages: PeerMessage[] = [
  {
    id: "1",
    author: "Sarah M.",
    message: "Just wanted to say that it's okay to have rough days. Tomorrow is a fresh start! 🌅",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 12,
    isAnonymous: false,
    mood: "supportive"
  },
  {
    id: "2",
    author: "Anonymous",
    message: "Finals week was overwhelming, but I remembered to breathe and take breaks. Small wins count! ✨",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    likes: 8,
    isAnonymous: true,
    mood: "encouraging"
  },
  {
    id: "3",
    author: "Alex K.",
    message: "Meditation has been a game-changer for my anxiety. Even 5 minutes makes a difference! 🧘‍♂️",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 15,
    isAnonymous: false,
    mood: "helpful"
  },
  {
    id: "4",
    author: "Anonymous",
    message: "Reached out to campus counseling today. It was scary but I'm proud of myself for taking that step 💪",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 20,
    isAnonymous: true,
    mood: "proud"
  },
  {
    id: "5",
    author: "Jordan L.",
    message: "Remember: your mental health is just as important as your physical health. Take care of yourself! 💚",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    likes: 25,
    isAnonymous: false,
    mood: "caring"
  }
];

export const PeerSupportFeed = () => {
  const [messages, setMessages] = useState<PeerMessage[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-scroll to show new messages
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      toast({
        title: "Please enter a message",
        description: "Share something meaningful with the community.",
        variant: "destructive",
      });
      return;
    }

    const message: PeerMessage = {
      id: Date.now().toString(),
      author: isAnonymous ? "Anonymous" : "You",
      message: newMessage.trim(),
      timestamp: new Date(),
      likes: 0,
      isAnonymous,
      mood: "supportive"
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage("");

    toast({
      title: "Message shared! 💙",
      description: "Thank you for contributing to our supportive community.",
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      supportive: "bg-blue-100 text-blue-700",
      encouraging: "bg-green-100 text-green-700",
      helpful: "bg-purple-100 text-purple-700",
      proud: "bg-yellow-100 text-yellow-700",
      caring: "bg-pink-100 text-pink-700"
    };
    return colors[mood as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-wellness-calm" />
            Peer Support Community
          </h2>
          <p className="text-xl text-muted-foreground">
            Share encouragement, connect with others, and build a supportive community together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Message Input */}
          <div className="lg:col-span-1">
            <Card className="gradient-card border-0 shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-wellness-calm" />
                  Share Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Share encouragement, tips, or positive thoughts..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[100px] resize-none rounded-xl border-2 focus:border-purple-300"
                    maxLength={280}
                    aria-label="Support message"
                  />
                  
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      Post anonymously
                    </label>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full gradient-primary text-white hover:scale-105 transition-all duration-300"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Share Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Messages Feed */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Community Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  ref={scrollRef}
                  className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-gray-100"
                >
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className="p-4 rounded-xl bg-gradient-to-r from-white to-purple-50 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-hover"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs">
                            {message.isAnonymous ? "?" : message.author[0]}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {message.author}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getMoodColor(message.mood)}`}
                            >
                              {message.mood}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(message.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm leading-relaxed text-gray-700">
                            {message.message}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-pink-600 transition-colors"
                              aria-label="Like message"
                            >
                              <Heart className="w-3 h-3" />
                              {message.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
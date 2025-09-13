import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, Sparkles } from "lucide-react";

// Web Speech API type declarations
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const moodOptions = [
  { emoji: "😊", label: "Great", value: 5, color: "bg-mood-great", textColor: "text-mood-great" },
  { emoji: "🙂", label: "Good", value: 4, color: "bg-mood-good", textColor: "text-mood-good" },
  { emoji: "😐", label: "Okay", value: 3, color: "bg-mood-okay", textColor: "text-mood-okay" },
  { emoji: "🙁", label: "Low", value: 2, color: "bg-mood-low", textColor: "text-mood-low" },
  { emoji: "😰", label: "Anxious", value: 1, color: "bg-mood-anxious", textColor: "text-mood-anxious" },
];

const generateSentimentInsight = (mood: number, notes: string): string => {
  const insights = {
    5: ["Your positivity is contagious! 🌟", "Great energy today - keep shining! ✨", "You're radiating wonderful vibes! 🌈"],
    4: ["Good vibes flowing your way! 💫", "You're doing amazing today! 🌸", "Positive energy detected! 🌟"],
    3: ["Balance is key - you're doing fine! ⚖️", "Neutral can be peaceful too 🕊️", "Taking things steady today 🌿"],
    2: ["Tomorrow is a new opportunity 🌅", "It's okay to have low moments 💙", "You're stronger than you know 💪"],
    1: ["You're brave for checking in 🤗", "This feeling will pass 🌈", "Reach out if you need support 💝"],
  };
  
  const moodInsights = insights[mood as keyof typeof insights];
  const baseInsight = moodInsights[Math.floor(Math.random() * moodInsights.length)];
  
  if (notes.trim()) {
    return `${baseInsight} Your reflection shows self-awareness - that's a strength! 🧠`;
  }
  
  return baseInsight;
};

export const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setNotes(prev => prev + ' ' + transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
    }
  }, []);

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice recording not supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setIsRecording(true);
    }
  };

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling today to continue.",
        variant: "destructive",
      });
      return;
    }

    const insight = generateSentimentInsight(selectedMood, notes);
    
    // Here you would typically save to a database
    toast({
      title: "Check-in saved! 🌟",
      description: insight,
    });

    // Reset form
    setSelectedMood(null);
    setNotes("");
  };

  return (
    <section className="py-20 px-4 gradient-violet-pink">
      <div className="container mx-auto max-w-2xl">
        <Card className="gradient-card border-0 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Daily Mood Check-in
            </CardTitle>
            <CardDescription className="text-lg leading-relaxed">
              How are you feeling today? Take a moment to reflect on your current state of mind.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-wellness-calm" />
                Select your mood
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`
                      flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 animate-scale-hover
                      ${selectedMood === mood.value 
                        ? `border-primary ${mood.color}/20 scale-105 animate-bounce-in shadow-lg` 
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                      }
                    `}
                    aria-label={`Select ${mood.label} mood`}
                  >
                    <span className="text-5xl mb-2 transition-transform duration-200 hover:scale-110">
                      {mood.emoji}
                    </span>
                    <Badge 
                      variant={selectedMood === mood.value ? "default" : "outline"} 
                      className={`text-xs font-medium ${selectedMood === mood.value ? mood.textColor : ''}`}
                    >
                      {mood.label}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Voice Journal (optional)</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggleVoiceRecording}
                  className={`
                    transition-all duration-300 ${isRecording 
                      ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
                      : 'hover:bg-purple-50 hover:border-purple-200'
                    }
                  `}
                  aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? "Stop" : "Record"}
                </Button>
              </div>
              <Textarea
                placeholder="Share anything on your mind - challenges, wins, or thoughts about your day... You can also use the voice recorder above!"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] resize-none rounded-xl border-2 focus:border-purple-300 focus:ring-purple-100 transition-colors"
                aria-label="Journal entry"
              />
              {isRecording && (
                <p className="text-sm text-muted-foreground animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  Listening... Speak clearly for best results.
                </p>
              )}
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full gradient-primary text-white hover:scale-105 transition-all duration-300 py-6 text-lg font-semibold shadow-lg hover:shadow-xl"
              size="lg"
              aria-label="Save mood check-in"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Save Check-in
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
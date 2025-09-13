import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const moodOptions = [
  { emoji: "😊", label: "Great", value: 5, color: "bg-success" },
  { emoji: "🙂", label: "Good", value: 4, color: "bg-wellness-happy" },
  { emoji: "😐", label: "Okay", value: 3, color: "bg-wellness-neutral" },
  { emoji: "🙁", label: "Low", value: 2, color: "bg-wellness-sad" },
  { emoji: "😰", label: "Anxious", value: 1, color: "bg-wellness-anxious" },
];

export const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling today to continue.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to a database
    toast({
      title: "Check-in saved! 🌟",
      description: "Thank you for sharing how you're feeling today.",
    });

    // Reset form
    setSelectedMood(null);
    setNotes("");
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="gradient-card border-0 shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold mb-2">Daily Mood Check-in</CardTitle>
            <CardDescription className="text-lg">
              How are you feeling today? Take a moment to reflect on your current state of mind.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Select your mood</h3>
              <div className="grid grid-cols-5 gap-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`
                      flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-110
                      ${selectedMood === mood.value 
                        ? 'border-primary bg-primary/10 scale-105' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <span className="text-4xl mb-2">{mood.emoji}</span>
                    <Badge variant={selectedMood === mood.value ? "default" : "outline"} className="text-xs">
                      {mood.label}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Additional thoughts (optional)</h3>
              <Textarea
                placeholder="Share anything on your mind - challenges, wins, or thoughts about your day..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full gradient-primary text-white hover:scale-105 transition-all duration-300 py-6 text-lg"
              size="lg"
            >
              Save Check-in
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
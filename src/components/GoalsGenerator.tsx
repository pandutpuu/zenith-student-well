import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Target, Sparkles, RefreshCw, CheckCircle } from "lucide-react";

interface WellnessGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "easy" | "medium" | "challenging";
  moodBased: number[];
}

const wellnessGoals: WellnessGoal[] = [
  // Goals for Great mood (5)
  {
    id: "1",
    title: "Share Your Joy",
    description: "Write down three things that made you happy today and share one with a friend or family member.",
    category: "Social Connection",
    duration: "15 min",
    difficulty: "easy",
    moodBased: [5]
  },
  {
    id: "2",
    title: "Gratitude Letter",
    description: "Write a heartfelt thank-you note to someone who has positively impacted your life.",
    category: "Gratitude",
    duration: "30 min",
    difficulty: "medium",
    moodBased: [5, 4]
  },
  // Goals for Good mood (4)
  {
    id: "3",
    title: "Mindful Movement",
    description: "Take a 10-minute walk outdoors and practice mindful observation of your surroundings.",
    category: "Physical Wellness",
    duration: "10 min",
    difficulty: "easy",
    moodBased: [4, 5]
  },
  {
    id: "4",
    title: "Creative Expression",
    description: "Spend 20 minutes on a creative activity: draw, write, sing, or craft something new.",
    category: "Self-Expression",
    duration: "20 min",
    difficulty: "medium",
    moodBased: [4, 5]
  },
  // Goals for Okay mood (3)
  {
    id: "5",
    title: "Gentle Self-Care",
    description: "Practice a simple self-care routine: take a warm shower, listen to calming music, or enjoy herbal tea.",
    category: "Self-Care",
    duration: "25 min",
    difficulty: "easy",
    moodBased: [3, 2]
  },
  {
    id: "6",
    title: "Breathing Reset",
    description: "Try the 4-7-8 breathing technique for 5 minutes to center yourself and reduce stress.",
    category: "Mindfulness",
    duration: "5 min",
    difficulty: "easy",
    moodBased: [3, 2, 1]
  },
  // Goals for Low mood (2)
  {
    id: "7",
    title: "Micro-Accomplishment",
    description: "Complete one small, manageable task like organizing your desk or making your bed.",
    category: "Achievement",
    duration: "10 min",
    difficulty: "easy",
    moodBased: [2, 1]
  },
  {
    id: "8",
    title: "Comfort Connection",
    description: "Reach out to someone you trust - send a text, make a call, or spend time with a supportive person.",
    category: "Social Support",
    duration: "15 min",
    difficulty: "medium",
    moodBased: [2, 1]
  },
  // Goals for Anxious mood (1)
  {
    id: "9",
    title: "Grounding Exercise",
    description: "Use the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    category: "Anxiety Relief",
    duration: "5 min",
    difficulty: "easy",
    moodBased: [1]
  },
  {
    id: "10",
    title: "Soothing Routine",
    description: "Create a calming environment: dim lights, play soft music, and practice gentle stretches or deep breathing.",
    category: "Relaxation",
    duration: "20 min",
    difficulty: "easy",
    moodBased: [1, 2]
  }
];

export const GoalsGenerator = () => {
  const [currentGoal, setCurrentGoal] = useState<WellnessGoal | null>(null);
  const [userMood, setUserMood] = useState<number>(3); // Default to neutral
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);
  const { toast } = useToast();

  // Get user's current mood from localStorage or default to 3
  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood');
    if (savedMood) {
      setUserMood(parseInt(savedMood));
    }
    generatePersonalizedGoal(parseInt(savedMood || '3'));
  }, []);

  const generatePersonalizedGoal = (mood: number = userMood) => {
    setIsGenerating(true);
    
    // Filter goals based on mood
    const relevantGoals = wellnessGoals.filter(goal => 
      goal.moodBased.includes(mood)
    );
    
    // Select a random goal from relevant ones
    const randomGoal = relevantGoals[Math.floor(Math.random() * relevantGoals.length)];
    
    // Simulate generation delay for smooth animation
    setTimeout(() => {
      setCurrentGoal(randomGoal);
      setIsGenerating(false);
    }, 800);
  };

  const handleCompleteGoal = () => {
    if (!currentGoal) return;
    
    setCompletedGoals(prev => [...prev, currentGoal.id]);
    localStorage.setItem('completedGoals', JSON.stringify([...completedGoals, currentGoal.id]));
    
    toast({
      title: "Goal Completed! 🎉",
      description: "Amazing work! You're taking great care of your mental health.",
    });
    
    // Generate a new goal after completing current one
    setTimeout(() => generatePersonalizedGoal(), 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'challenging': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = {
      5: "😊",
      4: "🙂", 
      3: "😐",
      2: "🙁",
      1: "😰"
    };
    return emojis[mood as keyof typeof emojis] || "😐";
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-wellness-calm" />
            Daily Wellness Goals
          </h2>
          <p className="text-xl text-muted-foreground">
            Personalized goals based on how you're feeling today {getMoodEmoji(userMood)}
          </p>
        </div>

        <div className="space-y-8">
          {/* Current Goal Display */}
          <Card className="gradient-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-wellness-calm animate-pulse-soft" />
                Your Personalized Goal
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {isGenerating ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellness-calm mx-auto mb-4"></div>
                  <p className="text-lg text-muted-foreground">Generating your perfect goal...</p>
                </div>
              ) : currentGoal ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                      {currentGoal.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
                      {currentGoal.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                      {currentGoal.category}
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                      {currentGoal.duration}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`px-4 py-2 text-sm font-medium ${getDifficultyColor(currentGoal.difficulty)}`}
                    >
                      {currentGoal.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      onClick={handleCompleteGoal}
                      className="gradient-primary text-white hover:scale-105 transition-all duration-300 py-6 px-8 text-lg font-semibold shadow-lg hover:shadow-xl"
                      size="lg"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Goal
                    </Button>
                    
                    <Button
                      onClick={() => generatePersonalizedGoal()}
                      variant="outline"
                      className="hover:scale-105 transition-all duration-300 py-6 px-8 text-lg border-2 hover:bg-purple-50 hover:border-purple-300"
                      size="lg"
                      disabled={isGenerating}
                    >
                      <RefreshCw className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                      New Goal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">Ready to start your wellness journey?</p>
                  <Button
                    onClick={() => generatePersonalizedGoal()}
                    className="gradient-primary text-white hover:scale-105 transition-all duration-300 py-6 px-8 text-lg font-semibold shadow-lg animate-pulse-urgent"
                    size="lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate My Goal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Stats */}
          {completedGoals.length > 0 && (
            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-2xl font-bold text-success">
                      {completedGoals.length}
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {completedGoals.length === 1 ? 'Goal Completed' : 'Goals Completed'} Today! 🎉
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
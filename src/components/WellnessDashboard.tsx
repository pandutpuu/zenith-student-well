import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Target, AlertTriangle } from "lucide-react";

// Mock data - in a real app, this would come from your database
const mockData = {
  weeklyMood: 3.4,
  streakDays: 7,
  totalCheckIns: 21,
  riskLevel: "low",
  recentMoods: [
    { date: "Today", mood: 4, emoji: "🙂" },
    { date: "Yesterday", mood: 3, emoji: "😐" },
    { date: "2 days ago", mood: 4, emoji: "🙂" },
    { date: "3 days ago", mood: 5, emoji: "😊" },
    { date: "4 days ago", mood: 2, emoji: "🙁" },
  ]
};

export const WellnessDashboard = () => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Wellness Dashboard
          </h2>
          <p className="text-xl text-muted-foreground">Track your progress and discover insights about your mental health journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Weekly Average */}
          <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary animate-pulse-soft" />
                Weekly Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2 animate-bounce-in">{mockData.weeklyMood}/5</div>
              <Progress 
                value={(mockData.weeklyMood / 5) * 100} 
                className="mb-2 h-3 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500 [&>div]:transition-all [&>div]:duration-500" 
              />
              <p className="text-sm text-muted-foreground">Above your usual baseline ✨</p>
            </CardContent>
          </Card>

          {/* Check-in Streak */}
          <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent animate-gentle-float" />
                Check-in Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-2 animate-bounce-in">{mockData.streakDays} days</div>
              <Badge variant="outline" className="border-accent text-accent animate-pulse-soft">
                Keep it up! 🔥
              </Badge>
            </CardContent>
          </Card>

          {/* Total Check-ins */}
          <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-success animate-pulse-soft" />
                Total Check-ins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2 animate-bounce-in">{mockData.totalCheckIns}</div>
              <p className="text-sm text-muted-foreground">This month 📊</p>
            </CardContent>
          </Card>

          {/* Risk Level */}
          <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning animate-gentle-float" />
                Risk Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge 
                variant="outline" 
                className={`text-lg px-3 py-1 mb-2 capitalize ${getRiskColor(mockData.riskLevel)} animate-pulse-soft`}
              >
                {mockData.riskLevel}
              </Badge>
              <p className="text-sm text-muted-foreground">Based on recent patterns 🧠</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Mood History */}
        <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Recent Mood History
            </CardTitle>
            <CardDescription>Your mood check-ins over the past few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentMoods.map((entry, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-background/70 transition-all duration-300 animate-scale-hover border border-purple-100 hover:border-purple-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl transition-transform duration-200 hover:scale-125">{entry.emoji}</span>
                    <span className="font-medium text-gray-700">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={(entry.mood / 5) * 100} 
                      className="w-24 h-3 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500 [&>div]:transition-all [&>div]:duration-300" 
                    />
                    <Badge variant="outline" className="font-semibold">{entry.mood}/5</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
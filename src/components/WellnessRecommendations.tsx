import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Music, Users, Activity, Coffee, Moon } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

const recommendations = [
  {
    id: 1,
    title: "Mindfulness Meditation",
    description: "A 10-minute guided meditation to help reduce stress and improve focus.",
    category: "Mental Health",
    duration: "10 min",
    icon: Activity,
    color: "bg-wellness-calm",
    urgent: false,
    hasAudio: true,
    audioSrc: "/api/placeholder/audio/meditation.mp3",
  },
  {
    id: 2,
    title: "Connect with Friends",
    description: "Social connection is vital. Reach out to a friend or join a study group.",
    category: "Social",
    duration: "30 min",
    icon: Users,
    color: "bg-wellness-happy",
    urgent: false,
    hasAudio: false,
  },
  {
    id: 3,
    title: "Take a Study Break",
    description: "You've been working hard. Take a 15-minute walk or do some light stretching.",
    category: "Physical",
    duration: "15 min",
    icon: Coffee,
    color: "bg-accent",
    urgent: true,
    hasAudio: false,
  },
  {
    id: 4,
    title: "Evening Wind-Down",
    description: "Create a calming bedtime routine to improve sleep quality and reduce anxiety.",
    category: "Sleep",
    duration: "45 min",
    icon: Moon,
    color: "bg-wellness-neutral",
    urgent: false,
    hasAudio: true,
    audioSrc: "/api/placeholder/audio/sleep.mp3",
  },
  {
    id: 5,
    title: "Journaling Exercise",
    description: "Write down three things you're grateful for and one challenge you overcame today.",
    category: "Reflection",
    duration: "20 min",
    icon: BookOpen,
    color: "bg-secondary",
    urgent: false,
    hasAudio: false,
  },
  {
    id: 6,
    title: "Nature Sounds",
    description: "Listen to calming rain sounds or forest ambiance to reduce stress levels.",
    category: "Relaxation",
    duration: "25 min",
    icon: Music,
    color: "bg-wellness-calm",
    urgent: false,
    hasAudio: true,
    audioSrc: "/api/placeholder/audio/nature.mp3",
  },
];

export const WellnessRecommendations = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Personalized Recommendations</h2>
          <p className="text-xl text-muted-foreground">
            Based on your recent mood patterns, here are some evidence-based wellness activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Card 
              key={rec.id} 
              className={`
                gradient-card border-0 shadow-lg transition-all duration-300 animate-scale-hover hover:shadow-2xl
                ${rec.urgent ? 'ring-2 ring-accent ring-opacity-50 animate-pulse-urgent' : ''}
              `}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${rec.color} bg-opacity-20 transition-transform duration-300 hover:scale-110`}>
                    <rec.icon className={`w-6 h-6 text-${rec.color.replace('bg-', '')}`} />
                  </div>
                  {rec.urgent && (
                    <Badge variant="destructive" className="animate-pulse-urgent">
                      Recommended Now
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold">{rec.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {rec.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-sm font-medium">
                    {rec.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-medium">
                    {rec.duration}
                  </span>
                </div>

                {/* Audio Player for audio activities */}
                {rec.hasAudio && rec.audioSrc && (
                  <div className="mb-4">
                    <AudioPlayer
                      title={rec.title}
                      src={rec.audioSrc}
                      isMinimal={true}
                    />
                  </div>
                )}
                
                <Button 
                  className="w-full gradient-primary text-white animate-scale-hover transition-all duration-300 py-3 font-semibold shadow-md"
                  variant="default"
                >
                  Start Activity
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="gradient-card border-0 shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Need More Support?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                If you're experiencing persistent feelings of sadness, anxiety, or other mental health concerns, 
                consider speaking with a counselor or mental health professional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Campus Counseling Services
                </Button>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
                  Crisis Support Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
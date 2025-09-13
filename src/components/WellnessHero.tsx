import { Button } from "@/components/ui/button";
import { Heart, Brain, TrendingUp } from "lucide-react";

export const WellnessHero = () => {
  return (
    <section className="relative min-h-screen gradient-calm flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Brain className="w-20 h-20 text-primary animate-gentle-float" />
              <Heart className="w-8 h-8 text-accent absolute -top-2 -right-2 animate-pulse-soft" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent leading-tight">
            Student Wellness Monitor
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Track your mental health journey with daily check-ins, personalized insights, 
            and evidence-based wellness recommendations designed for students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="gradient-primary text-white border-0 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
              Start Daily Check-in
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-8 py-6 text-lg">
              View Dashboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Daily Mood Tracking",
                description: "Simple, quick check-ins to monitor your emotional wellbeing over time"
              },
              {
                icon: Brain,
                title: "Sentiment Analysis", 
                description: "AI-powered insights into your mental health patterns and trends"
              },
              {
                icon: TrendingUp,
                title: "Personalized Tips",
                description: "Evidence-based wellness recommendations tailored to your needs"
              }
            ].map((feature, index) => (
              <div key={index} className="gradient-card p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
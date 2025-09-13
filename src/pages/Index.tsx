import { WellnessHero } from "@/components/WellnessHero";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { WellnessDashboard } from "@/components/WellnessDashboard";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { PeerSupportFeed } from "@/components/PeerSupportFeed";
import { GoalsGenerator } from "@/components/GoalsGenerator";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <WellnessHero />
      <MoodCheckIn />
      <WellnessDashboard />
      <GoalsGenerator />
      <WellnessRecommendations />
      <PeerSupportFeed />
      <Toaster />
    </main>
  );
};

export default Index;

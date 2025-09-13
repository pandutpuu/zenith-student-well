import { WellnessHero } from "@/components/WellnessHero";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { WellnessDashboard } from "@/components/WellnessDashboard";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";

const Index = () => {
  return (
    <main className="min-h-screen">
      <WellnessHero />
      <MoodCheckIn />
      <WellnessDashboard />
      <WellnessRecommendations />
    </main>
  );
};

export default Index;

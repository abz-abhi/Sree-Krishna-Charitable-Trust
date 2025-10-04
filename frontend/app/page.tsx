import HomePage from "./pages/home/Maincontent";
import MissionSection from "./pages/home/MissionSection";
import GoverningBodySection from "./pages/home/GoverningBodySection";
import JoinHandsSection from "./pages/home/JoinHandsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl flex flex-col space-y-16 mx-auto p-8">
        <HomePage />
        <MissionSection />
        <GoverningBodySection />
        <JoinHandsSection />
      </main>
    </div>
  );
}

import { Screen } from "@/components/layout";
import { OnboardingCarousel } from "@/features/onboarding";

export default function OnboardingScreen() {
  return (
    <Screen scroll={false} fullBleed edges={{ top: true, bottom: true }}>
      <OnboardingCarousel />
    </Screen>
  );
}
import { useRef, useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import { Button, ImageSlot } from "@/components/ui";
import { useUser } from "@/data/store";
import { useTranslation } from "@/i18n";
import { colors, layout, radii, spacing, typography } from "@/theme";

const SLIDES = [
  { imageKey: 'rentak-onb-1', titleKey: 'onboarding.carousel.discover.title', bodyKey: 'onboarding.carousel.discover.body' },
  { imageKey: 'rentak-onb-2', titleKey: 'onboarding.carousel.learn.title', bodyKey: 'onboarding.carousel.learn.body' },
  { imageKey: 'rentak-onb-3', titleKey: 'onboarding.carousel.takePart.title', bodyKey: 'onboarding.carousel.takePart.body' },
] as const;

export function OnboardingCarousel() {
  const { t } = useTranslation();
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const { state, update } = useUser();
  const [page, setPage] = useState(0);

  function finishOnboarding() {
    update({ onboarding: { ...state.onboarding, seenSlides: true } });
  }

  function handleSkip() {
    finishOnboarding();
    router.replace('/auth/sign-in');
  }

  function handlePrimary() {
    if (page < SLIDES.length - 1) {
      pagerRef.current?.setPage(page + 1);
    } else {
      finishOnboarding();
      router.replace('/auth/sign-in');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={handleSkip} style={styles.skip} accessibilityRole="button">
        <Text style={styles.skipLabel}>{t('onboarding.carousel.skip')}</Text>
      </Pressable>

      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {SLIDES.map((slide) => (
          <View key={slide.imageKey} style={styles.slide}>
            <ImageSlot imageKey={slide.imageKey} height={280} radius="2xl" />
            <Text style={styles.title}>{t(slide.titleKey)}</Text>
            <Text style={styles.body}>{t(slide.bodyKey)}</Text>
          </View>
        ))}
      </PagerView>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          label={page === SLIDES.length - 1 ? t('onboarding.carousel.start') : t('onboarding.carousel.next')}
          onPress={handlePrimary}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skip: { alignSelf: 'flex-end', padding: spacing.md2 },
  skipLabel: { ...typography.link, color: colors.text.subtle },
  slide: { flex: 1, alignItems: 'center', paddingHorizontal: spacing.lg, gap: spacing.lg, justifyContent: 'center' },
  title: { ...typography.pageTitle, color: colors.text.primary, textAlign: 'center' },
  body: { ...typography.body, color: colors.text.body, textAlign: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  dot: { width: 8, height: 8, borderRadius: radii.pill, backgroundColor: colors.border.strong },
  dotActive: { backgroundColor: colors.brand, width: 20 },
  footer: { paddingHorizontal: layout.screenGutter, paddingBottom: spacing.lg2 },
});
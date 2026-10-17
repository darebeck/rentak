import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import { Screen } from '@/components/layout';
import { ProgressBar } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { colors, radii, spacing, typography } from '@/theme';
import { useUser } from '@/data/store';

/** How long the splash holds before redirecting into the tabs. */
const HOLD_MS = 4400;

/**
 * The five-bar rhythm mark, read straight off the design. This geometry belongs
 * to the brand mark itself, not to the theme — nothing else in the app draws it.
 *
 * The bars are bottom-aligned inside a 38-high row, which is what makes the
 * uneven heights read as a rhythm rather than as noise.
 */
const BARS = [
  { height: 16, color: colors.gold },
  { height: 32, color: colors.brandOnDark },
  { height: 24, color: colors.gold },
  { height: 38, color: colors.brandOnDark },
  { height: 20, color: colors.brandLight },
] as const;

const BAR_WIDTH = 5;
const BAR_RADIUS = 3;
const BAR_ROW_HEIGHT = 38;

/**
 * The concentric "gongs" behind the mark. Each is far larger than the screen and
 * anchored off one edge, so only an arc of it is ever visible — which is why the
 * offsets matter as much as the diameters.
 */
const RINGS = [
  { size: 760, color: colors.goldRing, top: -160 },
  { size: 560, color: colors.goldRingSoft, top: -60 },
  { size: 640, color: colors.inkRing, bottom: -220 },
] as const;

export default function Splash() {
  const { t } = useTranslation();
  const { state, reset } = useUser();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), HOLD_MS);
    return () => clearTimeout(timer);   // always clean up timers
  }, []);

  useEffect(() => {
    const started = Date.now();
    const tick = setInterval(() => {
      setProgress(Math.min(1, (Date.now() - started) / HOLD_MS));
    }, 80);
    return () => clearInterval(tick);
  }, []);

  if (done) {
    if (!state.onboarding.languageChosen) return <Redirect href="/onboarding/language" />;
    if (!state.onboarding.seenSlides) return <Redirect href="/onboarding" />;
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Screen scroll={false} edges={{ top: true, bottom: true }}>
      {/* Dev only: long-press during the hold to wipe user state and replay first run.
          The gate reads state when the hold ends, so the reset lands before it. */}
      <Pressable style={styles.centre} onLongPress={__DEV__ ? reset : undefined} disabled={!__DEV__}>
        {/* Purely decorative, so they must never swallow a touch. */}
        <View pointerEvents="none" style={styles.rings}>
          {RINGS.map((ring) => (
            <View
              key={ring.size}
              style={[
                styles.ring,
                {
                  width: ring.size,
                  height: ring.size,
                  borderRadius: ring.size / 2,
                  borderColor: ring.color,
                  marginLeft: -ring.size / 2,
                  ...('top' in ring ? { top: ring.top } : { bottom: ring.bottom }),
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.mark}>
          <View style={styles.barRow}>
            {BARS.map((bar, i) => (
              <View
                key={i}
                style={{
                  width: BAR_WIDTH,
                  height: bar.height,
                  borderRadius: BAR_RADIUS,
                  backgroundColor: bar.color,
                }}
              />
            ))}
          </View>
        </View>

        {/* "Rentak" is the product name — a proper noun, identical in both
            locales, so it is not a translation key. The tagline is: it reads
            "Seni Persembahan Warisan" in ms and "Traditional Performing Arts"
            in en, which is a real translation, not a transliteration. */}
        <Text style={styles.wordmark}>Rentak</Text>
        <Text style={styles.tagline}>{t('splash.tagline')}</Text>
      </Pressable>

      <View style={styles.progress}>
        <ProgressBar
          value={progress}
          height={3}
          color={colors.brand}
          trackColor={colors.inkTrack}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rings: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  ring: {
    position: 'absolute',
    left: '50%',
    borderWidth: 1,
  },
  mark: {
    width: 96,
    height: 96,
    borderRadius: radii.splashMark,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    // 0 18px 40px rgba(32,35,31,0.28) — the only drop shadow of this weight in
    // the design, and the reason the mark reads as lifted off the cream.
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.28,
    shadowRadius: 40,
    elevation: 12,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: BAR_ROW_HEIGHT,
    gap: spacing.sm3,
  },
  wordmark: {
    ...typography.displayXL,
    color: colors.brand,
  },
  tagline: {
    ...typography.splashTagline,
    color: colors.text.subtle,
    marginTop: spacing.md3,
  },
  progress: {
    width: 120,
    alignSelf: 'center',
    marginBottom: 120,
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Card, Icon, ProgressBar } from "@/components/ui";
import { SectionHeader } from "@/components/layout";
import { useTranslation } from "@/i18n";
import { lessonRepository } from "@/data/repositories";
import { spacing, typography, colors, layout, radii } from "@/theme";

/**
 * Home's "Continue learning" card — the one row that resumes the Heritage track.
 *
 * The thumbnail is a brand tile with a gold mask icon, not an image: v2's Home
 * carries only two `<image-slot>`s (the hero and the recommendation), and this
 * is not one of them.
 *
 * The progress ratio is *not* computed here. `getInProgress()` derives it from
 * the lesson itself, so this component only ever displays it.
 */
export function ContinueLearning() {
  const { t, tx } = useTranslation();   // t for chrome, tx for content
  const router = useRouter();
  const inProgress = lessonRepository.getInProgress();

  if (!inProgress) return null;   // narrows before the fields are read

  const { lesson, progress } = inProgress;

  return (
    <View style={styles.section}>
      <SectionHeader title={t('home.section.continueLearning')} />

      {/* The press target wraps the whole card, so the card keeps its layout. */}
      <Pressable onPress={() => router.push('/(tabs)/heritage')} accessibilityRole="button">
        <Card variant="shadow" radius="2xl">
          {/* One row: the slot and the column are siblings, both inside it. */}
          <View style={styles.row}>
            <View style={styles.thumb}>
              <Icon name="mask-happy" size={28} color={colors.gold} />
            </View>

            <View style={styles.column}>
              <Text numberOfLines={1} style={styles.rowTitle}>{tx(lesson.courseName)}</Text>
              {/* The lesson title is content, so it goes through tx() before t()
                  interpolates it into the chrome sentence. */}
              <Text numberOfLines={1} style={styles.rowProgress}>
                {t('home.lesson.progress', {
                  n: lesson.order,
                  total: lesson.totalInCourse,
                  title: tx(lesson.title),
                })}
              </Text>
              <ProgressBar value={progress} />
            </View>
          </View>
        </Card>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: layout.headerGap
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: radii.lg,
    flexShrink: 0,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    gap: spacing.sm
  },
  rowTitle: {
    ...typography.rowTitle,
    color: colors.text.primary
  },
  rowProgress: {
    ...typography.meta,
    color: colors.text.muted
  }
});

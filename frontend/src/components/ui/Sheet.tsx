import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout, radii, spacing } from '@/theme';

type SheetProps = {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode;
  /** Already translated — describes the sheet to a screen reader. */
  accessibilityLabel?: string;
};

/**
 * The bottom sheet behind 25 Filters and 40 Share.
 *
 * `radii.sheet` (26) is its own token because the sheet is the only surface in
 * the design at that radius — it overlaps a hero image and needs to read as a
 * separate plane, not as a bigger card.
 *
 * The scrim is a Pressable so a tap outside dismisses, which is what the design
 * implies and what users expect; `onRequestClose` covers the Android back
 * gesture, which is easy to forget and leaves the sheet stuck without it.
 */
export function Sheet({ visible, onDismiss, children, accessibilityLabel }: SheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <Pressable style={styles.scrim} onPress={onDismiss} accessibilityRole="button" />

      <View
        accessibilityViewIsModal
        accessibilityLabel={accessibilityLabel}
        style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <View style={styles.handle} />
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.scrim,
  },
  sheet: {
    marginTop: 'auto',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    paddingHorizontal: layout.screenGutter,
    paddingTop: spacing.md2,
    gap: layout.headerGap,
  },
  handle: {
    alignSelf: 'center',
    width: 38,
    height: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.border.strong,
    marginBottom: spacing.sm,
  },
});

import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { Icon, type IconName } from './Icon';

type ListRowProps = {
  /** Already translated by the caller — primitives never touch i18n. */
  title: string;
  /** Leading glyph. Omit for rows that lead with text alone. */
  icon?: IconName;
  /** Second line under the title. */
  subtitle?: string;
  /** Right-aligned trailing text, e.g. "2 on" or the current language. */
  value?: string;
  /** Anything custom on the right — a Switch, a Tag. Replaces `value`. */
  accessory?: ReactNode;
  /** Show the trailing chevron. Defaults to true when the row is pressable. */
  showChevron?: boolean;
  onPress?: () => void;
  /** Set by ListGroup on every row but the last. */
  divider?: boolean;
};

/**
 * The workhorse row of the settings subtree and every grouped list.
 *
 * `ph-caret-right` is the single most repeated element in the design — fifty
 * occurrences across fifteen screens — so this component exists before any
 * screen that uses it.
 *
 * Geometry is read off screen 20: 15/16 padding, 12 gap, 44 minimum height
 * (which is also the accessibility touch-target floor), a 20px brand icon and a
 * 16px chevron in `icon.chevron`.
 */
export function ListRow({
  title,
  icon,
  subtitle,
  value,
  accessory,
  showChevron,
  onPress,
  divider = false,
}: ListRowProps) {
  const chevron = showChevron ?? Boolean(onPress);

  const content = (
    <>
      {icon ? <Icon name={icon} size={20} color={colors.brand} /> : null}

      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {accessory ?? (value ? <Text style={styles.value}>{value}</Text> : null)}
      {chevron ? <Icon name="caret-right" size={16} color={colors.icon.chevron} /> : null}
    </>
  );

  const rowStyle = [styles.row, divider && styles.divider];

  if (!onPress) return <View style={rowStyle}>{content}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [...rowStyle, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md2,
    paddingVertical: 15,
    paddingHorizontal: spacing.lg3,
    minHeight: 44,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.divider,
  },
  pressed: { opacity: 0.85 },
  body: { flex: 1, gap: spacing.xs2 },
  title: { ...typography.rowTitle, fontWeight: '400', color: colors.text.primary },
  subtitle: { ...typography.meta, color: colors.text.muted },
  value: { ...typography.rowTitleSm, fontWeight: '400', color: colors.text.faint },
});

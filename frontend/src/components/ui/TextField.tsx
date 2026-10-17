import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, radii, spacing, typography } from '@/theme';
import { Icon } from './Icon';

type TextFieldProps = {
  /** Already translated by the caller — primitives never touch i18n. */
  label: string;
  value: string;
  onChangeText: (next: string) => void;
  placeholder?: string;
  /** Shown under the field. Rendered in the error colour when `error` is set. */
  helper?: string;
  error?: boolean;
  /** Renders the masked input plus the eye / eye-slash reveal toggle. */
  secure?: boolean;
  multiline?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  /** Already translated — e.g. "Show password". */
  revealAccessibilityLabel?: string;
};

/**
 * The form input for 06, 07, 32, 33, 39 and 41.
 *
 * Geometry from screen 06: a 14/600 label in `text.body`, then a 52-high field
 * with `radii.md` corners. The design draws focus as a brand-green border,
 * which is the only state change on the control, so it is tracked here rather
 * than pushed onto every caller.
 */
export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  helper,
  error = false,
  secure = false,
  multiline = false,
  keyboardType,
  autoCapitalize,
  revealAccessibilityLabel,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const borderColor = error
    ? colors.terracottaText
    : focused
      ? colors.brand
      : colors.border.default;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.field, multiline && styles.fieldMultiline, { borderColor }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.faint}
          secureTextEntry={secure && !revealed}
          multiline={multiline}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
        />

        {secure ? (
          <Pressable
            onPress={() => setRevealed((r) => !r)}
            accessibilityRole="button"
            accessibilityLabel={revealAccessibilityLabel}
            hitSlop={spacing.md2}
          >
            <Icon
              name={revealed ? 'eye-slash' : 'eye'}
              size={20}
              color={colors.text.subtle}
            />
          </Pressable>
        ) : null}
      </View>

      {helper ? (
        <Text style={[styles.helper, error && styles.helperError]}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 7 },
  label: { ...typography.metaLg, fontWeight: '600', color: colors.text.body },
  field: {
    minHeight: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md2,
    paddingHorizontal: spacing.lg3,
  },
  fieldMultiline: { minHeight: 108, alignItems: 'flex-start', paddingVertical: spacing.md2 },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    // Android's TextInput carries built-in vertical padding that breaks the
    // 52pt height; the wrapper already provides the spacing.
    paddingVertical: 0,
  },
  helper: { ...typography.meta, color: colors.text.muted },
  helperError: { color: colors.terracottaText },
});

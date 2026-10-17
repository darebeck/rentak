import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@/theme";
import { Icon } from "@/components/ui";

type HeaderProps = {
  title: string;
  onBack?: () => void;
  step?: string;
  backAccessibilityLabel?: string;
};

export function Header({ title, onBack, step, backAccessibilityLabel }: HeaderProps) {
  return (
    <View style={styles.wrapper}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={backAccessibilityLabel}
          hitSlop={spacing.md2}
          style={styles.backButton}
        >
          <Icon name="caret-left" size={22} color={colors.text.primary} />
        </Pressable>
      ) : null}

      {step ? <Text style={styles.step}>{step}</Text> : null}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm2 },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.sm2,
  },
  step: {
    ...typography.eyebrowSm,
    color: colors.text.subtle,
  },
  title: {
    ...typography.pageTitle,
    color: colors.text.primary
  },
});
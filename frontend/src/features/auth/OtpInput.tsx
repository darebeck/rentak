import { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, radii, spacing } from "@/theme";

type OtpInputProps = {
  length?: number;
  value: string[];
  onChange: (next: string[]) => void;
};

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const refs = useRef<Array<TextInput | null>>([]);

  function handleDigitChange(index: number, digit: string) {
    const clean = digit.replace(/[^0-9]/g, '').slice(-1);
    const next = [...value];
    next[index] = clean;
    onChange(next);
    if (clean && index < length - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyPress(index: number, key: string) {
    if (key === 'Backspace' && !value[index] && index > 0) refs.current[index - 1]?.focus();
  }

  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(el) => { refs.current[i] == el; }}
          value={value[i] ?? ''}
          onChangeText={(d) => handleDigitChange(i, d)}
          onKeyPress={(e) => handleKeyPress(i, e.nativeEvent.key)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.box}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  box: {
    width: 44, height: 62, borderRadius: radii.md, borderWidth: 1,
    borderColor: colors.border.default, backgroundColor: colors.surface,
    textAlign: 'center', fontSize: 24, color: colors.text.primary,
  },
});
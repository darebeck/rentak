import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '@/theme';
import { ImageSlot } from './ImageSlot';

type AvatarProps = {
  /** Full name. Only its first character is drawn, when there is no photo. */
  name: string;
  size?: number;
  /** An `<image-slot>` id such as 'rentak-avatar'. Falls back to the initial. */
  imageKey?: string;
  onPress?: () => void;
  /** Already translated by the caller — e.g. "Profile". */
  accessibilityLabel?: string;
};

/**
 * The user's face in the app: Home's header, 17 Profile, 28 Artist, 32 Edit.
 *
 * On Home the design draws no photo at all — it is a brand-green circle with the
 * user's initial in gold. That is the default here rather than a degraded state,
 * because a guest has no photo and guests are a first-class route: the fallback
 * is what most users actually see.
 */
export function Avatar({ name, size = 44, imageKey, onPress, accessibilityLabel }: AvatarProps) {
  // Take the first character of the trimmed name; `Array.from` so an emoji or a
  // multi-byte letter isn't sliced in half.
  const initial = Array.from(name.trim())[0]?.toUpperCase() ?? '';

  const content = imageKey ? (
    <ImageSlot imageKey={imageKey} shape="circle" width={size} height={size} label={name} />
  ) : (
    <View
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {/* Scales with the circle: 17pt inside the design's 44pt avatar. */}
      <Text style={[styles.initial, { fontSize: Math.round(size * 0.386) }]}>{initial}</Text>
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [{ borderRadius: radii.pill }, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontWeight: '600',
    color: colors.gold,
  },
  pressed: { opacity: 0.85 },
});

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export default function ExperienceCategoryChip({ icon, label, active = false, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: 80,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.creamWarm,
    marginRight: spacing.sm,
  },
  chipActive: {
    borderColor: colors.sageDark,
    borderWidth: 1.5,
  },
  iconWrap: {
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.labelSM,
    color: colors.charcoal,
    textAlign: 'center',
    fontFamily: 'DMSans_500Medium',
  },
});

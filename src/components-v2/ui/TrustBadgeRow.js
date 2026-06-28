import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function TrustBadgeRow({ items, variant = 'light', iconSize = 10 }) {
  const isLight = variant === 'light';

  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <View key={item.label} style={styles.item}>
          {item.icon}
          <Text
            style={[
              styles.label,
              { color: isLight ? colors.heroTextMuted : colors.stone, fontSize: iconSize },
            ]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
  },
});

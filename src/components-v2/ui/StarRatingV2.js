import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export default function StarRatingV2({ rating = 4.8, count, size = 13 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <View style={styles.row}>
      {[...Array(full)].map((_, i) => (
        <Ionicons key={`f${i}`} name="star" size={size} color={colors.gold} />
      ))}
      {half === 1 && <Ionicons name="star-half" size={size} color={colors.gold} />}
      {[...Array(empty)].map((_, i) => (
        <Ionicons key={`e${i}`} name="star-outline" size={size} color={colors.stoneLight} />
      ))}
      {count !== undefined && (
        <Text style={[styles.count, { fontSize: size - 2 }]}>
          {' '}{rating} ({count} trips)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  count: { color: colors.stone, fontFamily: 'DMSans_400Regular', marginLeft: 2 },
});

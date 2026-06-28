import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export default function DestinationCard({
  city,
  state,
  rating,
  guideCount,
  imageUri,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={onPress}>
      <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" transition={300} />
      <View style={styles.overlay} />
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={11} color={colors.gold} />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <View style={styles.heart}>
        <Feather name="heart" size={16} color={colors.white} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.city} numberOfLines={1}>{city}</Text>
        <Text style={styles.state} numberOfLines={1}>{state}</Text>
        <Text style={styles.guides}>{guideCount} Guides</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: spacing.md,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: colors.destCardOverlay,
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.destRatingBg,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  ratingText: {
    ...typography.labelSM,
    color: colors.white,
    fontFamily: 'DMSans_500Medium',
  },
  heart: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  textWrap: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
  },
  city: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: colors.white,
  },
  state: {
    ...typography.labelSM,
    color: colors.destCountry,
    marginTop: 2,
  },
  guides: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
    color: colors.heroTextFaint,
    marginTop: 2,
  },
});

// STATUS: Static UI V2 — no navigation, no API calls
// SCREEN: MatchingScreenV2 — loading / searching state

import { useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ORBIT_1, ORBIT_2, ORBIT_3, ORBIT_4, HERO_JAIPUR } from '../constants/imageUrls';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, radius } from '../constants/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ORBIT_SIZE = 260;
const ORBIT_RADIUS = ORBIT_SIZE / 2;
const PHOTO_SIZE = 66;
const WRAP_W = PHOTO_SIZE + 40;
const HALF_WRAP = WRAP_W / 2;

const ORBIT_GUIDES = [
  { uri: ORBIT_1, rating: 4.9, label: 'Heritage Expert' },
  { uri: ORBIT_2, rating: 4.8, label: 'Storyteller' },
  { uri: ORBIT_3, rating: 4.9, label: 'Culture Specialist' },
  { uri: ORBIT_4, rating: 4.7, label: 'History Buff' },
];

const GUIDE_POSITIONS = [
  { top: -(PHOTO_SIZE / 2), left: ORBIT_RADIUS - HALF_WRAP },
  { top: ORBIT_RADIUS - (PHOTO_SIZE / 2), left: -(HALF_WRAP - 8) },
  { top: ORBIT_RADIUS - (PHOTO_SIZE / 2), left: ORBIT_SIZE - HALF_WRAP - 8 },
  { top: ORBIT_SIZE - (PHOTO_SIZE / 2) + 4, left: ORBIT_RADIUS - HALF_WRAP },
];

const MID_RING = 195;
const INNER_RING = 130;
const CENTER_SIZE = 64;

const ACCENT_DOTS = [
  { top: 50, left: ORBIT_RADIUS + 60, size: 4, color: colors.gold },
  { top: ORBIT_RADIUS - 15, left: 45, size: 4, color: colors.sageDark },
  { top: ORBIT_RADIUS + 35, left: ORBIT_SIZE - 35, size: 5, color: colors.gold },
  { top: ORBIT_SIZE - 45, left: 70, size: 4, color: colors.sageDark },
  { top: 80, left: ORBIT_SIZE - 50, size: 4, color: colors.gold },
  { top: ORBIT_SIZE - 70, left: ORBIT_RADIUS + 45, size: 3, color: colors.gold },
  { top: ORBIT_RADIUS + 50, left: 25, size: 3, color: colors.sageDark },
  { top: 45, left: ORBIT_RADIUS - 45, size: 3, color: colors.sageDark },
];

const TRUST_ITEMS = [
  { icon: <Feather name="shield" size={18} color={colors.sageDark} />, label: 'Verified Guides', sub: 'All guides are\nbackground\nverified' },
  { icon: <Feather name="message-circle" size={18} color={colors.sageDark} />, label: 'Local Experts', sub: '100% locals who\nknow Jaipur\ninside out' },
  { icon: <Ionicons name="star" size={18} color={colors.sageDark} />, label: 'Top Rated', sub: 'Only 4.5+ rated\nguides for the\nbest experience' },
  { icon: <Feather name="lock" size={18} color={colors.sageDark} />, label: 'Safe & Secure', sub: 'Secure bookings\nand 24/7\nsupport' },
];

function OrbitGuideDot({ guide, position, fadeAnim, pulseAnim }) {
  return (
    <Animated.View
      style={[
        styles.guideDotWrap,
        { top: position.top, left: position.left, opacity: fadeAnim, transform: [{ scale: pulseAnim }] },
      ]}
    >
      <View style={styles.photoRing}>
        <Image
          source={{ uri: guide.uri }}
          style={styles.guidePhoto}
          contentFit="cover"
          transition={300}
        />
      </View>
      <View style={styles.ratingChip}>
        <Ionicons name="star" size={9} color={colors.gold} />
        <Text style={styles.ratingText}>{guide.rating}</Text>
      </View>
      <View style={styles.labelChip}>
        <Text style={styles.labelText}>{guide.label}</Text>
      </View>
    </Animated.View>
  );
}

function AnimatedAccentDot({ dot, index }) {
  const blink = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.8, duration: 1200, delay: index * 200, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 0.2, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [blink, index]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: dot.top,
        left: dot.left,
        width: dot.size,
        height: dot.size,
        borderRadius: dot.size / 2,
        backgroundColor: dot.color,
        opacity: blink,
      }}
    />
  );
}

export default function MatchingScreenV2() {
  const insets = useSafeAreaInsets();

  const spin = useRef(new Animated.Value(0)).current;
  const sweep = useRef(new Animated.Value(0)).current;
  const centerPulse = useRef(new Animated.Value(1)).current;
  const guideFades = useRef(ORBIT_GUIDES.map(() => new Animated.Value(0))).current;
  const guidePulses = useRef(ORBIT_GUIDES.map(() => new Animated.Value(1))).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true })
    ).start();

    Animated.loop(
      Animated.timing(sweep, { toValue: 1, duration: 6000, easing: Easing.linear, useNativeDriver: true })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(centerPulse, { toValue: 1.12, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(centerPulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    Animated.stagger(600, [
      ...guideFades.map((fade) =>
        Animated.timing(fade, { toValue: 1, duration: 800, easing: Easing.out(Easing.ease), useNativeDriver: true })
      ),
    ]).start();

    guidePulses.forEach((pulse, i) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulse, { toValue: 1.06, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            Animated.timing(pulse, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          ])
        ).start();
      }, 600 * i + 800);
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: false }),
        Animated.timing(progressAnim, { toValue: 0, duration: 0, useNativeDriver: false }),
      ])
    ).start();
  }, [spin, sweep, centerPulse, guideFades, guidePulses, progressAnim]);

  const spinDeg = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const sweepDeg = sweep.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const dot1 = progressAnim.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0.3, 1, 1] });
  const dot2 = progressAnim.interpolate({ inputRange: [0, 0.15, 0.35, 1], outputRange: [0.3, 0.3, 1, 1] });
  const dot3 = progressAnim.interpolate({ inputRange: [0, 0.35, 0.55, 1], outputRange: [0.3, 0.3, 1, 1] });
  const dot4 = progressAnim.interpolate({ inputRange: [0, 0.55, 0.75, 1], outputRange: [0.3, 0.3, 0.7, 0.3] });
  const dot5 = progressAnim.interpolate({ inputRange: [0, 0.75, 0.9, 1], outputRange: [0.3, 0.3, 0.5, 0.3] });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.backBtn, { top: insets.top + spacing.md }]}
          activeOpacity={0.75}
        >
          <Feather name="arrow-left" size={18} color={colors.sageDark} />
        </TouchableOpacity>

        <View style={styles.headerBlock}>
          <View style={styles.decorRow}>
            <View style={styles.decorLine} />
            <Text style={styles.microLabel}>MATCHING GUIDES</Text>
            <View style={styles.decorLine} />
          </View>
          <Text style={styles.city}>Jaipur, Rajasthan</Text>
          <Text style={styles.sub}>We're finding the best local guides for you</Text>
        </View>

        <View style={styles.orbitWrapper}>
          <View style={styles.warmGlow} />
          <View style={styles.orbitContainer}>
            <View style={[styles.radialLine, { transform: [{ rotate: '0deg' }] }]} />
            <View style={[styles.radialLine, { transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.radialLine, { transform: [{ rotate: '90deg' }] }]} />
            <View style={[styles.radialLine, { transform: [{ rotate: '135deg' }] }]} />

            <View style={styles.outerRing} />
            <Animated.View style={[styles.spinRing, { transform: [{ rotate: spinDeg }] }]} />
            <View style={styles.midRing} />
            <View style={styles.innerRing} />

            <Animated.View style={[styles.sweepView, { transform: [{ rotate: sweepDeg }] }]}>
              <View style={styles.sweepSlice} />
            </Animated.View>

            <Animated.View style={[styles.centerDot, { transform: [{ scale: centerPulse }] }]}>
              <Feather name="map-pin" size={22} color={colors.gold} />
            </Animated.View>

            {ACCENT_DOTS.map((d, i) => (
              <AnimatedAccentDot key={i} dot={d} index={i} />
            ))}

            {ORBIT_GUIDES.map((g, i) => (
              <OrbitGuideDot
                key={i}
                guide={g}
                position={GUIDE_POSITIONS[i]}
                fadeAnim={guideFades[i]}
                pulseAnim={guidePulses[i]}
              />
            ))}
          </View>
        </View>

        <View style={styles.statusBlock}>
          <View style={styles.binocularsRow}>
            <View style={styles.goldLine} />
            <MaterialCommunityIcons name="binoculars" size={22} color={colors.gold} />
            <View style={styles.goldLine} />
          </View>
          <Text style={styles.statusTitle}>Finding your perfect guide</Text>
          <Text style={styles.statusSub}>Browsing 24 certified local guides in Jaipur…</Text>
          <View style={styles.progressDots}>
            <Animated.View style={[styles.progressDot, styles.progressLarge, { backgroundColor: colors.sageDark, opacity: dot1 }]} />
            <Animated.View style={[styles.progressDot, styles.progressLarge, { backgroundColor: colors.sageDark, opacity: dot2 }]} />
            <Animated.View style={[styles.progressDot, styles.progressLarge, { backgroundColor: colors.sageDark, opacity: dot3 }]} />
            <Animated.View style={[styles.progressDot, styles.progressSmall, { backgroundColor: colors.sageMid, opacity: dot4 }]} />
            <Animated.View style={[styles.progressDot, styles.progressSmall, { backgroundColor: colors.sageMid, opacity: dot5 }]} />
          </View>
        </View>

        <View style={styles.trustCard}>
          {TRUST_ITEMS.map((item, idx) => (
            <View key={item.label} style={styles.trustItem}>
              {idx > 0 && <View style={styles.trustDivider} />}
              <View style={styles.trustIcon}>{item.icon}</View>
              <Text style={styles.trustLabel}>{item.label}</Text>
              <Text style={styles.trustSub}>{item.sub}</Text>
            </View>
          ))}
        </View>

        <View style={styles.landmarkStrip}>
          <Image source={{ uri: HERO_JAIPUR }} style={StyleSheet.absoluteFill} contentFit="cover" />
          <View style={styles.landmarkOverlay} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  content: { paddingBottom: spacing.xxl, alignItems: 'center' },
  backBtn: {
    position: 'absolute', left: spacing.lg, zIndex: 10,
    backgroundColor: colors.sage, borderRadius: 10, width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  headerBlock: { alignItems: 'center', marginTop: 60, paddingHorizontal: spacing.lg },
  decorRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, width: '100%' },
  decorLine: { flex: 1, height: 1, backgroundColor: colors.sageMid },
  microLabel: { fontFamily: 'DMSans_500Medium', fontSize: 9, color: colors.gold, letterSpacing: 1.5, textTransform: 'uppercase' },
  city: { fontFamily: 'DMSerifDisplay_400Regular', fontSize: 28, color: colors.charcoal, marginTop: spacing.sm, textAlign: 'center' },
  sub: { fontFamily: 'DMSans_400Regular', fontSize: 13, color: colors.stone, marginTop: spacing.xs, textAlign: 'center' },
  orbitWrapper: {
    width: SCREEN_WIDTH,
    height: ORBIT_SIZE + 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    position: 'relative',
    overflow: 'visible',
  },
  warmGlow: {
    position: 'absolute',
    width: ORBIT_SIZE + 140,
    height: ORBIT_SIZE + 140,
    borderRadius: (ORBIT_SIZE + 140) / 2,
    backgroundColor: colors.goldLight,
    opacity: 0.22,
    alignSelf: 'center',
  },
  orbitContainer: {
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  radialLine: {
    position: 'absolute',
    width: 1,
    height: ORBIT_SIZE,
    backgroundColor: colors.sageMid,
    opacity: 0.25,
    left: ORBIT_RADIUS - 0.5,
    top: 0,
  },
  outerRing: {
    position: 'absolute',
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
    borderRadius: ORBIT_RADIUS,
    borderWidth: 1.5,
    borderColor: colors.sageMid,
    opacity: 0.45,
  },
  spinRing: {
    position: 'absolute',
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
    borderRadius: ORBIT_RADIUS,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(200,169,110,0.2)',
    borderTopColor: colors.gold,
  },
  midRing: {
    position: 'absolute',
    width: MID_RING,
    height: MID_RING,
    borderRadius: MID_RING / 2,
    borderWidth: 1,
    borderColor: colors.sageMid,
    opacity: 0.3,
  },
  innerRing: {
    position: 'absolute',
    width: INNER_RING,
    height: INNER_RING,
    borderRadius: INNER_RING / 2,
    borderWidth: 1,
    borderColor: colors.sageMid,
    opacity: 0.2,
  },
  sweepView: {
    position: 'absolute',
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
  },
  sweepSlice: {
    position: 'absolute',
    top: 0,
    left: ORBIT_RADIUS,
    width: ORBIT_RADIUS,
    height: ORBIT_RADIUS,
    backgroundColor: 'rgba(200,169,110,0.06)',
    borderTopRightRadius: ORBIT_RADIUS,
  },
  centerDot: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    backgroundColor: colors.sageDeep,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  guideDotWrap: {
    position: 'absolute',
    alignItems: 'center',
    width: WRAP_W,
    overflow: 'visible',
  },
  photoRing: {
    borderWidth: 3,
    borderColor: colors.gold,
    borderRadius: (PHOTO_SIZE + 6) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  guidePhoto: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.sageDeep,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginTop: -4,
    zIndex: 1,
  },
  ratingText: { fontFamily: 'DMSans_600SemiBold', fontSize: 9, color: colors.white },
  labelChip: {
    backgroundColor: colors.sageDeep,
    borderRadius: 8,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    marginTop: 2,
  },
  labelText: { fontFamily: 'DMSans_500Medium', fontSize: 8, color: colors.white },
  statusBlock: { alignItems: 'center', marginTop: spacing.sm, paddingHorizontal: spacing.lg },
  binocularsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, width: '65%' },
  goldLine: { flex: 1, height: 1, backgroundColor: colors.gold, opacity: 0.35 },
  statusTitle: { fontFamily: 'DMSans_700Bold', fontSize: 18, color: colors.charcoal, marginTop: spacing.md },
  statusSub: { fontFamily: 'DMSans_400Regular', fontSize: 12, color: colors.stone, marginTop: spacing.xs, textAlign: 'center' },
  progressDots: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg },
  progressDot: { borderRadius: 6 },
  progressLarge: { width: 10, height: 10 },
  progressSmall: { width: 8, height: 8 },
  trustCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.creamWarm,
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  trustItem: { flex: 1, alignItems: 'center', paddingHorizontal: spacing.xs, position: 'relative' },
  trustDivider: { position: 'absolute', left: 0, top: spacing.xs, bottom: spacing.xs, width: 1, backgroundColor: colors.creamWarm },
  trustIcon: {
    width: 40, height: 40, backgroundColor: colors.sage, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm,
  },
  trustLabel: { fontFamily: 'DMSans_700Bold', fontSize: 10, color: colors.charcoal, textAlign: 'center' },
  trustSub: { fontFamily: 'DMSans_400Regular', fontSize: 8, color: colors.stone, textAlign: 'center', marginTop: spacing.xs, lineHeight: 12 },
  landmarkStrip: { width: '100%', height: 100, marginTop: spacing.xl, overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  landmarkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
});

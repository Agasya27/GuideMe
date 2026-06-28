// STATUS: Static UI V2 — no navigation, no API calls
// SCREEN: HomeScreenV2
// DATA: Replace POPULAR_DESTINATIONS / TOP_GUIDES / CATEGORIES with API responses in Phase 2

import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomTabBar, { useTabBarHeight } from '../components-v2/ui/BottomTabBar';
import { Image } from 'expo-image';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import DestinationCard from '../components-v2/ui/DestinationCard';
import ExperienceCategoryChip from '../components-v2/ui/ExperienceCategoryChip';
import GuideAvatarPhoto from '../components-v2/ui/GuideAvatarPhoto';
import StarRatingV2 from '../components-v2/ui/StarRatingV2';
import TrustBadgeRow from '../components-v2/ui/TrustBadgeRow';
import {
  HERO_JAIPUR,
  DEST_JAIPUR,
  DEST_AGRA,
  DEST_UDAIPUR,
  DEST_MYSORE,
  GUIDE_RAMESH,
  GUIDE_POOJA,
  GUIDE_ARJUN,
} from '../constants/imageUrls';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, radius } from '../constants/spacing';

const CATEGORIES = [
  { id: 'heritage', label: 'Heritage Tours', icon: <MaterialCommunityIcons name="bank" size={28} color={colors.sageDark} />, active: true },
  { id: 'food', label: 'Food Tours', icon: <MaterialCommunityIcons name="food" size={28} color={colors.sageDark} /> },
  { id: 'art', label: 'Art & Culture', icon: <Feather name="feather" size={28} color={colors.sageDark} /> },
  { id: 'nature', label: 'Nature & Adventure', icon: <Feather name="compass" size={28} color={colors.sageDark} /> },
  { id: 'photo', label: 'Photography Walks', icon: <Feather name="camera" size={28} color={colors.sageDark} /> },
  { id: 'royal', label: 'Royal Experiences', icon: <MaterialCommunityIcons name="crown" size={28} color={colors.sageDark} /> },
];

const POPULAR_DESTINATIONS = [
  { id: 'jaipur', city: 'Jaipur', state: 'Rajasthan', rating: 4.8, guideCount: 125, imageUri: DEST_JAIPUR },
  { id: 'agra', city: 'Agra', state: 'Uttar Pradesh', rating: 4.9, guideCount: 98, imageUri: DEST_AGRA },
  { id: 'udaipur', city: 'Udaipur', state: 'Rajasthan', rating: 4.7, guideCount: 86, imageUri: DEST_UDAIPUR },
  { id: 'mysore', city: 'Mysore', state: 'Karnataka', rating: 4.6, guideCount: 64, imageUri: DEST_MYSORE },
];

const TOP_GUIDES = [
  { id: 'ramesh', name: 'Ramesh Sharma', specialty: 'Heritage Expert', rating: 4.9, trips: 132, rate: 450, imageUri: GUIDE_RAMESH, topRated: true },
  { id: 'pooja', name: 'Pooja Rathore', specialty: 'Culture Specialist', rating: 4.8, trips: 98, rate: 400, imageUri: GUIDE_POOJA, topRated: true },
  { id: 'arjun', name: 'Arjun Singh', specialty: 'History Enthusiast', rating: 4.7, trips: 76, rate: 500, imageUri: GUIDE_ARJUN, topRated: false },
];

const HERO_TRUST_ITEMS = [
  { icon: <Feather name="shield" size={10} color={colors.heroTextMuted} />, label: 'Verified Guides' },
  { icon: <Feather name="star" size={10} color={colors.heroTextMuted} />, label: 'Top Rated' },
  { icon: <Feather name="lock" size={10} color={colors.heroTextMuted} />, label: 'Secure Payments' },
  { icon: <Feather name="headphones" size={10} color={colors.heroTextMuted} />, label: '24/7 Support' },
];

function SectionHeader({ title, onViewAll }) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionUnderline} />
      </View>
      <TouchableOpacity activeOpacity={0.75} onPress={onViewAll}>
        <Text style={styles.viewAll}>View all →</Text>
      </TouchableOpacity>
    </View>
  );
}

function HeroField({ icon, label, value, rightIcon }) {
  return (
    <View style={styles.heroField}>
      <View style={styles.heroFieldIconChip}>{icon}</View>
      <View style={styles.heroFieldText}>
        <Text style={styles.heroFieldLabel}>{label}</Text>
        <Text style={styles.heroFieldValue} numberOfLines={1}>{value}</Text>
      </View>
      {rightIcon}
    </View>
  );
}

export default function HomeScreenV2() {
  const tabBarHeight = useTabBarHeight();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.logo}>
              Guide<Text style={styles.logoAccent}>me</Text>
            </Text>
            <Text style={styles.tagline}>Local. Authentic. Unforgettable.</Text>
          </View>
          <TouchableOpacity style={styles.myTripsPill} activeOpacity={0.75}>
            <Feather name="map" size={15} color={colors.sageDark} />
            <Text style={styles.myTripsText}>My Trips</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Image source={{ uri: HERO_JAIPUR }} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
          <View style={styles.heroOverlay} />

          <View style={styles.heroTopRow}>
            <View style={styles.heroLeft}>
              <View style={styles.discoverRow}>
                <Feather name="sun" size={11} color={colors.gold} />
                <Text style={styles.discoverLabel}>DISCOVER INDIA</Text>
              </View>
              <Text style={styles.heroHeading}>
                Where are you{'\n'}exploring <Text style={styles.heroGold}>next?</Text>
              </Text>
              <Text style={styles.heroSub}>
                Find verified local guides for{'\n'}unforgettable experiences.
              </Text>
            </View>
            <View style={styles.socialProof}>
              <View style={styles.avatarStack}>
                <GuideAvatarPhoto uri={GUIDE_RAMESH} size={28} borderRadius={14} />
                <View style={styles.avatarOverlap}>
                  <GuideAvatarPhoto uri={GUIDE_POOJA} size={28} borderRadius={14} />
                </View>
                <View style={[styles.avatarOverlap, { marginLeft: -16 }]}>
                  <GuideAvatarPhoto uri={GUIDE_ARJUN} size={28} borderRadius={14} />
                </View>
              </View>
              <View>
                <Text style={styles.socialCount}>15K+</Text>
                <Text style={styles.socialLabel}>Happy Travellers</Text>
              </View>
              <Feather name="heart" size={12} color={colors.gold} />
            </View>
          </View>

          <HeroField
            icon={<Feather name="map-pin" size={17} color={colors.sageDeep} />}
            label="DESTINATION"
            value="Jaipur, Rajasthan"
            rightIcon={<Feather name="crosshair" size={16} color={colors.gold} />}
          />
          <HeroField
            icon={<Feather name="calendar" size={17} color={colors.sageDeep} />}
            label="TRAVEL DATE"
            value="12 July 2026"
            rightIcon={<Feather name="chevron-down" size={16} color={colors.gold} />}
          />

          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.75}>
            <Text style={styles.ctaText}>FIND GUIDES</Text>
            <Feather name="arrow-right" size={16} color={colors.sageDeep} />
          </TouchableOpacity>

          <TrustBadgeRow items={HERO_TRUST_ITEMS} variant="light" iconSize={8} />
        </View>

        <SectionHeader title="Explore by Experience" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {CATEGORIES.map((cat) => (
            <ExperienceCategoryChip key={cat.id} icon={cat.icon} label={cat.label} active={cat.active} />
          ))}
        </ScrollView>

        <SectionHeader title="Popular Destinations" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {POPULAR_DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          <View style={[styles.pageDot, styles.pageDotActive]} />
          {[1, 2, 3].map((i) => <View key={i} style={styles.pageDot} />)}
        </View>

        <SectionHeader title="Top Rated Guides" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {TOP_GUIDES.map((guide) => (
            <View key={guide.id} style={styles.guideCard}>
              {guide.topRated && (
                <View style={styles.topRatedBadge}>
                  <Text style={styles.topRatedText}>Top Rated</Text>
                </View>
              )}
              <GuideAvatarPhoto uri={guide.imageUri} size={56} borderRadius={12} />
              <Text style={styles.guideName} numberOfLines={1}>{guide.name}</Text>
              <Text style={styles.guideSpecialty}>{guide.specialty}</Text>
              <StarRatingV2 rating={guide.rating} count={guide.trips} size={11} />
              <Text style={styles.guideRate}>₹{guide.rate} / hour</Text>
              <TouchableOpacity style={styles.viewProfileBtn} activeOpacity={0.75}>
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomTrust}>
          <View style={styles.trustCol}>
            <View style={styles.trustAvatarRow}>
              <GuideAvatarPhoto uri={GUIDE_RAMESH} size={24} borderRadius={12} />
              <View style={{ marginLeft: -8 }}>
                <GuideAvatarPhoto uri={GUIDE_POOJA} size={24} borderRadius={12} />
              </View>
            </View>
            <Text style={styles.trustValue}>15,000+</Text>
            <Text style={styles.trustLabel}>Happy Travellers</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustCol}>
            <Feather name="award" size={20} color={colors.gold} />
            <Text style={styles.trustValue}>4.8★</Text>
            <Text style={styles.trustLabel}>Average Rating</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustCol}>
            <Feather name="shield" size={20} color={colors.gold} />
            <Text style={styles.trustValue}>100%</Text>
            <Text style={styles.trustLabel}>Safe & Secure</Text>
          </View>
        </View>
      </ScrollView>
      <BottomTabBar activeTab="explore" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.lg },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.sm },
  logo: { fontFamily: 'DMSerifDisplay_400Regular', fontSize: 26, color: colors.charcoal },
  logoAccent: { color: colors.gold },
  tagline: { fontFamily: 'DMSans_400Regular', fontSize: 11, fontStyle: 'italic', color: colors.stone, marginTop: 2 },
  myTripsPill: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
    borderWidth: 1, borderColor: colors.sageMid, borderRadius: radius.pill,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
  },
  myTripsText: { ...typography.labelSM, color: colors.sageDark },
  heroCard: { borderRadius: 20, overflow: 'hidden', marginTop: spacing.md, padding: spacing.lg, minHeight: 380 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.heroOverlay },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  heroLeft: { flex: 1, marginRight: spacing.sm },
  discoverRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xs },
  discoverLabel: { ...typography.caption, color: colors.gold, letterSpacing: 1.2, textTransform: 'uppercase' },
  heroHeading: { fontFamily: 'DMSerifDisplay_400Regular', fontSize: 26, color: colors.white, lineHeight: 32 },
  heroGold: { color: colors.gold },
  heroSub: { fontFamily: 'DMSans_400Regular', fontSize: 11, color: colors.heroTextSub, marginTop: spacing.xs, lineHeight: 16 },
  socialProof: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.heroChipBg, borderRadius: radius.pill, padding: spacing.sm, paddingHorizontal: spacing.md,
  },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  avatarOverlap: { marginLeft: -8, borderWidth: 1.5, borderColor: colors.white, borderRadius: 14 },
  socialCount: { fontFamily: 'DMSans_700Bold', fontSize: 12, color: colors.white },
  socialLabel: { fontFamily: 'DMSans_400Regular', fontSize: 9, color: colors.heroTextMuted },
  heroField: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.heroFieldBg, borderWidth: 1, borderColor: colors.heroFieldBorder,
    borderRadius: 12, paddingVertical: spacing.md, paddingHorizontal: spacing.md, marginBottom: spacing.sm,
  },
  heroFieldIconChip: {
    backgroundColor: colors.gold, width: 36, height: 36, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  heroFieldText: { flex: 1 },
  heroFieldLabel: { ...typography.caption, color: colors.gold, letterSpacing: 0.8, textTransform: 'uppercase' },
  heroFieldValue: { fontFamily: 'DMSans_500Medium', fontSize: 14, color: colors.white, marginTop: 2 },
  ctaButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.gold, borderRadius: 12, paddingVertical: spacing.md, marginTop: spacing.xs,
  },
  ctaText: { fontFamily: 'DMSans_700Bold', fontSize: 12, letterSpacing: 1.5, color: colors.sageDeep },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.xl, marginBottom: spacing.md },
  sectionTitle: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: colors.charcoal },
  sectionUnderline: { width: 28, height: 2.5, backgroundColor: colors.gold, marginTop: 3 },
  viewAll: { fontFamily: 'DMSans_500Medium', fontSize: 12, color: colors.sageDark },
  hScroll: { paddingRight: spacing.lg },
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, marginTop: spacing.sm, marginBottom: spacing.sm },
  pageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.sageMid },
  pageDotActive: { width: 20, backgroundColor: colors.gold },
  guideCard: {
    width: 175, backgroundColor: colors.white, borderRadius: 16, padding: spacing.md,
    borderWidth: 1, borderColor: colors.creamWarm, marginRight: spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  topRatedBadge: {
    alignSelf: 'flex-start', backgroundColor: colors.goldBadgeBg, borderRadius: radius.xs,
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, marginBottom: spacing.sm,
  },
  topRatedText: { ...typography.caption, color: colors.goldBadge, fontFamily: 'DMSans_600SemiBold' },
  guideName: { fontFamily: 'DMSans_700Bold', fontSize: 13, color: colors.charcoal, marginTop: spacing.sm },
  guideSpecialty: { ...typography.labelSM, color: colors.stone, marginTop: 2 },
  guideRate: { ...typography.labelSM, color: colors.sageDark, marginTop: spacing.sm },
  viewProfileBtn: {
    backgroundColor: colors.sageDeep, borderRadius: 8, paddingVertical: 7,
    alignItems: 'center', marginTop: spacing.sm,
  },
  viewProfileText: { fontFamily: 'DMSans_600SemiBold', fontSize: 10, color: colors.white },
  bottomTrust: {
    flexDirection: 'row', backgroundColor: colors.sageDeep, borderRadius: 18,
    padding: spacing.lg, marginTop: spacing.xl,
  },
  trustCol: { flex: 1, alignItems: 'center', gap: spacing.xs },
  trustDivider: { width: 1, backgroundColor: colors.pricingDivider },
  trustAvatarRow: { flexDirection: 'row' },
  trustValue: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: colors.white },
  trustLabel: { fontFamily: 'DMSans_400Regular', fontSize: 9, color: colors.heroTextMuted, textAlign: 'center' },
});

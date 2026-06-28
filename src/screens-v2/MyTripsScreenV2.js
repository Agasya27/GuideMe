// STATUS: Static UI V2 — no navigation, no API calls
// SCREEN: MyTripsScreenV2

import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TripMapV2 from '../components-v2/ui/TripMapV2';
import GuideAvatarPhoto from '../components-v2/ui/GuideAvatarPhoto';
import StarRatingV2 from '../components-v2/ui/StarRatingV2';
import BottomTabBar, { useTabBarHeight } from '../components-v2/ui/BottomTabBar';
import { GUIDE_RAMESH } from '../constants/imageUrls';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, radius } from '../constants/spacing';

const JAIPUR_MAP = {
  region: { latitude: 26.9500, longitude: 75.8000, latitudeDelta: 0.09, longitudeDelta: 0.09 },
  origin: { latitude: 26.9260, longitude: 75.7540 },
  destination: { latitude: 26.9855, longitude: 75.8513 },
  waypoints: [
    { latitude: 26.9260, longitude: 75.7540 },
    { latitude: 26.9350, longitude: 75.7700 },
    { latitude: 26.9450, longitude: 75.7900 },
    { latitude: 26.9550, longitude: 75.8100 },
    { latitude: 26.9650, longitude: 75.8250 },
    { latitude: 26.9750, longitude: 75.8380 },
    { latitude: 26.9855, longitude: 75.8513 },
  ],
  landmarks: [
    { label: 'Amber Fort', coordinate: { latitude: 26.9855, longitude: 75.8513 } },
    { label: 'Nahargarh Fort', coordinate: { latitude: 26.9390, longitude: 75.7680 } },
    { label: 'Jal Mahal', coordinate: { latitude: 26.9530, longitude: 75.8460 } },
  ],
};

const VARANASI_MAP = {
  region: { latitude: 25.3100, longitude: 83.0000, latitudeDelta: 0.06, longitudeDelta: 0.06 },
  origin: { latitude: 25.2930, longitude: 82.9860 },
  destination: { latitude: 25.3109, longitude: 83.0107 },
  waypoints: [
    { latitude: 25.2930, longitude: 82.9860 },
    { latitude: 25.2970, longitude: 82.9920 },
    { latitude: 25.3020, longitude: 82.9980 },
    { latitude: 25.3060, longitude: 83.0040 },
    { latitude: 25.3109, longitude: 83.0107 },
  ],
  landmarks: [
    { label: 'Assi Ghat', coordinate: { latitude: 25.2930, longitude: 82.9860 } },
    { label: 'Dashashwamedh Ghat', coordinate: { latitude: 25.3109, longitude: 83.0107 } },
    { label: 'Varanasi Junction', coordinate: { latitude: 25.3220, longitude: 82.9870 } },
    { label: 'Sarnath', coordinate: { latitude: 25.3430, longitude: 83.0230 } },
  ],
};

const UPCOMING_META = [
  { icon: 'calendar', value: '12 Jul 2026', sub: 'Saturday' },
  { icon: 'user', value: 'Aryan Singh', sub: '2 Travellers' },
  { icon: 'clock', value: 'Full day', sub: '8 hours' },
  { icon: 'credit-card', value: '₹2,800', sub: 'Total Amount' },
];

const COMPLETED_META = [
  { icon: 'calendar', value: '3 Jun 2026', sub: 'Wednesday' },
  { icon: 'user', value: 'Aryan Singh', sub: '2 Travellers' },
  { icon: 'clock', value: '4 hours', sub: 'Evening' },
  { icon: 'credit-card', value: '₹1,800', sub: 'Total Amount' },
];

function MetaGrid({ items }) {
  return (
    <View style={styles.metaGrid}>
      {items.map((item) => (
        <View key={item.icon + item.value} style={styles.metaItem}>
          <Feather name={item.icon} size={13} color={colors.sageDark} />
          <View>
            <Text style={styles.metaValue}>{item.value}</Text>
            <Text style={styles.metaSub}>{item.sub}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function DateBlock({ month, day, year }) {
  return (
    <View style={styles.dateBlock}>
      <Text style={styles.dateMonth}>{month}</Text>
      <Text style={styles.dateDay}>{day}</Text>
      <Text style={styles.dateYear}>{year}</Text>
    </View>
  );
}

export default function MyTripsScreenV2() {
  const tabBarHeight = useTabBarHeight();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>My Trips</Text>
            <Text style={styles.headerSub}>All your adventures in one place</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn} activeOpacity={0.75}>
            <Feather name="bell" size={18} color={colors.charcoal} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabSwitcher}>
          <View style={styles.tabActive}>
            <Text style={styles.tabActiveText}>Upcoming</Text>
          </View>
          <View style={styles.tabInactive}>
            <Text style={styles.tabInactiveText}>Completed</Text>
          </View>
        </View>

        <View style={styles.tripCard}>
          <TripMapV2
            city="Jaipur, Rajasthan"
            region={JAIPUR_MAP.region}
            origin={JAIPUR_MAP.origin}
            destination={JAIPUR_MAP.destination}
            waypoints={JAIPUR_MAP.waypoints}
            landmarks={JAIPUR_MAP.landmarks}
          />
          <View style={styles.cardBody}>
            <View style={styles.titleRow}>
              <DateBlock month="JUL" day="12" year="2026" />
              <View style={styles.titleCol}>
                <Text style={styles.tripTitle} numberOfLines={1}>Jaipur Heritage Tour</Text>
                <Text style={styles.tripSub}>Full day experience</Text>
              </View>
              <View style={styles.statusUpcoming}>
                <Text style={styles.statusUpcomingText}>UPCOMING</Text>
              </View>
            </View>
            <MetaGrid items={UPCOMING_META} />
            <View style={styles.guideChip}>
              <GuideAvatarPhoto uri={GUIDE_RAMESH} size={44} borderRadius={10} />
              <View style={styles.guideInfo}>
                <View style={styles.guideNameRow}>
                  <Text style={styles.guideName}>Ramesh Sharma</Text>
                  <MaterialCommunityIcons name="check-decagram" size={14} color={colors.gold} />
                </View>
                <Text style={styles.guideRole}>Heritage Guide · Jaipur</Text>
                <View style={styles.guideRatingRow}>
                  <StarRatingV2 rating={4.8} size={11} />
                  <Text style={styles.guideRatingText}>4.8 (132 reviews) · 132 trips</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewGuide} activeOpacity={0.75}>
                <Text style={styles.viewGuideText}>View Guide</Text>
                <Feather name="chevron-right" size={13} color={colors.sageDark} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.tripCard}>
          <TripMapV2
            city="Varanasi, Uttar Pradesh"
            region={VARANASI_MAP.region}
            origin={VARANASI_MAP.origin}
            destination={VARANASI_MAP.destination}
            waypoints={VARANASI_MAP.waypoints}
            landmarks={VARANASI_MAP.landmarks}
          />
          <View style={styles.cardBody}>
            <View style={styles.titleRow}>
              <DateBlock month="JUN" day="3" year="2026" />
              <View style={styles.titleCol}>
                <Text style={styles.tripTitle} numberOfLines={1}>Varanasi Ghats Walk</Text>
                <Text style={styles.tripSub}>Half day experience</Text>
              </View>
              <View style={styles.statusCompleted}>
                <Text style={styles.statusCompletedText}>COMPLETED</Text>
              </View>
            </View>
            <MetaGrid items={COMPLETED_META} />
            <View style={styles.ratePrompt}>
              <View style={styles.rateLeft}>
                <Text style={styles.rateTitle}>How was your experience?</Text>
                <Text style={styles.rateSub}>Help us improve by sharing your feedback</Text>
              </View>
              <TouchableOpacity style={styles.rateBtn} activeOpacity={0.75}>
                <Text style={styles.rateBtnText}>Rate Now</Text>
                <Ionicons name="star" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomTabBar activeTab="trips" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: spacing.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.sm },
  headerTitle: { fontFamily: 'DMSans_700Bold', fontSize: 24, color: colors.charcoal },
  headerSub: { fontFamily: 'DMSans_400Regular', fontSize: 12, color: colors.stone, marginTop: 3 },
  bellBtn: {
    backgroundColor: colors.white, borderRadius: 12, width: 42, height: 42,
    borderWidth: 1, borderColor: colors.creamWarm, justifyContent: 'center', alignItems: 'center',
  },
  notifDot: {
    position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.gold,
  },
  tabSwitcher: { flexDirection: 'row', backgroundColor: colors.creamWarm, borderRadius: 14, padding: spacing.xs, marginTop: spacing.md },
  tabActive: { flex: 1, backgroundColor: colors.sageDeep, borderRadius: 11, paddingVertical: spacing.sm, alignItems: 'center' },
  tabActiveText: { fontFamily: 'DMSans_600SemiBold', fontSize: 13, color: colors.white },
  tabInactive: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center' },
  tabInactiveText: { fontFamily: 'DMSans_600SemiBold', fontSize: 13, color: colors.stone },
  tripCard: {
    backgroundColor: colors.white, borderRadius: 20, overflow: 'hidden', marginTop: spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  cardBody: { padding: spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  dateBlock: {
    width: 44, backgroundColor: colors.cream, borderRadius: 10, alignItems: 'center', paddingVertical: spacing.xs + 2,
  },
  dateMonth: { fontFamily: 'DMSans_700Bold', fontSize: 8, color: colors.sageDark, textTransform: 'uppercase' },
  dateDay: { fontFamily: 'DMSans_700Bold', fontSize: 22, color: colors.charcoal },
  dateYear: { ...typography.caption, color: colors.stone },
  titleCol: { flex: 1 },
  tripTitle: { fontFamily: 'DMSans_700Bold', fontSize: 15, color: colors.charcoal },
  tripSub: { ...typography.labelSM, color: colors.stone, marginTop: 2 },
  statusUpcoming: { backgroundColor: colors.successBg, borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  statusUpcomingText: { ...typography.caption, fontFamily: 'DMSans_700Bold', color: colors.successText, textTransform: 'uppercase' },
  statusCompleted: { backgroundColor: colors.goldBadgeBg, borderRadius: 8, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  statusCompletedText: { ...typography.caption, fontFamily: 'DMSans_700Bold', color: colors.goldBadge, textTransform: 'uppercase' },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  metaItem: { width: '48%', flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs + 2 },
  metaValue: { fontFamily: 'DMSans_500Medium', fontSize: 11, color: colors.charcoal },
  metaSub: { ...typography.caption, color: colors.stone },
  guideChip: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2,
    backgroundColor: colors.cream, borderRadius: 12, padding: 10, marginTop: spacing.sm,
  },
  guideInfo: { flex: 1 },
  guideNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  guideName: { fontFamily: 'DMSans_600SemiBold', fontSize: 12, color: colors.charcoal },
  guideRole: { ...typography.caption, color: colors.stone, marginTop: 2 },
  guideRatingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 2 },
  guideRatingText: { ...typography.caption, color: colors.stone },
  viewGuide: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewGuideText: { fontFamily: 'DMSans_600SemiBold', fontSize: 11, color: colors.sageDark },
  ratePrompt: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.cream, borderRadius: 12, padding: spacing.md, marginTop: spacing.sm,
  },
  rateLeft: { flex: 1, marginRight: spacing.sm },
  rateTitle: { fontFamily: 'DMSans_600SemiBold', fontSize: 12, color: colors.charcoal },
  rateSub: { ...typography.caption, color: colors.stone, marginTop: 2 },
  rateBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
    backgroundColor: colors.sageDeep, borderRadius: 10, paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
  },
  rateBtnText: { fontFamily: 'DMSans_600SemiBold', fontSize: 11, color: colors.white },
});

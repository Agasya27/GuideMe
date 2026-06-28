// STATUS: Static UI V2 — no navigation, no API calls
// SCREEN: GuideDetailScreenV2

import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import GuideAvatarPhoto from '../components-v2/ui/GuideAvatarPhoto';
import StarRatingV2 from '../components-v2/ui/StarRatingV2';
import StickyBookingBar from '../components-v2/ui/StickyBookingBar';
import { HERO_JAIPUR, GUIDE_RAMESH, REVIEW_PHOTO_1, REVIEW_PHOTO_2 } from '../constants/imageUrls';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, radius } from '../constants/spacing';

const SPECIALTIES = [
  { icon: <MaterialCommunityIcons name="bank" size={20} color={colors.sageDark} />, label: 'Specialties', sub: 'Heritage Walks\nLocal Stories\nHidden Gems' },
  { icon: <Feather name="users" size={20} color={colors.sageDark} />, label: 'Great For', sub: 'Families\nCouples\nSolo' },
  { icon: <Feather name="globe" size={20} color={colors.sageDark} />, label: 'Languages', sub: 'Hindi\nEnglish' },
  { icon: <Feather name="clock" size={20} color={colors.sageDark} />, label: 'Response Time', sub: 'Usually within\n30 mins' },
];

const REVIEWS = [
  { name: 'Priya M.', time: '2 weeks ago', rating: 5, text: 'Ramesh made the Amber Fort feel alive — stories at every corner. Highly recommend!', photo: REVIEW_PHOTO_1, initial: 'P', bg: colors.avatarGreen },
  { name: 'Karan D.', time: '1 month ago', rating: 4, text: 'Punctual, knowledgeable, and great company. A full-day well spent.', photo: REVIEW_PHOTO_2, initial: 'K', bg: colors.avatarTan },
];

const HERO_STATS = [
  { value: '7+', label: 'Years\nExperience', icon: 'clock' },
  { value: '500+', label: 'Happy\nTravellers', icon: 'map-pin' },
  { value: '4.8', label: 'Avg.\nRating', icon: 'star' },
];

const FOOTER_TRUST = [
  { icon: 'thumbs-up', label: 'Trusted by 500+' },
  { icon: 'shield', label: 'Secure Payments' },
  { icon: 'headphones', label: '24/7 Support' },
];

export default function GuideDetailScreenV2() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: 100 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.hero}>
            <Image source={{ uri: HERO_JAIPUR }} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
            <View style={styles.heroOverlay} />

            <TouchableOpacity style={[styles.heroBtn, { top: insets.top + spacing.md }]} activeOpacity={0.75}>
              <Feather name="arrow-left" size={18} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.heroBtn, styles.heroBtnRight, { top: insets.top + spacing.md }]} activeOpacity={0.75}>
              <Feather name="share-2" size={18} color={colors.white} />
            </TouchableOpacity>

            <View style={styles.heroText}>
              <Text style={styles.heroTagline}>Your Journey. My Stories.</Text>
              <Text style={styles.heroTitle}>
                Experience <Text style={styles.heroGold}>Jaipur</Text>{'\n'}Like Never Before
              </Text>
              <View style={styles.heroStats}>
                {HERO_STATS.map((s) => (
                  <View key={s.value} style={styles.heroStat}>
                    <View style={styles.heroStatRow}>
                      <Feather name={s.icon} size={11} color={colors.gold} />
                      <Text style={styles.heroStatValue}>{s.value}</Text>
                    </View>
                    <Text style={styles.heroStatLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.heroPhotoWrap}>
            <Image source={{ uri: GUIDE_RAMESH }} style={styles.heroPhoto} contentFit="cover" />
            <View style={styles.topRatedBadge}>
              <MaterialCommunityIcons name="crown" size={11} color={colors.gold} />
              <Text style={styles.topRatedText}>TOP{'\n'}RATED</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>Ramesh Sharma</Text>
          <View style={styles.subRow}>
            <Text style={styles.subText}>Professional Heritage Guide</Text>
            <Text style={styles.subDot}>·</Text>
            <Feather name="map-pin" size={11} color={colors.sageDark} />
            <Text style={styles.subLocation}>Jaipur</Text>
          </View>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: colors.sage }]}>
              <Feather name="check" size={10} color={colors.sageDark} />
              <Text style={[styles.badgeText, { color: colors.sageDark }]}> Verified</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.goldBadgeBg }]}>
              <Ionicons name="star" size={10} color={colors.goldBadge} />
              <Text style={[styles.badgeText, { color: colors.goldBadge }]}> Top Rated Guide</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.sage }]}>
              <Text style={[styles.badgeText, { color: colors.sageDark }]}>Hindi · English</Text>
            </View>
          </View>

          <Text style={styles.aboutTitle}>About Ramesh</Text>
          <View style={styles.aboutUnderline} />
          <Text style={styles.aboutText}>
            Passionate storyteller and heritage expert with 7+ years guiding travellers through the Pink City's forts, bazaars, and hidden gems. Fluent in Hindi and English.
          </Text>

          <View style={styles.specialtiesGrid}>
            {SPECIALTIES.map((col, i) => (
              <View key={col.label} style={styles.specialtyCol}>
                {i > 0 && <View style={styles.colDivider} />}
                <View style={styles.specialtyIcon}>{col.icon}</View>
                <Text style={styles.specialtyLabel}>{col.label}</Text>
                <Text style={styles.specialtySub}>{col.sub}</Text>
              </View>
            ))}
          </View>

          <View style={styles.pricingStrip}>
            <View style={styles.priceCol}>
              <Text style={styles.priceStripLabel}>HOURLY</Text>
              <Text style={styles.priceStripValue}>₹450</Text>
              <Text style={styles.priceStripSub}>Perfect for short tours</Text>
            </View>
            <View style={styles.priceDivider} />
            <View style={styles.priceCol}>
              <View style={styles.mostBookedPill}>
                <Text style={styles.mostBookedPillText}>MOST BOOKED</Text>
              </View>
              <Text style={styles.priceStripLabel}>FULL DAY</Text>
              <Text style={[styles.priceStripValue, { color: colors.gold }]}>₹2,800</Text>
              <Text style={styles.priceStripSub}>8 Hours Experience</Text>
            </View>
            <View style={styles.priceDivider} />
            <View style={styles.priceCol}>
              <Text style={styles.priceStripLabel}>TRIPS COMPLETED</Text>
              <Text style={styles.priceStripValue}>132</Text>
              <Text style={styles.priceStripSub}>And counting…</Text>
            </View>
          </View>

          <View style={styles.reviewsHeader}>
            <View>
              <Text style={styles.reviewsTitle}>What Travellers Say</Text>
              <View style={styles.aboutUnderline} />
            </View>
            <Text style={styles.viewReviews}>View all reviews →</Text>
          </View>

          {REVIEWS.map((r) => (
            <View key={r.name} style={styles.reviewCard}>
              <GuideAvatarPhoto uri={null} initial={r.initial} size={38} borderRadius={10} bg={r.bg} />
              <View style={styles.reviewCenter}>
                <View style={styles.reviewTop}>
                  <Text style={styles.reviewerName}>{r.name}</Text>
                  <Text style={styles.reviewTime}>{r.time}</Text>
                </View>
                <StarRatingV2 rating={r.rating} size={10} />
                <Text style={styles.reviewText} numberOfLines={2}>{r.text}</Text>
              </View>
              <Image source={{ uri: r.photo }} style={styles.reviewThumb} contentFit="cover" />
            </View>
          ))}

          <View style={styles.footerTrust}>
            {FOOTER_TRUST.map((f) => (
              <View key={f.label} style={styles.footerTrustItem}>
                <Feather name={f.icon} size={12} color={colors.stone} />
                <Text style={styles.footerTrustText}>{f.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <StickyBookingBar price="₹2,800" guideName="Ramesh" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  scroll: { flex: 1 },
  content: {},
  heroSection: { position: 'relative', marginBottom: 10 },
  hero: { height: 270, position: 'relative', overflow: 'hidden' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.heroOverlay },
  heroBtn: {
    position: 'absolute', left: spacing.md, width: 38, height: 38, borderRadius: 10,
    backgroundColor: colors.iconButtonBgAlt, justifyContent: 'center', alignItems: 'center', zIndex: 10,
  },
  heroBtnRight: { left: undefined, right: spacing.md },
  heroText: { position: 'absolute', bottom: spacing.lg, left: spacing.lg, right: 130 },
  heroTagline: { fontFamily: 'DMSans_400Regular', fontSize: 11, fontStyle: 'italic', color: colors.heroTextSub, marginBottom: spacing.xs },
  heroTitle: { fontFamily: 'DMSerifDisplay_400Regular', fontSize: 24, color: colors.white, lineHeight: 30 },
  heroGold: { color: colors.gold },
  heroStats: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  heroStat: {},
  heroStatRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  heroStatValue: { fontFamily: 'DMSans_700Bold', fontSize: 14, color: colors.white },
  heroStatLabel: { fontFamily: 'DMSans_400Regular', fontSize: 8, color: colors.heroTextMuted },
  heroPhotoWrap: {
    position: 'absolute', right: spacing.lg, bottom: -10, zIndex: 10,
  },
  heroPhoto: {
    width: 110, height: 110, borderRadius: 55, borderWidth: 3.5, borderColor: colors.white,
  },
  topRatedBadge: {
    position: 'absolute', bottom: 0, right: -8, backgroundColor: colors.sageDeep,
    borderRadius: 10, paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs + 2, alignItems: 'center',
    borderWidth: 2.5, borderColor: colors.white,
  },
  topRatedText: { fontFamily: 'DMSans_700Bold', fontSize: 7.5, color: colors.white, textAlign: 'center', lineHeight: 10 },
  body: { paddingTop: spacing.md, paddingHorizontal: spacing.lg },
  name: { fontFamily: 'DMSans_700Bold', fontSize: 22, color: colors.charcoal },
  subRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
  subText: { ...typography.bodySM, color: colors.stone },
  subDot: { color: colors.stone },
  subLocation: { ...typography.bodySM, color: colors.sageDark },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs + 2, marginTop: spacing.sm },
  badge: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: spacing.xs },
  badgeText: { ...typography.caption, fontFamily: 'DMSans_600SemiBold' },
  aboutTitle: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: colors.charcoal, marginTop: spacing.lg },
  aboutUnderline: { width: 28, height: 2.5, backgroundColor: colors.gold, marginTop: spacing.xs, marginBottom: spacing.sm },
  aboutText: { fontFamily: 'DMSans_400Regular', fontSize: 13, color: colors.stone, lineHeight: 22 },
  specialtiesGrid: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 16,
    borderWidth: 1, borderColor: colors.creamWarm, padding: spacing.md, marginTop: spacing.md,
  },
  specialtyCol: { flex: 1, alignItems: 'center', padding: spacing.sm, position: 'relative' },
  colDivider: { position: 'absolute', left: 0, top: spacing.sm, bottom: spacing.sm, width: 1, backgroundColor: colors.creamWarm },
  specialtyIcon: {
    width: 40, height: 40, backgroundColor: colors.sage, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  specialtyLabel: { fontFamily: 'DMSans_600SemiBold', fontSize: 10, color: colors.charcoal, marginTop: spacing.sm, textAlign: 'center' },
  specialtySub: { fontFamily: 'DMSans_400Regular', fontSize: 9, color: colors.stone, textAlign: 'center', lineHeight: 14, marginTop: spacing.xs },
  pricingStrip: {
    flexDirection: 'row', backgroundColor: colors.sageDeep, borderRadius: 16,
    paddingVertical: spacing.lg, paddingHorizontal: spacing.md, marginTop: spacing.md,
  },
  priceCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  priceDivider: { width: 1, backgroundColor: colors.pricingDivider, marginVertical: spacing.xs },
  mostBookedPill: { backgroundColor: colors.gold, borderRadius: radius.pill, paddingHorizontal: spacing.sm + 2, paddingVertical: 3, marginBottom: spacing.sm },
  mostBookedPillText: { fontFamily: 'DMSans_700Bold', fontSize: 7, color: colors.sageDeep, letterSpacing: 0.5 },
  priceStripLabel: { fontFamily: 'DMSans_500Medium', fontSize: 9, color: colors.heroTextMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  priceStripValue: { fontFamily: 'DMSans_700Bold', fontSize: 22, color: colors.white, marginTop: spacing.xs },
  priceStripSub: { fontFamily: 'DMSans_400Regular', fontSize: 9, color: colors.heroTextFaint, marginTop: spacing.xs },
  reviewsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.lg },
  reviewsTitle: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: colors.charcoal },
  viewReviews: { ...typography.labelSM, color: colors.sageDark },
  reviewCard: {
    flexDirection: 'row', gap: spacing.sm + 2, backgroundColor: colors.white,
    borderRadius: 14, padding: spacing.md, borderWidth: 1, borderColor: colors.creamWarm, marginTop: spacing.sm,
  },
  reviewCenter: { flex: 1 },
  reviewTop: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewerName: { fontFamily: 'DMSans_600SemiBold', fontSize: 12, color: colors.charcoal },
  reviewTime: { ...typography.caption, color: colors.stone },
  reviewText: { ...typography.caption, color: colors.stone, lineHeight: 17, marginTop: spacing.xs },
  reviewThumb: { width: 60, height: 60, borderRadius: 10 },
  footerTrust: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg, paddingVertical: spacing.md, marginTop: spacing.md },
  footerTrustItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  footerTrustText: { ...typography.caption, color: colors.stone },
});

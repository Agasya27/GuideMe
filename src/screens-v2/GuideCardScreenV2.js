// STATUS: Static UI V2 — no navigation, no API calls
// SCREEN: GuideCardScreenV2

import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import GuideAvatarPhoto from '../components-v2/ui/GuideAvatarPhoto';
import StarRatingV2 from '../components-v2/ui/StarRatingV2';
import { GUIDE_RAMESH, DEST_JAIPUR } from '../constants/imageUrls';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, radius } from '../constants/spacing';

const TRUST_STRIP = [
  { icon: 'shield', label: 'Verified Guide' },
  { icon: 'zap', label: 'Instant Confirm' },
  { icon: 'lock', label: 'Secure Payment' },
  { icon: 'headphones', label: '24/7 Support' },
];

const ASSURANCE = [
  { icon: 'shield', label: 'No spam, ever' },
  { icon: 'lock', label: 'Your data is safe' },
  { icon: 'user', label: 'One tap sign-in' },
];

export default function GuideCardScreenV2() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerWrap}>
            <Image source={{ uri: DEST_JAIPUR }} style={styles.watermark} contentFit="cover" />
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.headerTitle}>Guides in Jaipur</Text>
                <Text style={styles.headerSub}>12 July · 4 guides available</Text>
              </View>
              <TouchableOpacity style={styles.filterBtn} activeOpacity={0.75}>
                <MaterialCommunityIcons name="tune-variant" size={20} color={colors.charcoal} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.guideCard}>
            <View style={styles.topRow}>
              <View style={styles.photoWrap}>
                <GuideAvatarPhoto uri={GUIDE_RAMESH} size={64} borderRadius={16} />
                <View style={styles.crownBadge}>
                  <MaterialCommunityIcons name="crown-outline" size={11} color={colors.gold} />
                </View>
              </View>
              <View style={styles.nameCol}>
                <Text style={styles.guideName} numberOfLines={1}>Ramesh Sharma</Text>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={11} color={colors.stone} />
                  <Text style={styles.location}>Jaipur, Rajasthan</Text>
                </View>
              </View>
              <View style={styles.ratingCol}>
                <StarRatingV2 rating={4.8} size={14} />
                <Text style={styles.ratingCaption}>4.8 (132 trips)</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoChip}>
                <Feather name="globe" size={16} color={colors.sageDark} />
                <View>
                  <Text style={styles.chipLabel}>LANGUAGE</Text>
                  <Text style={styles.chipValue}>Hindi, English</Text>
                </View>
              </View>
              <View style={styles.infoChip}>
                <Feather name="shield" size={16} color={colors.sageDark} />
                <View>
                  <Text style={styles.chipLabel}>CERTIFIED</Text>
                  <Text style={styles.chipValue}>7 years experience</Text>
                </View>
              </View>
            </View>

            <View style={styles.priceRow}>
              <View style={styles.priceCard}>
                <View style={styles.priceHeader}>
                  <Feather name="clock" size={13} color={colors.stone} />
                  <Text style={styles.priceLabel}>HOURLY RATE</Text>
                </View>
                <Text style={styles.priceValue}>
                  ₹450<Text style={styles.priceUnit}>/hr</Text>
                </Text>
                <Text style={styles.priceSub}>Perfect for short tours</Text>
              </View>
              <View style={[styles.priceCard, styles.priceFeatured]}>
                <View style={styles.mostBooked}>
                  <Text style={styles.mostBookedText}>MOST BOOKED</Text>
                </View>
                <View style={styles.priceHeader}>
                  <Feather name="calendar" size={13} color={colors.sageDark} />
                  <Text style={[styles.priceLabel, styles.priceLabelFeatured]}>FULL DAY RATE</Text>
                </View>
                <Text style={styles.priceValueFeatured}>
                  ₹2,800<Text style={styles.priceUnitFeatured}>/day</Text>
                </Text>
                <Text style={styles.priceSubFeatured}>8 hours experience</Text>
              </View>
            </View>

            <View style={styles.trustStrip}>
              {TRUST_STRIP.map((item) => (
                <View key={item.label} style={styles.trustItem}>
                  <Feather name={item.icon} size={10} color={colors.sageDark} />
                  <Text style={styles.trustText}>{item.label}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.bookBtn} activeOpacity={0.75}>
              <Text style={styles.bookText}>BOOK NOW</Text>
              <Feather name="arrow-right" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.overlay}>
          <View style={styles.backdrop} />
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <View style={styles.sheetTopRow}>
              <Feather name="shield" size={18} color={colors.stone} />
              <View style={styles.secureBadge}>
                <Feather name="check" size={10} color={colors.successText} />
                <Text style={styles.secureText}>100% Secure</Text>
              </View>
            </View>
            <Text style={styles.sheetTitle}>Sign in to continue</Text>
            <Text style={styles.sheetSub}>Quick and secure — takes under a minute</Text>

            <View style={styles.phoneRow}>
              <View style={styles.countryChip}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.countryText}>+91</Text>
                <Feather name="chevron-down" size={12} color={colors.stone} />
              </View>
              <TextInput style={styles.phoneInput} placeholder="Enter mobile number" placeholderTextColor={colors.stone} />
            </View>

            <TouchableOpacity style={styles.otpBtn} activeOpacity={0.75}>
              <Text style={styles.otpText}>SEND OTP</Text>
              <Feather name="send" size={14} color={colors.white} />
            </TouchableOpacity>

            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity style={styles.googleBtn} activeOpacity={0.75}>
              <MaterialCommunityIcons name="google" size={18} color={colors.charcoal} />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.assuranceRow}>
              {ASSURANCE.map((a) => (
                <View key={a.label} style={styles.assuranceItem}>
                  <Feather name={a.icon} size={12} color={colors.stone} />
                  <Text style={styles.assuranceText}>{a.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream },
  wrapper: { flex: 1 },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  headerWrap: { position: 'relative', marginTop: spacing.sm },
  watermark: { position: 'absolute', right: 60, top: -20, width: 90, height: 90, opacity: 0.12, borderRadius: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontFamily: 'DMSans_700Bold', fontSize: 20, color: colors.charcoal },
  headerSub: { ...typography.bodySM, color: colors.stone, marginTop: 2 },
  filterBtn: {
    backgroundColor: colors.white, borderRadius: 12, padding: 10,
    borderWidth: 1, borderColor: colors.creamWarm,
  },
  guideCard: {
    backgroundColor: colors.white, borderRadius: 20, padding: spacing.md, marginTop: spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 6,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2 },
  photoWrap: { position: 'relative' },
  crownBadge: {
    position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.sageDark, justifyContent: 'center', alignItems: 'center',
  },
  nameCol: { flex: 1 },
  guideName: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: colors.charcoal },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 2 },
  location: { ...typography.labelSM, color: colors.stone },
  ratingCol: { alignItems: 'flex-end' },
  ratingCaption: { ...typography.labelSM, color: colors.stone, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.creamWarm, marginVertical: spacing.sm },
  infoRow: { flexDirection: 'row', gap: spacing.sm },
  infoChip: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.cream, borderRadius: 10, padding: 10,
  },
  chipLabel: { ...typography.caption, color: colors.stone, textTransform: 'uppercase' },
  chipValue: { fontFamily: 'DMSans_600SemiBold', fontSize: 12, color: colors.charcoal },
  priceRow: { flexDirection: 'row', gap: 10, marginTop: spacing.sm },
  priceCard: { flex: 1, borderRadius: 14, borderWidth: 1, borderColor: colors.creamWarm, padding: spacing.md },
  priceFeatured: { backgroundColor: colors.goldBadgeBg, borderColor: colors.gold, borderWidth: 1.5 },
  mostBooked: {
    position: 'absolute', top: -10, alignSelf: 'center', backgroundColor: colors.gold,
    borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: spacing.xs,
  },
  mostBookedText: { fontFamily: 'DMSans_700Bold', fontSize: 8, color: colors.sageDeep },
  priceHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  priceLabel: { ...typography.caption, color: colors.stone, textTransform: 'uppercase' },
  priceLabelFeatured: { color: colors.sageDark, fontFamily: 'DMSans_600SemiBold' },
  priceValue: { fontFamily: 'DMSans_700Bold', fontSize: 22, color: colors.charcoal, marginTop: spacing.xs },
  priceValueFeatured: { fontFamily: 'DMSans_700Bold', fontSize: 22, color: colors.sageDeep, marginTop: spacing.xs },
  priceUnit: { ...typography.labelSM, color: colors.stone },
  priceUnitFeatured: { ...typography.labelSM, color: colors.sageDark },
  priceSub: { ...typography.caption, color: colors.stone, marginTop: spacing.xs },
  priceSubFeatured: { ...typography.caption, color: colors.sageDark, marginTop: spacing.xs },
  trustStrip: { flexDirection: 'row', marginTop: spacing.md, flexWrap: 'wrap' },
  trustItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, minWidth: '45%', marginBottom: spacing.xs },
  trustText: { ...typography.caption, color: colors.stone },
  bookBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.sageDeep, borderRadius: 14, paddingVertical: spacing.md, marginTop: spacing.md,
  },
  bookText: { fontFamily: 'DMSans_700Bold', fontSize: 13, color: colors.white, letterSpacing: 1.2 },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  sheet: {
    backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: spacing.lg, paddingBottom: spacing.xxl,
  },
  handle: { width: 36, height: 4, backgroundColor: colors.creamWarm, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.md },
  sheetTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  secureBadge: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
    backgroundColor: colors.successBg, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: spacing.xs,
  },
  secureText: { ...typography.caption, color: colors.successText, fontFamily: 'DMSans_600SemiBold' },
  sheetTitle: { fontFamily: 'DMSans_700Bold', fontSize: 22, color: colors.charcoal },
  sheetSub: { ...typography.caption, color: colors.stone, marginTop: spacing.xs, marginBottom: spacing.md },
  phoneRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  countryChip: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
    backgroundColor: colors.cream, borderRadius: radius.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.md,
  },
  flag: { fontSize: 16 },
  countryText: { ...typography.labelSM, color: colors.charcoal },
  phoneInput: {
    flex: 1, backgroundColor: colors.cream, borderRadius: radius.xs,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    fontFamily: 'DMSans_400Regular', fontSize: 11, color: colors.charcoal,
  },
  otpBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.sageDeep, borderRadius: radius.sm, paddingVertical: spacing.md + spacing.xs, marginBottom: spacing.sm,
  },
  otpText: { ...typography.button, color: colors.white },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  orLine: { flex: 1, height: 1, backgroundColor: colors.creamWarm },
  orText: { ...typography.caption, color: colors.stone },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.creamWarm,
    borderRadius: radius.sm, paddingVertical: spacing.md,
  },
  googleText: { ...typography.labelMD, color: colors.charcoal },
  assuranceRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg, marginTop: spacing.md },
  assuranceItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  assuranceText: { ...typography.caption, color: colors.stone },
});

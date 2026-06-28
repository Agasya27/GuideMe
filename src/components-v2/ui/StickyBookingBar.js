import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { spacing, radius } from '../../constants/spacing';

export default function StickyBookingBar({ price = '₹2,800', guideName = 'Ramesh' }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.trustCol}>
        <Feather name="shield" size={16} color={colors.stickyTextMuted} />
        <View style={styles.trustText}>
          <Text style={styles.trustTitle}>Secure Booking</Text>
          <Text style={styles.trustSub}>100% Safe & Secure</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cta} activeOpacity={0.75}>
        <View style={styles.ctaRow}>
          <Feather name="shield" size={13} color={colors.sageDeep} />
          <Text style={styles.ctaText}>BOOK NOW · {price}</Text>
        </View>
        <Text style={styles.ctaSub}>Full Day Experience</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.chatCol} activeOpacity={0.75}>
        <View style={styles.chatIcon}>
          <Feather name="message-circle" size={18} color={colors.stickyTextMuted} />
        </View>
        <Text style={styles.chatText}>Chat with{'\n'}{guideName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.sageDeep,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 10 },
      android: { elevation: 12 },
    }),
  },
  trustCol: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
    width: 68,
  },
  trustText: {
    alignItems: 'center',
  },
  trustTitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    color: colors.stickyTextMuted,
    textAlign: 'center',
  },
  trustSub: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 7,
    color: colors.stickyTextFaint,
    textAlign: 'center',
    marginTop: 1,
  },
  cta: {
    flex: 1,
    backgroundColor: colors.gold,
    borderRadius: radius.sm + 2,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  ctaText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    color: colors.sageDeep,
    letterSpacing: 0.5,
  },
  ctaSub: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
    color: colors.bookCtaSub,
    marginTop: 2,
  },
  chatCol: {
    alignItems: 'center',
    width: 56,
    gap: spacing.xs,
  },
  chatIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 8,
    color: colors.stickyTextFaint,
    textAlign: 'center',
    lineHeight: 11,
  },
});

import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { TAB_ITEMS, TAB_BAR_CONTENT_HEIGHT } from '../../constants/tabs';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export function useTabBarHeight() {
  const insets = useSafeAreaInsets();
  return TAB_BAR_CONTENT_HEIGHT + insets.bottom;
}

export default function BottomTabBar({ activeTab = 'explore' }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      {TAB_ITEMS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <TouchableOpacity key={tab.id} style={styles.tabItem} activeOpacity={0.75}>
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Feather
                name={tab.icon}
                size={20}
                color={isActive ? colors.sageDark : colors.stoneLight}
              />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.creamWarm,
    paddingTop: spacing.sm,
    minHeight: TAB_BAR_CONTENT_HEIGHT,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.sage,
  },
  tabLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
    color: colors.stoneLight,
    textAlign: 'center',
  },
  tabLabelActive: {
    fontFamily: 'DMSans_600SemiBold',
    color: colors.sageDark,
  },
});

import { View, Text, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

export default function TripMapV2({
  city,
  region,
  origin,
  destination,
  waypoints = [],
  landmarks = [],
}) {
  return (
    <View style={styles.wrapper}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        pointerEvents="none"
        mapType="standard"
      >
        {waypoints.length > 0 && (
          <Polyline
            coordinates={waypoints}
            strokeColor={colors.sageDeep}
            strokeWidth={3}
            lineDashPattern={[10, 6]}
          />
        )}

        {origin && (
          <Marker coordinate={origin} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={[styles.pin, styles.originPin]}>
              <Feather name="navigation" size={13} color={colors.white} />
            </View>
          </Marker>
        )}

        {destination && (
          <Marker coordinate={destination} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={[styles.pin, styles.destPin]}>
              <Feather name="flag" size={13} color={colors.sageDeep} />
            </View>
          </Marker>
        )}

        {landmarks.map((lm) => (
          <Marker key={lm.label} coordinate={lm.coordinate} anchor={{ x: 0.5, y: 1 }}>
            <View style={styles.landmark}>
              <Feather name="map-pin" size={8} color={colors.sageDark} />
              <Text style={styles.landmarkText}>{lm.label}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.locationChip}>
        <Feather name="map-pin" size={10} color={colors.sageDark} />
        <Text style={styles.locationText} numberOfLines={1}>{city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    position: 'relative',
    overflow: 'hidden',
  },
  pin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
      android: { elevation: 5 },
    }),
  },
  originPin: {
    backgroundColor: colors.sageDeep,
  },
  destPin: {
    backgroundColor: colors.gold,
  },
  landmark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.mapLabelBg,
    borderRadius: 6,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 3,
  },
  landmarkText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    color: colors.mapLabel,
  },
  locationChip: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.mapChipBg,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  locationText: {
    ...typography.caption,
    color: colors.charcoal,
    fontFamily: 'DMSans_500Medium',
    maxWidth: 120,
  },
});

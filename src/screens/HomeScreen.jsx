import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';
import mainIcon from '../assets/icons/main_icon.png';

const { width } = Dimensions.get('window');

const stats = [
  { label: 'Cases Managed', value: '1,240+' },
  { label: 'Providers',     value: '85+'    },
  { label: 'Companies',     value: '320+'   },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#0148AF', '#1D6FD8', '#1E3A8A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0148AF" />

      <View style={styles.inner}>

        {/* Logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoBox}>
            <Image source={mainIcon} style={styles.logoImage} resizeMode="contain" />
          </View>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>
          Welcome to{' '}
          <Text style={styles.headingAccent}>Industrial MD</Text>
        </Text>

        {/* Subtext */}
        <Text style={styles.subtext}>
          Your complete case management platform for industrial injury tracking,
          provider coordination, and workforce health oversight.
        </Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Go to Dashboard →</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Industrial MD Case Management System © 2025
        </Text>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Logo
  logoWrapper: {
    marginBottom: 28,
  },
  logoBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    padding: 20,
  },
  logoImage: {
    height: 64,
    width: 120,
  },

  // Heading
  heading: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 12,
  },
  headingAccent: {
    color: '#BFDBFE',
  },

  // Subtext
  subtext: {
    color: '#BFDBFE',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: '#BFDBFE',
    marginTop: 4,
    textAlign: 'center',
  },

  // Button
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#0148AF',
    fontWeight: '700',
    fontSize: 16,
  },

  // Footer
  footer: {
    color: 'rgba(147,197,253,0.5)',
    fontSize: 11,
    marginTop: 28,
    textAlign: 'center',
  },
});
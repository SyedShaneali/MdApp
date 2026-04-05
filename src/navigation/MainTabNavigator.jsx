import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, Dimensions, StatusBar, Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Home, FolderPlus, LayoutDashboard,
  BarChart2, Search, X, LogOut,
  UserCircle, Settings,
} from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import mainIcon from '../assets/icons/main_icon2.png';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

const navLinks = [
  { label: 'Home',      name: 'Home',      icon: Home },
  { label: 'New Case',  name: 'NewCase',   icon: FolderPlus },
  { label: 'Dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { label: 'Analytics', name: 'Analytics', icon: BarChart2 },
];

const Stack = createNativeStackNavigator();

// ── Drawer Component ─────────────────────────────────────
function CustomDrawer({ isOpen, onClose, onNavigate, activeScreen }) {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}

      {/* Drawer Panel */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>

        {/* Header */}
        <View style={styles.drawerHeader}>
          <Image source={mainIcon} style={styles.drawerLogo} resizeMode="contain" />
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Nav Links */}
        <View style={styles.navLinks}>
          {navLinks.map(({ label, name, icon: Icon }) => {
            const isActive = activeScreen === name;
            return (
              <TouchableOpacity
                key={name}
                onPress={() => { onNavigate(name); onClose(); }}
                style={[styles.navItem, isActive && styles.navItemActive]}
              >
                <Icon
                  size={18}
                  color={isActive ? '#0148AF' : '#6b7280'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>AK</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>Admin Khan</Text>
              <Text style={styles.userEmail}>admin@cd-mgmt.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.footerItem}>
            <UserCircle size={16} color="#6b7280" />
            <Text style={styles.footerItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Settings size={16} color="#6b7280" />
            <Text style={styles.footerItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerItem, { borderTopWidth: 1, borderTopColor: '#f3f4f6' }]}>
            <LogOut size={16} color="#ef4444" />
            <Text style={[styles.footerItemText, { color: '#ef4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    </>
  );
}

// ── Header ───────────────────────────────────────────────
function CustomHeader({ onOpenDrawer }) {
  return (
    <View style={styles.header}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity onPress={onOpenDrawer} style={styles.headerBtn}>
        <View style={styles.hamburger}>
          <View style={styles.hamburgerLine} />
          <View style={[styles.hamburgerLine, { width: 16 }]} />
          <View style={styles.hamburgerLine} />
        </View>
      </TouchableOpacity>
      <Image source={mainIcon} style={styles.headerLogo} resizeMode="contain" />
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerBtn}>
          <Search size={20} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>AK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Main Layout ──────────────────────────────────────────
export default function MainDrawerNavigator() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Home');

  const screenMap = {
    Home:      HomeScreen,
    NewCase:   HomeScreen,
    Dashboard: HomeScreen,
    Analytics: AnalyticsScreen,
  };

  const ActiveComponent = screenMap[activeScreen];

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader onOpenDrawer={() => setDrawerOpen(true)} />

      <View style={{ flex: 1 }}>
        <ActiveComponent />
      </View>

      <CustomDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(name) => setActiveScreen(name)}
        activeScreen={activeScreen}
      />
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerBtn: {
    padding: 8,
    borderRadius: 20,
  },
  hamburger: {
    gap: 4,
    alignItems: 'flex-start',
  },
  hamburgerLine: {
    width: 20,
    height: 2,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  headerLogo: {
    height: 36,
    width: 100,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  headerAvatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4b5563',
  },

  // Drawer
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    zIndex: 20,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  drawerLogo: {
    height: 40,
    width: 120,
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f9fafb',
  },
  navLinks: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: '#eff6ff',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  navLabelActive: {
    color: '#0148AF',
    fontWeight: '600',
  },

  // Footer
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4b5563',
  },
  userName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  userEmail: {
    fontSize: 11,
    color: '#9ca3af',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  footerItemText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
});
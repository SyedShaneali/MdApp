import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { TrendingUp, CalendarDays, ChevronDown } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;

// ── Data ────────────────────────────────────────────────
const injuryStats = [
  { label: "Total Injuries",   value: "354",    sub: "vs 78 prev. month", color: "#10b981" },
  { label: "New Injuries",     value: "54",     sub: "vs 78 prev. month", color: "#2563eb" },
  { label: "Pending",          value: "25",     sub: "vs 78 prev. month", color: "#fb923c" },
  { label: "Avg. Time",        value: "1m:36s", sub: "vs 2m prev. month", color: "#2dd4bf" },
  { label: "Closed",           value: "100",    sub: "vs 78 prev. month", color: "#8b5cf6" },
];

const callStats = [
  { label: "Total Calls",     value: "54",     sub: "vs 78 prev. month",     color: "#3b82f6" },
  { label: "Avg. Time Spend", value: "1m:36s", sub: "vs 2m:36s prev. month", color: "#fb923c" },
  { label: "Flagged Calls",   value: "100",    sub: "vs 78 prev. month",     color: "#22c55e" },
];

const callVolumeData = [
  { value: 120, label: "Oct", frontColor: "#1d4ed8", stackData: [{ value: 80, color: "#bfdbfe" }, { value: 120, color: "#1d4ed8" }] },
  { value: 200, label: "Nov", frontColor: "#1d4ed8", stackData: [{ value: 60, color: "#bfdbfe" }, { value: 200, color: "#1d4ed8" }] },
  { value: 90,  label: "Dec", frontColor: "#1d4ed8", stackData: [{ value: 100, color: "#bfdbfe" }, { value: 90, color: "#1d4ed8" }] },
  { value: 70,  label: "Jan", frontColor: "#1d4ed8", stackData: [{ value: 50, color: "#bfdbfe" }, { value: 70, color: "#1d4ed8" }] },
  { value: 110, label: "Feb", frontColor: "#1d4ed8", stackData: [{ value: 90, color: "#bfdbfe" }, { value: 110, color: "#1d4ed8" }] },
  { value: 300, label: "Mar", frontColor: "#1d4ed8", stackData: [{ value: 120, color: "#bfdbfe" }, { value: 300, color: "#1d4ed8" }] },
];

const injuryVolumeData = [
  { value: 80,  label: "Oct", stackData: [{ value: 60, color: "#99f6e4" }, { value: 80, color: "#14b8a6" }] },
  { value: 150, label: "Nov", stackData: [{ value: 40, color: "#99f6e4" }, { value: 150, color: "#14b8a6" }] },
  { value: 70,  label: "Dec", stackData: [{ value: 80, color: "#99f6e4" }, { value: 70, color: "#14b8a6" }] },
  { value: 60,  label: "Jan", stackData: [{ value: 30, color: "#99f6e4" }, { value: 60, color: "#14b8a6" }] },
  { value: 100, label: "Feb", stackData: [{ value: 70, color: "#99f6e4" }, { value: 100, color: "#14b8a6" }] },
  { value: 200, label: "Mar", stackData: [{ value: 90, color: "#99f6e4" }, { value: 200, color: "#14b8a6" }] },
];

const performanceRows = [
  { name: "Abdul Wahab", email: "abdulwahab@gmail.com", duration: "1m:36s", injury: "Injury" },
  { name: "Ali Raza",    email: "aliraza@gmail.com",    duration: "1m:36s", injury: "Injury" },
  { name: "Haider",      email: "haider@gmail.com",     duration: "1m:36s", injury: "Injury" },
  { name: "Waqas Ahmed", email: "waqas@gmail.com",      duration: "1m:36s", injury: "Injury" },
];

const recentCalls = [
  { name: "Abdul Wahab", email: "abdulwahab@gmail.com", rank: 1, trend: 2, qa: "86%", flagged: "1,240", csat: "76%" },
  { name: "Ali Raza",    email: "aliraza@gmail.com",    rank: 2, trend: 2, qa: "86%", flagged: "1,240", csat: "76%" },
  { name: "Haider",      email: "haider@gmail.com",     rank: 3, trend: 2, qa: "86%", flagged: "1,240", csat: "76%" },
];

// ── Avatar ───────────────────────────────────────────────
function Avatar({ name, size = 36 }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

// ── Stat Box Icon ────────────────────────────────────────
function BoxIcon({ color }) {
  return (
    <View style={[styles.boxIcon, { backgroundColor: color }]}>
      <Text style={{ color: '#fff', fontSize: 18 }}>👤</Text>
    </View>
  );
}

// ── Section Header ───────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Injuries Overview ────────────────────────────────────
function InjuriesOverview() {
  return (
    <View style={styles.card}>
      <SectionHeader title="Injuries Overview" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.statsRow}>
          {injuryStats.map((s) => (
            <View key={s.label} style={styles.statItem}>
              <BoxIcon color={s.color} />
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statSub}>Last month</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statSub}>{s.sub}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ── Calls Overview ───────────────────────────────────────
function CallsOverview() {
  return (
    <View style={styles.card}>
      <SectionHeader title="Calls Overview" />
      <View style={styles.statsRow}>
        {callStats.map((s) => (
          <View key={s.label} style={[styles.statItem, { flex: 1 }]}>
            <BoxIcon color={s.color} />
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={styles.statSub}>Last month</Text>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statSub}>{s.sub}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Call Volume Chart ────────────────────────────────────
function CallVolumeChart() {
  const chartWidth = width - CARD_PADDING * 4;
  return (
    <View style={styles.card}>
      <SectionHeader title="Call Volume" />
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#bfdbfe' }]} />
          <Text style={styles.legendText}>Outbound</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#1d4ed8' }]} />
          <Text style={styles.legendText}>Inbound</Text>
        </View>
      </View>
      <BarChart
        stackData={callVolumeData.map(d => ({
          stacks: d.stackData,
          label: d.label,
        }))}
        width={chartWidth}
        height={180}
        barWidth={28}
        spacing={12}
        hideRules={false}
        rulesColor="#f0f0f0"
        xAxisLabelTextStyle={{ color: '#9ca3af', fontSize: 9 }}
        yAxisTextStyle={{ color: '#9ca3af', fontSize: 9 }}
        hideYAxisText={false}
        showLine={false}
        noOfSections={4}
        maxValue={400}
        isAnimated
      />
    </View>
  );
}

// ── Injuries Volume Chart ────────────────────────────────
function InjuriesVolumeChart() {
  const chartWidth = width - CARD_PADDING * 4;
  return (
    <View style={styles.card}>
      <SectionHeader title="Injuries Volume" />
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#99f6e4' }]} />
          <Text style={styles.legendText}>Outbound</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#14b8a6' }]} />
          <Text style={styles.legendText}>Inbound</Text>
        </View>
      </View>
      <BarChart
        stackData={injuryVolumeData.map(d => ({
          stacks: d.stackData,
          label: d.label,
        }))}
        width={chartWidth}
        height={180}
        barWidth={28}
        spacing={12}
        hideRules={false}
        rulesColor="#f0f0f0"
        xAxisLabelTextStyle={{ color: '#9ca3af', fontSize: 9 }}
        yAxisTextStyle={{ color: '#9ca3af', fontSize: 9 }}
        noOfSections={4}
        maxValue={400}
        isAnimated
      />
    </View>
  );
}

// ── Performance Summary ──────────────────────────────────
function PerformanceSummary() {
  return (
    <View style={styles.card}>
      <SectionHeader title="Performance Summary" />
      <View style={styles.tableHeader}>
        {["Agent", "Duration", "Injury"].map(h => (
          <Text key={h} style={[styles.tableHeadText, h === "Agent" && { flex: 2 }]}>{h}</Text>
        ))}
      </View>
      {performanceRows.map((row, i) => (
        <View key={i} style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 2, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
            <Avatar name={row.name} size={28} />
            <Text style={styles.tableCellText} numberOfLines={1}>{row.name}</Text>
          </View>
          <Text style={styles.tableCell}>{row.duration}</Text>
          <Text style={styles.tableCell}>{row.injury}</Text>
        </View>
      ))}
    </View>
  );
}

// ── Recent Calls Status ──────────────────────────────────
function RecentCallsStatus() {
  return (
    <View style={styles.card}>
      <SectionHeader title="Recent Calls Status" />
      {recentCalls.map((c) => (
        <View key={c.rank} style={styles.callCard}>
          <View style={styles.callCardTop}>
            <View style={styles.callCardLeft}>
              <Avatar name={c.name} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.callName}>{c.name}</Text>
                <Text style={styles.callEmail}>{c.email}</Text>
              </View>
            </View>
            <View style={styles.callCardRight}>
              <View style={styles.trendBadge}>
                <TrendingUp size={12} color="#22c55e" />
                <Text style={styles.trendText}>{c.trend}</Text>
              </View>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{c.rank}</Text>
              </View>
            </View>
          </View>
          <View style={styles.callStats}>
            {[
              { label: "QA Score", value: c.qa },
              { label: "Flagged",  value: c.flagged },
              { label: "Avg CSAT", value: c.csat },
            ].map(s => (
              <View key={s.label} style={{ flex: 1 }}>
                <Text style={styles.callStatLabel}>{s.label}</Text>
                <Text style={styles.callStatValue}>{s.value}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

// ── Main Screen ──────────────────────────────────────────
export default function AnalyticsScreen() {
  const [period, setPeriod] = useState("This month");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.periodBtn}>
          <CalendarDays size={14} color="#6b7280" />
          <Text style={styles.periodText}>{period}</Text>
          <ChevronDown size={14} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <InjuriesOverview />
      <CallsOverview />
      <CallVolumeChart />
      <InjuriesVolumeChart />
      <PerformanceSummary />
      <RecentCallsStatus />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

// ── Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: CARD_PADDING,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  periodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  periodText: {
    fontSize: 12,
    color: '#374151',
  },

  // Card
  card: {
    backgroundColor: '#F7F9FA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  viewAll: {
    fontSize: 12,
    color: '#9ca3af',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
    minWidth: 70,
  },
  boxIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  statSub: {
    fontSize: 9,
    color: '#9ca3af',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
  },

  // Chart legend
  legendRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 10,
    color: '#9ca3af',
  },

  // Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 4,
  },
  tableHeadText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tableCell: {
    flex: 1,
    fontSize: 11,
    color: '#374151',
  },
  tableCellText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
  },

  // Avatar
  avatar: {
    backgroundColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4b5563',
  },

  // Call cards
  callCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    padding: 12,
    marginBottom: 10,
  },
  callCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  callCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  callName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  callEmail: {
    fontSize: 10,
    color: '#9ca3af',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendText: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '600',
  },
  rankBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rankText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0148AF',
  },
  callStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
  },
  callStatLabel: {
    fontSize: 9,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  callStatValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
});
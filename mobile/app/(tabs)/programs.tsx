import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, SectionHeader } from "@/components/ui";
import { programs } from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

const accentColor = { brand: colors.brand, gold: colors.gold, mint: colors.mint };
const accentTone = { brand: "brand", gold: "gold", mint: "mint" } as const;

export default function ProgramsScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        eyebrow="What We Do"
        title="Our Programs"
        subtitle="Six focused initiatives, one shared belief — every community deserves dignity, opportunity, and hope."
      />

      {programs.map((p) => (
        <View key={p.slug} style={styles.card}>
          <Image source={{ uri: p.image }} style={styles.img} />
          <View style={[styles.accentBar, { backgroundColor: accentColor[p.accent] }]} />
          <View style={styles.body}>
            <Badge label={p.stat} tone={accentTone[p.accent]} />
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.story}>{p.story}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
    marginBottom: spacing.md,
    ...shadow.card,
  },
  img: { width: "100%", height: 170 },
  accentBar: { height: 4, width: "100%" },
  body: { padding: spacing.lg },
  title: { color: colors.ink, fontSize: 20, fontWeight: "800", marginTop: 10 },
  story: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginTop: 8 },
});

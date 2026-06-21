import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge } from "@/components/ui";
import { blogPosts } from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogScreen() {
  const [featured, ...rest] = blogPosts;
  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Featured */}
      <View style={styles.featured}>
        <Image source={{ uri: featured.image }} style={styles.featuredImg} />
        <View style={styles.featuredBody}>
          <Badge label={featured.category} tone="brand" />
          <Text style={styles.featuredTitle}>{featured.title}</Text>
          <Text style={styles.excerpt}>{featured.excerpt}</Text>
          <Text style={styles.date}>{formatDate(featured.date)}</Text>
        </View>
      </View>

      {rest.map((p) => (
        <View key={p.slug} style={styles.row}>
          <Image source={{ uri: p.image }} style={styles.rowImg} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowCategory}>{p.category.toUpperCase()}</Text>
            <Text style={styles.rowTitle}>{p.title}</Text>
            <Text style={styles.date}>{formatDate(p.date)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  featured: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1,
    borderColor: colors.line, overflow: "hidden", marginBottom: spacing.lg, ...shadow.card,
  },
  featuredImg: { width: "100%", height: 190 },
  featuredBody: { padding: spacing.lg },
  featuredTitle: { color: colors.ink, fontSize: 21, fontWeight: "900", lineHeight: 27, marginTop: 10 },
  excerpt: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginTop: 8 },
  date: { color: colors.inkFaint, fontSize: 12, marginTop: 10 },

  row: {
    flexDirection: "row", gap: 14, backgroundColor: colors.white, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.line, padding: spacing.sm, marginBottom: spacing.sm,
  },
  rowImg: { width: 96, height: 96, borderRadius: radius.sm, backgroundColor: colors.line },
  rowCategory: { color: colors.brand, fontSize: 11, fontWeight: "800", letterSpacing: 0.5 },
  rowTitle: { color: colors.ink, fontSize: 15, fontWeight: "800", lineHeight: 20, marginTop: 4 },
});

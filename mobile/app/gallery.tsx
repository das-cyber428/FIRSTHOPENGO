import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { galleryCategories, galleryImages } from "@/constants/content";
import { colors, radius, spacing } from "@/constants/theme";

const { width } = Dimensions.get("window");
const GAP = spacing.sm;
const COL_W = (width - spacing.lg * 2 - GAP) / 2;

export default function GalleryScreen() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<string | null>(null);

  const filtered =
    category === "All"
      ? galleryImages
      : galleryImages.filter((g) => g.category === category);

  // Split into two columns for a masonry-ish layout.
  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8, alignItems: "center" }}
      >
        {galleryCategories.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategory(c)}
            style={[styles.filter, category === c && styles.filterActive]}
          >
            <Text style={[styles.filterText, category === c && styles.filterTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.sm }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", gap: GAP }}>
          {[left, right].map((col, ci) => (
            <View key={ci} style={{ flex: 1, gap: GAP }}>
              {col.map((g, i) => (
                <Pressable key={g.src} onPress={() => setActive(g.src)}>
                  <Image
                    source={{ uri: g.src }}
                    style={{
                      width: COL_W,
                      height: (ci + i) % 3 === 0 ? COL_W * 1.35 : COL_W,
                      borderRadius: radius.md,
                      backgroundColor: colors.line,
                    }}
                  />
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Lightbox */}
      <Modal visible={active !== null} transparent animationType="fade" onRequestClose={() => setActive(null)}>
        <Pressable style={styles.lightbox} onPress={() => setActive(null)}>
          <Pressable style={styles.close} onPress={() => setActive(null)}>
            <Ionicons name="close" size={26} color={colors.white} />
          </Pressable>
          {active && <Image source={{ uri: active }} style={styles.lightboxImg} resizeMode="contain" />}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBar: { flexGrow: 0, paddingVertical: spacing.md },
  filter: {
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.pill,
    borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white, height: 38,
  },
  filterActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  filterText: { color: colors.inkSoft, fontWeight: "700", fontSize: 13 },
  filterTextActive: { color: colors.white },

  lightbox: { flex: 1, backgroundColor: "rgba(17,24,39,0.95)", alignItems: "center", justifyContent: "center" },
  close: { position: "absolute", top: 50, right: 24, zIndex: 2, padding: 8 },
  lightboxImg: { width: "92%", height: "70%" },
});

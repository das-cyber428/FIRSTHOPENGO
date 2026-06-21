import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "@/components/ui";
import { indianStates } from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

const steps = ["About You", "Location", "Skills & Time", "Your Why"];
const skillOptions = [
  "Teaching", "Medical", "Cooking", "Fundraising", "Photography",
  "Social Media", "Logistics", "Counselling", "Tech / Web",
];
const availabilityOptions = ["Weekends", "Weekday Evenings", "Full-time", "Remote"];

export default function VolunteerScreen() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", state: "", city: "",
    skills: [] as string[], availability: "", motivation: "",
  });

  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));
  const toggleSkill = (s: string) =>
    set({ skills: form.skills.includes(s) ? form.skills.filter((x) => x !== s) : [...form.skills, s] });

  const canProceed =
    (step === 0 && form.name && form.phone && form.email) ||
    (step === 1 && form.state && form.city) ||
    (step === 2 && form.skills.length > 0 && form.availability) ||
    step === 3;

  if (done) {
    return (
      <View style={styles.successWrap}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={42} color={colors.white} />
        </View>
        <Text style={styles.successTitle}>Welcome to the movement!</Text>
        <Text style={styles.successText}>
          Thank you, {form.name.split(" ")[0] || "friend"}. Our team will reach out
          within 48 hours to match you with a program near {form.city || "you"}.
        </Text>
        <Button label="Back to Home" icon="home" onPress={() => router.replace("/")} style={{ marginTop: spacing.lg }} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 60 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Progress */}
      <View style={styles.progress}>
        {steps.map((label, i) => (
          <View key={label} style={styles.progressItem}>
            <View
              style={[
                styles.progressDot,
                i < step && { backgroundColor: colors.mint },
                i === step && { backgroundColor: colors.brand },
              ]}
            >
              {i < step ? (
                <Ionicons name="checkmark" size={16} color={colors.white} />
              ) : (
                <Text style={[styles.progressNum, i === step && { color: colors.white }]}>{i + 1}</Text>
              )}
            </View>
            {i < steps.length - 1 && (
              <View style={[styles.progressLine, i < step && { backgroundColor: colors.mint }]} />
            )}
          </View>
        ))}
      </View>
      <Text style={styles.stepLabel}>{steps[step]}</Text>

      <View style={styles.card}>
        {step === 0 && (
          <>
            <Field label="Full Name">
              <TextInput style={styles.input} value={form.name} onChangeText={(v) => set({ name: v })} placeholder="Anjali Das" placeholderTextColor={colors.inkFaint} />
            </Field>
            <Field label="Phone">
              <TextInput style={styles.input} value={form.phone} onChangeText={(v) => set({ phone: v })} placeholder="+91 98765 43210" keyboardType="phone-pad" placeholderTextColor={colors.inkFaint} />
            </Field>
            <Field label="Email">
              <TextInput style={styles.input} value={form.email} onChangeText={(v) => set({ email: v })} placeholder="you@email.com" keyboardType="email-address" autoCapitalize="none" placeholderTextColor={colors.inkFaint} />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="State">
              <View style={styles.chipWrap}>
                {indianStates.slice(0, 9).map((s) => (
                  <Chip key={s} label={s} active={form.state === s} onPress={() => set({ state: s })} />
                ))}
              </View>
            </Field>
            <Field label="City / Village">
              <TextInput style={styles.input} value={form.city} onChangeText={(v) => set({ city: v })} placeholder="Dhekiajuli" placeholderTextColor={colors.inkFaint} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Your Skills">
              <View style={styles.chipWrap}>
                {skillOptions.map((s) => (
                  <Chip key={s} label={s} active={form.skills.includes(s)} onPress={() => toggleSkill(s)} />
                ))}
              </View>
            </Field>
            <Field label="Availability">
              <View style={styles.chipWrap}>
                {availabilityOptions.map((a) => (
                  <Chip key={a} label={a} active={form.availability === a} onPress={() => set({ availability: a })} tone="mint" />
                ))}
              </View>
            </Field>
          </>
        )}

        {step === 3 && (
          <Field label="Why do you want to volunteer?">
            <TextInput
              style={[styles.input, styles.textarea]}
              value={form.motivation}
              onChangeText={(v) => set({ motivation: v })}
              placeholder="Share what inspires you to give back…"
              placeholderTextColor={colors.inkFaint}
              multiline
            />
          </Field>
        )}
      </View>

      <View style={styles.nav}>
        {step > 0 ? (
          <Button label="Back" variant="ghost" icon="arrow-back" onPress={() => setStep((s) => s - 1)} style={{ flex: 1 }} />
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {step < steps.length - 1 ? (
          <Button label="Continue" icon="arrow-forward" onPress={() => canProceed && setStep((s) => s + 1)} style={{ flex: 1, opacity: canProceed ? 1 : 0.4 }} />
        ) : (
          <Button label="Join" variant="gold" icon="checkmark" onPress={() => setDone(true)} style={{ flex: 1 }} />
        )}
      </View>
    </ScrollView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function Chip({ label, active, onPress, tone = "brand" }: { label: string; active: boolean; onPress: () => void; tone?: "brand" | "mint" }) {
  const activeColor = tone === "mint" ? colors.mint : colors.brand;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && { backgroundColor: activeColor, borderColor: activeColor }]}
    >
      <Text style={[styles.chipText, active && { color: colors.white }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  progress: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm },
  progressItem: { flexDirection: "row", alignItems: "center", flex: 1 },
  progressDot: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.line,
    alignItems: "center", justifyContent: "center",
  },
  progressNum: { color: colors.inkSoft, fontWeight: "800" },
  progressLine: { flex: 1, height: 2, backgroundColor: colors.line, marginHorizontal: 4 },
  stepLabel: { color: colors.ink, fontSize: 22, fontWeight: "900", marginBottom: spacing.md },

  card: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1,
    borderColor: colors.line, padding: spacing.lg, ...shadow.card,
  },
  fieldLabel: { color: colors.ink, fontSize: 14, fontWeight: "700", marginBottom: 8 },
  input: {
    backgroundColor: colors.canvas, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.line, paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: colors.ink,
  },
  textarea: { height: 120, textAlignVertical: "top" },

  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.pill,
    borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white,
  },
  chipText: { color: colors.inkSoft, fontWeight: "600", fontSize: 13 },

  nav: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg },

  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl, backgroundColor: colors.canvas },
  successIcon: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: colors.mint,
    alignItems: "center", justifyContent: "center",
  },
  successTitle: { color: colors.ink, fontSize: 24, fontWeight: "900", marginTop: spacing.lg, textAlign: "center" },
  successText: { color: colors.inkSoft, fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 10 },
});

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { colors } from "@/constants/theme";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.white },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: "800" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.canvas },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="volunteer" options={{ title: "Become a Volunteer" }} />
        <Stack.Screen name="gallery" options={{ title: "Gallery" }} />
        <Stack.Screen name="blog" options={{ title: "Stories & Blog" }} />
        <Stack.Screen name="contact" options={{ title: "Contact Us" }} />
        <Stack.Screen name="event/[slug]" options={{ title: "Event" }} />
      </Stack>
    </>
  );
}

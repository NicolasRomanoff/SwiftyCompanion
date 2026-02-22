import styles, { black } from "@/assets/style";
import { Typography } from "@/components/Typography";
import useProfile from "@/hooks/profileStore";
import { ProfileSchema } from "@/lib/profile.type";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import zod from "zod";

const SwiftyCompanion = () => {
  const [login, setLogin] = useState<string>("");
  const { profile, setProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProfile = async ({ login }: { login: string }) => {
    setIsLoading(true);
    setIsError(false);
    Keyboard.dismiss();
    try {
      const profile = await axios.get(`http://localhost:3000/${login}`);
      const profileParsed = zod.parse(ProfileSchema, profile.data);
      setProfile(profileParsed);
    } catch {
      setIsError(true);
      setProfile(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (profile) router.navigate("./profile");
  }, [profile]);

  const handleSearch = async () => {
    if (!login.trim()) return;
    await fetchProfile({ login: login.trim() });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: black }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.homeContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.homeHeader}>
            <View style={styles.logoContainer}>
              <Typography size="xl" weight="bold" color="black">
                42
              </Typography>
            </View>
            <Typography
              size="lg"
              weight="bold"
              color="yellow"
              style={styles.appTitle}
            >
              Swifty Companion
            </Typography>
            <Typography size="sm" color="white" style={styles.appSubtitle}>
              Find 42 student profiles
            </Typography>
          </View>
          <View style={styles.searchSection}>
            <Typography
              size="sm"
              color="white"
              weight="bold"
              style={styles.inputLabel}
            >
              Enter student login
            </Typography>
            <TextInput
              style={[styles.searchInput, isError && styles.searchInputError]}
              placeholder="e.g., jdoe"
              placeholderTextColor="#999"
              value={login}
              onChangeText={(text) => {
                setLogin(text);
                if (isError) setIsError(false);
              }}
              onSubmitEditing={handleSearch}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              editable={!isLoading}
            />

            {isError && (
              <View style={styles.errorMessage}>
                <Typography color="red" size="sm">
                  ⚠️ User not found. Please check the login.
                </Typography>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.searchButton,
                (!login.trim() || isLoading) && { opacity: 0.5 },
              ]}
              onPress={handleSearch}
              disabled={!login.trim() || isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={black} />
              ) : (
                <Typography color="black" size="md" weight="bold">
                  🔍 Search Profile
                </Typography>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.infoCard}>
            <Typography
              size="sm"
              color="white"
              weight="bold"
              style={{ marginBottom: 8 }}
            >
              What you&apos;ll see:
            </Typography>
            <Typography size="xs" color="grey" style={{ lineHeight: 20 }}>
              • Profile details (level, location, wallet){"\n"}• Skills with
              progression bars{"\n"}• Projects history (passed & failed){"\n"}•
              Evaluation points & more
            </Typography>
          </View>

          <Typography size="xs" color="grey" style={styles.helpText}>
            Discover student achievements and progress at 42
          </Typography>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SwiftyCompanion;

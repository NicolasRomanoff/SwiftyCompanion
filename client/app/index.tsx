import styles, { red, white } from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import useProfile from "@/hooks/profileStore";
import { ProfileSchema } from "@/lib/profile.type";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import zod from "zod";

const SwiftyCompanion = () => {
  const [login, setLogin] = useState<string | null>(null);
  const { profile, setProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProfile = async ({ login }: { login: string }) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const user = await axios.get(`http://localhost:3000/${login}`);
      const { id } = zod.parse(ProfileSchema.pick({ id: true }), user.data);

      const profile = await axios.get(`http://localhost:3000/user/${id}`);
      const profileParsed = zod.parse(ProfileSchema, profile.data);
      setProfile(profileParsed);
    } catch (e) {
      console.log("Error : ", e);
      setIsError(true);
      setProfile(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (profile) router.navigate("./profile");
  }, [profile]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { borderColor: isError ? red : white }]}
          placeholder="login"
          onChangeText={(login) => setLogin(login)}
        />
        {isError && (
          <Typography color="red" size="sm">
            User not found
          </Typography>
        )}
        <Button
          onClick={async () => {
            if (!login) return;
            await fetchProfile({ login });
          }}
          disabled={!login || isLoading}
        >
          <Typography color="black">
            {isLoading ? <ActivityIndicator size="small" /> : "Search"}
          </Typography>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SwiftyCompanion;

import styles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import useProfile from "@/hooks/profileStore";
import { ProfileSchema } from "@/lib/profile.type";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import zod from "zod";

const fetchProfile = async ({ login }: { login: string }) => {
  try {
    const user = await axios.get(`http://localhost:3000/${login}`);
    const { id } = zod.parse(ProfileSchema.pick({ id: true }), user.data);

    const profile = await axios.get(`http://localhost:3000/user/${id}`);
    const profileParsed = zod.parse(ProfileSchema, profile.data);

    return profileParsed;
  } catch (e) {
    console.log("Error : ", e);
  }
};

const SwiftyCompanion = () => {
  const [login, setLogin] = useState<string | null>(null);
  const { setProfile } = useProfile();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="login"
          defaultValue={login ?? ""}
          onChangeText={(login) => setLogin(login)}
        />
        <Button
          onClick={async () => {
            if (!login) return;
            const profile = await fetchProfile({ login });
            if (!profile) return;
            setProfile(profile);
            router.navigate("./profile");
          }}
          disabled={!login}
        >
          <Typography color="black">Search ...</Typography>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SwiftyCompanion;

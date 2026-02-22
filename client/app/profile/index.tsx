import styles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import useProfile from "@/hooks/profileStore";
import { router } from "expo-router";
import { View } from "react-native";

const Profile = () => {
  const { profile } = useProfile();
  if (!profile)
    return (
      <View style={styles.container}>
        <Typography>Error</Typography>
      </View>
    );

  return (
    <View style={styles.container}>
      <Typography>Profile : {profile.first_name}</Typography>
      <Button onClick={() => router.navigate("/")}>
        <Typography color="black">Back</Typography>
      </Button>
    </View>
  );
};

export default Profile;

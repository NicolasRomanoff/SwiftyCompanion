import styles from "@/assets/style";
import { Typography } from "@/components/Typography";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SwiftyCompanion = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Typography>Swifty Companion</Typography>
    </SafeAreaView>
  );
};

export default SwiftyCompanion;

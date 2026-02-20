import styles from "@/assets/style";
import { Typography } from "@/components/Typography";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SwiftyCompanion = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Typography>Swifty Companion</Typography>
      </View>
    </SafeAreaView>
  );
};

export default SwiftyCompanion;

import { StyleSheet } from "react-native";

export const black = "#1b1b1b";
export const yellow = "#bb9200";
export const white = "#cdcdc7";
export const red = "#b21926";
export const grey = "#6d6d6d";
export const blue = "#3d7eff";
export const green = "#00b406";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: black,
  },
  button: {
    backgroundColor: yellow,
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  ghostBtn: {
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default styles;

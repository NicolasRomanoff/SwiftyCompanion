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
  input: {
    borderRadius: 20,
    backgroundColor: white,
    borderWidth: 1,
    padding: 10,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: black,
  },
  profileScrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: black,
    borderBottomWidth: 2,
    borderBottomColor: yellow,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: yellow,
    marginBottom: 15,
  },
  profileName: {
    marginBottom: 5,
  },
  profileLogin: {
    marginBottom: 15,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  levelBadge: {
    backgroundColor: yellow,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: grey,
  },
  sectionTitle: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: yellow,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },
  detailLabel: {
    flex: 1,
  },
  detailValue: {
    flex: 2,
    textAlign: "right",
  },
  skillItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: yellow,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  skillName: {
    flex: 1,
  },
  skillLevel: {
    marginLeft: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#1b1b1b",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: yellow,
    borderRadius: 4,
  },
  projectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  projectItemPassed: {
    borderLeftColor: green,
  },
  projectItemFailed: {
    borderLeftColor: red,
  },
  projectItemWaiting: {
    borderLeftColor: grey,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    marginBottom: 5,
  },
  projectStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  projectMark: {
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  projectMarkPassed: {
    backgroundColor: green,
  },
  projectMarkFailed: {
    backgroundColor: red,
  },
  projectMarkWaiting: {
    backgroundColor: grey,
  },
  backButtonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  locationIcon: {
    marginLeft: 5,
  },
  homeContainer: {
    flexGrow: 1,
    backgroundColor: black,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    minHeight: "100%",
  },
  homeHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  appTitle: {
    marginBottom: 10,
    textAlign: "center",
  },
  appSubtitle: {
    textAlign: "center",
    opacity: 0.8,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: yellow,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: white,
  },
  searchSection: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  inputLabel: {
    marginBottom: 10,
    marginLeft: 5,
  },
  searchInput: {
    borderRadius: 15,
    backgroundColor: white,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: black,
    marginBottom: 10,
  },
  searchInputError: {
    borderColor: red,
    borderWidth: 2,
  },
  searchButton: {
    backgroundColor: yellow,
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: yellow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  errorMessage: {
    marginTop: 5,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  helpText: {
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    opacity: 0.6,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
    borderLeftWidth: 4,
    borderLeftColor: yellow,
  },
});

export default styles;

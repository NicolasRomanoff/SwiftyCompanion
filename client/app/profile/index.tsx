import styles from "@/assets/style";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import useProfile from "@/hooks/profileStore";
import { router } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { profile, setProfile } = useProfile();

  if (!profile)
    return (
      <View style={styles.container}>
        <Typography>Error: Profile not found</Typography>
        <View style={styles.backButtonContainer}>
          <Button
            onClick={() => {
              setProfile(null);
              router.navigate("/");
            }}
          >
            <Typography color="black" weight="bold">
              ← Back to Search
            </Typography>
          </Button>
        </View>
      </View>
    );

  const mainCursus =
    profile.cursus_users.find((cu) => cu.cursus.slug === "42cursus") ||
    profile.cursus_users[profile.cursus_users.length - 1];

  const completedProjects = profile.projects_users.filter(
    (p) => p.marked || p["validated?"] !== null,
  );

  return (
    <SafeAreaView style={styles.profileContainer}>
      <ScrollView style={styles.profileScrollView}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: profile.image.versions.medium }}
            style={styles.profileImage}
          />
          <Typography size="xl" weight="bold" style={styles.profileName}>
            {profile.usual_full_name}
          </Typography>
          <Typography size="md" color="grey" style={styles.profileLogin}>
            @{profile.login}
          </Typography>
          {mainCursus && (
            <View style={styles.levelContainer}>
              <View style={styles.levelBadge}>
                <Typography size="md" weight="bold" color="black">
                  Level {mainCursus.level.toFixed(2)}
                </Typography>
              </View>
              {profile.location && (
                <Typography size="sm" color="white">
                  📍 {profile.location}
                </Typography>
              )}
            </View>
          )}
        </View>
        <View style={styles.section}>
          <Typography
            size="lg"
            weight="bold"
            color="yellow"
            style={styles.sectionTitle}
          >
            Details
          </Typography>
          <View style={styles.detailRow}>
            <Typography size="sm" color="grey" style={styles.detailLabel}>
              Email
            </Typography>
            <Typography size="sm" color="white" style={styles.detailValue}>
              {profile.email}
            </Typography>
          </View>
          <View style={styles.detailRow}>
            <Typography size="sm" color="grey" style={styles.detailLabel}>
              Phone
            </Typography>
            <Typography size="sm" color="white" style={styles.detailValue}>
              {profile.phone || "N/A"}
            </Typography>
          </View>
          <View style={styles.detailRow}>
            <Typography size="sm" color="grey" style={styles.detailLabel}>
              Wallet
            </Typography>
            <Typography size="sm" color="white" style={styles.detailValue}>
              {profile.wallet} ₳
            </Typography>
          </View>
          <View style={styles.detailRow}>
            <Typography size="sm" color="grey" style={styles.detailLabel}>
              Evaluation Points
            </Typography>
            <Typography size="sm" color="white" style={styles.detailValue}>
              {profile.correction_point}
            </Typography>
          </View>
          {profile.campus && profile.campus.length > 0 && (
            <View style={styles.detailRow}>
              <Typography size="sm" color="grey" style={styles.detailLabel}>
                Campus
              </Typography>
              <Typography size="sm" color="white" style={styles.detailValue}>
                {profile.campus[0].name}
              </Typography>
            </View>
          )}
          {mainCursus?.grade && (
            <View style={styles.detailRow}>
              <Typography size="sm" color="grey" style={styles.detailLabel}>
                Grade
              </Typography>
              <Typography size="sm" color="white" style={styles.detailValue}>
                {mainCursus.grade}
              </Typography>
            </View>
          )}
        </View>
        {mainCursus?.skills && mainCursus.skills.length > 0 && (
          <View style={styles.section}>
            <Typography
              size="lg"
              weight="bold"
              color="yellow"
              style={styles.sectionTitle}
            >
              Skills
            </Typography>
            {mainCursus.skills
              .sort((a, b) => b.level - a.level)
              .map((skill) => {
                const percentage = Math.min((skill.level / 20) * 100, 100);
                return (
                  <View key={skill.id} style={styles.skillItem}>
                    <View style={styles.skillHeader}>
                      <Typography
                        size="md"
                        color="white"
                        weight="bold"
                        style={styles.skillName}
                      >
                        {skill.name}
                      </Typography>
                      <Typography
                        size="sm"
                        color="yellow"
                        style={styles.skillLevel}
                      >
                        {skill.level.toFixed(2)}
                      </Typography>
                    </View>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          { width: `${percentage}%` },
                        ]}
                      />
                    </View>
                    <Typography size="xs" color="grey" style={{ marginTop: 5 }}>
                      {percentage.toFixed(1)}%
                    </Typography>
                  </View>
                );
              })}
          </View>
        )}
        {completedProjects.length > 0 && (
          <View style={styles.section}>
            <Typography
              size="lg"
              weight="bold"
              color="yellow"
              style={styles.sectionTitle}
            >
              Projects ({completedProjects.length})
            </Typography>
            {completedProjects
              .sort((a, b) => {
                if (!a.marked_at) return 1;
                if (!b.marked_at) return -1;
                return (
                  new Date(b.marked_at).getTime() -
                  new Date(a.marked_at).getTime()
                );
              })
              .map((project) => {
                const isPassed = project["validated?"] === true;
                const isFailed = project["validated?"] === false;

                const projectStyle = isPassed
                  ? styles.projectItemPassed
                  : isFailed
                    ? styles.projectItemFailed
                    : styles.projectItemWaiting;

                const markStyle = isPassed
                  ? styles.projectMarkPassed
                  : isFailed
                    ? styles.projectMarkFailed
                    : styles.projectMarkWaiting;

                return (
                  <View
                    key={project.id}
                    style={[styles.projectItem, projectStyle]}
                  >
                    <View style={styles.projectInfo}>
                      <Typography
                        size="md"
                        color="white"
                        weight="bold"
                        style={styles.projectName}
                      >
                        {project.project.name}
                      </Typography>
                      <View style={styles.projectStatus}>
                        <Typography size="xs" color="grey">
                          {isPassed
                            ? "✓ Passed"
                            : isFailed
                              ? "✗ Failed"
                              : "⏳ In Progress"}
                        </Typography>
                        {project.marked_at && (
                          <Typography size="xs" color="grey">
                            {new Date(project.marked_at).toLocaleDateString()}
                          </Typography>
                        )}
                      </View>
                    </View>
                    {project.final_mark !== null && (
                      <View style={[styles.projectMark, markStyle]}>
                        <Typography size="md" weight="bold" color="white">
                          {project.final_mark}
                        </Typography>
                      </View>
                    )}
                  </View>
                );
              })}
          </View>
        )}
        <View style={styles.backButtonContainer}>
          <Button
            onClick={() => {
              setProfile(null);
              router.navigate("/");
            }}
          >
            <Typography color="black" weight="bold">
              ← Back to Search
            </Typography>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

import styles, { black, blue, grey, red, white, yellow } from "@/assets/style";
import { Text, TextProps } from "react-native";

const typographyVariants = {
  style: { default: styles.text },
  size: { xl: 60, lg: 50, md: 30, sm: 20, xs: 15 },
  color: {
    black: black,
    yellow: yellow,
    white: white,
    red: red,
    grey: grey,
    blue: blue,
  },
  weight: {
    normal: "400" as const,
    bold: "700" as const,
  },
};
type TTypographyVariants = typeof typographyVariants;

export const Typography: React.FC<
  TextProps & {
    variant?: keyof TTypographyVariants["style"];
    size?: keyof TTypographyVariants["size"];
    color?: keyof TTypographyVariants["color"];
    weight?: keyof TTypographyVariants["weight"];
  }
> = ({
  variant = "default",
  size = "md",
  color = "yellow",
  weight = "normal",
  children,
  style,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        typographyVariants.style[variant],
        style,
        { fontSize: typographyVariants.size[size] },
        { color: typographyVariants.color[color] },
        { fontWeight: typographyVariants.weight[weight] },
      ]}
    >
      {children}
    </Text>
  );
};

import { View } from "react-native";

interface SeparatorProps {
  height?: number;
}

const Separator: React.FC<SeparatorProps> = ({ height = 25 }) => (
  <View style={{ minHeight: height, width: "100%" }} />
);

export default Separator;

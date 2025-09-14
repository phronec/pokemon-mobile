import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

const SkeletonCard = () => {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  const gray = "#e5e7eb"; // Tailwind gray-200

  type LineProps = {
    width: number | string;
    height: number;
    radius?: number;
    style?: any;
  };
  const Line = ({ width, height, radius = 6, style }: LineProps) => (
    <Animated.View
      style={[
        { width, height, borderRadius: radius, backgroundColor: gray, opacity },
        style,
      ]}
    />
  );

  return (
    <View className="bg-white rounded-xl shadow p-3 overflow-hidden">
      <View className="items-center justify-center">
        <Line width={128} height={128} radius={64} />
      </View>
      <View className="mt-3 items-center">
        <Line width={"50%"} height={16} radius={8} />
      </View>
      <View className="mt-2 flex-row gap-2">
        <View className="flex-1">
          <Line width={80} height={10} radius={5} style={{ marginBottom: 8 }} />
          <View>
            <Line width={"70%"} height={12} style={{ marginBottom: 6 }} />
            <Line width={"60%"} height={12} style={{ marginBottom: 6 }} />
            <Line width={"65%"} height={12} />
          </View>
        </View>
        <View className="flex-1">
          <Line width={80} height={10} radius={5} style={{ marginBottom: 8 }} />
          <View>
            <Line width={"65%"} height={12} style={{ marginBottom: 6 }} />
            <Line width={"55%"} height={12} style={{ marginBottom: 6 }} />
            <Line width={"60%"} height={12} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonCard;

import React from "react";
import { View, Text, Image } from "react-native";
import type { PokemonMove, PokemonStat } from "../types/pokemon";

type PokemonCardProps = {
  id: number;
  name: string;
  imageUrl: string;
  stats?: PokemonStat[];
  moves?: PokemonMove[];
};

const PokemonCard = ({
  id,
  name,
  imageUrl,
  stats,
  moves,
}: PokemonCardProps) => {
  return (
    <View
      key={id}
      className="group bg-white rounded-xl p-3 text-center overflow-hidden"
    >
      <Image
        source={{ uri: imageUrl }}
        accessibilityLabel={name}
        className="mx-auto w-32 h-32 object-contain"
      />
      <Text className="capitalize font-semibold mt-3 text-lg">{name}</Text>
      <View className="mt-2 flex-row gap-2">
        {moves && moves.length > 0 && (
          <View className="flex-1">
            <Text className="text-xs font-semibold uppercase mb-2">Moves</Text>
            <View className="space-y-1">
              {moves.slice(0, 3).map((move) => (
                <Text key={move.move.name} className="text-gray-700 text-xs">
                  {move.move.name.replace("-", " ")}
                </Text>
              ))}
            </View>
          </View>
        )}
        {stats && stats.length > 0 && (
          <View className="flex-1">
            <Text className="text-xs font-semibold uppercase mb-2">Stats</Text>
            <View className="space-y-1">
              {stats.slice(0, 3).map((stat) => (
                <Text key={stat.stat.name} className="text-gray-700 text-xs">
                  {stat.stat.name}: {stat.base_stat}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default PokemonCard;

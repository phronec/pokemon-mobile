import React from "react";
import { View } from "react-native";
import PokemonHeader from "../assets/pokemon_header.svg";

const Header = () => {
  return (
    <View className="w-full h-40">
      <PokemonHeader
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      />
    </View>
  );
};

export default Header;

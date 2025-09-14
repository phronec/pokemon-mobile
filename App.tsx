import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import SkeletonCard from "./components/SkeletonCard";
import PokemonCard from "./components/PokemonCard";
import type { Pokemon as PokemonType } from "./types/pokemon";
import "./global.css";

const App = () => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [totalCount, setTotalCount] = useState<number | null>(null);

  // filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [typeModalVisible, setTypeModalVisible] = useState<boolean>(false);

  const fetchPage = async (url: string) => {
    // simulate slower network to demonstrate skeletons
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(url);
    const data = await response.json();

    const details: PokemonType[] = await Promise.all(
      data.results.map(async (pokemon: { url: string }) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    return {
      details,
      next: data.next as string | null,
      count: data.count as number,
    };
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (!nextUrl) return;
        const { details, next, count } = await fetchPage(nextUrl);
        setPokemons(details);
        setNextUrl(next ?? null);
        setTotalCount(typeof count === "number" ? count : null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch pokemons:", err);
        setLoading(false);
      }
    };
    init();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const { details, next } = await fetchPage(nextUrl!);
      setPokemons((prev) => [...prev, ...details]);
      setNextUrl(next ?? null);
    } catch (err) {
      console.error("Failed to load more pokemons:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // group by type for filter
  const allTypes = Array.from(
    new Set(pokemons.flatMap((p) => p.types.map((t) => t.type.name)))
  ).sort();

  const filteredPokemons = pokemons.filter((p) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = term === "" || p.name.toLowerCase().includes(term);
    const matchesType =
      selectedType === "" || p.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 6 }}
        >
          <Header />
          <View className="mb-4 mt-5">
            <TextInput
              placeholder="Search pokémon by name..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </View>
          <View className="mb-4">
            <TouchableOpacity
              onPress={() => setTypeModalVisible(true)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white"
            >
              <Text className="text-gray-700">
                {selectedType
                  ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
                  : "All Types"}
              </Text>
            </TouchableOpacity>
            <View className="mt-2">
              <TouchableOpacity
                onPress={resetFilters}
                className="px-3 py-2 rounded-lg bg-red-500 w-full items-center"
              >
                <Text className="text-white">Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            visible={typeModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setTypeModalVisible(false)}
          >
            <View className="flex-1 items-center justify-center">
              <Pressable
                onPress={() => setTypeModalVisible(false)}
                className="absolute inset-0 bg-black/40"
              />
              <View className="w-11/12 bg-white rounded-xl p-4">
                <Text className="text-lg font-semibold mb-3">Select Type</Text>
                <ScrollView style={{ maxHeight: 400 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedType("");
                      setTypeModalVisible(false);
                    }}
                    className={`px-3 py-2 rounded-lg mb-2 ${
                      selectedType === "" ? "bg-red-500" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`$${selectedType === "" ? "text-white" : "text-gray-700"}`}
                    >
                      All Types
                    </Text>
                  </TouchableOpacity>
                  {allTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => {
                        setSelectedType(type);
                        setTypeModalVisible(false);
                      }}
                      className={`px-3 py-2 rounded-lg mb-2 ${
                        selectedType === type ? "bg-red-500" : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`${selectedType === type ? "text-white" : "text-gray-700"}`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View className="mt-2 flex-row justify-end">
                  <TouchableOpacity
                    onPress={() => setTypeModalVisible(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200"
                  >
                    <Text className="text-gray-800">Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {loading ? (
            <View className="flex-row flex-wrap -m-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <View key={index} className="w-1/2 p-2">
                  <SkeletonCard />
                </View>
              ))}
            </View>
          ) : filteredPokemons.length === 0 ? (
            <Text className="text-center text-gray-600 text-lg">
              No pokémon match the filters.
            </Text>
          ) : (
            <View className="flex-row flex-wrap -m-2">
              {filteredPokemons.map((pokemon) => (
                <View key={pokemon.id} className="w-1/2 p-2">
                  <PokemonCard
                    id={pokemon.id}
                    name={pokemon.name}
                    imageUrl={
                      pokemon.sprites.other["official-artwork"].front_default ??
                      ""
                    }
                    stats={pokemon.stats}
                    moves={pokemon.moves}
                  />
                </View>
              ))}
            </View>
          )}

          {!loading &&
            filteredPokemons.length > 0 &&
            nextUrl !== null &&
            (totalCount === null || pokemons.length < totalCount) &&
            !(searchTerm.trim() !== "" || selectedType !== "") && (
              <View className="mt-6 items-center">
                <TouchableOpacity
                  onPress={loadMore}
                  disabled={loadingMore}
                  className="px-6 py-2 rounded-lg bg-red-500"
                >
                  <Text className="text-white">
                    {loadingMore ? "Loading..." : "Load More"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

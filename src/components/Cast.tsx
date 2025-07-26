import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchImages185, placeholder } from '../../api/moviedb';

const Cast = ({ cast, navigation }: any) => {
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast.map((item: any, index: number) => (
          <TouchableOpacity
            className="mr-4 item-center"
            key={index}
            onPress={() => navigation.navigate('Person', item)}
          >
            <View className="items-center w-20 h-20 overflow-hidden border rounded-full border-neutral-500">
              <Image
                source={{ uri: fetchImages185(item?.profile_path) || placeholder }}
                className="w-20 h-24 rounded-2xl"
              />
            </View>
            <Text className="mt-1 text-xs text-center text-white">
              {item.character.length > 10 ? item.character.slice(0, 10) + '...' : item.character}
            </Text>
            <Text className="mt-1 text-xs text-center text-neutral-400">
              {item.original_name.length > 10
                ? item.original_name.slice(0, 10) + '...'
                : item.original_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cast;

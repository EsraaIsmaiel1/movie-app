import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { fetchImages185, fetchImages500, placeholder } from '../../api/moviedb';
var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }: any) {
  const navigation = useNavigation<any>();
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row items-center justify-between mx-4">
        <Text className="text-xl text-white">{title}</Text>

        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item: any, index: number) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
              <View className="mr-4 space-y-1">
                <Image
                  source={{ uri: fetchImages185(item.poster_path) || placeholder }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-center  text-neutral-300">
                  {item?.title?.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fetchImages500, placeholder } from '../../api/moviedb';
var { width, height } = Dimensions.get('window');
const TrendingMovies = ({ data }: any) => {
  const navigation = useNavigation<any>();
  const handleClick = (item: any) => {
    console.log(item);
    navigation.navigate('Movie', item);
  };
  return (
    <View className="mb-8">
      <Text className="mx-4 mb-5 text-xl text-white">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }: any) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideScale={0.6}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
        vertical={false}
        itemWidth={width * 0.62}
        sliderWidth={width}
      ></Carousel>
    </View>
  );
};

const MovieCard = ({ item, handleClick }: any) => {
  return (
    <TouchableWithoutFeedback className="mx-4" onPress={() => handleClick(item)}>
      <Image
        source={{ uri: fetchImages500(item.poster_path) || placeholder }}
        className="rounded-3xl"
        style={{ width: width * 0.6, height: height * 0.4 }}
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;

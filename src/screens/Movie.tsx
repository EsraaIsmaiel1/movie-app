import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fetchImages500,
  fetchingMovieCast,
  fetchingMovieDetails,
  fetchingSimilarMovies,
  placeholder,
} from '../../api/moviedb';
var { width, height } = Dimensions.get('window');

export default function Movie() {
  const { params: item }: any = useRoute();
  console.log(item, 'movie');
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [movie, setMovie] = useState<any>();
  const ios = Platform.OS === 'ios';
  const marginTop = ios ? '' : 'mt-3';
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item?.id);
    getCast(item?.id);
    getSimilar(item?.id);
  }, [item]);

  const getMovieDetails = async (id: number) => {
    const data = await fetchingMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };
  const getCast = async (id: number) => {
    const data = await fetchingMovieCast(id);
    console.log(data, 'cast');
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilar = async (id: number) => {
    const data = await fetchingSimilarMovies(id);
    if (data && data.results) setSimilar(data.results);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-800">
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 flex-row items-center justify-between w-full px-4 ${marginTop}`}
        >
          <TouchableOpacity
            style={styles.background}
            className="p-1 rounded-xl"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} color="white" strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size={28}
              color={isFavourite ? theme.background : 'white'}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: fetchImages500(movie?.poster_path) || placeholder }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.5)', 'rgba(23,23,23,1)']}
              style={{
                position: 'absolute',
                bottom: 0,
                width: width,
                height: height * 0.4,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>
      <View
        style={{
          marginTop: -height * 0.09,
          paddingTop: height * 0.08,
        }}
        className="space-y-3"
      >
        <Text className="text-3xl font-bold tracking-wider text-center text-white">
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text className="text-base font-semibold text-center text-neutral-400">
            {movie?.status}. {movie?.release_date.split('-')[0]} . {movie?.runtime} min
          </Text>
        ) : null}

        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre: any, index: number) => {
            let showDot = index + 1 != movie?.genres?.length;
            return (
              <Text key={index} className="text-base font-semibold text-center text-neutral-400">
                {genre?.name} {showDot ? ' . ' : ''}
              </Text>
            );
          })}
        </View>
        <Text className="mx-4 tracking-wide text-neutral-400"> {movie?.overview}</Text>
      </View>
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
      {similar.length > 0 && <MovieList title="Similar" data={similar} hideSeeAll={true} />}
    </ScrollView>
  );
}

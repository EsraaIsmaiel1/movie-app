import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import {
  fetchingTopRatedMovies,
  fetchingTrendingMovies,
  fetchingUpcomingMovies,
} from '../../api/moviedb';
const ios = Platform.OS === 'ios';
export default function Home() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchingTrendingMovies();
    if (data && data.results) {
      setLoading(false);
      setTrending(data.results);
    }
  };
  const getUpcomingMovies = async () => {
    const data = await fetchingUpcomingMovies();
    if (data && data.results) {
      setUpcoming(data.results);
    }
  };
  const getTopRatedMovies = async () => {
    const data = await fetchingTopRatedMovies();
    if (data && data.results) {
      setTopRated(data.results);
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? 'mb-2' : 'mb-3 mt-2'}>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx-4">
          <Bars3CenterLeftIcon size={30} color="white" strokeWidth={2} />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieList title="Upcoming Movies" data={upcoming} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}

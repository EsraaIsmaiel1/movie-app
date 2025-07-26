import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fetchImages342,
  fetchImages500,
  fetchingPersonDetails,
  fetchingPersonMovies,
  placeholder,
} from '../../api/moviedb';

const { width, height } = Dimensions.get('window');

const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';
const Person = () => {
  const { params: item }: any = useRoute();
  const navigation = useNavigation<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personDetails, setPersonDetails] = useState<any>();
  const [personMovies, setPersonMovies] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item?.id);
    getPersonMovies(item?.id);
  }, [item]);

  const getPersonDetails = async (id: number) => {
    const data = await fetchingPersonDetails(id);
    if (data) {
      setPersonDetails(data);
      setLoading(false);
    }
  };
  const getPersonMovies = async (id: number) => {
    const data = await fetchingPersonMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView className="flex-1 bg-neutral-800" contentContainerStyle={{ paddingBottom: 20 }}>
      <SafeAreaView
        className={` z-20 flex-row items-center justify-between w-full px-4 ${verticalMargin}`}
      >
        <TouchableOpacity
          style={styles.background}
          className="p-1 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} color="white" strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size={28} color={isFavourite ? 'red' : 'white'} strokeWidth={2.5} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center "
            style={{
              shadowColor: ios ? 'gray' : 'gray',
              shadowOffset: { width: 0, height: 5 }, // iOS shadow offset
              shadowOpacity: ios ? 1 : 0, // iOS shadow opacity
              shadowRadius: 40, // iOS shadow radius
              elevation: 10, // Android shadow (elevation)
              borderRadius: 145,
            }}
          >
            <View className="items-center overflow-hidden border-2 rounded-full h-72 w-72 border-neutral-500">
              <Image
                source={{ uri: fetchImages342(personDetails?.profile_path) || placeholder }}
                style={{ width: width * 0.79, height: height * 0.43 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl font-bold text-center text-white">{personDetails?.name}</Text>
            <Text className="text-base text-center text-neutral-400">
              {personDetails?.place_of_birth}
            </Text>
          </View>
          <View className="flex-row items-center justify-between p-4 mx-1 mt-6 rounded-full bg-neutral-700">
            <View className="items-center px-2 border-r-2 border-neutral-400">
              <Text className="font-semibold text-white">Gender</Text>
              <Text className="text-sm text-neutral-400">
                {personDetails?.gender === 2 ? 'Male' : 'Female'}
              </Text>
            </View>
            <View className="items-center px-2 border-r-2 border-neutral-400">
              <Text className="font-semibold text-white">BirthDay</Text>
              <Text className="text-sm text-neutral-400">{personDetails?.birthday}</Text>
            </View>
            <View className="items-center px-2 border-r-2 border-neutral-400">
              <Text className="font-semibold text-white">Known For</Text>
              <Text className="text-sm text-neutral-400">
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View className="items-center px-2 ">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="text-sm text-neutral-400">
                {personDetails?.popularity.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="mx-4 my-6 space-y-2">
            <Text className="text-lg text-white">Biography</Text>
            <Text className="tracking-wide text-neutral-400">
              {personDetails?.biography || 'N/A'}
            </Text>
          </View>
          <MovieList data={personMovies} title="Movies" hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default Person;

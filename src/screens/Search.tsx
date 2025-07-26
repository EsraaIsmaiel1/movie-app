import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { debounce } from 'lodash';
import { fetchImages500, fetchingSearchResult, placeholder } from '../../api/moviedb';

var { width, height } = Dimensions.get('window');

const Search = () => {
  const navigation = useNavigation<any>();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  const handleSearch = async (text: string) => {
    if (text && text?.length > 2) {
      setLoading(true);
      fetchingSearchResult({
        query: text.trim(),
        page: 1,
        include_adult: false,
        language: 'en-US',
      }).then((data) => {
        setLoading(false);
        setResults(data.results);
        console.log(data, 'data');
      });
    } else {
      setResults([]);
      setLoading(false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="flex-row items-center mx-4 mt-5 mb-3 border rounded-full border-neutral-500">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="flex-1 pb-1 pl-6 font-semibold tracking-wider text-white"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="p-3 m-1 rounded-full bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results?.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 15 }}
          className="space-y-3"
        >
          <Text className="ml-3 font-semibold text-white">Results ({results?.length})</Text>
          <View className="flex-row flex-wrap justify-between mx-2">
            {results?.map((item: any, index: number) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => navigation.push('Movie', item)}
                  key={index}
                  className="w-40 h-60 rounded-3xl"
                >
                  <View className="mb-4 space-y-2">
                    <Image
                      source={{ uri: fetchImages500(item?.poster_path) || placeholder }}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="ml-1 text-neutral-300">
                      {item?.name?.length > 22 ? item.name.slice(0, 22) + '...' : item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image source={require('../../assets/Home cinema-pana.png')} className="h-96 w-96" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

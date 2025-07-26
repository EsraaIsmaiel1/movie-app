import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

var { width, height } = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={{ width, height }} className="absolute flex-row items-center justify-center">
      <Progress.Circle size={170} color={theme.background} indeterminate={true} />
    </View>
  );
};

export default Loading;

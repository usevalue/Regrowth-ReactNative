import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Compass from './components/compass'
import mainstyles from './styles/mainstyles';

const App = () => (
    <View style={mainstyles.container}>
      <Compass />
    </View>
  );

export default App;

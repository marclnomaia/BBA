// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Spetz Clone!</Text>
      <Button
        title="Find a Service Provider"
        onPress={() => navigation.navigate('Provider')}
      />
    </View>
  );
};

export default HomeScreen;

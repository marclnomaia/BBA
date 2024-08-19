// screens/ProviderScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as Location from 'expo-location';

const ProviderScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Fetching service providers from API based on user's location
      if (location) {
        const response = await fetch(
          'https://your-api.com/providers?lat=' +
            location.coords.latitude +
            '&lng=' +
            location.coords.longitude
        );
        const data = await response.json();
        setProviders(data.providers);
      }
    })();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nearby Service Providers:</Text>
      <FlatList
        data={providers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.name} - {item.distance}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProviderScreen;


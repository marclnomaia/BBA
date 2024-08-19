import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

const SearchScreen = () => {
  const [location, setLocation] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const searchProviders = async () => {
    const response = await axios.get('http://localhost:5000/search', {
      params: { lat: location.latitude, lng: location.longitude, category: 'plumbing' },
    });
    setProviders(response.data);
  };

```javascript
  return (
    <View>
      <MapView
        style={{ height: 300 }}
        region={{
          latitude: location?.latitude || 37.78825,
          longitude: location?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {providers.map((provider) => (
          <Marker
            key={provider._id}
            coordinate={{
              latitude: provider.location.coordinates[1],
              longitude: provider.location.coordinates[0],
            }}
            title={provider.name}
          />
        ))}
      </MapView>
      <Button title="Search Nearby Providers" onPress={searchProviders} />
      <FlatList
        data={providers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default SearchScreen;

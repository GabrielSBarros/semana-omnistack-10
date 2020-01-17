import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import DevMarker from '../components/DevMarker';

function Main({ navigation }){
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');

  const uri = 'https://avatars1.githubusercontent.com/u/16857391?s=460&v=4';
  useEffect(() => {
    async function loadInitialLocation(){
      const { granted } = await requestPermissionsAsync();
      if(granted){
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const {latitude, longitude} = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }
    loadInitialLocation();
  }, []);

  async function loadDevs() {
    const {latitude, longitude} = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      }
    });

    setDevs(response.data.devs);
  }

  function handleRegionChange(region){
    setCurrentRegion(region)
  }
  if(!currentRegion){
    return null;
  }

  return(
    <>
      <MapView 
        onRegionChangeComplete={handleRegionChange} 
        initialRegion={currentRegion} 
        style={styles.map}
      >
        {devs.map(dev => 
          <DevMarker key={dev._id} dev={dev}/>
        )}     
      </MapView>
      <View style={styles.searchForm}>
          <TextInput 
            style={styles.searchInput}
            placeholder='Buscar devs por techs...'
            placeholderTextColor='#999'
            autoCapitalize='words'
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
          />
          <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
            <MaterialIcons name='my-location' size={20} color='#FFF'/>
          </TouchableOpacity>
      </View>
    </>
  );
}

export default Main;

const styles = StyleSheet.create({
  map: { flex:1 },
  searchForm:{
    position: 'absolute',
    top: 20,
    right: 20,
    left: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput:{
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 3,
  },
  loadButton:{
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

});
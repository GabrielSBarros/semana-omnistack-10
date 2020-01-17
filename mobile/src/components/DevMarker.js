import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

function DevMarker({ dev }){
  return(
    <Marker 
      coordinate={{
          longitude: dev.location.coordinates[0],
          latitude: dev.location.coordinates[1],
          }}
    >
      <Image style={styles.avatar} source={{uri: dev.avatar_url}}/>
      
      <Callout onPress={() => {
        navigation.navigate('Profile', { github_username: dev.github_username })
      }}>
        <View style={styles.callout}>
          <Text style={styles.devName}>{dev.name}</Text>
          <Text style={styles.devBio}>{dev.bio}</Text>
          <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
        </View>
      </Callout>
    </Marker>
  );
}

export default DevMarker;

const styles = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF', 
  },
  callout: {
    width: 260,
    borderRadius: 10,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
});
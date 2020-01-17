import React from 'react';
import { View } from 'react-native';
import {WebView} from 'react-native-webview';

const githubUri = 'https://github.com/'
function Profile({navigation}){
  const githubUserName = navigation.getParam('github_username');
  
  return(
    <WebView style={{ flex:1 }} source={{uri:`${githubUri}${githubUserName}`}}/>
  );
}

export default Profile;
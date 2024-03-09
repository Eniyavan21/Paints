/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import Sign from './Screens/Sign';
import saveBase64ImageToFile from './Screens/SaveImage';
import RNFetchBlob from 'rn-fetch-blob';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const handleSave = (signature: any) =>{
  //Save the base64 image to a file
  saveBase64ImageToFile(
    signature,
    'paintsImage',
    RNFetchBlob.fs.dirs.DownloadDir
  )
    .then((filePath) => {
      // The image is saved successfully, and the file path is available in 'filePath'
      console.log('File saved successfully:', filePath);
      Alert.alert('Saved', 'Image saved successfully !', [
        {text: 'OK', onPress: () => console.log('Ok Pressed')},
      ]);
    })
    .catch((error) => {
      // Handle errors during the saving process
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Something went wrong, Please try again later !', [
        {text: 'OK', onPress: () => console.log('Ok Pressed')},
      ]);
    });
 }

 function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
        <View 
          style={{
            flex: 1,
          }}>
          <Sign onOK={handleSave}/>
        </View> 
  );
}

export default App;

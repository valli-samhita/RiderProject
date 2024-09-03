import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, ToastAndroid, ActivityIndicator,ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import callGoogleVisionAsync from './Googlevision.js';
import { useNavigation } from '@react-navigation/native';
import { shadow } from 'react-native-paper';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:'#fffff', // Background color changed to blue
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 25,
    marginVertical: 40,
    color: '#005A9C', // Text color changed to white
    textAlign: 'center',
    fontWeight: 'bold', // Added fontWeight
    textTransform: 'uppercase', // Convert text to uppercase
    shadowColor: '#000000', // Add shadow
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, 
    textShadowColor: 'rgba(0, 0, 0.5, 0.5)', // Shadow color
    textShadowOffset: { width: 3, height: 3}, // Shadow offset
    textShadowRadius: 9, // Shadow blur radius
    // Add elevation for Android
  },
  subtitle: {
    fontSize: 13,
    marginVertical: 5,
    textAlign: 'center',
    color: '#005A9C',
    textTransform: 'uppercase' ,
    fontWeight: 'bold',
   // Shadow offset
   // Text color changed to white
     // Add italic style
     // Convert first letter of each word to uppercase
  },
  electricText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#fff' // Text color changed to white
  },
  button: {
    backgroundColor: '#005A9C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase'
  },
});

export default function EV() {
  const [subtitle, setSubtitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function selectPhoto() {
    setLoading(true);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      ToastAndroid.showWithGravity(
        'Permission to access camera roll is required!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setLoading(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.cancelled) {
      setLoading(false);
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    callGoogleVisionAsync(base64).then(data => {
      let text = "";
      data.responses.forEach(response => {
        response.textAnnotations.forEach(textAnnotation => {
          text = text + " " + textAnnotation.description;
        });
      });
      setSubtitle(text);
      setLoading(false);
      if (checkKeywords(text)) {
        navigation.navigate('SignInOrRegisterPage'); // Navigate to the next page
      } else {
        ToastAndroid.showWithGravity(
          'This is not a electric vehicle only electric vehicles allowed',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }).catch(error => {
      ToastAndroid.showWithGravity(
        'Error',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setLoading(false);
    });
  }

  function checkKeywords(text) {
    const keywords = ['BATTER'];
    return keywords.every(keyword => text.includes(keyword));
  }

  return (
    <ImageBackground
    source={require('./darkblue.jpg')}
     style={{
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      width: '100%', // Ensure full width
      height: '100%', // Ensure full height
     }}>
    <ScrollView contentContainerStyle={styles.screen}>
      
      <Text style={styles.title}>ECOMOB RIDER APP</Text>
      
      <Text style={styles.subtitle}>upload your vehicle RC(Registration Certificate)</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={selectPhoto}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        {loading ? <ActivityIndicator size="large" color="#005A9C" /> : null}
      </View>
    </ScrollView>
  </ImageBackground>)
}

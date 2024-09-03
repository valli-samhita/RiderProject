const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} = require('react-native');
import { ToastAndroid } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {RadioButton,Button} from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Rider from './rider';


function Register({props}) {
  
  
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
 
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  
  

  const navigation = useNavigation();

  const handleRegister = () => {
    // Save the driver details (you can use AsyncStorage, database, etc.)
    // For demonstration, we'll just log the details
   
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Implement saving functionality here

    // Set the isRegistered state to true
    
  };
  const handleSubmit=async()=>{
    if(email&&password){
      try{ 
        await signInWithEmailAndPassword(auth,email,password)
        navigation.navigate('rider')

      }catch(err){
        console.log('got error:',err);
        ToastAndroid.showWithGravity(
          'Invalid email or password',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  }

 
  
  

  
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }
  
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      
    }
  }
  return (
    <ImageBackground
    source={require('./light.jpg')}
     style={{
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      width: '100%', // Ensure full width
      height: '100%', // Ensure full height
     }}>
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}
      >
      <View>

    <View style={styles.logoContainer}>
    
          
          <Image
            style={styles.logo}
            source={require('./eriksh.png')}
          />
        
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>login!!!</Text>

         

         

          
          
          <View style={styles.action}>
            <Fontisto
              name="email"
              color="#005A9C"
              size={24}
              style={{marginLeft: 0, paddingRight: 5}}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChange={e => handleEmail(e)}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Enter Proper Email Address
            </Text>
          )}
          
          
          <View style={styles.action}>
            <FontAwesome name="lock" color="#005A9C" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={e => handlePassword(e)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{marginRight: -10}}
                  
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{marginRight: -10}}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          { (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              
            </Text>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
            <View>
              <Text style={styles.textSign}>login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  );
}
const styl = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  successMessage: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});
export default Register;
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';



function Register({props}) {
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('');
  const [secretText, setSecretText] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');

  const navigation = useNavigation();


  const handleSubmit=async()=>{
    if(email&&password){
      try{ 
        await createUserWithEmailAndPassword(auth,email,password)
        navigation.navigate('rider')
      }catch(err){
        console.log('got error:',err);
        ToastAndroid.showWithGravity(
          'User already exists',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  }
  
  if (isRegistered) {
    return (
      <View style={styl.container}>
        <Text style={styl.successMessage}>Successfully Registered!</Text>
        <Button mode="contained" onPress={() => navigation.navigate('rider')} style={styl.button}>
          Continue
        </Button>
      </View>
    );
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
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
  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
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
          <Text style={styles.text_header}>Register!!!</Text>

          <View style={styles.radioButton_div}>
            <Text style={styles.radioButton_title}> Login as</Text>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>User</Text>
              <RadioButton
                value="User"
                status={userType == 'User' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('User')}
              />
            </View>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>Admin</Text>
              <RadioButton
                value="Admin"
                status={userType == 'Admin' ? 'checked' : 'unchecked'}
                onPress={() => setUserType('Admin')}
              />
            </View>
          </View>

          {userType == 'Admin' ? (
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#005A9C"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Secret Text"
                style={styles.textInput}
                onChange={e => setSecretText(e.nativeEvent.text)}
              />
            </View>
          ) : (
            ''
          )}

          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#005A9C"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              onChange={e => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Name sholud be more then 1 characters.
            </Text>
          )}
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
            <FontAwesome
              name="mobile"
              color="#005A9C"
              size={35}
              style={{paddingRight: 10, marginTop: -7, marginLeft: 5}}
            />
            <TextInput
              placeholder="Mobile"
              style={styles.textInput}
              onChange={e => handleMobile(e)}
              maxLength={10}
            />
            {mobile.length < 1 ? null : mobileVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Phone number with 6-9 and remaing 9 digit with 0-9
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
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{marginRight: -10}}
                  color={passwordVerify ? 'green' : 'red'}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Uppercase, Lowercase, Number and 6 or more characters.
            </Text>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit} >
            <View>
              <Text style={styles.textSign}>Register</Text>
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
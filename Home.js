import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EV from './EV'; // Import your EV component
import Registration from './registration';
import SignInOrRegisterPage from './SignInOrRegister'; // Import your RegistrationScreen component
import SignInPage from './SignIn';
import Rider from './rider';
import SplashScreen from './splashscreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import Register from './register';
import useAuth from './useAuth';





const Home = (props) => {
  const {user}=useAuth();
    return (
        <Stack.Navigator>
        <Stack.Screen name="SplashScreen"options={{headerShown:false}} component={SplashScreen}/>
        <Stack.Screen name="EV"options={{headerShown:false}} component={EV} />
        <Stack.Screen name="SignInOrRegisterPage" options={{headerShown:false}} component={SignInOrRegisterPage}/>
        <Stack.Screen name="SignIn" options={{headerShown:false}} component={SignInPage}/>
        <Stack.Screen name="Register"options={{headerShown:false}} component={Register} />
        <Stack.Screen name="rider" options={{headerShown:false}} component={Rider} />
        

      </Stack.Navigator>
    );
};

export default Home;

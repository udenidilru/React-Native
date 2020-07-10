
import React  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import{createStackNavigator} from 'react-navigation-stack'
import HomeComponent from './components/HomeComponent'
import LoadingComponent from './components/LoadingComponent'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import AddnoticeComponent from './components/AddnoticeComponent'
import PostComponent from './components/PostComponent'
import { Icon } from 'react-native-elements'

const AppTabNavigator = createBottomTabNavigator(
 
    {
      Home: {
        screen: HomeComponent,
       
      },
      Post: {
        screen: PostComponent,
        
      },
      Add: {
        screen: AddnoticeComponent,
        
      },
      
    },
  
    {
     
    }

);


const AuthStack = createStackNavigator({
  Login: LoginComponent,
  Register: SignupComponent,
})

export default createAppContainer(
  createSwitchNavigator({
    Loading:LoadingComponent,
    App: AppTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: "Loading"
  }
  )
)

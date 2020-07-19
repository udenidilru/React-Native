
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
import LoadingComponent from './components/LoadingComponent'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import AddnoticeComponent from './components/AddnoticeComponent'
import PostComponent from './components/PostComponent'
import EditComponent from './components/EditComponent'
import { Icon } from 'react-native-elements'

const AppTabNavigator = createBottomTabNavigator(
 
    {
      
      Post: {
        screen: PostComponent,
        
      },
      Add: {
        screen: AddnoticeComponent,
        
      },
      
    },
  
    {
      tabBarOptions: {
        labelStyle: {
          fontSize: 15,
          margin: 0,
          padding: 20,
        },
      }
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
    EditPost: EditComponent
  },
  {
    initialRouteName: "Loading"
  }
  )
)

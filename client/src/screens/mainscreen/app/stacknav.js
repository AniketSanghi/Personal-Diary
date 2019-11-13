import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from  'react-navigation-stack';

import IOSIcon from "react-native-vector-icons/Entypo";
import camera from "react-native-vector-icons/Entypo"
import MainScreen from "./MainScreen";
import NewNote from "./NewNote";
import CameraScreen from "./Camera";

const stackNav = createStackNavigator({
  
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: "",
      headerLeft:
      (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flex: 1, flexDirection: 'row'}}>

                    <IOSIcon name="menu" size={30} />
                    <Text style={{paddingLeft: 20, fontSize: 18, fontWeight: 'bold'}}> Personal Diary </Text>
        </TouchableOpacity>
      ),
      headerRight:
      (
        <TouchableOpacity onPress={() => navigation.push('Camera')}>
                    <IOSIcon name="camera" size={30} style={{paddingRight: 10}}/>
        </TouchableOpacity>
      ),
      
    })
  },
  NewNote: {
    screen: NewNote,
    navigationOptions: ({navigation}) => ({
      title: "",
      
      
    }),
  },
  Camera: {
   screen: CameraScreen,
    navigationOptions: ({navigation}) => ({
      title: "",
      header: null,
    })     
  },
  

});

const AppContainer = createAppContainer(stackNav);

export default AppContainer;
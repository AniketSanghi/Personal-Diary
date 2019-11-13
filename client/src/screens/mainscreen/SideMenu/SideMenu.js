import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import IOSIcon from "react-native-vector-icons/AntDesign";
import NewNote from "../app/NewNote"



class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View> 
            <Image
              style={{width: 300, height: 200}}
              source={require('./travelplan.jpg')}
            />

            <View style={styles.top} />

            <View style={styles.navSectionStyle}>

              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('NewNote')}>
                New Note
              </Text>
               <View style={{padding: 10, justifyContent: 'flex-end'}}><IOSIcon name="doubleright" size={20} /></View>
            </View>
            
           
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={{color: 'white', paddingLeft: 70, fontSize: 15, fontWeight: 'bold'}}>Aniket Sanghi</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
};

export default SideMenu;
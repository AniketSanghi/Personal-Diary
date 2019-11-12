import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';

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

              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Detail')}>
                Photo Gallery
              </Text>
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
  navigation: PropTypes.object
};

export default SideMenu;
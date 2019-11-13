import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import CardView from 'react-native-cardview'


class MainScreen extends Component {

  state = {
    data: null,
    received: false,
    style: styles.a1,
  }

  constructor(props) {
  super(props);
  
          fetch('http://172.24.33.169:3000/users', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              
          })
         .then((response) => response.json())
         .then((response) => {
                this.setState({data: response.reverse()});
                this.setState({received: true});
            })
            .catch(err => {
                console.log(err);
                this.setState({ message: err.message });
                this.setState({ isLoggingIn: false })
            });


  }

  render () {

    if(this.state.received == false)
      return (<View style={{marginTop: 10}}><ActivityIndicator/></View>);

    return (
    <ScrollView>
     {
      this.state.data.map((data) => {
          return (
            <View style={{paddingTop: 20, padding: 10}}>
              <CardView
                  cardElevation={100}
                  cardMaxElevation={100}
                  cornerRadius={5}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{width: 300, fontWeight: 'bold', fontSize: 30}}> {data.title} </Text>
                    <Text style={{paddingTop: 30}}> {data.date} </Text>
                  </View>
                  <TouchableHighlight style={this.state.style} onPress={() => this.setState({style: styles.a2})}>
                    <Text style={{padding: 10}}>
                      {data.content}
                    </Text>
                  </TouchableHighlight>
              </CardView>
            </View>
          )
        })
      }
      </ScrollView>
    )        
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  a1: {
    height: 150,
  },
  a2: {
  }
});

export default MainScreen;
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';

import CardView from 'react-native-cardview'
import PTRView from 'react-native-pull-to-refresh';



class MainScreen extends Component {

  state = {
    data: null,
    received: false,
    style: styles.a1,
  }

  _run() {

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

  constructor(props) {
    super(props);
    this._run();
  }

  _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }

  render () {

    if(this.state.received == false)
      return (<View style={{marginTop: 10}}><ActivityIndicator/></View>);

    return (
    <PTRView onRefresh={() => this._refresh().then(() => this._run())}>
    <ScrollView>
     {
      this.state.data.map((data) => {
          return (
            <View style={{paddingTop: 20, padding: 10}}>
              <CardView
                  cardElevation={100}
                  cardMaxElevation={100}
                  cornerRadius={5}>
                  
                  <Image
                    source={{ uri: data.image }}
                    style={{ width: 390, height: 400,marginTop: 10, marginBottom: 10, resizeMode: 'contain' }}
                  />
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{width: 300, fontWeight: 'bold', fontSize: 30}}> {data.title} </Text>
                    <Text style={{paddingTop: 30}}> {data.date} </Text>
                  </View>
                  <TouchableHighlight style={this.state.style} onPress={() => this.setState({style: styles.a2})}>
                  <ScrollView>
                    <Text style={{padding: 10}}>
                      {data.content}
                    </Text>
                  </ScrollView>
                  </TouchableHighlight>
              </CardView>
            </View>
          )
        })
      }
      </ScrollView>
      </PTRView>
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
import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Login from './src/screens/Login';
import Secured from './src/screens/mainscreen';
import SignUp from './src/screens/SignUp';

class Krotov extends Component {

  state = {
    isLoggedIn: false,
    SignUp: false,
    username: '',
  }

  render() {

    if (this.state.isLoggedIn) 
      return <Secured 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
          username={this.state.username}
        />;
    else if (this.state.SignUp)
    	return <SignUp
    		onSignUpPress={() => this.setState({SignUp: false})}
        back={() => this.setState({SignUp: false})}
    	/>;
    else
      return <Login 
          onLoginPress={(username) => {
            this.setState({isLoggedIn: true});
            this.setState({username: username});
          }}
          onSignUpPress={() => this.setState({SignUp: true})}
        />;
  }

}

AppRegistry.registerComponent("Krotov" , () => Krotov );
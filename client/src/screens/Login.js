import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native';

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: '',
        style: styles.space,
    }



    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        var proceed = false;
        fetch('http://192.168.43.196:4000/users/authenticate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: this.state.username,
                  password: this.state.password,
            })
        })
         .then((response) => {
             if (response.status==200) {proceed = true;}
             return response;
         })
         .then((response) => response.json())
         .then((response) => {
                if (response.status==200) {proceed = true;}
                else this.setState({ message: response.message });
                return response;
            })
            .then((response) => {
                this.setState({ isLoggingIn: false })
                if (proceed) this.props.onLoginPress(response.username);
            })
            .catch(err => {
                this.setState({ message: err.message });
                this.setState({ isLoggingIn: false })
            });
    }

    clearUsername = () => {
        this._username.setNativeProps({ text: '' });
        this.setState({ message: '' });
        this.setState({style: styles.newspace});
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
        this.setState({style: styles.newspace});
    }

    changeStyle = () => {
        this.setState({style: styles.space});
    }

    render() {
        return (
            <ScrollView style={this.state.style}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput
                    ref={component => this._username = component}
                    placeholder='Username' 
                    onChangeText={(username) => this.setState({username})}
                    autoFocus={true}
                    onFocus={this.clearUsername}
                    onBlur={this.changeStyle}
                />
                <TextInput 
                    ref={component => this._password = component}
                    placeholder='Password' 
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onBlur={this.changeStyle}
                    onSubmitEditing={this._userLogin}
                />
                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                        {this.state.message}
                    </Text>
                )}
                {this.state.isLoggingIn && <ActivityIndicator />}
                <View style={{margin:7}} />
                <Button 
                    disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
                    onPress={this._userLogin}
                    title="Submit"
                />
                <View style={{marginTop: 20}} />
                <Button
                    onPress={this.props.onSignUpPress}
                    title="Sign Up"
                />
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  space: {
    padding: 20,
    marginTop: 200,
  },
  newspace: {
    padding: 20,
    marginTop: 40,
  }
});

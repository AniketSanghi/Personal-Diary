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

export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: '',
        style: styles.space,
        lastname: '',
        firstname: '',
    }

    _userSignup = () => {

        this.setState({ isLoggingIn:true, message: '' });

        var proceed = false;
        fetch('http://172.24.33.169:4000/users/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: this.state.username,
                  firstName: this.state.firstname,
                  lastName: this.state.lastname,
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
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) this.props.onSignUpPress();
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

    clearFirstname = () => {
        this._firstname.setNativeProps({ text: '' });
        this.setState({ message: '' });
        this.setState({style: styles.newspace});
    }

    clearLastname = () => {
        this._lastname.setNativeProps({ text: '' });
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
                    SignUp
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
                    ref={component => this._firstname = component}
                    placeholder='First Name' 
                    onChangeText={(firstname) => this.setState({firstname})}
                    onFocus={this.clearFirstname}
                    onBlur={this.changeStyle}
                />
                <TextInput
                    ref={component => this._lastname = component}
                    placeholder='Last Name' 
                    onChangeText={(lastname) => this.setState({lastname})}
                    onFocus={this.clearLastname}
                    onBlur={this.changeStyle}
                />
                <TextInput 
                    ref={component => this._password = component}
                    placeholder='Password' 
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onBlur={this.changeStyle}
                    onSubmitEditing={this._userSignup}
                />
                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                        {this.state.message}
                    </Text>
                )}
                {this.state.isLoggingIn && <ActivityIndicator />}
                <View style={{margin:7}} />
                <View style={{marginTop: 20}} />
                <Button 
                    disabled={this.state.isLoggingIn||!this.state.username||!this.state.password||!this.state.username||!this.state.lastname}
                    onPress={this._userSignup}
                    title="Submit"
                />
                <View style={{marginTop: 20}} />
                <Button 
                    onPress={this.props.back}
                    title="Back"
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

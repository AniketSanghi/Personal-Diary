import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';


export default class NewNote extends Component {

    state = {
        username: 'sanghi',
        title: '',
        date: '',
        content: '',
        isLoggingIn: false,
        message: '',
        style: styles.space,
        filePath: {},
    }

    _newNote = () => {

        this.setState({ isLoggingIn:true, message: '' });

        var proceed = false;
        fetch('http://192.168.43.196:3000/users/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: this.state.username,
                  title: this.state.title,
                  content: this.state.content,
                  date: this.state.date,
                  image: this.state.filePath.uri,
            })
        })
        .then((response) => {
             if (response.status==200) {
                this.setState({message: "Successfully Added"});
                this.cleartitle();
                this.clearDate;
                this.clearContent;
            }
             return response;
         })
         .then((response) => response.json())
         .then((response) => {
                if (response.status==200) {proceed = true;}
                else this.setState({ message: response.message });
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
            })
            .catch(err => {
                this.setState({ message: err.message });
                this.setState({ isLoggingIn: false })
            });
    }

    chooseFile = () => {
            var options = {
              title: 'Select Image',
              customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
              ],
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            ImagePicker.showImagePicker(options, response => {
              console.log('Response = ', response);
         
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                  filePath: source,
                });
              }
            });
          };

    cleartitle = () => {
        this._title.setNativeProps({ text: '' });
        this.setState({ message: '' });
        this.setState({style: styles.newspace});
    }

    clearDate = () => {
        this._date.setNativeProps({ text: '' });
        this.setState({ message: '' });
        this.setState({style: styles.newspace});
    }

    clearContent = () => {
        this._content.setNativeProps({ text: '' });
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
                    Add a New Note
                </Text>

                <TextInput
                    ref={component => this._title = component}
                    placeholder='Title' 
                    onChangeText={(title) => this.setState({title})}
                    autoFocus={true}
                    onFocus={this.cleartitle}
                    onBlur={this.changeStyle}
                />
                <TextInput
                    ref={component => this._date = component}
                    placeholder='Date' 
                    onChangeText={(date) => this.setState({date})}
                    onFocus={this.clearDate}
                    onBlur={this.changeStyle}
                />
                <TextInput
                    ref={component => this._content = component}
                    placeholder='Content' 
                    onChangeText={(content) => this.setState({content})}
                    
                    onBlur={this.changeStyle}
                />
                <Image
                    source={{ uri: this.state.filePath.uri }}
                    style={{ width: 100, height: 100, marginLeft: 100, marginBottom: 50 }}
                  />
                <Button title="Choose File" onPress={this.chooseFile.bind(this)} />

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
                    disabled={this.state.isLoggingIn||!this.state.username||!this.state.title||!this.state.date||!this.state.content}
                    onPress={this._newNote}
                    title="Submit"
                />
                <View style={{marginTop: 20}} />
                <Button 
                    onPress={() => this.props.navigation.goBack()}
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

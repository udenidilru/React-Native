import React from 'react';
import {
  StyleSheet,View,Text, ActivityIndicator, TouchableOpacity,LayoutAnimation,Image} from 'react-native';
  import firebase from '@react-native-firebase/app';

export default class PostComponent extends React.Component {

    state = {
        email: "",
        displayName: ""
    };
    componentDidMount(){
        const {email,displayName} = firebase.auth().currentUser;

        this.setState({email,displayName});
    }
    signOutUser = () => {
        firebase.auth().signOut();
    }

    render(){
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>

            
                <Text style={styles.email}>Hello</Text>
                <Text style={styles.email}>{this.state.email}!</Text>

                <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        
    },
    logout:{
        // bottom: 270,
        // right: -140,
        // marginTop: 32,
        // backgroundColor: "#ADD8E6"
    },
    email: {
         bottom: -50,
         fontSize: 23,
    }

});
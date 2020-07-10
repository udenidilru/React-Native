import React from 'react';
import {
  StyleSheet,View,Text, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class LoadingComponent extends React.Component {
    componentDidMount(){
        auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>Loading.....</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    }
});
import React from 'react';
import {
  StyleSheet,
  View,
  Text,TouchableOpacity,ScrollView,TextInput
} from 'react-native';
import { Icon,Button } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class EditComponent extends React.Component {
    constructor() {
        super();
        this.state = {
          key: '',
          isLoading: true,
          author:'',
            title: '',
            post: '',
            createdAt:'',
        };
      }
      componentDidMount() {
        const { navigation } = this.props;
        const ref = firestore().collection('posts').doc(this.props.navigation.getParam('boardkey'));
        ref.get().then((doc) => {
          if (doc.exists) {
            const board = doc.data();
            this.setState({
              key: doc.id,
              title: board.title,
              post: board.post,
              author: auth().currentUser.displayName,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
      }
   
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
      }
      
      updateBoard() {
        const updateRef = firestore().collection('posts').doc(this.state.key);
        updateRef.set({
          title: this.state.title,
          post: this.state.post,
          
          author: this.state.author,
          createdAt: new Date().getTime(),
        }).then((docRef) => {
          this.setState({
            key: '',
           // author:'',
            title: '',
            post: '',
            createdAt:'',
            isLoading: false,
          });
       //   this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.setState({
            isLoading: false,
          });
        });
      }
    render(){
        return (
            <View style={{flexDirection:'row',marginTop:5, marginLeft:10}}>
                <Button onPress={() => this.props.navigation.navigate("Post")} title="back" />
                
             
             <ScrollView>
             <View style={styles.container}>
        <View style={styles.inputGroup}>
        <TextInput
       
              placeholder={'Title'}
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'title')}
          />
          <TextInput
              placeholder={'Post'}
              numberOfLines={4}
              multiline={true}
              value={this.state.post}
              onChangeText={(text) => this.updateTextInput(text, 'post')}
          />
        </View>
        
        <View>
          <Button style={{width:10}}
            title='Update Post'
            onPress={() => this.updateBoard()} 
            color="#19AC52"
          />
        </View>
        </View>
      </ScrollView>
      </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    subContainer: {
      flex: 1,
      marginBottom: 20,
      padding: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#CCCCCC',
    },
    activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      width:10
    }
  })
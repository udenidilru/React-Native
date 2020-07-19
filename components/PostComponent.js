import React, { Component } from 'react';
import { Alert,StyleSheet,TouchableOpacity, ScrollView, ActivityIndicator, View ,Text,Image} from 'react-native';
import { ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import { Icon ,Card, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';


class PostComponent extends Component {

  state = {
    email: "",
    displayName: ""
};
  constructor() {
    super();
    this.firestoreRef = firestore().collection('posts').orderBy('createdAt', 'desc');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    const {email,displayName} = firebase.auth().currentUser;

        this.setState({email,displayName});
  }
  signOutUser = () => {
    firebase.auth().signOut();
}

  componentWillUnmount(){
    this.unsubscribe();
  }
  

  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firestore().collection('posts').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      navigation.navigate('Board');
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { title,post,author,createdAt } = res.data();
      userArr.push({
        key: res.id,
        res,
        title,
        author,
        post,
        createdAt,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  render() {
   // LayoutAnimation.easeInEaseOut();
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      
      <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
          {
            this.state.userArr.map((item, i) => {
              return (
                <Card style={styles.card}>
                <View style={styles.listitem}>
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  subtitle={
                    <View>
                    <Text style={{marginTop:-40,marginLeft:30,fontWeight: "bold"}}>Author: {item.author}</Text>
                     <Text style={{marginTop:5,marginLeft:30}}>{item.post}</Text>
                  </View>
                    }
                    
                    subtitleStyle={{ paddingLeft: 20, paddingBottom:30 }}
                  onPress={() => {
                     this.props.navigation.navigate('HomeComponent', {
                      userkey: item.key
                     });
                  }}/>
                  </View>
                  

                  {
                    item.author == auth().currentUser.displayName ?
                <View style={{flexDirection:'row',marginTop:5, marginLeft:50,marginRight:50}}>
                <Button color="#19AC52" onPress={() => this.deleteBoard(item.key)} 
                        title='delete'
                 />
                  <Button title='edit' onPress={() => {
              this.props.navigation.navigate('EditPost',{
                boardkey: item.key
              });
            }}/>
                
            
            
                  </View> :<View></View>
                   } 
                  </Card>
              );
                 } )
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listitem: {
     width: 300,
     marginLeft: 10,
     marginTop: 20,
     
  },
  post: {
    padding: 20
  },
  logout: {
    marginLeft: 250,
    backgroundColor: "#1E90FF",
    padding: 10,
    width: 70,
    marginTop: 10
  }
  
})

export default PostComponent;
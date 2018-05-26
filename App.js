/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(){
    super();
    this.state={
      terjemahan:'',
      isLoading:false,
      katacari:''
    }
  }
  // componentDidMount(){
  //   this.cari
  // }
  cariTerjemah = async () => {
    let cari = this.state.katacari;
    console.log('katacari:',cari);
    this.setState({isLoading:true});
    try{
      let res = 
        await fetch(`http://lqtafsir-server.herokuapp.com/search?cursor=0&key=${cari}`);
        let hasil = await res.json();
        console.log('hasil:',hasil);
        let hasil_pertama = hasil.verses[0];
        this.setState({
          terjemahan:hasil_pertama.versenumber+':'+hasil_pertama.chapter+'\n'+hasil_pertama.previewtafsir,
          isLoading:false
        });
    }catch(err){
      this.setState({
        terjemahan:'unable to find tafsir',
        isLoading:false
      })
    }
  }
  render() {
    const loading = this.state.isLoading ? (
      <ActivityIndicator size="large" color="#4c4c4c" style={{ marginTop: 55 }}/>
    ) : (
      <View></View>      
    );
    return (
      <View style={styles.container}>
        <TextInput style={styles.search} onChangeText={(katacari)=>this.setState({katacari})}/>
        <TouchableHighlight onPress={()=>this.cariTerjemah()}>
          <Image source={require('./img/search.png')} style={styles.tombol} />
        </TouchableHighlight>
        {loading}
        <Text style={styles.instructions}>
          {this.state.terjemahan}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  search:{
    width:'70%'
  },
  tombol:{
    height:50,
    width:50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    flex:1,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

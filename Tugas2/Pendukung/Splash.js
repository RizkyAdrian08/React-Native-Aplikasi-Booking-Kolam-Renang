import { StatusBar, Image, View, PermissionsAndroid } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class Splash extends Component {
  validasiSession = async () => {
    const isLogin = await AsyncStorage.getItem('session_id')
    if (isLogin) { this.props.navigation.navigate('Beranda')}
    else { this.props.navigation.navigate('Login') }
  }

  componentDidMount() {
    setTimeout(() => {
      this.validasiSession()
    }, 3000);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />
        <Image source={require('../Gambar/logo.jpeg')} style={{ width: '90%', height: '20%' }} resizeMode='stretch' />
      </View>
    )
  }
}
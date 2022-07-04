import { Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Card } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, borderRadius: 30, marginBottom: 10, marginTop: 20 },
  card_gambar: { height: 200, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
})

export default class Favorit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      data: []
    }
  }

  dataFavorit() {
    fetch('http://192.168.43.137:8000/favorit/' + this.state.email)
      .then(response => response.json())
      .then(res => {
        this.setState({
          data: res
        })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    AsyncStorage.getItem('session_id', (error, res) => {
      if (res) { this.setState({ email: JSON.parse(res) }) }
    })
    setTimeout(() => {
      this.dataFavorit()
    }, 1);
  }

  render() {
    return (
      // <ScrollView>
      <View style={{ minHeight: Dimensions.get('window').height, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}><Ionicon name='chevron-back' size={30} color='black' /></TouchableOpacity>
          <Text style={{ flex: 2.5, color: '#0376fa', fontSize: 28, fontWeight: 'bold' }}>Kolam Favorit</Text>
        </View>

        <FlatList style={{ flex: 1 }} keyExtractor={(item, index) => index.toString()} data={this.state.data} renderItem={({ item, index }) => (
          <Card onPress={() => this.props.navigation.navigate('Detail', { IdKlm: item.IdKlm })} elevation={4} style={styles.card} >
            <Card.Cover source={{ uri: 'http:192.168.43.137:8000/gambar/' + item.Gambar1 }} style={styles.card_gambar} />
            <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22 }}>{item.Nama}</Text>
                <Text style={{ color: '#969696', fontSize: 16 }}><Ionicon name='location' size={18} color='#969696' />{item.Alamat}, {item.Kota}</Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Ionicon name='heart' color='red' size={35} />
              </View>
            </Card.Content>
          </Card>
        )} />
      </View>
      //</ScrollView>
    )
  }
}
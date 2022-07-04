import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import Carousel from 'simple-carousel-react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  status: { color: 'white', paddingVertical: 5, paddingHorizontal:10, borderRadius: 25, fontSize: 16, fontWeight:'bold', marginLeft: 10 },
  noTelp: { color: 'black', paddingHorizontal: 15, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#8d8d8d' },
  fasilitas_text: { color: 'black', fontWeight: 'bold', textAlign: 'center' },
  fasilitas_icon: { backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 15, padding: 15, alignItems: 'center' },
  plusmin: { color: '#9d9d9d', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  btn_plusmin: { borderWidth: 0.1, borderRadius: 50, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  pesan: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  btn_pesan: { marginVertical: 15, marginBottom: 20, borderRadius: 10, paddingHorizontal: 30, width: '60%', marginHorizontal: '20%', paddingVertical: 10 },
})

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IdKlm: this.props.route.params.IdKlm,
      email: '',
      dataKolam: [],
      dataFavorit: '',
      qty: 1,
    }
  }

  dataKolam() {
    fetch('http://192.168.43.137:8000/detail/' + this.state.IdKlm)
      .then(response => response.json())
      .then(res => {
        this.setState({
          dataKolam: res
        })
      }).catch(error => {
        console.log(error);
      })
  }

  dataFavorit() {
    fetch('http://192.168.43.137:8000/favoritdetail/' + this.state.email + '/' + this.state.IdKlm)
      .then(response => response.json())
      .then(res => {
        this.setState({
          dataFavorit: res
        })
      }).catch(error => {
        console.log(error);
      })
  }

  tambahFav() {
    fetch('http://192.168.43.137:8000/favorit/post',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EmailCstmr: this.state.email,
          IdKlm: this.state.IdKlm
        })
      }
    ).then((response => response.json()))
      .then(res => {
        this.dataFavorit()
      })
  }

  hapusFav() {
    fetch(
      'http://192.168.43.137:8000/favorit/delete/' + this.state.IdKlm + '/' + this.state.email,
      {
        method: 'DELETE'
      }
    ).then((response => response.json()))
      .then(res => {
        this.dataFavorit()
      })
  }

  tambahTiket() {
    let tiket = Number(this.state.qty)
    if (tiket >= 1 && tiket < 15) {
      tiket += 1
      this.setState({ qty: tiket })
    }
  }

  kurangTiket() {
    let tiket = Number(this.state.qty)
    if (tiket > 1) {
      tiket -= 1
      this.setState({ qty: tiket })
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('session_id', (error, res) => {
      if (res) { this.setState({ email: JSON.parse(res) }) }
    })
    setTimeout(() => {
      this.dataKolam()
      this.dataFavorit()
    }, 1);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}><Ionicon name='chevron-back' size={30} color='black' /></TouchableOpacity>
          <Text style={{ flex: 2, color: '#0376fa', fontSize: 28, fontWeight: 'bold' }}>Izipizi Pool</Text>
        </View>
        {this.state.dataKolam.map((item, index) => (
          <View key={index} style={{ minHeight: Dimensions.get('window').height - 75, marginTop: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Carousel showBubbles={true} showScroll={false} color='#0376fa' height={200} width={350}>
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar1 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar2 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar3 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar4 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
              </Carousel>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
              <View style={{}}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>{item.Nama}</Text>
                  {item.Status == 1 ? <Text style={[{ backgroundColor: 'green' }, styles.status]}>Buka</Text> : <Text style={[{ backgroundColor: 'red' }, styles.status]}>Tutup</Text>}
                </View>
                <Text style={{ color: '#8b8b8b', fontSize: 18 }}><Ionicon name='location' size={18} color='#8b8b8bde' /> {item.Alamat}, {item.Kota}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingRight: 10, color: 'black' }}><Ionicon name='star' size={18} color='orange' /> 4</Text>
                  <Text style={styles.noTelp}><Foundation name='telephone' color='black' size={18} /> {item.NoTelp}</Text>
                  {item.tiket == null ? <Text style={{ color: 'black', paddingHorizontal: 10 }}>0 Tiket Terjual</Text> : <Text style={{ color: 'black', paddingHorizontal: 10 }}>{item.tiket} Tiket Terjual</Text>}
                </View>
              </View>
              {this.state.dataFavorit == '' ?
                <TouchableOpacity onPress={() => this.tambahFav()} style={{ justifyContent: 'center' }}><Ionicon name='heart-outline' color='black' size={40} /></TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.hapusFav()} style={{ justifyContent: 'center' }}><Ionicon name='heart' color='red' size={40} /></TouchableOpacity>
              }
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 30, flexDirection: 'row', justifyContent: 'space-around' }}>
              <View>
                <View style={styles.fasilitas_icon}><FontAwesome name='coffee' color='black' size={30} /></View>
                <Text style={styles.fasilitas_text}>Coffee Shop</Text>
              </View>
              <View>
                <View style={styles.fasilitas_icon}><MaterialIcons name='local-restaurant' color='black' size={30} /></View>
                <Text style={styles.fasilitas_text}>Restaurant</Text>
              </View>
              <View>
                <View style={styles.fasilitas_icon}><FontAwesome name='wifi' color='black' size={30} /></View>
                <Text style={styles.fasilitas_text}>Free Wifi</Text>
              </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 19, textAlign: 'justify' }}>{item.Nama} merupakan satu fasilitas olahraga yang terkenal. baik di kalangan pelajar maupun masyarakat sekitar {item.Kota}. Kolam berenang ini menyajikan kenyamanan dan berbagai fasilitas pendukung lainnya yang siap memanjakan mu.</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 0, width: Dimensions.get('window').width }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, }}>
                <View style={{}}><Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}>{"Rp" + Number(item.Harga).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}/tiket</Text></View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.kurangTiket()} style={styles.btn_plusmin}><Text style={styles.plusmin}>-</Text></TouchableOpacity>
                  <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10 }}>{this.state.qty}</Text>
                  <TouchableOpacity onPress={() => this.tambahTiket()} style={styles.btn_plusmin}><Text style={styles.plusmin}>+</Text></TouchableOpacity>
                </View>
              </View>
              {item.Status == 1 ? <TouchableOpacity onPress={()=>this.props.navigation.navigate('Pembayaran', {IdKlm : this.state.IdKlm, Qty:this.state.qty})} style={[{ backgroundColor: '#0376fa' }, styles.btn_pesan]}><Text style={styles.pesan}>Pesan</Text></TouchableOpacity> : <TouchableOpacity disabled={true} style={[{ backgroundColor: 'rgba(0,0,0,0.3)', }, styles.btn_pesan]}><Text style={styles.pesan}>Pesan</Text></TouchableOpacity>}
            </View>
          </View>
        ))}
      </View>
    )
  }
}
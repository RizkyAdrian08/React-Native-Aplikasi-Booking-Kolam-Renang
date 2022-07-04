import { Text, View, ScrollView, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';

var waktu = moment().format('DD MMM YYYY')
const styles = StyleSheet.create({
  card: { borderRadius: 30, borderWidth: 3, borderColor: '#f3f5f6', marginVertical: 10, flexDirection: 'column', justifyContent: 'flex-start' },
  gambar: { width: '100%', height: 200, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  text: { color: 'black' }

})

export default class Riwayat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      data: []
    }
  }

  dataRiwayatPemesanan() {
    fetch('http://192.168.43.137:8000/riwayat/' + this.state.email)
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
      this.dataRiwayatPemesanan()
    }, 1);
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ minHeight: Dimensions.get('window').height, backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}><Ionicon name='chevron-back' size={30} color='black' /></TouchableOpacity>
            <Text style={{ flex: 3, color: '#0376fa', fontSize: 28, fontWeight: 'bold' }}>Riwayat Pemesanan</Text>
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            {this.state.data.map((item, index) => (
              <View style={styles.card} key={index}>
                <View>
                  <Image source={{ uri: 'http:192.168.43.137:8000/gambar/' + item.Gambar1 }} resizeMode='cover' style={styles.gambar} />
                  <View style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.5)', borderTopLeftRadius:30, borderTopRightRadius:30, justifyContent:'center', alignItems:'center' }}>
                    <Text style={{ fontSize: 20,color:'white', fontWeight: 'bold', textAlign: 'center' }}>{item.Nama}</Text>
                    <Text style={{ color: '#e0e0e0', fontSize: 16, textAlign: 'center' }}><Ionicon name='location' size={18} color='#e0e0e0' /> {item.Alamat}, {item.Kota}</Text>
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'rgba(0,0,0,0.15)', paddingVertical: 3, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                      <Text style={[styles.text, {fontWeight:'bold'}]}>Id Pemesanan: {item.IdOrd}</Text>
                      {/* {item.MasaBerlaku >= waktu ? <Text style={{ color: 'green', fontWeight: 'bold' }}>(Tiket Tersedia)</Text> : <Text style={{ color: 'red', fontWeight: 'bold' }}>(Tiket Kadaluarsa)</Text>} */}
                    </View>
                    <Text style={[styles.text, {fontWeight:'bold'}]}>{item.MasaBerlaku}</Text>
                  </View>
                  <View style={{ marginBottom: 10, marginHorizontal: 10, alignItems:'center' }}>
                    <Text style={[styles.text, { fontSize: 16 }]}>Harga : {"Rp" + Number(item.Harga).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x {item.Qty}</Text>
                    <Text style={{ fontSize: 16, color: '#0376fa', fontWeight: 'bold' }}>Total : {"Rp" + Number(item.Total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ({item.Pembayaran})</Text>
                    <Text style={{ fontSize: 16, marginTop:15, color:'#929292'}}>Tanggal Pembelian : {item.TanggalPsn}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  }
}
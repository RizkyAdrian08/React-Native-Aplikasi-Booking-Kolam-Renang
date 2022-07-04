import { Text, View, PermissionsAndroid, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl, FlatList } from 'react-native'
import { Searchbar, Card } from 'react-native-paper'
import React, { Component } from 'react'
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';

var waktu = moment().format('DD MMM YYYY')
const styles = StyleSheet.create({
  gambar: { width: 50, height: 50, borderRadius: 100 },
  daerah: { color: '#373738', fontSize: 16 },
  pembuka: { color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 25 },
  search: { borderRadius: 10, elevation: 5, marginTop: 10, color: 'black', backgroundColor: '#f5f3f6' },
  judul: { color: 'black', fontSize: 25, letterSpacing: 1.5, fontWeight: 'bold' },
  btn_lihatsemua: { color: 'black', fontSize: 15, color: '#373738' },
  card: { width: 250, height: 300, marginLeft: 20, borderRadius: 30, marginBottom: 20 },
  card_gambar: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  status: { color: 'white', position: 'absolute', right: 0, paddingVertical: 10, paddingHorizontal: 20, fontWeight: 'bold', borderTopRightRadius: 30, borderBottomLeftRadius: 30 },
  riwayat: { color: 'white', backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', right: 0, paddingVertical: 10, paddingHorizontal: 20, fontWeight: 'bold', borderTopLeftRadius: 30, borderTopRightRadius: 30, width: '100%', textAlign: 'center' }
})

export default class Beranda extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      ketTempat: '',
      dataKolam: [],
      dataRiwayatPemesanan: [],
      dataPelanggan: [],
      search: '',
      refreshing: false
    }
  }

  reverseGeolocation(lon, lat) {
    var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon + '&zoom=18&addressdetails=1';

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          ketTempat: responseJson.address.city + ', ' + responseJson.address.state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  resquestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ijinkan IzipiziPool mengambil lokasi Anda?',
          message: 'Ijinkan mengambil data lokasih untuk kebutuhan lanjutan.',
          buttonNeutral: 'Nanti',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Akses lokasi diijinkan')
        Geolocation.getCurrentPosition((pos) => {
          const currentLongitude = JSON.stringify(pos.coords.longitude);
          const currentLatitude = JSON.stringify(pos.coords.latitude);
          this.reverseGeolocation(currentLongitude, currentLatitude);
        }, (e) => {
          console.log(e.code, e.message)
        }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 })
      }
      else {
        console.log('akses lokasi ditolak');
      }
    } catch (error) {
      console.warn(error)
    }
  }

  dataKolam() {
    fetch('http://192.168.43.137:8000/kolam')
      .then(response => response.json())
      .then(res => {
        this.setState({
          dataKolam: res
        })
      }).catch(error => {
        console.log(error);
      })
  }

  dataRiwayatPemesanan() {
    fetch('http://192.168.43.137:8000/riwayat/' + this.state.email)
      .then(response => response.json())
      .then(res => {
        this.setState({
          dataRiwayatPemesanan: res
        })
      }).catch(error => {
        console.log(error);
      })
  }

  dataPelanggan() {
    fetch('http://192.168.43.137:8000/customer/get/' + this.state.email)
      .then(response => response.json())
      .then(res => {
        this.setState({
          dataPelanggan: res
        })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    AsyncStorage.getItem('session_id', (error, res) => {
      if (res) { this.setState({ email: JSON.parse(res) }) }
    })
    this.resquestLocationPermission()
    setTimeout(() => {
      this.dataKolam()
      this.dataRiwayatPemesanan()
      this.dataPelanggan()
    }, 1);
  }

  refreshPage() {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.dataKolam()
      this.dataRiwayatPemesanan()
      this.dataPelanggan()
      this.setState({ refreshing: false })
    }, 2000);
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl colors={['#0376fa']} refreshing={this.state.refreshing} onRefresh={() => this.refreshPage()} />}>
        <View style={{ backgroundColor: 'white', }}>
          <View style={{ paddingHorizontal: 20, paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Akun')}><Image source={{ uri: this.state.dataPelanggan.Profile }} resizeMode='cover' style={styles.gambar} /></TouchableOpacity>
            {this.state.ketTempat == '' ? <Text style={styles.daerah}>Mencari lokasi terkini...</Text> : <Text style={styles.daerah}>{this.state.ketTempat}</Text>}
            <TouchableOpacity><Ionicon name='notifications-outline' size={30} color={'black'} /></TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20, flexDirection: 'column', marginVertical: 20 }}>
            <Text style={styles.pembuka}>Selamat Datang,</Text><Text style={styles.pembuka}>{this.state.dataPelanggan.Nama}</Text>
            <Searchbar onPressIn={() => this.props.navigation.navigate('Pencarian')} style={styles.search} placeholder="Temukan kolam favorit mu" onChangeText={(value) => this.setState({ search: value })} value={this.state.search} />
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.judul}>Pilihan Kolam</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Pencarian')}><Text style={styles.btn_lihatsemua}>Lihat semua</Text></TouchableOpacity>
          </View>
          <FlatList horizontal keyExtractor={(item, index) => index.toString()} data={this.state.dataKolam} renderItem={({ item, index }) => (
            <Card onPress={() => this.props.navigation.navigate('Detail', { IdKlm: item.IdKlm })} key={index} style={styles.card} elevation={4} >
              <Card.Cover source={{ uri: 'http:192.168.43.137:8000/gambar/' + item.Gambar1 }} style={styles.card_gambar} />
              <Card.Content>
                <Text style={{ color: '#969696', fontSize: 18, marginTop: 5 }}><Ionicon name='location' size={18} color='#969696' /> {item.Kota}</Text>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22 }}>{item.Nama}</Text>
                <Text style={{ color: '#0376fa', marginTop: 15, fontSize: 22, fontWeight: 'bold', textAlign: 'right' }}>{"Rp" + Number(item.Harga).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{ fontSize: 16 }}>/orang</Text></Text>
              </Card.Content>
              {item.Status == 1 ? <Text style={[styles.status, { backgroundColor: 'green' }]}>BUKA</Text> : <Text style={[styles.status, { backgroundColor: 'red' }]}>TUTUP</Text>}
            </Card>
          )} />
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.judul}>Riwayat Pemesanan</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Riwayat')}><Text style={styles.btn_lihatsemua}>Lihat semua</Text></TouchableOpacity>
          </View>
          <FlatList horizontal keyExtractor={(item, index) => index.toString()} data={this.state.dataRiwayatPemesanan} renderItem={({ item, index }) => (
            <Card onPress={() => this.props.navigation.navigate('Detail', { IdKlm: item.IdKlm })} key={index} style={styles.card} elevation={4} >
              <Card.Cover source={{ uri: 'http:192.168.43.137:8000/gambar/' + item.Gambar1 }} style={styles.card_gambar} />
              <Card.Content>
                <Text style={{ color: '#969696', fontSize: 18, marginTop: 5 }}><Ionicon name='location' size={18} color='#969696' /> {item.Kota}</Text>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22 }}>{item.Nama}</Text>
              </Card.Content>
              {item.MasaBerlaku >= waktu ? <Text style={styles.riwayat}>{item.MasaBerlaku} (Tiket Tersedia)</Text> : <Text style={styles.riwayat}>{item.MasaBerlaku} (Tiket Kadaluarsa)</Text>}
            </Card>
          )} />

        </View>
      </ScrollView>
    )
  }
}
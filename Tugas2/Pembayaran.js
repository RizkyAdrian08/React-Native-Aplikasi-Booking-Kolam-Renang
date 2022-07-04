import { Dimensions, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { Component } from 'react'
import Loading from './Pendukung/Loading'
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Carousel from 'simple-carousel-react-native'
import moment from 'moment';
import uuid from 'react-native-uuid'

const id = uuid.v4().toString().replace("-", "").substring(0, 7);
const tgl_psn = moment().format('YYYY-MM-DD hh:mm:ss')

export default class Pembayaran extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IdKlm: this.props.route.params.IdKlm,
      Qty: this.props.route.params.Qty,
      IdOrd: id,
      TanggalPsn: tgl_psn,
      MasaBerlaku: new Date(Date.now()),
      Total: 0,
      email: '',
      dataKolam: [],
      dataPengguna: [],
      Pembayaran: '',
      modal: false, loading: false
    }
  }

  dataKolam() {
    fetch('http://192.168.43.137:8000/detail/' + this.state.IdKlm)
      .then(response => response.json())
      .then(res => {
        this.setState({
          dataKolam: res,
          Total: res[0].Harga * this.state.Qty
        })
      }).catch(error => {
        console.log(error);
      })
  }

  dataPengguna() {
    fetch('http://192.168.43.137:8000/customer/get/' + this.state.email)
      .then(response => response.json())
      .then(res => {
        this.setState({
          dataPengguna: res
        })
      }).catch(error => {
        console.log(error);
      })
  }

  TambahData() {
    let tgl_psn = moment().format('YYYY-MM-DD hh:mm:ss');
    this.setState({ TanggalPsn: tgl_psn, })
    if (this.state.Pembayaran != '') {
      this.setState({ loading: true })
      setTimeout(() => {
        fetch(
          'http://192.168.43.137:8000/pemesanan/post',
          {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              IdOrd: this.state.IdOrd,
              IdKlm: this.state.IdKlm,
              TanggalPsn: this.state.TanggalPsn,
              MasaBerlaku: moment(this.state.MasaBerlaku).format('YYYY-MM-DD'),
              EmailCstmr: this.state.dataPengguna.EmailCstmr,
              Qty: this.state.Qty,
              Pembayaran: this.state.Pembayaran,
              Total: this.state.Total
            })
          }
        ).then((response => response.json()))
          .then(res => {
            Alert.alert("Berhasil", "Pemensanan berhasil dilakukan!")
            this.props.navigation.push('Beranda')
            this.setState({ loading: false })
          })
      }, 3000);
    } else {
      Alert.alert("Info", "Pastikan semua data telah terisi!")
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('session_id', (error, res) => {
      if (res) { this.setState({ email: JSON.parse(res) }) }
    })
    setTimeout(() => {
      this.dataKolam()
      this.dataPengguna()
    }, 1);
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loading visible={this.state.loading} />
        <View style={{ minHeight: Dimensions.get('window').height, backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}><Ionicon name='chevron-back' size={30} color='black' /></TouchableOpacity>
            <Text style={{ flex: 2.5, color: '#0376fa', fontSize: 28, fontWeight: 'bold' }}>Pembayaran</Text>
          </View>
          {this.state.dataKolam.map((item, index) => (
            <View key={index} style={{ alignItems: 'center', marginVertical: 20 }}>
              <Carousel showBubbles={true} showScroll={false} color='#0376fa' height={200} width={350}>
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar1 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar2 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar3 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
                <Image source={{ uri: 'http://192.168.43.137:8000/gambar/' + item.Gambar4 }} resizeMode='cover' style={{ width: 350, height: 190, borderRadius: 30 }} />
              </Carousel>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, textAlign: 'center', marginTop: 10 }}>{item.Nama}</Text>
            </View>
          ))}
          <View style={{ backgroundColor: 'rgba(22, 156, 2,0.1)', borderColor: 'green', borderWidth: 2, margin: 20, padding: 20, borderRadius: 20 }}>
            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', fontFamily: 'Poppins-SemiBold', marginBottom: 10 }}>Data Pemesan</Text>
            <Text style={{ color: 'black', fontSize: 18 }}>Nama : {this.state.dataPengguna.Nama}</Text>
            <Text style={{ color: 'black', fontSize: 18 }}>E-mail : {this.state.dataPengguna.EmailCstmr}</Text>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 10, borderRadius: 20 }}>
            <TouchableOpacity onPress={() => this.setState({ modal: true })} style={{ borderWidth: 2, borderRadius: 20, padding: 10, flexDirection: 'column' }}>
              <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Pilih Tanggal Berenang</Text>
              <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>{moment(this.state.MasaBerlaku).format('DD MMM YYYY')}</Text>
            </TouchableOpacity>
            <DatePicker title='Pilih Tanggal Berenang' mode='date'
              modal
              open={this.state.modal}
              date={this.state.MasaBerlaku}
              minimumDate={new Date()}
              onConfirm={(value) => this.setState({ modal: false, MasaBerlaku: value })}
              onCancel={() => this.setState({ modal: false })}
            />
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Metode Pembayaran</Text>
            <RadioButton.Group onValueChange={(value) => this.setState({ Pembayaran: value })} value={this.state.Pembayaran}>
              <RadioButton.Item color="#0376fa" label="Gopay" value="Gopay" />
              <RadioButton.Item color="#0376fa" label="OVO" value="OVO" />
              <RadioButton.Item color="#0376fa" label="DANA" value="DANA" />
              <RadioButton.Item color="#0376fa" label="Transafer Bank" value="Transafer Bank" />
            </RadioButton.Group>
          </View>
          {this.state.dataKolam.map((item, index) => (
            <View key={index} style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{"Rp" + Number(item.Harga).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x {this.state.Qty} tiket = </Text>
              <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>{"Rp" + Number(this.state.Total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={() => this.TambahData()} style={{ marginHorizontal: 20, marginVertical: 10, backgroundColor: '#0376fa', borderRadius: 20 }}><Text style={{ textAlign: 'center', fontSize: 22, padding: 10, fontWeight: 'bold', color: 'white' }}>Konfirmasi Pemesanan</Text></TouchableOpacity>
        </View >
      </ScrollView>
    )
  }
}
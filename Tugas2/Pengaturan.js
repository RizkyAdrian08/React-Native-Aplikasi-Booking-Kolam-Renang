import { Text, View, Dimensions, TouchableOpacity, Modal, TextInput, Image, StyleSheet, Alert } from 'react-native'
import React, { Component } from 'react'
import Loading from './Pendukung/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageCropPicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'

const styles = StyleSheet.create({
  gambar: { width: '30%', height: 128, borderRadius: 100, marginHorizontal: '35%' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'rgba(0,0,0,0.5)' },
  modalView: { backgroundColor: 'white', borderRadius: 20, alignItems: 'center', width:'40%', marginHorizontal: '30%' },
  btn_inModal: { paddingVertical: 10, color: 'black', fontSize: 20, textAlign: 'center' },
  text: { flex: 1, color: 'black', fontSize: 18, fontWeight: 'bold', padding: 10 },
  input: { flex: 3, color: 'black', fontSize: 18, fontWeight: 'bold', borderRadius: 20, borderWidth: 1, paddingHorizontal: 10, borderColor: '#9d9d9d' }
})

export default class Pengaturan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      gambar: '',
      nama: '',
      password: '',
      profile: '',
      data: [],
      modal: true, loading: false
    }
  }

  dataPengguna() {
    fetch('http://192.168.43.137:8000/customer/get/' + this.state.email)
      .then(response => response.json())
      .then(res => {
        this.setState({
          profile: res.Profile,
          nama: res.Nama,
          password: res.Password
        })
      }).catch(error => {
        console.log(error);
      })
  }

  takePhotofromCamera() {
    ImageCropPicker.openCamera({
      width: 300, height: 300
    }).then(image => {
      console.log(image.path)
      this.setState({ gambar: image.path })
      this.uploadToFirebase();
    })
  }

  takePhotofromGalery() {
    ImageCropPicker.openPicker({
      width: 300, height: 300, cropping: false, mediaType: 'photo', cropperToolbarTitle: 'Crop Photo', cropperToolbarWidgetColor: 'blue'
    }).then(image => {
      console.log(image.path);
      this.setState({ gambar: image.path })
      this.uploadToFirebase();
    })
  }

  ubahGambar() {
    this.setState({ modal: true })
  }

  UbahData() {
    this.setState({ loading: true, })
    setTimeout(() => {
      fetch('http://192.168.43.137:8000/customer/put/' + this.state.email,
        {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Nama: this.state.nama,
            Password: this.state.password,
          })
        }
      ).then((response => response.json()))
        .then(res => {
          this.dataPengguna()
          Alert.alert("Berhasil", "Data dengan Email " + this.state.email + " berhasil di ubah!")
          this.setState({ loading: false, })
        })
    }, 2000);
  }

  uploadToFirebase() {
    const fileName = Date.now()
    this.setState({ loading: true })
    setTimeout(() => {
      storage().ref('/Gambar/' + fileName).putFile(this.state.gambar)
        .then(() => {
          console.log('Terupload')
          storage().ref('Gambar/' + fileName).getDownloadURL()
            .then(url => {
              fetch('http://192.168.43.137:8000/customer/profile/put/' + this.state.email,
                {
                  method: 'PUT',
                  headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    Gambar: url
                  })
                }
              ).then((response => response.json()))
                .then(res => {
                  this.dataPengguna()
                  Alert.alert("Berhasil", "Gambar Profile dengan Email " + this.state.email + " berhasil di ubah!")
                  this.setState({ loading: false, })
                })
            })
        }).catch(e => console.log(e))
    }, 3000);
  }

  componentDidMount() {
    AsyncStorage.getItem('session_id', (error, res) => {
      if (res) { this.setState({ email: JSON.parse(res) }) }
    })
    setTimeout(() => {
      this.dataPengguna()
    }, 1);
  }

  render() {
    return (
      <View style={{ minHeight: Dimensions.get('window').height, backgroundColor: 'white' }}>
        <Loading visible={this.state.loading} />
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}><Ionicons name='chevron-back' size={30} color='black' /></TouchableOpacity>
          <Text style={{ flex: 2, color: '#0376fa', fontSize: 28, fontWeight: 'bold' }}>Edit Pofile</Text>
        </View>
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          {this.state.profile != '' ? <Image source={{ uri: this.state.profile }} resizeMode='cover' style={styles.gambar} /> : null}
          <TouchableOpacity onPress={() => this.ubahGambar()} style={{ width: '30%', marginHorizontal: '35%', marginTop: 5 }}><Text style={{ color: '#0376fa', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Ubah Gambar</Text></TouchableOpacity>
        </View>

        <Modal visible={this.state.modal} animationType="fade" transparent={true} onDismiss={() => { this.setState({ modal: false }) }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.takePhotofromCamera(), this.setState({ modal: false }) }} ><Text style={styles.btn_inModal}>Kamera</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.takePhotofromGalery(), this.setState({ modal: false }) }} ><Text style={styles.btn_inModal}>Galeri</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.setState({ modal: false }) }} ><Text style={[styles.btn_inModal,{color:'red', marginTop:20}]}>Batal</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={styles.text}>Nama</Text>
            <TextInput value={this.state.nama} onChangeText={(value) => this.setState({ nama: value })} style={styles.input} />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={styles.text}>Email</Text>
            <TextInput value={this.state.email} style={[styles.input, { backgroundColor: 'rgba(0,0,0,0.1)' }]} editable={false} />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={styles.text}>Password</Text>
            <TextInput value={this.state.password} maxLength={8} onChangeText={(value) => this.setState({ password: value })} style={styles.input} />
          </View>
        </View>
        <TouchableOpacity onPress={() => this.UbahData()} style={{ backgroundColor: '#0376fa', width: '30%', marginHorizontal: '35%', alignItems: 'center', borderRadius: 20, marginTop: 30 }}>
          <Text style={{ color: 'white', paddingVertical: 10, fontSize: 20, fontWeight: 'bold' }}>Simpan</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
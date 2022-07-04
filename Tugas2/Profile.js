import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import Loading from './Pendukung/Loading'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    gambar: { width: '30%', height: 128, borderColor: 'white', borderWidth: 5, borderRadius: 100, position: 'absolute', top: -60, marginHorizontal: '35%' },
    judul: { color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 20, textAlign: 'center' },
    isi: { color: 'black', fontFamily: 'Poppins-Reguler', fontSize: 16, textAlign: 'center' },
    menu: { flexDirection: 'row', marginVertical: 15 },
    menu_text: { color: 'black', marginLeft: 10, fontSize: 20, fontWeight: 'bold' }
})

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            email: "",
            data: []
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('session_id', (error, res) => {
            if (res) { this.setState({ email: JSON.parse(res) }) }
        })
        setTimeout(() => {
            fetch('http://192.168.43.137:8000/customer/get/' + this.state.email)
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        data: res
                    })
                }).catch(error => {
                    console.log(error);
                })
        }, 1);
    }

    logOut(){
        this.setState({ loading: true })
        setTimeout(async() => {
            await AsyncStorage.clear()
            this.setState({ loading: false })
            this.props.navigation.navigate('Login')
        }, 2000)
    }

    render() {
        return (
            <View style={{ backgroundColor: '#0376fa', flex: 1}}>
                <Loading visible={this.state.loading} />
                <StatusBar backgroundColor={'#0376fa'} barStyle="dark-content" />
                <View style={{ backgroundColor: '#0376fa', width: '100%', height: 150 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Poppins-SemiBold', color: 'white', marginTop: 10 }}>Akun</Text>
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 30, paddingBottom: 20, elevation: 5, marginHorizontal:10 }}>
                    <Image source={{ uri: this.state.data.Profile }} resizeMode='cover' style={styles.gambar} />
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Pengaturan')} style={{ marginTop: 75, width: '30%', marginHorizontal: '35%' }}>
                        <Text style={{ color: '#0376fa', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Edit Profile <Entypo name='edit' size={20} color='#0376fa' /></Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginHorizontal:5 }}>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <Text style={styles.judul}>Nama</Text>
                            <Text style={styles.isi}>{this.state.data.Nama}</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <Text style={styles.judul}>Email</Text>
                            <Text style={styles.isi}>{this.state.data.EmailCstmr}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 30, marginHorizontal: 20, borderTopColor: 'rgba(0,0,0,0.2)', borderTopWidth: 1 }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Riwayat')} style={styles.menu}>
                            <FontAwesome5 name='history' color={'black'} size={30} />
                            <Text style={styles.menu_text}>Riwayat Pemesanan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Favorit')} style={styles.menu}>
                            <FontAwesome name='heart-o' color={'black'} size={30} />
                            <Text style={styles.menu_text}>Kolam Favorit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Tentang')} style={styles.menu}>
                            <FontAwesome5 name='swimming-pool' color={'black'} size={30} />
                            <Text style={styles.menu_text}>Tentang IzipiziPool</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Kebijakan_Privasi')} style={styles.menu}>
                            <FontAwesome name='newspaper-o' color={'black'} size={30} />
                            <Text style={styles.menu_text}>Kebijakan &amp; Privasi</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert("Info", "Kamu yakin ingin keluar dari aplikasi?", [{ text: 'Batal', style: 'cancel' }, { text: 'Yakin', onPress: () => this.logOut() }], { cancelable: false })} style={{ width: '40%', marginHorizontal: '30%', borderRadius: 20, marginVertical: 30, borderColor: '#0376fa', borderWidth: 2, padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 26, color: '#0376fa', textAlign: 'center' }}>KELUAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
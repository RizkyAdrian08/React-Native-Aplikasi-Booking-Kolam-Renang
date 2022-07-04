import { Text, Image, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Loading from './Pendukung/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', flex: 1 },
    view_input: { marginHorizontal: 30, marginVertical: 15 },
    input_label: { fontSize: 16, fontWeight: 'bold', paddingHorizontal: 20, letterSpacing: 2 },
    input: { borderWidth: 1, backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 20, fontSize: 16, fontFamily: "Poppins-SemiBold" }

})

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color_email: '#979797',
            color_pass: '#979797',
            loading: false,
            email:'', password:'',
            data: []
        }
    }

    componentDidMount() {
        fetch('http://192.168.43.137:8000/customer/get')
            .then(response => response.json())
            .then(res => {
                this.setState({
                    data: res
                })
            }).catch(error => {
                console.log(error);
            })
    }

    cekdata() {
        if (this.state.email == "" || this.state.password == "") {
            alert("Semua data harus terisi")
        }
        else {
            var email_temp = ""
            var pass_temp = ""
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.email == this.state.data[i].EmailCstmr) {
                    email_temp = this.state.data[i].EmailCstmr
                    pass_temp = this.state.data[i].Password
                }
            }
            if ( this.state.email == email_temp && this.state.password == pass_temp) {
                this.setState({ loading: true })
                setTimeout(() => {
                    AsyncStorage.setItem('session_id', JSON.stringify(this.state.email))
                    this.props.navigation.push('Beranda')
                    this.setState({ loading: false, email:'', password:'' })
                }, 2000);
            }
            else {
                this.setState({ loading: true })
                setTimeout(() => {
                    alert("Kombinasi Email dan Password salah!")
                    this.setState({ email: '', password: '', loading: false })
                }, 500);
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Loading visible={this.state.loading} />
                <View style={{ marginBottom: 90 }}>
                    <Image source={require('./Gambar/vector.jpg')} style={{ width: '90%', height: 200 }} resizeMode='stretch' />
                    <View style={{ position: 'absolute', height: '100%', width: 300, marginLeft: '5%', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: 'Poppins-Reguler', fontSize: 30, }}>Selamat datang,</Text>
                        <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 35, letterSpacing: 3 }}>Masuk!</Text>
                    </View>
                </View>
                <View style={styles.view_input}>
                    <Text style={[styles.input_label, { color: this.state.color_email }]}>EMAIL</Text>
                    <TextInput keyboardType='email-address' autoCapitalize='none' value={this.state.email} onChangeText={(value) => this.setState({ email: value })} style={[styles.input, { borderColor: this.state.color_email, color: this.state.color_email }]} onFocus={() => this.setState({ color_email: '#0376fa' })} onBlur={() => this.setState({ color_email: '#979797' })} />
                </View>
                <View style={styles.view_input}>
                    <Text style={[styles.input_label, { color: this.state.color_pass }]}>PASSWORD</Text>
                    <TextInput maxLength={8} secureTextEntry={true} value={this.state.password} onChangeText={(value) => this.setState({ password: value })} style={[styles.input, { borderColor: this.state.color_pass, color: this.state.color_pass }]} onFocus={() => this.setState({ color_pass: '#0376fa' })} onBlur={() => this.setState({ color_pass: '#979797' })} />
                </View>
                <TouchableOpacity onPress={()=>this.cekdata()} style={{ backgroundColor: '#0376fa', padding: 8, width: '40%', marginHorizontal: '30%', borderRadius: 15, marginTop: 20, elevation: 5 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Masuk</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#686868', fontSize: 16, marginRight: 5 }}>Belum punya akun?</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Daftar')}><Text style={{ color: '#0376fa', fontSize: 16 }}>Daftar</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
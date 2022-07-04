import { Text, Image, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'
import React, { Component } from 'react'
import Loading from './Pendukung/Loading'

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
            color_name: '#979797',
            loading: false,
            nama: '', email: '', password: '',
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
            })
            .catch(error => {
                console.log(error);
            })
    }

    TambahData() {
        fetch('http://192.168.43.137:8000/daftar/post',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: this.state.email,
                    Password: this.state.password,
                    Nama: this.state.nama
                })
            }).then((response => response.json()))
            .then(res => {
                this.props.navigation.navigate('Login')
            }).catch(error => {
                console.log(error);
            })
    }

    cekdata() {
        if (this.state.email == "" || this.state.password == "" || this.state.nama == "") {
            Alert.alert("Info", "Semua data harus terisi")
        }
        else {
            var data_temp = ""
            for (var i = 0; i < this.state.data.length; i++) {
                if (this.state.email == this.state.data[i].EmailCstmr) {
                    data_temp = this.state.data[i].Email
                }
            }
            if (data_temp == "") {
                this.setState({ loading: true })
                setTimeout(() => {
                    Alert.alert("Berhasil", "Pengguna dengan email '" + this.state.email + "' berhasil ditambahkan")
                    this.TambahData()
                    this.setState({ loading: false })
                }, 2000);
            }
            else {
                this.setState({ loading: true })
                setTimeout(() => {
                    Alert.alert("Info", "Pengguna dengan email tersebut telah tersedia")
                    this.setState({ email: '', password: '', nama: '', loading: false })
                }, 500);
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Loading visible={this.state.loading} />
                <View>
                    <View style={{ marginBottom: 90 }}>
                        <Image source={require('./Gambar/vector.jpg')} style={{ width: '90%', height: 200 }} resizeMode='stretch' />
                        <View style={{ position: 'absolute', height: '100%', width: 300, marginLeft: '5%', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Reguler', fontSize: 30, }}>Hallo,</Text>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 35, letterSpacing: 3 }}>Daftar!</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.view_input}>
                            <Text style={[styles.input_label, { color: this.state.color_name }]}>NAMA PENGGUNA</Text>
                            <TextInput value={this.state.nama} onChangeText={(value) => this.setState({ nama: value })} style={[styles.input, { borderColor: this.state.color_name, color: this.state.color_name }]} onFocus={() => this.setState({ color_name: '#0376fa' })} onBlur={() => this.setState({ color_name: '#979797' })} />
                        </View>
                        <View style={styles.view_input}>
                            <Text style={[styles.input_label, { color: this.state.color_email }]}>EMAIL</Text>
                            <TextInput keyboardType='email-address' autoCapitalize='none' value={this.state.email} onChangeText={(value) => this.setState({ email: value })} style={[styles.input, { borderColor: this.state.color_email, color: this.state.color_email }]} onFocus={() => this.setState({ color_email: '#0376fa' })} onBlur={() => this.setState({ color_email: '#979797' })} />
                        </View>
                        <View style={styles.view_input}>
                            <Text style={[styles.input_label, { color: this.state.color_pass }]}>PASSWORD</Text>
                            <TextInput maxLength={8} secureTextEntry={true} value={this.state.password} onChangeText={(value) => this.setState({ password: value })} style={[styles.input, { borderColor: this.state.color_pass, color: this.state.color_pass }]} onFocus={() => this.setState({ color_pass: '#0376fa' })} onBlur={() => this.setState({ color_pass: '#979797' })} />
                        </View>
                        <TouchableOpacity onPress={() => this.cekdata()} style={{ backgroundColor: '#0376fa', padding: 8, width: '40%', marginHorizontal: '30%', borderRadius: 15, marginTop: 20, elevation: 5 }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Daftar</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={{ color: '#686868', fontSize: 16, marginRight: 5 }}>Sudah punya akun?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={{ color: '#0376fa', fontSize: 16 }}>Masuk</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}
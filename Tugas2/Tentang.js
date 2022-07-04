import { Text, View, StyleSheet, Linking } from 'react-native'
import React, { Component } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    container: { fontFamily: 'Poppins-Reguler', backgroundColor: 'white', flex: 1 },
    text: { color: 'black', textAlign: 'justify', fontSize: 20, padding: 10 },
    text2:{color: 'white', textAlign: 'center', fontSize: 16, paddingHorizontal:40},
})

export default class Tentang extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>    Kami adalah salah satu platform yang menyajikan booking kolam berenang di seluruh Indonesia sejak 2021, dengan tujuan untuk menghubungkan penyedia kolam berenang dengan para pelanggan secara online.</Text>
                <View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#0376fa', marginHorizontal:20, borderRadius:20, paddingVertical:10, elevation:10, marginVertical:30}}>
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style={styles.text2}>Sale</Text>
                        <FontAwesome name='ticket' size={26} color='white' />
                        <Text style={styles.text2}>1.000.000+</Text>
                    </View>
                    <View style={{flexDirection:'column', alignItems:'center', borderLeftWidth:1, borderRightWidth:1, borderColor:'white'}}>
                        <Text style={styles.text2}>Partner</Text>
                        <MCI name='handshake' size={26} color='white' />
                        <Text style={styles.text2}>100+</Text>
                    </View>
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style={styles.text2}>Cities</Text>
                        <MCI name='city-variant' size={26} color='white' />
                        <Text style={styles.text2}>50+</Text>
                    </View>
                </View>
                <Text style={{color: '#979797', textAlign: 'justify', fontSize: 25, padding: 10}}>Hubungi Kami</Text>
                <Text style={styles.text} onPress={()=>Linking.openURL('https://id-id.facebook.com/Jokowi')}><FontAwesome name='facebook-square' size={26} color='black'/> IzipiziPool Official</Text>
                <Text style={styles.text} onPress={()=>Linking.openURL('https://www.instagram.com/jokowi/')}><FontAwesome name='instagram' size={26} color='black'/> IzipiziPool_Official</Text>
                <Text style={styles.text} onPress={()=>Linking.openURL('https://twitter.com/jokowi')}><FontAwesome name='twitter-square' size={26} color='black'/> IzipiziPool_Official</Text>
                <Text style={styles.text} onPress={()=>Linking.openURL('mailto:192110975@students.mikroskil.ac.id')}><MCI name='email-outline' size={26} color='black'/> izipizipool@gmail.com</Text>
            </View>
        )
    }
}
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'

const styles = StyleSheet.create({
    container: { fontFamily: 'Poppins-Reguler', backgroundColor: 'white', flex: 1 },
    text: { color: 'black', textAlign: 'justify', fontSize: 20, padding: 10 },
    sub_text:{color: '#979797', textAlign: 'justify', fontSize: 25, padding: 10}
})

export default class Kebijakan_privasi extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}>  Izipizipool mengerti dan menyadari bahwa informasi yang Anda berikan kepada kami bersifat personal dan rahasia. Kami sangat menghargai kepercayaan yang Anda berikan dan kami akan menjaga informasi yang Anda berikan dengan hati-hati dan seksama.</Text>
                    <Text style={styles.text}>  Kebijakan Privasi ini (beserta syarat-syarat penggunaan dari situs IzipiziPool sebagaimana tercantum dalam Syarat dan Ketentuan dan informasi lain yang tercantum di Situs) menetapkan dasar atas perolehan, pengumpulan, pengolahan, penganalisisan, penampilan, pembukaan, penyimpanan, perubahan, penghapusan dan/atau segala bentuk pengelolaan yang terkait dengan data atau informasi yang mengidentifikasikan atau dapat digunakan untuk mengidentifikasi Pengguna yang Pengguna berikan kepada IzipiziPool atau yang IzipiziPool kumpulkan dari Pengguna maupun pihak ketiga (selanjutnya disebut sebagai "Data Pribadi").</Text>
                    <Text style={styles.sub_text}>Informasi yang Dikumpulkan</Text>
                    <Text style={styles.text}>    Kami mengumpulkan Data Pribadi mengenai Anda yang Anda berikan kepada kami saat menggunakan Aplikasi. Data Pribadi bisa termasuk nama, atau alamat e-mail Anda. Kami juga mengumpulkan informasi yang tak dapat diidentifikasi secara pribadi, yang mungkin tertaut pada Data Pribadi Anda, termasuk nama akun, alamat IP dan kode sandi Anda. Informasi yang kami dapat dari pengunjung sangat membantu kami dalam melakukan perubahan-perubahan untuk memperbaiki kualitas dan mutu pelayanan izipizipul.</Text>
                    <Text style={styles.sub_text}>Informasi yang Anda Berikan</Text>
                    <Text style={styles.text}>  Kami menerima dan menyimpan segala informasi yang Anda masukkan ke Aplikasi kami atau informasi yang Anda berikan dengan cara lain. Kami menggunakan informasi-informasi ini dengan tujuan untuk memberikan respon terhadap permintaan Anda, meningkatkan mutu layanan kami, dan untuk berkomunikasi dengan Anda.</Text>
                    <Text style={styles.sub_text}>Perlindungan Data Pribadi Anda</Text>
                    <Text style={styles.text}>  Untuk menghindari akses informasi tanpa otorisasi, kami memberlakukan berbagai prosedur fisik, elektronik dan organisasional yang wajar untuk melindungi Data Pribadi dari penghancuran yang melanggar hukum atau secara tak sengaja, atau kehilangan, pengubahan secara tak sengaja, atau penyingkapan maupun akses tanpa otorisasi.</Text>
                    <Text style={styles.sub_text}>kebijakan Cookies</Text>
                    <Text style={styles.text}>  Cookies adalah sebuah tanda identifikasi berukuran kecil, umumnya disimpan pada perangkat Pengguna, yang memampukan Aplikasi agar dapat mengenali Anda dan dapat memberikan fitur-fitur personalisasi bagi setiap pengguna dengan mengingat informasi mengenai kunjungan pengguna ke Aplikasi. Cookies dapat menyimpan berbagai informasi, termasuk alamat IP, data navigasi, informasi server, waktu transfer data, preferensi pengguna, serta alamat e-mail dan kode sandi yang digunakan untuk mengakses Aplikasi. Bila Anda tidak mengaktifkan cookies, Anda mungkin tidak akan dapat mengakses beberapa fungsi atau fitur penting pada Aplikasi ini sehingga hanya dapat menggunakan Aplikasi secara terbatas.</Text>
                </ScrollView>
            </View>
        )
    }
}
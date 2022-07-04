import { Dimensions, Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { Searchbar, Card } from 'react-native-paper'
import React, { Component } from 'react'
import Loading from './Pendukung/Loading'
import Ionicon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  search: { borderRadius: 10, elevation: 5, marginTop: 10, color: 'black', backgroundColor: '#f5f3f6', marginBottom: 50 },
  card: { height: 300, borderRadius: 30, marginBottom: 20 },
  card_gambar: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  status: { color: 'white', position: 'absolute', right: 0, paddingVertical: 10, paddingHorizontal: 20, fontWeight: 'bold', borderTopRightRadius: 30, borderBottomLeftRadius: 30 }
})

export default class Pencarian extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      loading: false,
      data: []
    }
    this.textInput = React.createRef()
  }

  componentDidMount() {
    fetch('http://192.168.43.137:8000/kolam')
      .then(response => response.json())
      .then(res => {
        this.setState({
          data: res
        })
        this.textInput.current.focus()
      }).catch(error => {
        console.log(error);
      })
  }

  search() {
    this.setState({ loading: true })
    setTimeout(() => {
      if (this.state.search == '') {
        this.componentDidMount()
      } else {
        fetch('http://192.168.43.137:8000/cari/' + this.state.search)
          .then(response => response.json())
          .then(res => {
            this.setState({
              data: res
            })
            console.log(this.state.data);
          })
          .catch(error => {
            console.log(error);
          })
      }
      this.setState({ loading: false })
    }, 2000);
  }

  render() {
    return (
      <SafeAreaView>
        <Loading visible={this.state.loading} />
        <View style={{ minHeight: Dimensions.get('window').height, backgroundColor: 'white', paddingHorizontal: 20 }}>
          <Text style={{ color: '#0376fa', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 20 }}>Pencarian</Text>
          <Searchbar ref={this.textInput} onIconPress={() => this.search()} style={styles.search} placeholder="Temukan kolam favorit mu" onChangeText={(value) => this.setState({ search: value })} value={this.state.search} />

          <ScrollView showsVerticalScrollIndicato={false}>
            <View style={{ marginBottom: 500 }}>
              {this.state.data.map((item, index) => (
                <Card key={index} onPress={() => this.props.navigation.navigate('Detail', { IdKlm: item.IdKlm })} style={styles.card} elevation={4} >
                  <Card.Cover source={{ uri: 'http:192.168.43.137:8000/gambar/' + item.Gambar1 }} resizeMode='stretch' style={styles.card_gambar} />
                  <Card.Content>
                    <Text style={{ color: '#969696', fontSize: 18, marginTop: 5 }}><Ionicon name='location' size={18} color='#969696' /> {item.Kota}</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22 }}>{item.Nama}</Text>
                    <Text style={{ color: '#0376fa', marginTop: 15, fontSize: 22, fontWeight: 'bold', textAlign: 'right' }}>{"Rp" + Number(item.Harga).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{ fontSize: 16 }}>/orang</Text></Text>
                  </Card.Content>
                  {item.Status == 1 ? <Text style={[styles.status, { backgroundColor: 'green' }]}>BUKA</Text> : <Text style={[styles.status, { backgroundColor: 'red' }]}>TUTUP</Text>}
                </Card>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
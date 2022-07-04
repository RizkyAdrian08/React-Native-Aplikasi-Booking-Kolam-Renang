import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Splash from './Pendukung/Splash'
import Home from './Beranda'
import Daftar from './Daftar'
import Login from './Login'
import Pencarian from './Pencarian'
import Akun from './Profile'
import Detail from './Detail'
import Pembayaran from './Pembayaran'
import Favorit from './Favorit'
import Riwayat from './Riwayat'
import Tentang from './Tentang'
import Pengaturan from './Pengaturan'
import Kebijakan_Privasi from './Kebijakan_privasi'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()

function Tabbar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconname;
                    if (route.name === 'Home') { iconname = 'home' }
                    else if (route.name === 'Pencarian') { iconname = 'search' }
                    else if (route.name === 'Akun') { iconname = focused ? 'user-circle' : 'user-circle-o' }

                    return <FontAwesome name={iconname} size={30} color={color} />
                },
                tabBarActiveTintColor: '#0376fa', tabBarInactiveTintColor: '#cfcfcf',
                tabBarLabelStyle: { fontSize: 16, paddingBottom: 3 },
                tabBarStyle: { height: 60, paddingVertical: 5 }
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Pencarian" component={Pencarian} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Akun" component={Akun} options={{
                headerShown: false
            }} />
        </Tab.Navigator>
    )
}

export default class BottomTab extends Component {
    render() {
        return (
            <NavigationContainer>
                <HomeStack.Navigator initialRouteName='Splash'>
                    <HomeStack.Screen name="Splash" component={Splash} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Beranda' component={Tabbar} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Daftar' component={Daftar} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Login' component={Login} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Pembayaran' component={Pembayaran} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Favorit' component={Favorit} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Riwayat' component={Riwayat} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Tentang' component={Tentang} options={{
                        title: "Tentang Kami",
                        headerTintColor: '#0376fa',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {fontSize: 30, fontFamily: 'Poppins-SemiBold'}
                    }} />
                    <HomeStack.Screen name='Kebijakan_Privasi' component={Kebijakan_Privasi} options={{
                        title: "Kebijakan & Privasi",
                        headerTintColor: '#0376fa',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {fontSize: 30, fontFamily: 'Poppins-SemiBold'}
                    }} />
                    <HomeStack.Screen name='Detail' component={Detail} options={{
                        headerShown: false
                    }} />
                    <HomeStack.Screen name='Pengaturan' component={Pengaturan} options={{
                        headerShown: false
                    }} />
                </HomeStack.Navigator>
            </NavigationContainer>
        )
    }
}
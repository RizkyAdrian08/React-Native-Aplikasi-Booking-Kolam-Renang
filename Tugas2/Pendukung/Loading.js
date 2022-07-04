import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({ visible = false }) => {
    return (
        visible && (
            <View style={{ position: 'absolute', zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', width: '100%', height: '100%' }}>
                <ActivityIndicator size={90} color='#0376fa' />
            </View>
        )
    )
}

export default Loading
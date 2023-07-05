import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
        </View>
    )
}
const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#ffffff',
        justifyContent: 'center',
    }
})

export default Loader
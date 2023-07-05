import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
const ERROR_IMAGE = "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-error-icon-image_1127796.jpg"
const ErrorScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: ERROR_IMAGE }} style={styles.errorImage} />
            <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    errorImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
    },
});

export default ErrorScreen;

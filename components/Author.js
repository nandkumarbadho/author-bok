import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Author = ({ author }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <View>
                <Text style={styles.title}>{author?.name}</Text>
                <Text style={styles.subTitle}>Age : {author?.Age}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.buttonContainer}

                    onPress={() => {
                        navigation.navigate('AuthorProfile', {
                            id: author?.id,
                        })
                    }

                    }
                >
                    <Text style={styles.buttonText}>Books</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        margin: 10,
    },
    subTitle: {
        fontSize: 15
    },
    title: {
        fontSize: 25,
        color: "#008080",
        fontWeight: "bold"
    },
    buttonContainer: {
        height: 40,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#00BFFF',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
    }
})
export default Author
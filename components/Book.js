import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Book = ({ book }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {
                navigation.navigate('BookProfile', {
                    id: book.id
                })
            }}
        >
            <View style={styles.sectionCard} key={book?.id}>
                <Image style={styles.sectionImage} source={{ uri: "https://cdn4.iconfinder.com/data/icons/bookstore-9/64/woman-girl-avatar-reading-student-education-book_store-512.png" }} />
                <View style={styles.sectionInfo}>
                    <Text style={styles.sectionLabel}>{book?.name}</Text>
                </View>
            </View>
        </ TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
    },
    sectionCard: {
        width: 100,
        minHeight: 80,
        backgroundColor: '#fff',
    },
    sectionImage: {
        width: '100%',
        aspectRatio: 1,
    },
    sectionInfo: {
        padding: 10,
    },
    sectionLabel: {
        fontSize: 12,
        marginBottom: 2,
    },
})
export default Book
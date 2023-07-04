import { View, Text, StyleSheet, Platform, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { GET_DETAILS_OF_BOOK } from '../schemas/query';
import { useQuery } from '@apollo/client';

const BookProfile = ({ route }) => {
    const navigation = useNavigation();
    const { id } = route.params;
    const { loading, error, data } = useQuery(GET_DETAILS_OF_BOOK(JSON.stringify(id)));

    if (loading) return <Text>Loading...</Text>;
    if (error) {
        console.log(error)
        return <Text>Error :</Text>;
    }
    console.log(data)
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://www.bootdey.com/image/900x400/00BFFF/000000' }}
                    style={styles.coverImage}
                />
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://cdn4.iconfinder.com/data/icons/bookstore-9/64/woman-girl-avatar-reading-student-education-book_store-512.png' }}
                        style={styles.avatar}
                    />
                    <Text style={[styles.name, styles.textWithShadow]}>{data["book_book"][0]["name"]}</Text>
                </View>
                <View>

                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => {
                                navigation.navigate('AuthorProfile', {
                                    id: data["book_book"][0]["author"]["id"]
                                })
                            }}
                        >
                            <Text style={styles.buttonText}>
                                Authored By :
                                {data["book_book"][0]["author"]["name"]}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>
                                Edit Book
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',

    },
    coverImage: {
        height: 200,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white'
    },
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonContainer: {
        height: 50,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#00BFFF',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    booksContainer: {
        paddingBottom: 20
    }
})
export default BookProfile
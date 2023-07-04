import { View, Text, StyleSheet, Platform, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { GET_DETAILS_OF_AUTHOR } from '../schemas/query';
import { useQuery } from '@apollo/client';
import Book from '../components/Book';

const AuthorProfile = ({ route }) => {
    const navigation = useNavigation();
    const { id } = route.params;
    console.log(id);
    // const { loading, error, data } = useQuery(GET_DETAILS_OF_AUTHOR(JSON.stringify(id)));
    const { loading, error, data } = useQuery(GET_DETAILS_OF_AUTHOR, {
        variables: {
            id: id
        }
    })

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
                        source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}
                        style={styles.avatar}
                    />
                    <Text style={[styles.name, styles.textWithShadow]}>{data["author_author"][0]["name"]}</Text>
                </View>
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>
                            Add Book
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View style={styles.booksContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data["author_author"][0]["books"]}
                        renderItem={({ item }) => (
                            <Book book={item} />
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                    />
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
        width: 200,
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
export default AuthorProfile
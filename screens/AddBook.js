import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { ADD_BOOK } from '../schemas/mutation';
import { useMutation } from '@apollo/client';
import Loader from '../components/Loader';

const AddBook = () => {
    const [name, setName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK);

    const handleAddAuthor = () => {
        const authorObj = {
            name: name,
            authorId: authorId
        }

        console.log(authorObj)
        addBook({
            variables: {
                object: authorObj
            }
        });
        console.log(data)
    }
    if (loading) return <Loader />

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.container}>
                <Text style={styles.label}>Book Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                />

                <Text style={styles.label}>Author's Id:</Text>
                <TextInput
                    style={styles.input}
                    value={authorId}
                    onChangeText={setAuthorId}
                    placeholder="Enter age"
                />
                <TouchableOpacity onPress={handleAddAuthor}>
                    <Text>Add Book</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default AddBook;

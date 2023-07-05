import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Modal, Alert } from 'react-native';
import { ADD_BOOK, UPDATE_BOOK } from '../schemas/mutation';
import { useMutation } from '@apollo/client';
import Loader from '../components/Loader';
import { MaterialIcons } from '@expo/vector-icons';
import { GET_ALL_BOOKS, GET_DETAILS_OF_AUTHOR, GET_DETAILS_OF_BOOK } from '../schemas/query';
import ErrorScreen from '../components/ErrorScreen';

const AddBook = ({ setModalVisible, id, prevName = "", isEdit = false }) => {
    const [name, setName] = useState(prevName);
    const [authorId, setAuthorId] = useState('');
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
        onCompleted: () => {
            setModalVisible(false);
        },
        refetchQueries: [
            GET_DETAILS_OF_AUTHOR,
            GET_ALL_BOOKS
        ],
    });
    const [updateBook, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_BOOK, {
        onCompleted: () => {
            setModalVisible(false);
        },
        refetchQueries: [
            GET_ALL_BOOKS,
            GET_DETAILS_OF_BOOK
        ],
    });

    const handleUpdateBook = () => {
        if (name.trim().length === 0) {
            return Alert.alert("Name cannot be Empty")
        }
        if (name === prevName) {
            setModalVisible(false);
            return;
        }
        updateBook({
            variables: {
                id: id,
                name: name
            }
        })
    }

    const handleAddBook = () => {
        if (name.trim().length == 0 || authorId.trim().length === 0) {
            return Alert.alert("Name and Author Id are required")
        }
        const bookObj = {
            name: name,
            authorId: authorId
        }

        console.log(bookObj)
        addBook({
            variables: {
                object: bookObj
            }
        });
    }
    if (loading) return <Loader />
    if (updateLoading) return <Loader />
    if (error || updateError) return <ErrorScreen />;
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.cancelIcon}>
                    <MaterialIcons name="cancel" size={35} color="#00BFFF" />
                </TouchableOpacity>
                <Text style={styles.label}>Book Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                />

                {!isEdit
                    &&
                    <View>
                        <Text style={styles.label}>Author's Id:</Text>
                        <TextInput
                            style={styles.input}
                            value={authorId}
                            onChangeText={setAuthorId}
                            placeholder="Enter AuthorId"
                        />
                    </View>
                }

                <View style={styles.addButtonContainer}>
                    {isEdit ?

                        <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdateBook}>
                            <Text style={styles.buttonText}>Update Book</Text>
                        </TouchableOpacity>
                        :

                        <TouchableOpacity style={styles.buttonContainer} onPress={handleAddBook}>
                            <Text style={styles.buttonText}>Add Book</Text>
                        </TouchableOpacity>

                    }
                </View>
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
    cancelIcon: {
        position: 'absolute',
        top: 5,
        left: 5

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
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }, title: {
        fontSize: 30
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
    }
});

export default AddBook;

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { ADD_AUTHOR } from '../schemas/mutation';
import { useMutation } from '@apollo/client';
import Loader from '../components/Loader';
import { MaterialIcons } from '@expo/vector-icons';
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from '../schemas/query';
import ErrorScreen from '../components/ErrorScreen';
const AddAuthor = ({ setModalVisible }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [books, setBooks] = useState([]);
    const [bookInput, setBookInput] = useState('');
    const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR, {
        onCompleted: () => {
            setModalVisible(false);

        },
        refetchQueries: [
            GET_ALL_AUTHORS,
        ],
    });
    const handleAddBook = () => {
        if (bookInput.trim()) {
            setBooks([...books, { name: bookInput }]);
            setBookInput('');
        }
    };

    const handleDeleteBook = (index) => {
        const updatedBooks = [...books];
        updatedBooks.splice(index, 1);
        setBooks(updatedBooks);
    };

    const handleAddAuthor = () => {
        const authorObj = {
            name: name,
            Age: age
        }
        if (books.length > 0) {
            authorObj["books"] = {
                data: books
            }
        }
        console.log(authorObj)
        addAuthor({
            variables: {
                object: authorObj
            }
        });
    }
    if (loading) return <Loader />
    if (error) return <ErrorScreen />

    const renderBooks = () => {
        return books.map((book, index) => (
            <View key={index} style={styles.bookContainerText}>
                <Text style={styles.book}>{book.name}</Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteBook(index)}
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.cancelIcon}>
                    <MaterialIcons name="cancel" size={35} color="#00BFFF" />
                </TouchableOpacity>
                <Text style={styles.label}>Author's Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                />

                <Text style={styles.label}>Author's Age:</Text>
                <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={setAge}
                    placeholder="Enter age"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Books:</Text>
                <View style={styles.bookContainer}>
                    {renderBooks()}
                    <View style={styles.bookInputContainer}>
                        <TextInput
                            style={styles.bookInput}
                            value={bookInput}
                            onChangeText={setBookInput}
                            placeholder="Enter book"
                        />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.addButtonContainer}>

                    <TouchableOpacity style={styles.buttonContainer} onPress={handleAddAuthor}>
                        <Text style={styles.buttonText}>Add Author</Text>
                    </TouchableOpacity>
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

    bookContainer: {
        marginBottom: 10,
    },
    bookContainerText: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    book: {
        fontSize: 20,
        marginBottom: 5,
    },
    bookInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
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

export default AddAuthor;

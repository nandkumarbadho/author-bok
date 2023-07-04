import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { ADD_AUTHOR } from '../schemas/mutation';
import { useMutation } from '@apollo/client';
import Loader from '../components/Loader';

const AddAuthor = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [books, setBooks] = useState([]);
    const [bookInput, setBookInput] = useState('');
    const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR);
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
        console.log(data)
    }
    if (loading) return <Loader />

    const renderBooks = () => {
        return books.map((book, index) => (
            <View key={index} style={styles.bookContainer}>
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
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={handleAddAuthor}>
                    <Text>Add Author</Text>
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
        justifyContent:'center',
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
    bookContainer: {
        marginBottom: 10,
    },
    book: {
        fontSize: 16,
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
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default AddAuthor;

import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, Platform, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ALL_AUTHORS } from '../schemas/query';
import Author from '../components/Author';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import AddAuthor from './AddAuthor';
import ErrorScreen from '../components/ErrorScreen';

const Authors = () => {
    const navigation = useNavigation();
    const { loading, error, data } = useQuery(GET_ALL_AUTHORS);
    const [modalVisible, setModalVisible] = useState(false);

    if (loading) return <Loader />;
    if (error) {
        console.log(error)
        return <ErrorScreen />;
    }
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            < View style={styles.container} >
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {
                            setModalVisible(true)
                            // navigation.navigate('AddAuthor')
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Add New Author
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View style={styles.listContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data["author_author"]}
                        renderItem={({ item }) => (<Author author={item} />)}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <AddAuthor setModalVisible={setModalVisible} />
                    </Modal>
                </View>

            </View >
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white'
    },
    listContainer: {
        paddingBottom: 80
    },
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
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
})

export default Authors;

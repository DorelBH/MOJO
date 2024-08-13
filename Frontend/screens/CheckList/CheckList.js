import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";
import useTaskServerConnect from './useTaskServerConnect';
import { Ionicons } from '@expo/vector-icons'; // ייבוא אייקונים

const CheckListScreen = () => {
    useAuthCheck();

    const route = useRoute();
    const { eventType, eventId, checkLists } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [newFieldTitle, setNewFieldTitle] = useState('');
    const [newTimeframe, setNewTimeframe] = useState('');
    const [tasks, setTasks] = useState(checkLists);

    const { toggleTaskCompletion, addNewTask } = useTaskServerConnect(eventId, setTasks);

    useEffect(() => {
        setTasks(checkLists);
    }, [checkLists]);

    const handleToggleTask = (timeframe, task) => {
        toggleTaskCompletion(timeframe, task.label, !task.completed)
            .then(updatedCheckLists => {
                setTasks(updatedCheckLists);
            });
    };

    const handleAddNewField = () => {
        const formattedTimeframe = `${newTimeframe} לאירוע`;
        addNewTask(formattedTimeframe, newFieldTitle)
            .then(updatedCheckLists => {
                setTasks(updatedCheckLists);
            });
        setNewFieldTitle('');
        setNewTimeframe('');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>רשימת משימות ל{eventType}</Text>
            <CustomButton
                onPress={() => setModalVisible(true)}
                text="+"
                type="CIRCLE"
            />
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                {tasks.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.header}>{section.timeframe}</Text>
                        {section.tasks.map((task, idx) => (
                            <TouchableOpacity 
                                key={idx} 
                                style={styles.taskContainer} 
                                onPress={() => handleToggleTask(section.timeframe, task)}
                            >
                                <Ionicons 
                                    name={task.completed ? "checkmark-circle" : "checkmark-circle-outline"} 
                                    size={24} 
                                    color={task.completed ? "green" : "gray"} 
                                    style={styles.icon} 
                                />
                                <Text style={[
                                    styles.taskText,
                                    task.completed && styles.completedTaskText
                                ]}>
                                    {task.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.addModal}>
                    <View style={styles.modalContent}>
                        <View style={styles.row}>
                            <Text style={styles.label}>לאירוע</Text>
                            <CustomInput
                                placeholder="הכנס זמן"
                                value={newTimeframe}
                                setValue={setNewTimeframe}
                                validators={[{ type: 'MINLENGTH', val: 1 }, { type: 'REQUIRE' }]}
                                errorMessage="הכנס זמן חוקי"
                                style={styles.halfWidthContainer}
                            />
                        </View>
                        <CustomInput
                            placeholder="הכנס את שם המשימה"
                            value={newFieldTitle}
                            setValue={setNewFieldTitle}
                            validators={[{ type: 'MINLENGTH', val: 3 }, { type: 'REQUIRE' }]}
                            errorMessage="הכנס שדה חוקי"
                        />
                        <CustomButton
                            text="הוסף שדה חדש"
                            onPress={handleAddNewField}
                            type="CALCULATE"
                        />
                        <CustomButton
                            text="בטל"
                            onPress={() => setModalVisible(false)}
                            type="CALCULATE"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    scrollView: {
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 50,
        paddingHorizontal: 10,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    completedTaskText: {
        textDecorationLine: 'line-through',
        color: '#a9a9a9',
    },
    taskText: {
        fontSize: 18,
        textAlign: 'right',
        flex: 1,
    },
    icon: {
        marginRight: 10,
    },
    addModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        width: '90%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '95%',
    },
    halfWidthContainer: {
        width: '50%',
        height: 50,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 16,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
        color: "#a9a9a9"
    },
});

export default CheckListScreen;

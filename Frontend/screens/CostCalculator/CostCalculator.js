import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CustomInput from '../../components/CustomInput';
import CostList from '../../components/CostList/CostList';
import useCostServerConnect from './useCostServerConnect';

const CostCalculator = () => {
    useAuthCheck();

    const route = useRoute();
    const { eventType, eventId, costs } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [newFieldTitle, setNewFieldTitle] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [eventCosts, setEventCosts] = useState(costs || {});
    const [editCosts, setEditCosts] = useState({});

    const { updateCost, /* onDeleteCost, */ handleAddNewField } = useCostServerConnect(
        eventId, eventCosts, setEventCosts, setModalVisible, newFieldTitle,setNewFieldTitle
    ); // Pass all necessary states and functions

    const calculateTotal = () => {
        const total = Object.values(eventCosts).reduce((acc, curr) => acc + parseFloat(curr.cost || 0), 0);
        setTotalCost(total);
    };


    const toggleEditMode = () => {
        if (isEditing) {
            Object.entries(editCosts).forEach(([key, newData]) => {
                updateCost(key, newData); // Update server only on edit mode exit
            });
            setEventCosts(editCosts);
        } else {
            setEditCosts({ ...eventCosts });
        }
        setIsEditing(!isEditing);
    };


    useEffect(() => {

    }, [eventCosts]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>מחשבון הוצאות ל{eventType}</Text>
            <View style={styles.buttonsContainer}>
                <CustomButton
                    text={isEditing ? "סיים עריכה" : "ערוך שדות קיימים"}
                    onPress={toggleEditMode}
                    type="CALCULATE"
                />
                <CustomButton
                    text="הוסף שדה חדש"
                    onPress={() => setModalVisible(true)}
                    type="CALCULATE"
                />
            </View>
            <CostList
                eventCosts={isEditing ? editCosts : eventCosts}
/*                 onDeleteCost={onDeleteCost}
 */                
                onUpdateCost={(key, newData) => setEditCosts(prev => ({ ...prev, [key]: { ...prev[key], ...newData }}))}
                isEditing={isEditing}
                eventId={eventId}
            />
            <View style={styles.btnCalc}>
                <CustomButton
                    text="חשב עלות כוללת"
                    type="CALCULATE"
                    onPress={calculateTotal}
                />
            </View>
            <Text style={styles.resultText}>
                עלות כוללת: ₪{totalCost.toFixed(2)}
            </Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.addModal}>
                    <View style={styles.modalContent}>
                        <CustomInput
                            placeholder="הכנס את שם השדה החדש"
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingTop: 80,
    },
    buttonsContainer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'AcademyEngravedLetPlain',
    },
    btnCalc: {
        marginBottom: 10,
        marginTop: 20,
    },
    resultText: {
        fontSize: 20,
        color: '#000',
        marginBottom: 50,
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
});

export default CostCalculator;

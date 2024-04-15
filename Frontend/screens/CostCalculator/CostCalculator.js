import React, { useState, useMemo } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CustomInput from '../../components/CustomInput';
import CostList from '../../components/CostList/CostList';

const CostCalculator = () => {
    useAuthCheck();

    const route = useRoute();
    const { eventType } = route.params;

    const [modalVisible, setModalVisible] = useState(false); // MODAL - ADD NEW FIELD
    const [newFieldTitle, setNewFieldTitle] = useState('');
    const [totalCost, setTotalCost] = useState(0);  // הגדרה זו חייבת להיות בתוך הפונקציה CostCalculator

    const [isEditing, setIsEditing] = useState(false); // EDIT FIELDS

    const eventCostsBase = {
        venue: { label: 'אולם/גן אירועים', cost: '' },
        photographer: { label: 'צלם', cost: '' },
        magnetPhotographer: { label: 'צלם מגנטים', cost: '' },
        dj: { label: 'דיג\'יי', cost: '' },
        acam: { label: 'אקו"ם', cost: '' },
        lightingAndSound: { label: 'תאורה והגברה', cost: '' },
        hallDesign: { label: 'עיצוב אולם', cost: '' },
        bar: { label: 'בר אקטיבי', cost: '' }, 
        invitations: { label: 'הזמנות', cost: '' },
    };

    const additionalCosts = {
        חינה: {
            groomOutfit: { label: 'תלבושת חתן', cost: '' },
            bridalOutfit: { label: 'תלבושת כלה', cost: '' },
            costumes: { label: 'תלבושת נוספות', cost: '' },
        },
        חתונה: {
            bridalDress: { label: 'שמלת כלה', cost: '' },
            bridalMakeup: { label: 'איפור כלה', cost: '' },
            bridalHairDesign: { label: 'עיצוב שיער', cost: '' },
            groomSuit: { label: 'חליפת חתן', cost: '' },
            weddingRings: { label: 'טבעות נישואים', cost: '' },
            rabbinate: { label: 'רבנות', cost: '' },
            weddingRabbi: { label: 'רב לחופה', cost: '' },
            bridalBouquet: { label: 'זר כלה', cost: '' },
            carDecoration: { label: 'קישוט לרכב', cost: '' },
            hotel: { label: 'מלון', cost: '' },
        },
        ברית: {
            mohel: { label: 'מוהל', cost: '' },
        },
    };

    const [eventCosts, setEventCosts] = useState({ ...eventCostsBase, ...additionalCosts[eventType] });

    const calculateTotal = () => {
        const total = Object.values(eventCosts).reduce((acc, curr) => acc + parseFloat(curr.cost || 0), 0);
        setTotalCost(total);
    };

    const onDeleteCost = (key) => {
        setEventCosts(prevCosts => {
            const updatedCosts = { ...prevCosts };
            delete updatedCosts[key];
            return updatedCosts;
        });
    };
    
    const updateCost = (key, newData) => {
        setEventCosts(prevCosts => ({
            ...prevCosts,
            [key]: { ...prevCosts[key], ...newData }
        }));
    };

    const handleAddNewField = () => {
        if (newFieldTitle) {
            setEventCosts(prevCosts => ({
                ...prevCosts,
                [newFieldTitle]: { label: newFieldTitle, cost: '' } // Initialize with label and empty cost
            }));
            setNewFieldTitle('');
            setModalVisible(false);
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    
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
                eventCosts={eventCosts}
                onDeleteCost={onDeleteCost}
                onUpdateCost={updateCost}
                calculateTotal={calculateTotal}
                isEditing={isEditing}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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

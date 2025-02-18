import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert, Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import usePaymentServerConnect from './usePaymentServerConnect'; // ייבוא הקומפוננטה החדשה
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken";
import CustomInput from '../../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';


const PaymentDeadlines = ({ route }) => {
    const { eventId } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [supplierName, setSupplierName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [deadlines, setDeadlines] = useState([]);
    const { toggleDeadlineCompletion, addNewPaymentDeadline } = usePaymentServerConnect(eventId, setDeadlines);

    const fetchDeadlines = async () => {
        const token = await getToken();
        try {
            const response = await fetch(`${apiUrl}/api/events/getEvent/${eventId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setDeadlines(data.event.paymentDeadlines);
            } else {
                throw new Error(data.message || 'Failed to fetch payment deadlines');
            }
        } catch (error) {
            Alert.alert("שגיאה", error.message);
        }
    };

    useEffect(() => {
        fetchDeadlines();
    }, [eventId]);

    const handleAddDeadline = async () => {
        if (supplierName && selectedDate) {
            const now = new Date();
            if (selectedDate < now) {
                Alert.alert("תאריך עבר", "התאריך הנבחר כבר עבר. בחר תאריך אחר.");
                return;
            }
            try {
                const updatedDeadlines = await addNewPaymentDeadline(supplierName, selectedDate);
                setDeadlines(updatedDeadlines);
                setSupplierName('');
                setSelectedDate(null);
                setModalVisible(false);
            } catch (error) {
                Alert.alert("שגיאה", error.message);
            }
        }
    };

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        setIsVisible(false);
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    const handleToggleDeadline = async (index) => {
        try {
            const deadline = deadlines[index];
            const updatedDeadlines = await toggleDeadlineCompletion(deadline.supplierName, deadline.date, !deadline.completed);
            setDeadlines(updatedDeadlines);
        } catch (error) {
            Alert.alert("שגיאה", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>מועדי תשלום לספקים</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Image source={require('../../assets/images/plus.png')} style={styles.addIcon} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                {deadlines.map((deadline, index) => (
                    <View key={index} style={styles.section}>
                        <TouchableOpacity onPress={() => handleToggleDeadline(index)} style={styles.completeButton}>
                            <Ionicons name={deadline.completed ? "checkmark-circle" : "checkmark-circle-outline"} size={24} color="green" />
                        </TouchableOpacity>
                        <Text style={[styles.deadlineDate, deadline.completed && styles.completedText]}>
                            {deadline.date ? new Date(deadline.date).toLocaleDateString('he-IL') : 'תאריך לא מוגדר'}
                        </Text>
                        <Text style={[styles.supplierName, deadline.completed && styles.completedText]}>{deadline.supplierName}</Text>
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
                        <CustomInput
                            style={styles.input}
                            placeholder="הכנס את שם הספק"
                            value={supplierName}
                            setValue={setSupplierName}
                            validators={[{ type: 'MINLENGTH', val: 3 }, { type: 'REQUIRE' }]}
                            errorMessage="שם הספק חייב להיות בעל 3 תווים לפחות"
                            />
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <Text style={styles.datePicker}>
                                {selectedDate ? selectedDate.toLocaleDateString('he-IL') : 'בחר תאריך'}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isVisible}
                            mode="date"
                            textColor="black"
                            onConfirm={handleDateConfirm}
                            onCancel={handleCancel}
                            locale="he"
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddDeadline}>
                                <Icon
                                    name="check"
                                    size={30}
                                    color="green"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Image source={require('../../assets/images/Cancel_Button.png')} style={styles.cancelIcon} />
                            </TouchableOpacity>
                        </View>

                       
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
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    supplierName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    deadlineDate: {
        fontSize: 16,
        color: '#7B481C',
        textAlign: 'right',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#a9a9a9',
    },
    completeButton: {
        padding: 5,
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
    input: {
        width: '100%',
        height: 50,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    datePicker: {
        width: '100%',
        height: 50,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        textAlign: 'right',
        paddingVertical: 15,
        color: '#a9a9a9',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5, // מוסיף רווח בין השדה לכפתורים
        width: '100%',
    },
    addButton: { 
        borderRadius: 50,
        padding: 16,
    },
    cancelButton: {
        borderRadius: 50,
        padding: 16,
    },
    addIcon: {
        width: 30,
        height: 30,
        tintColor: '#cd853f',
    },
    cancelIcon: {
        width: 30,
        height: 30,
    }
});

export default PaymentDeadlines;

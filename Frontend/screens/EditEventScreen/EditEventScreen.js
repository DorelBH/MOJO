import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CheckBox from '../../components/CheckBox'; 
import { VALIDATOR_ONLY_DIGITS, VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../util/validators';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getToken } from "../../util/authToken"; 
import { apiUrl } from "../../api";
import { useNavigation } from '@react-navigation/native';
import useAuthCheck from '../../hooks/useAuthCheck';

const EditEventScreen = ({ route }) => {
    useAuthCheck();
    const { eventType } = route.params;
    const navigation = useNavigation();

    const [isWedding, setIsWedding] = useState(false);
    const [closeHall, setCloseHall] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const [selectedRegions, setSelectedRegions] = useState([]); //מה בחר המשתמש 
    const regions = ['דרום', 'צפון', 'מרכז', 'ירושלים', 'שרון'];

    const [eventDetails, setEventDetails] = useState({
        groomName: '',
        brideName: '',
        name: '', //not wedding
        amountInvited:''
    });

    useEffect(() => {
        couple(eventType);
    }, [eventType]);

    const onSavePressed = async () => {
        const token = await getToken();
        if (token) {
            try {
                const eventData = {
                    eventType: eventType,
                    selectedRegions: selectedRegions,
                    amountInvited: eventDetails.amountInvited,
                };
    
                if (isWedding) {
                    eventData.groomName = eventDetails.groomName;
                    eventData.brideName = eventDetails.brideName;
                } else {
                    eventData.name = eventDetails.name; // עבור אירועים שאינם חתונה או חינה
                }
    
                if (closeHall && selectedDate) {
                    eventData.eventDate = selectedDate;
                }
    
                const response = await fetch(`${apiUrl}/api/events/editEvent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(eventData),
                });
    
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message || 'Failed to save event.');
                }
                console.warn('אירוע נשמר');
                navigation.navigate('HomeScreen');
            } catch (error) {
                console.error('Error:', error.message || 'Something went wrong during the event saving process.');
            }
        } else {
            console.error('No token found, please login.');
        }
    };
    

    const couple = (eventType) => {
        setIsWedding(eventType === "חינה" || eventType === "חתונה");
    };

    const handleRegionChange = (region) => {
        if (selectedRegions.includes(region)) {
            setSelectedRegions(selectedRegions.filter((r) => r !== region));
        } else {
            setSelectedRegions([...selectedRegions, region]);
        }
    };

    const isChecked = (region) => {
        return selectedRegions.includes(region);
    };

    const onCloseHall = () =>{
        setCloseHall(true)
    }

    const onNotCloseHall = () =>{
        setCloseHall(false)
    }

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        setIsVisible(false); // Close the picker after selecting the date
    };

    const handleCancel = () => {
        setIsVisible(false); // Close the picker if canceled
    };
    
    return (
        
        <View style={EditEventStyle.container}>
            <Text style={EditEventStyle.title}>עריכת אירוע</Text>
            {isWedding && (
                <CustomInput
                    placeholder="שם החתן"
                    value={eventDetails.groomName}
                    setValue={(text) => setEventDetails({ ...eventDetails, groomName: text })}
                    validators={[ VALIDATOR_REQUIRE()]}
                    errorMessage="הכנס שם חתן"
                />
            )}
            {isWedding && (
                <CustomInput
                    placeholder="שם הכלה"
                    value={eventDetails.brideName}
                    setValue={(text) => setEventDetails({ ...eventDetails, brideName: text })}
                    validators={[ VALIDATOR_REQUIRE()]}
                    errorMessage="הכנס שם כלה"
                />
            )}
            {!isWedding && (
                <CustomInput
                    placeholder="שם החתן/כלה"
                    value={eventDetails.name}
                    setValue={(text) => setEventDetails({ ...eventDetails, name: text })}
                    validators={[ VALIDATOR_REQUIRE()]}
                    errorMessage="הכנס שם "
                />
            )}
            <Text style={EditEventStyle.text}>פרטי האירוע: </Text>
            <CustomInput
                placeholder=" כמות מוזמנים משוערת"
                value={eventDetails.amountInvited}
                setValue={(text) => setEventDetails({ ...eventDetails, amountInvited: text })}
                validators={[
                    VALIDATOR_ONLY_DIGITS(),
                    VALIDATOR_REQUIRE(),
                    VALIDATOR_MAXLENGTH(5)
                ]}
                errorMessage="כמות לא תקינה!"
            />

        <Text style={EditEventStyle.text}>האם סגרתם אולם?  </Text>

       <View style={EditEventStyle.Buttons}>
       
            <CustomButton
                text="לא סגרנו"
                onPress={onNotCloseHall}
                type="HALL"
            />

            <CustomButton
                text="  סגרנו  "
                onPress={onCloseHall}
                type="HALL"
            />


        </View>      
        
        {closeHall && (
    <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Text style={EditEventStyle.button}>{selectedDate ? selectedDate.toLocaleDateString('he-IL') : 'בחר תאריך'}</Text>
    </TouchableOpacity>
        )}

        {closeHall && (
    <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        textColor="black"
        onConfirm={handleDateConfirm}
        onCancel={handleCancel}
        locale="he"/>
        )}


         <Text style={EditEventStyle.text}>איזור האירוע :</Text>
            <View style={EditEventStyle.regionsContainer}>
            {regions.map((region) => (
                <CheckBox
                    key={region}
                    label={region}
                    checked={isChecked(region)}
                    onChange={() => handleRegionChange(region)}
                />
            ))}
            </View>
            <CustomButton
                text="המשך לאפליקציה"
                onPress={onSavePressed}
                type="CONTINUE"
            />
        </View>
    );
};

const EditEventStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        marginTop: "13%",
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        margin:15
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    regionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10, 
        justifyContent: 'flex-end', 

    },
    Buttons:{
        flexDirection: 'row',
    },

    button: {
        fontSize: 20,
        color: 'black',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc', 
        textAlign: 'center', 
    }
    
});

export default EditEventScreen;
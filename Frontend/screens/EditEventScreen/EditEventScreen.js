import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CheckBox from '../../components/CheckBox'; 
import { VALIDATOR_ONLY_DIGITS, VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../util/validators';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditEventScreen = ({ route }) => {
    const { eventType } = route.params;

    const [amountInvited, setAmountInvited] = useState('');
    const [isWedding, setIsWedding] = useState(false);
    const [closeHall, setCloseHall] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const [selectedRegions, setSelectedRegions] = useState([]); //מה בחר המשתמש 
    const regions = ['דרום', 'צפון', 'מרכז', 'ירושלים', 'שרון'];

    const [eventDetails, setEventDetails] = useState({
        groomName: '',
        brideName: '',
        Name: '', //not wedding
        eventLocation: '',
    });

    useEffect(() => {
        couple(eventType);
    }, [eventType]);

    const onSavePressed = () => {
        console.warn('אירוע נשמר');
        console.log(selectedRegions);
        if(closeHall)
        console.log(selectedDate);
        if(isWedding){
        console.log(eventDetails.brideName);
        console.log(eventDetails.groomName);
        }
        else{
            console.log(eventDetails.Name);
        }
        console.log(amountInvited);




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
                    value={eventDetails.Name}
                    setValue={(text) => setEventDetails({ ...eventDetails, Name: text })}
                    validators={[ VALIDATOR_REQUIRE()]}
                    errorMessage="הכנס שם "
                />
            )}
            <Text style={EditEventStyle.text}>פרטי האירוע: </Text>
            <CustomInput
                placeholder=" כמות מוזמנים משוערת"
                value={amountInvited}
                setValue={setAmountInvited}
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
        <Text style={EditEventStyle.button}>{selectedDate ? selectedDate.toLocaleDateString() : 'בחר תאריך'}</Text>
    </TouchableOpacity>
        )}

        {closeHall && (
    <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        textColor="black"
        onConfirm={handleDateConfirm}
        onCancel={handleCancel}/>
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
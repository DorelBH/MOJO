import React, { useState } from "react";
import { View, Text, TextInput,StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { validate } from "../../util/validators";

const CustomInput = ({
    value, 
    setValue, 
    placeholder, 
    secureTextEntry, 
    iconName, 
    validators = [], 
    errorMessage,
    keyboardType,
    style ,
}) => {
    const [isValid, setIsValid] = useState(true);

    const inputChangeHandler = (inputValue) => {
        setValue(inputValue);
        setIsValid(validate(inputValue, validators));
    };

    const containerStyle = style || inputStyles.container; // בודק אם קיים סגנון מועבר, אם לא משתמש בברירת מחדל

    return (
        <View style={containerStyle}> 
            <Icon name={iconName} style={inputStyles.icon} />
            <TextInput
                value={value}
                onChangeText={inputChangeHandler}
                placeholder={placeholder}
                style={[inputStyles.input, { textAlign: 'right', writingDirection: 'rtl' }, style]} // עדכון כיוון הטקסט והכתיבה
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
            {!isValid && errorMessage && <Text style={inputStyles.errorText}>*{errorMessage}</Text>}
        </View>
        
    );
};


const inputStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 300,
        height:50,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row', // שורה אחת
        alignItems: 'center', // איחוד אנכי  
    },
    input: {
        flex: 1,
        height: 50,
    },
    icon: {
        fontSize: 22,
        color: 'gray',
        marginRight: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});

export default CustomInput;
import React, { useState } from "react";
import { View, Text, TextInput,StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { validate } from "../../util/validators";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, iconName, validators = [], errorMessage}) => {
    const [isValid, setIsValid] = useState(true);

    const inputChangeHandler = (inputValue) => {
        setValue(inputValue);
        setIsValid(validate(inputValue, validators));
    };
 
    return (
        <View style={inputStyles.container}>
            <Icon name={iconName} style={inputStyles.icon} />
            <TextInput
                value={value}
                onChangeText={inputChangeHandler}
                placeholder={placeholder}
                style={inputStyles.input}
                secureTextEntry={secureTextEntry}
            />
            {!isValid && errorMessage && <Text style={inputStyles.errorText}>*{errorMessage}</Text>}
        </View>
        
    );
};

const inputStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row', // שורה אחת
        alignItems: 'center', // איחוד אנכי
    },
    input: {
        flex: 1,
        height: 50
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
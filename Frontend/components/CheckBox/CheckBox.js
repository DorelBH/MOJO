import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckBox = ({ label, checked, onChange }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onChange}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.checkBox, checked && styles.checkedBox]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        
    },
    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
    },
    checkedBox: {
        backgroundColor: 'black', // Add background color when checked
        
    },
    label: {
        fontSize: 16,
        textAlign:'right',
        marginRight: 6, // Add margin between checkbox and text

    },
});

export default CheckBox;
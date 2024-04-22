import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InputChooser = ({ options, onSelect , chooserText}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setDropdownVisible(false); // סוגר את הרשימה לאחר בחירה
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.dropdownText}>
          {selectedOption || chooserText}
        </Text>
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dropdown: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: 'center',
  },
  dropdownOptions: {
    width: 200,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default InputChooser;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import CostList from '../../components/CostList/CostList';

const CostCalculator = () => {
    useAuthCheck();

    const route = useRoute();
    const { eventType } = route.params;

    const [eventCosts, setEventCosts] = useState({
        venue: '',
        photographer: '',
        dj: '',
        acam: '',
        lightingAndSound: '',
        hallDesign: '',
        bridalDress: '',
        bridalMakeup: '',
        bridalHairDesign: '',
        groomSuit: '',
        weddingRings: '',
        rabbinate: '',
        weddingRabbi: '',
        magnetPhotographer: '',
        bridalBouquet: '',
        carDecoration: '',
        invitations: '',
        hotel: '',
    });

    const [totalCost, setTotalCost] = useState(0);

    const calculateTotal = () => {
        const total = Object.values(eventCosts).reduce((acc, curr) => acc + parseFloat(curr || 0), 0);
        setTotalCost(total);
    };


    const updateCost = (key, value) => {
        setEventCosts(prevCosts => ({ ...prevCosts, [key]: value }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>מחשבון הוצאות לאירוע</Text>
            <CostList
                eventCosts={eventCosts}
                eventType={eventType}
                onUpdateCost={updateCost}
                calculateTotal={calculateTotal}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderColor: '#cccccc',
    },
    btnCalc:{
        marginBottom:10,
        marginTop:20,
    },
    resultText: {
        fontSize: 20,
        color: '#000',
        marginBottom: 50,
    },
});

export default CostCalculator;

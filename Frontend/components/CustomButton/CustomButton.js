import React from "react";
import { View, Text,StyleSheet,Pressable} from "react-native";


const CustomButton = ({onPress,text,type = "PRIMARY",bgColor,fgColor}) => {
    return(
    <Pressable onPress={onPress}
    style={[
        buttonStyles.container,
        buttonStyles[`container_${type}`],
        bgColor ? {backgroundColor:bgColor} : {}
        ]}>
        <Text 
    style={[
        buttonStyles.text,
        buttonStyles[`text_${type}`],
        fgColor ? {color: fgColor} : {},

        ]}>{text}</Text>
    </Pressable>
    )
}

const buttonStyles = StyleSheet.create({
    container:{
        width:'100%',

        padding:15,
        marginVertical:5,

        alignItems:'center',

        borderRadius:5,

        paddingHorizontal:10,
    },
    container_PRIMARY: {
        backgroundColor:'#3871F3',
    },
    container_SECONDARY:{
        borderColor:'#3871F3',
        borderWidth:2,
    },
    container_TERTIARY: {

    },
    container_CONTINUE: {
        borderColor:'#3871F3',
        borderWidth:1,
        position: 'absolute', // קובע את המיקום של הכפתור
        bottom: "8%", // מרווח 20 פיקסלים מהתחתית
        width: '90%', // רוחב 90% של הכפתור
    },

    container_HALL: {
        borderColor:'#3871F3',
        borderWidth:1,
        width: '35%', 
        margin:5
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },

    text_SECONDARY:{
        color:'#3871F3'
    },
    text_TERTIARY:{
        color:'gray',
    },

    text_CONTINUE:{
        color:'#3871F3'
    },
    text_HALL:{
        color:'#3871F3'
    },
})

export default CustomButton
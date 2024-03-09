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

})

export default CustomButton
import React from "react";
import { View, Text,StyleSheet,Pressable} from "react-native";


const CustomButton = ({onPress,text,type = "PRIMARY",bgColor,fgColor, width,height}) => {
    return(
    <Pressable onPress={onPress}
    style={[
        buttonStyles.container,
        buttonStyles[`container_${type}`],
        bgColor ? {backgroundColor:bgColor} : {},
        width ? { width } : {},
        height ? {height} : {}
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
        borderColor:'#7B481C',
        borderWidth:1.3,
        position: 'absolute', // קובע את המיקום של הכפתור
        bottom: "8%", // מרווח 20 פיקסלים מהתחתית
        width: '90%', // רוחב 90% של הכפתור
        padding:15,
    },

    container_HALL: {
        borderColor: 'gray',
        borderWidth:1,
        width: '45%', 
        justifyContent: 'center', //change
        padding:5,
    },

    container_CALCULATE: {
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        alignItems: 'center',
        alignSelf: 'center', 
        justifyContent: 'center', 
        width: 150,
        height: 50,

    },
    container_MAINBROWN: {
        marginTop:15,
        padding: 6,
        backgroundColor: '#7B481C',
        borderRadius: 16,
        margin: 10,
        borderWidth: 1,
        width: 300, 
        height:50,
        alignItems: 'center',
        alignSelf: 'center', 
        justifyContent: 'center', 

    },
    container_MAINGRAY: {
        marginTop:15,
        padding: 6,
        backgroundColor: '#696969',
        borderRadius: 16,
        width: 300, 
        height:50,
        margin: 10,
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'center', 
        justifyContent: 'center', 
    },

    container_CONTINUE_BROWN: {
        marginTop:5,
        padding: 6,
        borderColor:'#7B481C',
        borderRadius: 16,
        alignSelf: 'flex-end',
        borderWidth: 1,
        width: 300, 
        height:50,
        alignItems: 'center',
        alignSelf: 'center', 
        justifyContent: 'center', 

    },

    container_PROVIDER: {
        backgroundColor: '#7B481C',
        borderRadius: 30,
        borderColor: 'black', 
        borderWidth: 1,
        margin: 5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '36%',
        height:'30%',
    },

    container_PROVIDER_NOTACTIVE: {
        backgroundColor: '#808080',
        borderRadius: 30,
        borderColor: 'black', 
        borderWidth: 1,
        margin: 5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '36%',
        height:'30%',
    },

    container_CIRCLE:{
        backgroundColor: '#7B481C',
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    container_LOGOUT: {
        backgroundColor: '#FF6347', 
        borderRadius: 15,
        padding: 5,
        width: 80, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
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
        color:'#7B481C'
    },
    text_HALL:{
        color:'gray',
        fontFamily: 'AcademyEngravedLetPlain',
        textAlign: 'center',
        fontWeight:'bold',
        fontSize: 16,
    },
    text_CALCULATE:{
        color: 'gray',
        
    },
    text_MAINBROWN:{
        fontWeight:'bold',
        color:'white',
        fontFamily: 'AcademyEngravedLetPlain',
        fontSize: 20,
        textAlign: 'center',
    },
    text_CONTINUE_BROWN:{
        fontWeight:'bold',
        color:'#7B481C',
    },
    text_MAINGRAY:{
        fontWeight:'bold',
        color:'white',
        fontFamily: 'AcademyEngravedLetPlain',
        fontSize: 20,
        textAlign: 'center',
    },
        text_PROVIDER:{
        color: 'white',
        fontSize: 12,
    },
    text_PROVIDER_NOTACTIVE:{
        color: 'white',
        fontSize: 12,
    },
    text_CIRCLE:{
        color: 'white',
        fontSize: 18,
        lineHeight: 20,
    },
    text_LOGOUT: {
        fontSize: 12, 
    },
})

export default CustomButton
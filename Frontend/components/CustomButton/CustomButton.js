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
        padding:15,
    },

    container_HALL: {
        borderColor: 'gray',
        borderWidth:1,
        width: '40%', 
        height: '5%',
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
       // width: '40%',

    },
    container_MAINBROWN: {
        marginTop:15,
        padding: 6,
        backgroundColor: '#7B481C',
        borderRadius: 16,
        width: 300, 
        height:50,
        alignSelf: 'flex-end',
        borderWidth: 1,
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
        alignSelf: 'flex-end',
        borderWidth: 1,
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
    }
})

export default CustomButton
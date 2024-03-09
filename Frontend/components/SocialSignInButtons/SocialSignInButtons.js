import React from "react";
import CustomButton from "../CustomButton";


const SocialSignInButtons =() => {

    const onSignInFacebook = () => {
        console.warn('FacebookLogin');
    }

    return(
        <>
             <CustomButton 
             text="Sign In With Facebook" 
             onPress={onSignInFacebook} 
             bgColor="#E7EAF4"
             fgColor="#4765A9"
             />
        </>
    )
}

export default SocialSignInButtons;


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavbar from '../components/BottomNavbar'; // הייבוא של BottomNavbar

// הייבוא של כל המסכים
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from "../screens/NewPasswordScreen";
import NewEventScreen from "../screens/NewEventScreen";
import EditEventScreen from "../screens/EditEventScreen";
import SignInOrSignOutScreen from "../screens/SignInOrSignOutScreen";
import CheckList from "../screens/CheckList/CheckList";
import MainScreen from "../screens/MainScreen";
import AlcoholCalculatorScreen from "../screens/AlcoholCalculatorScreen/AlcoholCalculatorScreen";
import CostCalculator from "../screens/CostCalculator/CostCalculator";
import AlcoholMain from "../screens/AlcoholMain/AlcoholMain";
import ChatbotScreen from "../screens/Chatbot/ChatbotScreen";
import GuestListScreen from "../screens/GuestListScreen.js/GuestListScreen";
import AddGuestScreen from "../screens/AddGuestScreen/AddGuestScreen";
import GuestCheckScreen from "../screens/GuestCheckScreen/GuestCheckScreen";
import ProviderDetails from "../screens/ProviderDetails";
import RavProviders from "../Providers/RavProviders";
import HallsProviders from "../Providers/HallsProviders";
import PhotographerProviders from "../Providers/PhotographerProviders";
import SongsMain from "../screens/SongsMain";
import RecommendedSongsScreen from "../screens/RecommendedSongsScreen";
import PaymentDeadlines from "../screens/PaymentDeadlines";
import HupaSongsScreen from "../screens/HupaSongsScreen/HupaSongsScreen";
import HebrewHupaSongsScreen from "../screens/HebrewHupaSongsScreen/HebrewHupaSongsScreen";
import LoazitHupaSongsScreen from "../screens/LoazitHupaSongsScreen/LoazitHupaSongsScreen";
import SlowSongsScreen from "../screens/SlowSongsScreen/SlowSongsScreen";
import HebrewSlowSongsScreen from "../screens/HebrewSlowSongsScreen/HebrewSlowSongsScreen";
import LoazitSlowSongsScreen from "../screens/LoazitSlowSongsScreen/LoazitSlowSongsScreen";

const Stack = createNativeStackNavigator();

// HOC להוספת BottomNavbar לכל המסכים חוץ מ-HomeScreen ו-NewEventScreen
const withBottomNavbar = (Component) => {
    return (props) => (
        <>
            <Component {...props} />
            <BottomNavbar />
        </>
    );
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}> 
                <Stack.Screen name="SignInOrSignOut" component={SignInOrSignOutScreen}/>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Stack.Screen name="NewPassword" component={NewPasswordScreen}/> 
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="NewEvent" component={NewEventScreen}/>
                <Stack.Screen name="EditEvent" component={EditEventScreen}/>
                <Stack.Screen name="Main" component={withBottomNavbar(MainScreen)} />
                <Stack.Screen name="AlcoholCalculator" component={withBottomNavbar(AlcoholCalculatorScreen)} />
                <Stack.Screen name="CostCalculator" component={withBottomNavbar(CostCalculator)} />
                <Stack.Screen name="AlcoholMain" component={withBottomNavbar(AlcoholMain)} />
                <Stack.Screen name="CheckList" component={withBottomNavbar(CheckList)} />
                <Stack.Screen name="ChatBot" component={withBottomNavbar(ChatbotScreen)} />
                <Stack.Screen name="GuestList" component={withBottomNavbar(GuestListScreen)} />
                <Stack.Screen name="AddGuest" component={withBottomNavbar(AddGuestScreen)} />
                <Stack.Screen name="GuestCheck" component={withBottomNavbar(GuestCheckScreen)} />
                <Stack.Screen name="ProviderDetails" component={withBottomNavbar(ProviderDetails)} />
                <Stack.Screen name="RavProviders" component={withBottomNavbar(RavProviders)} />
                <Stack.Screen name="HallsProviders" component={withBottomNavbar(HallsProviders)} />
                <Stack.Screen name="PhotographerProviders" component={withBottomNavbar(PhotographerProviders)} />
                <Stack.Screen name="SongsMain" component={withBottomNavbar(SongsMain)} />
                <Stack.Screen name="RecommendedSongs" component={withBottomNavbar(RecommendedSongsScreen)} />
                <Stack.Screen name="PaymentDeadlines" component={withBottomNavbar(PaymentDeadlines)} />
                <Stack.Screen name="HupaSongs" component={withBottomNavbar(HupaSongsScreen)}/>
                <Stack.Screen name="HebrewHupaSongs" component={withBottomNavbar(HebrewHupaSongsScreen)}/>
                <Stack.Screen name="LoazitHupaSongs" component={withBottomNavbar(LoazitHupaSongsScreen)}/>
                <Stack.Screen name="SlowSongs" component={withBottomNavbar(SlowSongsScreen)}/>
                <Stack.Screen name="HebrewSlowSongs" component={withBottomNavbar(HebrewSlowSongsScreen)}/>
                <Stack.Screen name="LoazitSlowSongs" component={withBottomNavbar(LoazitSlowSongsScreen)}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

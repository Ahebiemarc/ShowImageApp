import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/typeRoutes";
import { View } from "react-native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import ImageDetails from "../screens/ImageDetails";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <View style={{flex:1}}>
            <RootStack.Navigator initialRouteName="Home"  >
            <RootStack.Group
                screenOptions={{
                    headerShown: false,
                    //animation: "fade",
                  }}
            >
                <RootStack.Screen name="Home" component={Home}/>
                <RootStack.Screen name="Login" component={Login} />
                <RootStack.Screen name="ImageDetails" component={ImageDetails} />
            </RootStack.Group>
        </RootStack.Navigator>
        </View>
    );
};

export default RootNavigator;
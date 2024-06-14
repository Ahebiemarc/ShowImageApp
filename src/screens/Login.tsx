import React from "react";
import { Text, View, Image } from "react-native";

const Login = () => {
    console.log('login');
    
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <Image 
         style={{
            width: 200,
            height: 200,
            borderRadius: 14,
            resizeMode: 'contain'
          }}
         source={require('../4.jpg')} />
        </View>
    )
}

export default Login;
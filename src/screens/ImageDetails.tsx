import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackParamList, RootStackScreenProps } from "../types/typeRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


const SPACING = 10;
const { width, height } = Dimensions.get('screen');

type Props = NativeStackScreenProps<RootStackParamList, 'ImageDetails'>;



const ImageDetails: React.FC<Props> = ({navigation, route}) => {

    const {item} = route.params;
    return(
        <View style={{flex: 1}}>
            <Image 
            source={{uri: item.poster}}
            style={[StyleSheet.absoluteFillObject]}
            />
            <View 
                style={[StyleSheet.absoluteFillObject, {
                    backgroundColor: '#000',
                    opacity: 0.3,
                }]}
            />
            <AntDesign 
            name="closecircle" size={38} color="black"
            style={{
                padding: SPACING,
                position: 'absolute',
                top: SPACING,
                right: SPACING,
                zIndex: 2,
            }}
            onPress={() => navigation.goBack()}
             />

             <View style={[StyleSheet.absoluteFillObject, {
                backgroundColor: "#fff",
                //top: height * 0.7,
                transform:[{translateY: height * 0.7}],

                padding: SPACING * 2,
                borderRadius: 16,
             }]}>
                <Text style={{fontWeight: '900', fontSize:28}}> {item.title} </Text>
                <Text style={{fontWeight: '500', fontSize:16}}> {item.location} </Text>
                <Text style={{fontSize: 12}}> {item.date} </Text>
             </View>
        </View>
    )
}


const styles = StyleSheet.create({
    desc: {
        fontWeight: '900',
        fontSize: 28,

    }
})

export default ImageDetails;
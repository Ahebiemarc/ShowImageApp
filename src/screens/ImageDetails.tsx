import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/typeRoutes";

const SPACING = 10;
const { width, height } = Dimensions.get('screen');

const Date = () => {
    return(
        <View>
            <Text style={styles.heading}>Date</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.number}>23/11/2023</Text>

            </View>
        </View>
    )
}


const Location = () => {
    return(
        <View>
            <Text style={styles.heading}></Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.number}>Monastir, TN</Text>
            </View>
        </View>
    )
}

type Props = NativeStackScreenProps<RootStackParamList, 'ImageDetails'>;

const ImageDetails: React.FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;

  

  return (
    <View style={{ flex: 1 }}>
      { <Image 
        source={{ uri: item.poster }}
        style={[StyleSheet.absoluteFillObject]}
      />}
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
        transform: [{ translateY: height * 0.7 }],
        padding: SPACING * 2,
        borderRadius: 16,
      }]}>
        <Text style={{ fontWeight: '900', fontSize: 28 }}> {item.title} </Text>
        <Text style={{ fontWeight: '500', fontSize: 16 }}> {item.location} </Text>
        <Text style={{ fontSize: 12 }}> {item.date} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontWeight: '900',
    fontSize: 28,
  }
});



export default ImageDetails;

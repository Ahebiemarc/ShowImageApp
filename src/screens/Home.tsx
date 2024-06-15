import React, {Children, useCallback, useEffect} from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { DATA } from "../data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/typeRoutes";

const { width, height } = Dimensions.get('screen');

const IMAGE_WIDTH = width * 0.85;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIBLE_ITEM = 4;


const data = [...Array(DATA.length).keys()].map((i) => {
  return{
    key: String(i),
    item: DATA[i],

  }
});





type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;




const Home:React.FC<Props> = ({navigation}) => {
  console.log("home");
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#1e1d1d"}}>
      <StatusBar hidden/>
      <FlatList 
        data={data}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        CellRendererComponent={({index, item, children, style, ...props}) => {
          const newStyles = [
            style,
            {
              zIndex: data.length - index,
              left: -IMAGE_WIDTH / 2,
              top: -IMAGE_HEIGHT / 2,
            }
          ]
          return(
            <View key={index} {...props} style={newStyles}>
              {children}
            </View>
          )
        }}
        renderItem={({item}) => {
          return(
            <View style={{position: 'absolute'}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <Image source={{uri: item.item.poster}} style={styles.image}/>
                <Text style={styles.location}> {item.item.location} </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    image:{
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      resizeMode: 'cover',
      borderRadius: 16,
    },
    location:{
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 36,
      fontWeight: '900'
    }
    
  });

export default Home;
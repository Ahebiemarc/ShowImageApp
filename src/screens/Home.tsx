import React from "react";
import { Animated, Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { DATA } from "../data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/typeRoutes";

const { width, height } = Dimensions.get('screen');


const API_KEY = "4qKNNfKjHtkxW3kOwozvLnCX1eXaxuEkDoqHQt9dbc6Kt9Ves8qubWm6"

const API_URL = "https://api.pexels.com/v1/search?query=twins&orientation=portrait&size=small&per_page=20"

const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPixels = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': API_KEY
      }
    });
    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
  
}




type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;




const Home:React.FC<Props> = ({navigation}) => {

  const [images, setImages] = React.useState(null)
  

  
  React.useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromPixels()
      setImages(images)
      
    }
    fetchImages();
  }, [])

  const topRef = React.useRef<FlatList>(null);
  const thumbRef = React.useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  /*const scrollToActiveIndex = (index: number) =>{
    setActiveIndex(index);
    // scroll the main FlatList
    topRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    // scroll the thumbnail FlatList
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

  }*/

  const scrollToActiveIndex = (index: number) =>{
    setActiveIndex(index)
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    })
     // scroll the thumbnail FlatList
     if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
    
  }




  if (!images) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
        }}
        renderItem={({item}) => {
          return(
            <View style={{width, height}}>
              <Image source={{uri: item.src.portrait}}
                style={[StyleSheet.absoluteFillObject]}
             />
            </View>
          )
        }}
       />
       <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        style={{position: 'absolute',bottom: IMAGE_SIZE,}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return(
              <TouchableOpacity
               activeOpacity={0.8} 
               onPress={() => {scrollToActiveIndex(index)}}
              >
                <Image source={{uri: item.src.portrait}}
                style={{
                  height: IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? "#fff" : "transparent"
                }}
             />
              </TouchableOpacity>
          )
        }}
       />
    </View>
  )
    
}



const styles = StyleSheet.create({
    image:{
    
    },
    location:{
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 36,
      fontWeight: '900'
    }
    
  });

export default Home;
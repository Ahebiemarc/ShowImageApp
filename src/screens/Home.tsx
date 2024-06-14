import React, {useCallback, useEffect}from "react";
import { Animated, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { DATA } from "../data";
import { Directions, FlingGestureHandler, State } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/typeRoutes";

const { width, height } = Dimensions.get('screen');

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

interface OverflowItemsProps {
  data:any;
  scrollXAnimated:Animated.Value;
}

const OverflowItems:React.FC<OverflowItemsProps> = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item:any, index:any) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <Feather
                    name='map-pin'
                    size={16}
                    color='black'
                    style={{ marginRight: 5 }}
                  />
                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};



type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;




const Home:React.FC<Props> = ({navigation}) => {
  console.log("home");
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = useCallback((activeIndex:any) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
              marginTop: 50,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} key={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index: i }) => {
              const inputRange = [i - 1, i, i + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('ImageDetails', {item: DATA[index]})
                  }
                  >
                    <Image
                      source={{ uri: item.poster }}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 14,
                      }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
          <View style={[StyleSheet.absoluteFillObject, {
                backgroundColor: "#fff",
                //top: height * 0.7,
                transform:[{translateY: height}],
                padding: SPACING * 2,
                borderRadius: 16,
             }]} />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: -1,
    },
    location: {
      fontSize: 16,
    },
    date: {
      fontSize: 12,
    },
    itemContainer: {
      height: OVERFLOW_HEIGHT,
      padding: SPACING * 2,
    },
    itemContainerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    overflowContainer: {
      height: OVERFLOW_HEIGHT,
      overflow: 'hidden',
    },
  });

export default Home;
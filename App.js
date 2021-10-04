import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions ,ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  const [city, setCity] = useState("Loading...");    
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  const ask = async() => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if( status !== 'granted') {      
      setOk(false);  
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});    
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false})
    setLocation(location);
    setCity( location[0].city )    
  }

  useEffect(()=>{
    ask();        
  },[])  
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>        
      </View>
      <ScrollView 
        horizontal 
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>       
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>          
      </ScrollView>      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    fontFamily: "-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto",
    backgroundColor:"tomato"
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
  },
  cityName: {
    fontSize: 52,
    fontWeight: "bold",
  },
  weather: {    
    
  },
  day: { 
    width: SCREEN_WIDTH,
    alignItems: "center",    
  },
  temp: {
    margin: 30,
    fontSize: 108,
    fontWeight: "400",
  },
  desc: {
    margin: -40,
    fontSize: 40
  }
})

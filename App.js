import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions ,ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from "expo-location";
import {API_KEY} from "@env"

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function App() { 
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);   

  const getWeather = async() => {
    let {status} = await Location.requestForegroundPermissionsAsync();    
    if( status !== 'granted') {      
      setOk(false);  
    }    
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});    
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false})        
    setCity( location[0].city?location[0].city:location[0].district )    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${API_KEY}`)
    const json = await response.json();    
    setDays(json.daily)
  }

  useEffect(()=>{
    getWeather();        
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
        {days.length === 0?
          (
            <View style={styles.day}>
              <ActivityIndicator color="white" size="large" />
            </View>)
          :
          (
            days.map((day , index)=>
              <View key={index} style={styles.day}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                <Text style={styles.desc}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
            )          
          )
        }
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
  },
  tinyText: {    
    margin: 40,
    fontSize: 20
  }
})

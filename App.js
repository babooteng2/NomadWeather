import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions ,ScrollView, StyleSheet, Text, View } from 'react-native';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
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

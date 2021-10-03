import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>        
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, backgroundColor:"tomato"
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
  },
  cityName: {
    fontSize: 68,
    fontWeight: "900"
  },
  weather: {
    flex: 3,        
  },
  day: {
    flex: 1,
    backgroundColor: "teal",    
    alignItems: "center",    
  },
  temp: {
    margin: 30,
    fontSize: 108
  },
  desc: {
    margin: -40,
    fontSize: 40
  }
})

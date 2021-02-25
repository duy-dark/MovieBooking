import React, { Component } from 'react';  
import {  FlatList, Text, View,TouchableOpacity ,Image} from 'react-native';  
import styles from "../../styles/components/theater/cardtheater"
import { useNavigation } from '@react-navigation/native';
export default function CardTheater (props) {  
    const navigation = useNavigation(); 
  
  
        return (  
            <View style={styles.container}> 
                <FlatList  
                    data={[  
                        {key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'},
                        {key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'},
                        {key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'},
                        {key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'}, 
                         {key1: 'DATN - Truong Chinh ',key2:'L3 - Vincom Plaza, 350 Truong Chinh,Tan Binh'}
               
                    ]}  
                    renderItem={({item}) =>  
                    <TouchableOpacity onPress={()=>navigation.navigate('ScheduleScreen')}>
                    <Text style={{flex: 1}}>
                        
                                 <Image style={styles.image} source={{uri: 'http://loremflickr.com/g/50/50/paris'}}/>
                      <View style={styles.item}>
                      <Text style={{color:'green'}}>{item.key1}</Text>
                        <Text style={{color:'red'}}>{item.key2}</Text>
                        </View>
                    </Text>
                    <View style={styles.separator}/>  
                    </TouchableOpacity> 
                 }        
                      
                />  
            </View>
        );  
    
}  




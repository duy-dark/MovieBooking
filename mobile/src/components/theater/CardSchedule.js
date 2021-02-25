import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions,Text,FlatList,TouchableOpacity ,Image} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import moment from 'moment'

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'white' }]}>
        <FlatList  
                    data={[  
                        {key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
                        time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},
                        {key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
                        time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},
                        {key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
                        time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},
                        {key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
                        time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},
                  
                        
               
                    ]}  
                    renderItem={({item}) =>  
                    <TouchableOpacity >
                    <Text style={{flex: 1,marginLeft:15,marginTop:15}}>
                        
                                 <Image style={styles.image} source={{uri: 'http://loremflickr.com/g/50/50/paris'}}/>
                      <View style={styles.item}>
                      <Text style={{color:'green'}}>{item.key1}</Text>
                      <View style={{ flexDirection: "row"}}>
                      <Text style={{backgroundColor:'red',color:'white',borderRadius:3,borderWidth: 0.2,overflow:"hidden"}}>{item.key2}</Text>
                      <Text> - {item.key3}</Text>
                      </View>
                      </View>
                    </Text>
                    <Text style={{marginLeft:10,marginTop:10,color:'grey'}}>{item.key4}</Text>
                    <View style={{ flexDirection: "row",marginLeft:10}}>
                      {item.time.map(schedule=> {return(
                      <View style={{ flexDirection: "column",flexWrap: 'wrap',backgroundColor:'lightgrey',borderRadius:3,borderWidth: 0.01,overflow:"hidden",padding:8,marginTop:5,marginBottom:10,marginRight:10}}>
                      <Text style={{fontSize:20,textAlign:'center'}}>{schedule.start}</Text>
                      <Text style={{fontSize:10,textAlign:'center'}}>{schedule.end}</Text>
                      </View>)}
                      )}
                    </View>
                    <View style={styles.separator}/>  
                    </TouchableOpacity> 
                 }        
                      
                />  
  </View>
);
 
const days = ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7']
const renderTabBar =(props)=>{
    return (<TabBar
    style={{backgroundColor: 'white', elevation: 0, height:50}}
    labelStyle={{color: 'black', fontSize: 10}}
    {...props}
    indicatorStyle={{backgroundColor: 'white', height: 0.5}}
    />
  
    );
    }
export default function TabSchedule() {
  const [index, setIndex] = useState(0);
  const [routes, setListDate] = useState([])
//   const [routes] = React.useState([
//     { key: 'Th2', title: 'Th2' },
//     { key: 'Th3', title: 'Th3' },
//     { key: 'Th4', title: 'Th4' },
//     { key: 'Th5', title: 'Th5' },
//     { key: 'Th6', title: 'Th6' },
//     { key: 'Th7', title: 'Th7' },
//     { key: 'CN', title: 'CN' },
//   ]);
  
useEffect(() => {
    
    let arr = []
    for(let i = 0; i < 7; i++) {
      let date = moment().add(i, 'day')
      arr.push({
        key: days[date.day()],
        title:days[date.day()] + " "+date.format('DD'),
        date: date.format('DD-MM-YYYY'),
        day: date.format('DD'),
        dayofweek: date.day()
      })
    }
    
    setListDate(arr)
    
  }, [])
  const renderScene = SceneMap({
    Th2: SecondRoute,
    Th3: SecondRoute,
    Th4: SecondRoute,
    Th5: SecondRoute,
    Th6: SecondRoute,
    Th7: SecondRoute,
    CN: SecondRoute,

  });
 

  return (
    <TabView 
    renderTabBar={renderTabBar}
      navigationState={{ index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
     
      initialLayout={{ width: Dimensions.get('window').width }}
      tabStyle={{ width: 'auto', backgroundColor: 'white' }}
      

    />
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  item: {    
      
    marginTop:10,  
    paddingLeft:10,
    borderColor: '#c9c9c9',  
    
    flexWrap: 'wrap', 
},
image: {
  paddingLeft:10,
  borderRadius: 5,
  width: 35,
  height: 45,
},
separator:{  
  height: 0.5,  
  width: "100%",  
  backgroundColor: "lightgrey",  
  marginBottom:0
}
});
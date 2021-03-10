import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {  getListFilmNow,getTheaters,getTickets} from "../../redux/films/actions";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { set } from 'lodash';

export default function Home () {
    const dispatch = useDispatch();
   
    useEffect(() => {
      dispatch(getListFilmNow());
      dispatch((getTheaters()));
      dispatch((getTickets()));
    }, []);
  
    
    const theaters = useSelector((state) => state.films.theaters);
    const filmsNow = useSelector((state) => state.films.filmsNow);
    const tickets = useSelector((state) => state.films.tickets);
  
  
        let theater=theaters.map(item=>({"id":item._id,"name":item.name}))
        let theaterid=theater.map(item=>item.id)
        let hello=theater.map(item=>({...item, money: 0, ticket: 0}))
        tickets.map(item=>{
            let index = theaterid.indexOf(item.film_schedules.theater_id)
            if(theaterid.includes(item.film_schedules.theater_id)){
             hello[index] = {...hello[index], money: item.cost + hello[index].money,ticket:item.count + hello[index].ticket}
            }
      })
 
      let films=filmsNow.map(item=>({"id":item._id,"name":item.name}))
      let filmsid=films.map(item=>item.id)
      let hello1=films.map(item=>({...item, money: 0, ticket: 0}))
      tickets.map(item=>{
          let index = filmsid.indexOf(item.film_schedules.film_id)
          if(filmsid.includes(item.film_schedules.film_id)){
           hello1[index] = {...hello1[index], money: item.cost + hello1[index].money,ticket:item.count + hello1[index].ticket}
          }
    })

    return (
        <div style={{ padding: 20, backgroundColor: 'white'}}>
        <a style={{marginLeft:50}}>THỐNG KÊ THEO RẠP</a>
      <ResponsiveContainer className="chart" height={200}>
        <LineChart 
         width={150} 
         height={200} 
         data={hello}
         margin={{top: 30, right: 30, left: 20, bottom: 5}}
        >
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="ticket" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="money" stroke="#82ca9d" />
        
        </LineChart>
      </ResponsiveContainer>
      <a style={{marginLeft:50}}>THỐNG KÊ THEO PHIM</a>
      <ResponsiveContainer className="chart" height={200}>
        <LineChart 
         width={150} 
         height={200} 
         data={hello1}
         margin={{top: 30, right: 30, left: 20, bottom: 5}}
        >
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="ticket" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="money" stroke="#82ca9d" />
        
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  
}

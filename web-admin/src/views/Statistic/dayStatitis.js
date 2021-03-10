

import React,{ Component , useEffect,useState} from "react";
import CanvasJSReact from './../../assets/canvasjs.react';
import {  Select} from 'antd';
import "./../../styles/statitis/styles.scss"
import { Statistic ,getListFilmNow,getTheaters} from "../../redux/films/actions"
import { useDispatch,useSelector } from "react-redux";
const { Option } = Select;
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const formatdata=(filmsNow,data)=>{
          let films=filmsNow.map(item=>({"id":item._id,"name":item.name}))
      let filmsid=films.map(item=>item.id)
      let hello1=films.map(item=>({...item, money: 0, ticket: 0}))
      data.map(item=>{
          let index = filmsid.indexOf(item.film_schedules.film_id)
          if(filmsid.includes(item.film_schedules.film_id)){
           hello1[index] = {...hello1[index], money: item.cost + hello1[index].money,ticket:item.count + hello1[index].ticket}
          }
    })
    return hello1;
}
const Daystatistic = ()=>{ 
    const [type,setType]=useState(1)
    const [options,setOption]=useState()
    const [data,setData]=useState();
    const dispatch = useDispatch();
    useEffect(()=>{
           
        setOption({...optionDefult, title: { text: "thống kê theo ngày"}})
        dispatch(getListFilmNow());
        dispatch((getTheaters()));
        dispatch(Statistic(1))
        
    }, [])
    const theaters = useSelector((state) => state.films.theaters);
    const filmsNow = useSelector((state) => state.films.filmsNow);
    const getData=useSelector((state) => state.films.statistic);
    let newdata=formatdata(filmsNow,getData)
    useEffect(()=>{
       setData(newdata)
    })
  //  console.log(newdata)
    const optionStatistic = [
        {value : "Ngày", id:1},
        {value : "Tuần",id:2},
       { value : "Tháng",id:3},
       { value : "Năm", id:4}

    ]
		let optionDefult = {
			exportEnabled: true,
			animationEnabled: true,
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 18, label: "Direct" },
					{ y: 49, label: "Organic Search" },
					{ y: 9, label: "Paid Search" },
					{ y: 5, label: "Referral" },
					{ y: 19, label: "Social" }
				]
			}]
        }
        const getstatitis=(value,record)=>{
            
            setType(record.id)
            setOption({...optionDefult, title: { text: "thống kê theo " + record.value}})
                 switch(type) {
                case 1 :
                      dispatch(Statistic(1))
                   
                case 2:
                    dispatch(Statistic(2))
                    
                case 3:
                    dispatch(Statistic(3))
                   
                case 4:
                    dispatch(Statistic(4))
            const newdata= useEffect((state=>state.films.statistic))
                   
        }
    
        // const elementChart = () => {
        //     switch(type) {
        //         case 1 :
        //             return <CanvasJSChart options = {options}	/>
        //         case 2:
        //             return <CanvasJSChart options = {options}	/>
        //         case 3:
        //             return <CanvasJSChart options = {options}	/>
        //         case 4:
        //             return <CanvasJSChart options = {options}	/>
        //     }
        // }
		return (
            <div style={{width:1165}}>
         <Select onChange={getstatitis} options={optionStatistic}/> 
        
		<div   className='statistic'>
            <CanvasJSChart options = {options}	/>
		</div>
        {/* <div style={{display:'none',marginTop:100}} className='weekstatistic'>
			<CanvasJSChart options = {options}	
			/>
		</div>
        <div  style={{display:'none',marginTop:100}} className='monthstatistic'>
			<CanvasJSChart options = {options}	
			/>
		</div>
        <div  style={{display:'none',marginTop:100}} className='yearstatistic'>
			<CanvasJSChart options = {options}	
			/>
		</div> */}
        </div>
		);
        
	}

export default Daystatistic
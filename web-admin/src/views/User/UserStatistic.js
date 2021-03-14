import React, { useState, useEffect } from 'react';
import { getCustomerChart,getListFilmNow } from "../../redux/films/actions"
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom'

import {  Select} from 'antd';
import {CanvasJSChart} from 'canvasjs-react-charts'


const { Option } = Select;
const optionStatistic = [
  {value : "Ngày", id:1},
  {value : "Tuần",id:2},
 { value : "Tháng",id:3},
 { value : "Năm", id:4}

]

    
const failureandsuccess=(filmsNow,failure,success)=>{
     let films=filmsNow.map(item=>({"id":item._id,"name":item.name}))
  let filmsid=films.map(item=>item.id)
  let hello1=[{label:"success",y:0},{label:"falure",y:0}];
  failure.map(item=>{
    let index = filmsid.indexOf(item.film_schedules.film_id)
    if(filmsid.includes(item.film_schedules.film_id)){
      hello1[1].y+=item.count
    }
  })
  success.map(item=>{
    let index = filmsid.indexOf(item.film_schedules.film_id)
    if(filmsid.includes(item.film_schedules.film_id)){
      hello1[0].y+=item.count
    }
  })
  return hello1
}
export default function UserStatistic() {
  
  const dispatch = useDispatch();
 
  const { id } = useParams();
   const filmsNow = useSelector((state) => state.films.filmsNow);
  const customerChart = useSelector((state) => state.films.customerChart)
  console.log(customerChart)
  const [chartDataCompare,setChartDataCompare]= useState([])
 

  useEffect(()=>{
    const {success=[],failure=[]}=customerChart

    if(failure.length>=0 && success.length>0){
    let failarr=failureandsuccess(filmsNow,failure,success)
    failarr=failarr.filter(item=>item.y>0)
    setChartDataCompare(failarr)
    }
  },[customerChart])

  useEffect(() => {
  
    dispatch(getListFilmNow());
  }, [])



  
  const datachart1=
	{
		title: {
			text: ""
		},
		toolTip: {
			shared: true,
			contentFormatter: function (e) {
				var content = " ";
				for (var i = 0; i < e.entries.length; i++) {
					content += e.entries[i].dataPoint.label + " " + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
					content += "<br/>";
				}
				return content;
			}
		},
		axisX: {
			gridColor: "Silver",
	
		},
		axisY: {
			includeZero: false
		},
		data: [
		{
		
			type: "pie",
			showInLegend: true,
			name: "Unique Visits",
			dataPoints: chartDataCompare
		}
		]
  }
const getStatistic = (value,record)=>{

 
  dispatch(getCustomerChart({id: id, type: record.id}))
  
 
  
}
  return (
  
          <div>
            <Select options={optionStatistic} defaultValue={'Ngày'} onChange={getStatistic}/>

          <CanvasJSChart options = {datachart1}/>
          </div>
         
       
  )
}
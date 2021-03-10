import React, { useState, useEffect } from 'react';
import { getTheaterDetail, updateTheater, deleteRoom, getTheaterChart,getListFilmNow } from "../../redux/films/actions"
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import httpFilm from '../../api/films';
import "../../styles/Theater/detail.scss";
import ButtonEdit from '../../components/ButtonEdit'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {  Select} from 'antd';
import {CanvasJSChart} from 'canvasjs-react-charts'
import FormItemInput from 'antd/lib/form/FormItemInput';

const { Option } = Select;
const optionStatistic = [
  {value : "Ngày", id:1},
  {value : "Tuần",id:2},
 { value : "Tháng",id:3},
 { value : "Năm", id:4}

]

    const formatdata=(filmsNow,data)=>{
      let films=filmsNow.map(item=>({"id":item._id,"name":item.name}))
  let filmsid=films.map(item=>item.id)
  let hello1=films.map(item=>({label:item.name, y: 0}))
  data.map(item=>{
      let index = filmsid.indexOf(item.film_schedules.film_id)
      if(filmsid.includes(item.film_schedules.film_id)){
       hello1[index] = {...hello1[index],y:item.count + hello1[index].y}
      }
})

return hello1;
}
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
export default function TheaterDetail() {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const theaterDetail = useSelector((state) => state.films.theaterDetail)
   const filmsNow = useSelector((state) => state.films.filmsNow);
  const theaterChart = useSelector((state) => state.films.theaterChart)
  const [chartData,setChartData]= useState([])
  const [chartDataCompare,setChartDataCompare]= useState([])
 

  useEffect(()=>{
    const {success=[],failure=[]}=theaterChart
    if(success.length>0){
    
    let arr=formatdata(filmsNow,success)
    arr=arr.filter(item=>item.y>0)
    setChartData(arr)
    }
    if(failure.length>0){
    let failarr=failureandsuccess(filmsNow,failure,success)
    failarr=failarr.filter(item=>item.y>0)
    setChartDataCompare(failarr)
    }
  },[theaterChart])
  const [theater, setTheater] = useState({});
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  const [type,setType]=useState(1)
  useEffect(() => {
    dispatch(getTheaterDetail(id))
    dispatch(getTheaterChart({id: id, type: 1}))
    dispatch(getListFilmNow());
  }, [])

  useEffect(() => {
    if (theaterDetail) {
      const { rooms = [] } = theaterDetail
      setTheater(theaterDetail)
      setRooms(rooms)
    }

  }, [theaterDetail])

  const changeFileContent = async (file) => {
    let data = await httpFilm.uploadFile(file)
    if (data.status === 'ok') {
      setTheater({ ...theater, url_image: data.data })
    }
  }

  const submitForm = () => {
    dispatch(updateTheater(theater))
    setIsEdit(false)
  }

  const CancelSubmit = () => {
    setIsEdit(false)
    setTheater(theaterDetail)
  }

  const onDeleteRoom = (id) => {
    dispatch(deleteRoom(id))
  }
  const datachart=
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
		
			type: "column",
			showInLegend: true,
			name: "Unique Visits",
			dataPoints: chartData
		}
		]
  }
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

  setType(record.id)
  dispatch(getTheaterChart({id: id, type: record.id}))
  
 
  
}
  return (
    <div className="layout-detail layout-detail__theater">
      <Tabs className="layout-ddt">
        <TabList className="layout-ddt__header">
          <Tab className="layout-ddt__header__item">Thống kê</Tab>
          <Tab className="layout-ddt__header__item">Thông tin</Tab>
        </TabList>
        <TabPanel className="layout-ddt__content">
          <div style={{width:100}}> 
            <Select options={optionStatistic} defaultValue={'Ngày'} onChange={getStatistic}/>
          </div>
          
          <CanvasJSChart options = {datachart}/>
          
          <div>
          <CanvasJSChart options = {datachart1}/> 
          </div>
        </TabPanel>
        <TabPanel className="layout-ddt__content">
          <div className="theater-detail">
            { !isEdit && (
              <div className="theater-detail__edit">
                <ButtonEdit onEdit={() => setIsEdit(!isEdit)} />
              </div>
            )}
            <div className="form-control theater-detail__content">
              <div className="theater-content__item theater-content__name">
                <label>Name</label>
                { isEdit ? (<input type="text" value={theater.name} onChange={e => setTheater({ ...theater, name: e.target.value })}/>) : (<span>{theater.name}</span>)}
              </div>
              <div className="form-control theater-content__item theater-content__address">
                <label>Address</label>
                { isEdit ? (<input className="form-control" type="text" value={theater.address} onChange={e => setTheater({ ...theater, address: e.target.value })}/>) : (<span>{theater.address}</span>)}
              </div>
              <div className="theater-content__item theater-content__image">
                <label>Image</label>
                <div className="theater-content__image__image">
                  <img src={`${theater.url_image}`} alt=""/>
                  { isEdit && (<input className="" type="file" onChange={e => changeFileContent(e.target.files[0])}/>) }
                </div>
              </div>
              <div className="theater-content__item theater-content__rooms">
                <label>Danh sách Room</label>
                <div className="theater-content__rooms__list">
                  {rooms.length > 0 && rooms.map(room => (
                    <div key={room._id} className="theater-content__rooms__list__item">
                      <Link to={`/room/${room._id}`}>{room.name}</Link>
                      <button onClick={() => onDeleteRoom(room._id)}>delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            { isEdit && (
              <div className="layout-detail__group-btn">
                <button className="btn btn-submit" onClick={submitForm}>Submit</button>
                <button className="btn btn-cancel" onClick={CancelSubmit}>Cancel</button>
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
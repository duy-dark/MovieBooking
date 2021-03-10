import React from "react";
import "../../../styles/customers/blog/blog.scss";
import { Link } from "react-router-dom";

const data = [
  {
    isActive: true,
    img: "https://s3img.vcdn.vn/123phim/2018/09/bhd-star-bitexco-15379552241200.jpg",
    info: {
      highlight: "BHD Star",
      normal: "Bitexco",
    },
    location: "L3-Bitexco Icon 68, 2 Hải Triều, Q.1",
    dates: [
      {
        isActive: true,
        day: "Thứ 2",
        date: "9",
        movies: [
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/tiec-trang-mau-blood-moon-party-16016226514166_60x60.png",
            age: "C18",
            title: "Tiệc Trăng Máu - Blood Moon Party",
            length: "100 phút - TIX 9.3 - IMDb 0",
            version: "2D Digital",
            showtimes: [
              { start: "15:45", end: "17:25" },
              { start: "16:20", end: "18:00" },
              { start: "17:00", end: "18:40" },
              { start: "18:00", end: "19:40" },
              { start: "18:35", end: "21:15" },
              { start: "20:15", end: "21:55" },
              { start: "20:50", end: "22:30" },
              { start: "22:30", end: "00:10" },
              { start: "23:25", end: "01:05" },
            ],
          },
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/ky-nghi-nho-doi-golden-holiday-c16-16028181456988_60x60.png",
            age: "C16",
            title: "Kỳ Nghỉ Nhớ Đời - Golden Holiday",
            length: "106 phút - TIX 7.1 - IMDb 0",
            version: "2D Digital",
            showtimes: [
              { start: "21:15", end: "23:01" },
              { start: "22:45", end: "00:31" },
            ],
          },
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/phu-thuy-phu-thuy-the-witches-p-16030770963055_60x60.png",
            age: "P",
            title: "Phù Thủy, Phù Thủy - The Witches",
            length: "100 phút - TIX 7.9 - IMDb 0",
            version: "2D Digital",
            showtimes: [
              { start: "20:45", end: "" },
              { start: "23:50", end: "" },
            ],
          },
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/nga-quy-tieng-thet-dong-gio-hu-the-ghoul-horror-at-the-howling-field-c18-16038769335966_60x60.png",
            age: "C18",
            title: "Ngạ Quỷ: Tiếng Thét Đồng Gió Hú - The Ghoul: Honnor At The Howling Field",
            length: "112 phút - TIX 5.3 - IMDb 0",
            version: "2D Digital",
            showtimes: [{ start: "23:25", end: "01:17" }],
          },
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/11/nhung-ke-vo-cam-don-t-look-back-c18-16044621624547_60x60.png",
            age: "C18",
            title: "Những kẻ vô cảm",
            length: "90 phút - TIX 6.5 - IMDb 0",
            version: "2D Digital",
            showtimes: [{ start: "15:20", end: "16:50" }],
          },
        ],
      },
      {
        isActive: false,
        day: "Thứ 3",
        date: "10",
        movies: [
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/11/nhung-ke-vo-cam-don-t-look-back-c18-16044621624547_60x60.png",
            age: "C18",
            title: "Những kẻ vô cảm",
            length: "90 phút - TIX 6.5 - IMDb 0",
            version: "2D Digital",
            showtimes: [{ start: "15:20", end: "16:50" }],
          },
        ],
      },
      {
        isActive: false,
        day: "Thứ 4",
        date: "11",
        movies: [
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/nga-quy-tieng-thet-dong-gio-hu-the-ghoul-horror-at-the-howling-field-c18-16038769335966_60x60.png",
            age: "C18",
            title: "Ngạ Quỷ: Tiếng Thét Đồng Gió Hú - The Ghoul: Honnor At The Howling Field",
            length: "112 phút - TIX 5.3 - IMDb 0",
            version: "2D Digital",
            showtimes: [{ start: "23:25", end: "01:17" }],
          },
        ],
      },
      {
        isAcive: false,
        day: "Thứ 5",
        date: "12",
        movies: [
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/phu-thuy-phu-thuy-the-witches-p-16030770963055_60x60.png",
            age: "P",
            title: "Phù Thủy, Phù Thủy - The Witches",
            length: "100 phút - TIX 7.9 - IMDb 0",
            version: "2D Digital",
            showtimes: [
              { start: "20:45", end: "" },
              { start: "23:50", end: "" },
            ],
          },
        ],
      },
      {
        isActive: false,
        day: "Thứ 6",
        date: "13",
        movies: [
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/tiec-trang-mau-blood-moon-party-16016226514166_60x60.png",
            age: "C18",
            title: "Tiệc Trăng Máu - Blood Moon Party",
            length: "100 phút - TIX 9.3 - IMDb 0",
            version: "2D Digital",
            showtimes: [
              { start: "15:45", end: "17:25" },
              { start: "16:20", end: "18:00" },
              { start: "17:00", end: "18:40" },
              { start: "18:00", end: "19:40" },
              { start: "18:35", end: "21:15" },
              { start: "20:15", end: "21:55" },
              { start: "20:50", end: "22:30" },
              { start: "22:30", end: "00:10" },
              { start: "23:25", end: "01:05" },
            ],
          },
        ],
      },
      {
        isActive: false,
        day: "Thứ 7",
        date: "14",
        movies: [
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/ky-nghi-nho-doi-golden-holiday-c16-16028181456988_60x60.png",
            age: "C16",
            title: "Kỳ Nghỉ Nhớ Đời - Golden Holiday",
            length: "106 phút - TIX 7.1 - IMDb 0",
            version: "2D Digital",
            showtimes: [
              { start: "21:15", end: "23:01" },
              { start: "22:45", end: "00:31" },
            ],
          },
        ],
      },
      {
        isActive: false,
        day: "CN",
        date: "15",
        movies: [],
      },
      {
        isActive: false,
        day: "Thứ 2",
        date: "16",
        movies: [
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/phu-thuy-phu-thuy-the-witches-p-16030770963055_60x60.png",
            age: "P",
            title: "Phù Thủy, Phù Thủy - The Witches",
            length: "100 phút - TIX 7.9 - IMDb 0",
            version: "2D Digital",
            showtimes: [
              { start: "20:45", end: "" },
              { start: "23:50", end: "" },
            ],
          },
          {
            img:
              "https://s3img.vcdn.vn/mobile/123phim/2020/10/nga-quy-tieng-thet-dong-gio-hu-the-ghoul-horror-at-the-howling-field-c18-16038769335966_60x60.png",
            age: "C18",
            title: "Ngạ Quỷ: Tiếng Thét Đồng Gió Hú - The Ghoul: Honnor At The Howling Field",
            length: "112 phút - TIX 5.3 - IMDb 0",
            version: "2D Digital",
            showtimes: [{ start: "23:25", end: "01:17" }],
          },
        ],
      },
    ],
  },
  {
    isActive: false,
    img: "https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-thao-dien-15379553942188.jpg",
    info: {
      highlight: "BHD Star",
      normal: "Vincom Thảo Điền",
    },
    location: "L5-Megamall, 159 XL Hà Nội, Q.2",
  },
  {
    isActive: false,
    img: "https://s3img.vcdn.vn/123phim/2018/09/bhd-star-pham-hung-15379533093101.jpg",
    info: {
      highlight: "BHD Star",
      normal: "Phạm Hùng",
    },
    location: "L4-Satra Phạm Hùng, C6/27 Phạm Hùng, Bình Chánh",
  },
  {
    isActive: false,
    img: "https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-quang-trung-15379536724871.jpg",
    info: {
      highlight: "BHD Star",
      normal: "Vincom Quang Trung",
    },
    location: "B1-Vicom QT, 190 Quang Trung, Gò Vấp",
  },
  {
    isActive: false,
    img: "https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-le-van-viet-15379553262189.jpg",
    info: {
      highlight: "BHD Star",
      normal: "Vincom Lê Văn Lương",
    },
    location: "L4-Vincom Plaza, 50 Lê Văn Liệt, Q.9",
  },
  {
    isActive: false,
    img: "https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-3-2-15379527367766.jpg",
    info: {
      highlight: "BHD Star",
      normal: "Vincom 3/2",
    },
    location: "L5-Vincom Plaza, 3C Đường 3/2, Q.10",
  },
];
export function Movie(props) {
  const showtimes = props.showtimes.map((showtime, i) => (
    <a className="listTypeTime__session" key={i} href="/#">
      <span>
        <span className="listTypeTime__session__startTime">{showtime.start} </span>~ {showtime.end}
      </span>
    </a>
  ));
  return (
    <div className="blog__movies__wrapMovie">
      <div className="wrapMovie__infoMovie">
        <img src={props.img} alt="" />
        <div className="wrapMovie__infoMovie__wrapInfo">
          <p>
            <span className={props.age === "P" ? "wrapInfo__age green" : "wrapInfo__age"}>{props.age}</span>
            <span className="wrapInfo__title">{props.title}</span>
          </p>
          <p className="wrapInfo__time">{props.length}</p>
        </div>
      </div>
      <div className="wrapMovie__sessions">
        <div className="wrapMovie__sessions__listTypeTime">
          <div className="listTypeTime__version">{props.version}</div>
          <div>{showtimes}</div>
        </div>
      </div>
    </div>
  );
}

export function Date(props) {
  return (
    <div
      key={props.key}
      className={props.isActive ? "dayOfWeek__date active" : "dayOfWeek__date"}
      onClick={props.onClick}
    >
      <p>{props.day}</p>
      <p>{props.date}</p>
    </div>
  );
}

function Theater(props) {
  return (
    <li key={props.key}>
      <Link to={props.to} className={props.isActive ? "blog__theaters__theater active" : "blog__theaters__theater"}>
        <img src={props.img} alt="" />
        <span className="theater__name">
          {props.info.highlight} - {props.info.normal}
        </span>
        <span className="theater__location">{props.location}</span>
      </Link>
    </li>
  );
}

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      theaterSelected: 0,
      dateSelected: 0,
    };
  }
  // handleClickTheater(i) {
  //     const data = this.state.data.slice();
  //     const pre = this.state.theaterSelected;
  //     data[pre].isActive = !data[pre].isActive
  //     data[i].isActive = !data[i].isActive
  //     this.setState ({
  //         data: data,
  //         theaterSelected: i,
  //     });
  // }
  handleClickDate(i) {
    const data = this.state.data.slice();
    const theaterSelected = this.state.theaterSelected;
    const preDateSelected = this.state.dateSelected;
    data[theaterSelected].dates[preDateSelected].isActive = !data[theaterSelected].dates[preDateSelected].isActive;
    data[theaterSelected].dates[i].isActive = !data[theaterSelected].dates[preDateSelected].isActive;
    this.setState({
      data,
      dateSelected: i,
    });
  }
  render() {
    const theaters = this.state.data.slice();
    const showTheaters = theaters.map((theater, i) => (
      <Theater
        key={i}
        to="/blog"
        isActive={theater.isActive}
        img={theater.img}
        info={theater.info}
        location={theater.location}
        //onClick = {() => this.handleClickTheater(i)}
      />
    ));
    const currentTheater = this.state.theaterSelected;
    const datePanel = theaters[currentTheater].dates.slice();
    const showDatePanel = datePanel.map((d, i) => (
      <Date key={i} isActive={d.isActive} day={d.day} date={d.date} onClick={() => this.handleClickDate(i)} />
    ));
    const currentDate = this.state.dateSelected;
    const movies = datePanel[currentDate].movies.slice();
    const showMovies = movies.map((movie, i) => (
      <Movie
        key={i}
        img={movie.img}
        age={movie.age}
        title={movie.title}
        length={movie.length}
        version={movie.version}
        showtimes={movie.showtimes}
      />
    ));
    return (
      <div className="blog">
        <ul className="blog__theaters">{showTheaters}</ul>
        <div className="blog__datePanel">
          <div className="blog__datePanel__dayOfWeek">{showDatePanel}</div>
        </div>
        <div className="blog__movies">{showMovies}</div>
      </div>
    );
  }
}
export default Blog;

import React, { useState } from 'react';
import SubBlog from '../blog/SubBlog';
import '../../../styles/customers/film/film.scss';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const data =
    {
    id: 1,
    name: "Phù thủy, Phù thủy - The Witches",
    age: "P",
    img: "https://s3img.vcdn.vn/mobile/123phim/2020/10/phu-thuy-phu-thuy-the-witches-p-16030770963055_215x318.png",
    background: "https://s3img.vcdn.vn/123phim/2020/11/phu-thuy-phu-thuy-the-witches-p-16046330384980.png",
    long_time: 106,
    start_date: "20-11-2020",
    actors: "Stanley Tucci, Octavia Spencer, Anne Hathaway",
    genre: "Fantasy",
    directors: "Robert Zemeckis",
    digitals : "2D/digital",
    countries: "Mỹ",
    content: "Trong chuyến đi chơi cùng bà, một cậu bé 7 tuổi vô tình lọt vào hội nghị của các phù thủy và bị Phù Thủy Tối Thượng biến thành chuột bằng một loại thuốc đặc biệt. Đây cũng chính là chất độc ả định dùng để biến tất cả trẻ em thành loài gặm nhấm. Cùng với bà mình, cậu bé phải tìm mọi cách trở lại hình dạng thật và đánh bại âm mưu của binh đoàn Phù Thủy",
    time_start: "11/20/2020 5:50 AM",
    time_end: "11/20/2015 6:50 AM"
    }


function FullInfo(props) {
    return (
        <div className="film__fullInfo">
            <div className="film__fullInfo__col">
                <div className="col__row">
                    <p className="col__row__contentTitle">Ngày công chiếu</p>
                    <p className="col__row__contentInfo">{props.start_date}</p>
                </div>
                <div className="col__row">
                    <p className="col__row__contentTitle">Đạo diễn</p>
                <p className="col__row__contentInfo">{props.directors}</p>
                </div>
                <div className="col__row">
                    <p className="col__row__contentTitle">Diễn viên</p>
                    <p className="col__row__contentInfo">{props.actors}</p>
                </div>
                <div className="col__row">
                    <p className="col__row__contentTitle">Thể loại</p>
                    <p className="col__row__contentInfo">{props.genre}</p>
                </div>
                <div className="col__row">
                    <p className="col__row__contentTitle">Định dạng</p>
                    <p className="col__row__contentInfo">{props.digitals}</p>
                </div>
                <div className="col__row">
                    <p className="col__row__contentTitle">Quốc gia SX</p>
                    <p className="col__row__contentInfo">{props.countries}</p>
                </div>
            </div>
            <div className="film__fullInfo__col">
                <p style={{fontWeight: "bold"}}>Nội dung</p>
                <br/>
                <p>{props.content}</p>
            </div>
        </div>
    );
}

function Review(props) {
    return (
        <div className="film__review">
            <div className="film__review__listComment">
                <div className="listComment__comment">
                    <div className="listComment__comment__info">
                        <div className="comment__info__reviewer">
                            <div className="info__reviewer__icon">
                                <img src="https://lh3.googleusercontent.com/a-/AOh14GhZNA6Q3DT4HMi4kQ05rOUd3NwZe0KX0p7Rpz0e5Q=s96-c" alt="icon"/>
                                <img src="https://tix.vn/app/assets/img/icons/zalo.svg" alt="icon"
                                className="icon"/>
                            </div>
                            <div className="info__reviewer__name">
                                <p>Hứa Thanh Sơn</p>
                                <p className="reviewer__name__time">3 ngày trước</p>
                            </div>
                        </div>
                        <div className="comment__info__star">
                            <div className="info__star__core">
                                <p>9</p>
                            </div>
                            <div className="info__star__amount">
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.2.png" alt="half"/>
                            </div>
                        </div>
                    </div>
                    <div className="listComment__comment__content">
                        <p>Phim rất hay, nội dung hấp dẫn</p>
                    </div>
                    <div className="listComment__comment__like">
                        <img src="https://tix.vn/app/assets/img/icons/like.png" alt="like"/>
                        <span><strong>0 </strong>Thích</span>
                    </div>
                </div>
                <div className="listComment__comment">
                    <div className="listComment__comment__info">
                        <div className="comment__info__reviewer">
                            <div className="info__reviewer__icon">
                                <img src="https://lh3.googleusercontent.com/a-/AOh14GhZNA6Q3DT4HMi4kQ05rOUd3NwZe0KX0p7Rpz0e5Q=s96-c" alt="icon"/>
                                <img src="https://tix.vn/app/assets/img/icons/zalo.svg" alt="icon"
                                className="icon"/>
                            </div>
                            <div className="info__reviewer__name">
                                <p>Hứa Thanh Sơn</p>
                                <p className="reviewer__name__time">3 ngày trước</p>
                            </div>
                        </div>
                        <div className="comment__info__star">
                            <div className="info__star__core">
                                <p>9</p>
                            </div>
                            <div className="info__star__amount">
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.2.png" alt="half"/>
                            </div>
                        </div>
                    </div>
                    <div className="listComment__comment__content">
                        <p>Phim rất hay, nội dung hấp dẫn</p>
                    </div>
                    <div className="listComment__comment__like">
                        <img src="https://tix.vn/app/assets/img/icons/like.png" alt="like"/>
                        <span><strong>0 </strong>Thích</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

class Film extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
    }
    handleClickComment() {
        const window = document.getElementById("window");
        window.style.display = "block";
    }
    handleClickClose() {
        const window = document.getElementById("window");
        window.style.display = "none";
    }
    render() {
        const theater = this.state.data;
        return (
            <div className="film">
               <div className="film__info">
                    <img src={theater.background} alt="background"/>
                    <button className="film__info__btnHidden">
                        <img src="https://tix.vn/app/assets/img/icons/play-video.png" alt="play"/>
                    </button>
                    <div className="film__info__detail">
                        <div className="detail__poster" style={{backgroundImage: "url(" + theater.img +")"}}>
                            <button>
                                <img src="https://tix.vn/app/assets/img/icons/play-video.png" alt="play"/>
                            </button>
                        </div>
                        <div className="detail__content">
                            <div>
                                <span>{theater.start_date}</span>
                            </div>
                            <div>
                                <span className="detail__content__title">
                                    <span className={theater.age === 'P' ? "title__highlight green" : "title__highligh"}>{theater.age}</span>
                                    <span>{theater.name}</span>
                                </span>
                            </div>
                            <div>
                                <span>{theater.long_time} phút - 0 IMDb - {theater.digitals}</span>
                            </div>
                            <button className="detail__content__btnbuyticket">Mua vé</button>
                        </div>
                        <div className="detail__review">
                            <svg height="126" width="126" viewBox="0 0 33.83098862 33.83098862">
                                <circle cx="16.91549431" cy="16.91549431" r="15.91549431" stroke="#3a3a3a" stroke-width="2" fill="rgba(0,0,0,.4)"/>
                                <circle cx="16.91549431" cy="16.91549431" r="15.91549431" stroke="#7ed321" stroke-width="2" fill="none" strokeDasharray="88,100" strokeLinecap="round"
                                className="detail__review__circle"/>
                                <g>
                                    <text x="16.91549431" y="15.5" alignmentBaseline="central" textAnchor="middle" font-size="16" fill="#fff">8.8</text>
                                </g>
                            </svg>
                            <div className="detail__review__star">
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star"/>
                                <img src="https://tix.vn/app/assets/img/icons/star1.2.png" alt="half"/>
                            </div>
                            <div style={{margin: "20px 0"}}>0 người đánh giá</div>
                        </div>
                    </div>
               </div>
               <Tabs defaultActiveKey="showtimes" id="controlled"  className="film__nav">
                    <Tab eventKey="showtimes" title="Lịch chiếu" tabClassName="film__nav__tab">
                        <SubBlog/>
                    </Tab >
                    <Tab eventKey="infomation" title="Thông tin" tabClassName="film__nav__tab">
                        <FullInfo
                            id = {theater.id}
                            name = {theater.name}
                            age = {theater.age}
                            img = {theater.img}
                            background = {theater.background}
                            long_time = {theater.long_time}
                            start_date = {theater.start_date}
                            actors = {theater.actors}
                            genre = {theater.genre}
                            directors = {theater.directors}
                            digitals = {theater.digitals}
                            countries = {theater.countries}
                            content = {theater.content}
                            time_start = {theater.time_start}
                            time_end = {theater.time_end}
                        />
                    </Tab >
                    <Tab eventKey="review" title="Đánh giá" tabClassName="film__nav__tab">
                        <div className="film__review">
                            <div className="film__review__comment" onClick={()=>this.handleClickComment()}>
                                <span className="review__comment__imgReview"><img src="https://tix.vn/app/assets/img/avatar.png" alt="avatar"/></span>
                                <input type="text" placeholder="Bạn nghĩ gì về phim này?"/>
                                <span class="review__comment_imgReviewStar"><img src="https://tix.vn/app/assets/img/icons/listStar.png" alt="star"/></span>
                            </div>
                            <Review />
                        </div>
                    </Tab >
                </Tabs>
               <div className="film__window" id="window" onClick={() => this.handleClickClose()}>
                    <div className="film__window__signIn">
                        <span className="signIn__close" onClick={() => this.handleClickClose()}>&times;</span>
                        <p>Bạn cần phải đăng nhập.</p>
                        <a href="/login">Đăng nhập</a>
                    </div>
               </div>
            </div>

        );
    }
}

export default Film;

import React from 'react';
import './Footer.css';

function Footer(){
    return (
        <div>

        <div className="container">
        <div className="row">
        <div className="col-sm-3 col-xs-3 footer__left hideOnMobile1">
            <p className="footer__title ">TIX</p>
            <div className="row">
                <div className="col-sm-6 ">
                <div>
                <a target="_blank" href="https://google.com.vn" >FAQ</a>
                </div>
                <div>
                <a target="_blank" href="https://google.com.vn" >Brand Guideliness</a>
                </div>
                </div>

                <div className="col-sm-6">
                <div>
                <a target="_blank" href="https://google.com.vn" >Thỏa thuận sử dụng</a>
                </div>
                <div>
                <a target="_blank" href="https://google.com.vn" >Chính sách bảo mật</a>
                </div>
                </div>
            </div>
        </div>
        <div className="col-sm-3 col-xs-3 footer__center hideOnMobile1">
            <p className="footer__title" >ĐỐI TÁC</p>
            <div className="row">
                <div className="col-sm-12">
                    <div>
                    <a target="_blank" href="https://portal.vietcombank.com.vn/Pages/Home.aspx" >
                        <img className="footer__icon__up" src={require('./imgFooter/VCB.png')} alt="image1"></img>
                    </a>
                    <a target="_blank" href="https://www.agribank.com.vn/" >
                        <img className="footer__icon__up" src={require('./imgFooter/AGRIBANK.png')} alt="image2"></img>
                    </a>
                    <a target="_blank" href="https://www.vietinbank.vn/web/home/vn/index.html" >
                        <img className="footer__icon__up" src={require('./imgFooter/VIETTINBANK.png')} alt="image3"></img>
                    </a>
                    <a target="_blank" href="https://zalopay.vn/" >
                        <img className="footer__icon__up" src={require('./imgFooter/zalopay_icon.png')} alt="image5"></img>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-sm-3 col-xs-3 footer__right">
            <p className="footer__title">MOBILE APP</p>
            <a target="_blank" href="https://google.com.vn" >
                <img className="footer__icon__up" src={require('./imgFooter/apple-logo.png')} alt="logo"></img>
            </a>
            <a target="_blank" href="https://google.com.vn" >
                <img className="footer__icon__up" src={require('./imgFooter/android-logo.png')} alt="logo2"></img>
            </a>

        </div>
        <div className="col-sm-3 col-xs-3 footer__right">
            <p className="footer__title">SOCIAL</p>
            <a target="_blank" href="https://google.com.vn" >
                <img className="footer__icon__up" src={require('./imgFooter/facebook-logo.png')} alt="image6"></img>
            </a>
            <a target="_blank" href="https://google.com.vn" >
                <img className="footer__icon__up" src={require('./imgFooter/zalo-logo.png')} alt="image7"></img>
            </a>
        </div>
        </div>

        <div>
        <hr />
        </div>
        <div>
        <div className="row">

        <div className="col-sm-3 footer__center">
        <a target="_blank" href="https://google.com.vn" >
                <img className="footer__icon__down" src={require('./imgFooter/zion-logo.jpg')} alt="image8"></img>
            </a>
        </div>
        <div className="col-sm-6 footer__center">
        <span className="footer__title">
        MovieBooking – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
        </span>

        <div className="footer__address">
        Địa chỉ: 227 Nguyễn Văn Cừ, Quận 5, Tp. Hồ Chí Minh, Việt Nam.
        <br/>
        Giấy chứng nhận đăng ký kinh doanh số: 01927390128,
        <br/>
        đăng ký thay đổi lần thứ 10, ngày 22 tháng 12 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
        <br/>
        Số Điện Thoại (Hotline): 1900 9999
        <br/>
        Email: <a className="footer__icon" href="mailto:support@tix.vn">support@moviebooking.vn</a>
        </div>
        </div>
        <div className="col-sm-3 footer__center">
        <a target="_blank" href="https://google.com.vn" >
                <img className="footer__icon__down" src={require('./imgFooter/d1e6bd560daa9e20131ea8a0f62e87f8.png')} alt="image9"></img>
        </a>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Footer;

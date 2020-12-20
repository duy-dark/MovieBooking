import React from "react";
import "../../../../styles/customers/news/detail.scss";
export default function PostContainer(props) {
  return (
    <>
      <div ui-view="" class="ng-scope">
        <div class="container ng-scope" id="detailNews">
          <div class="row">
            <div class="col-sm-12 title">
              <p class="ng-binding">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</p>
              <div class="author ng-binding ng-scope" ng-if="!isMobile">
                TÁC GIẢ <span class="ng-binding"></span> 18.11.20
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 count">
              <div
                class="wrapIcon like wrapIconLike"
                data-type="1"
                data-id="7960"
                ng-click="likeAction($event, news, keyCache)"
              >
                <img
                  class="iconFacebook postLike"
                  ng-src="app/assets/img/icons/like.png"
                  src="app/assets/img/icons/like.png"
                />
                <span class="amount like ng-binding">0 LIKES</span>
              </div>
              <div class="wrapIcon wrapIconComment" ng-click="cmt()">
                <img class="iconFacebook" src="app/assets/img/icons/comment.png" ng-click="cmt()" />
                <span class="amount ng-binding">0 BÌNH LUẬN</span>
              </div>
              <div class="wrapIcon wrapIconShare" ng-click="shareNews()">
                <img class="iconFacebook" src="app/assets/img/icons/sharing-icon.png" />
                <span class="amount share ng-binding">0 CHIA SẺ</span>
              </div>
            </div>
          </div>

          {/* Text to html , html-react-parser ``  */}
          <div class="row">
            <div class="col-sm-12 content ng-binding" ng-bind-html="newsContent">
              <p>
                <em>
                  Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống ảo độc-lạ-chill nhất từ trước đến giờ sẽ
                  chính thức khai trương tại 360 Giải Phóng!&nbsp;
                </em>
              </p>

              <p>
                Beta Cinemas Giải Phóng sở hữu phong cách khác với bất kỳ rạp chiếu phim nào bạn từng thấy, với không
                gian phá cách, tông màu cực kỳ bắt mắt và đặc biệt là góc checkin “xịn xò”, hứa hẹn mang đến những bức
                ảnh “sống ảo” để đời.
              </p>

              <p>
                <img src="https://s3img.vcdn.vn/123phim/2020/11/0178533e596599f3ac3a1e01088e5859.jpg" />
              </p>

              <p>
                <img src="https://s3img.vcdn.vn/123phim/2020/11/471e39c53310e598d8a41b09e143e001.jpg" />
              </p>

              <p>
                Ngoài không gian độc nhất vô nhị, Beta Cinemas Giải Phóng&nbsp;sở hữu tổng cộng 6&nbsp;phòng chiếu tương
                đương gần&nbsp;700&nbsp;ghế ngồi.&nbsp;Tất cả trang thiết bị đều được đặt theo tiêu chuẩn Hollywood 100%
                nhập khẩu từ nước ngoài, với hệ thống âm thanh Dolby 7.1. Hãy yên tâm rằng mỗi thước phim bạn xem đều là
                thước phim sắc nét, sống động nhất.
              </p>

              <p>
                <img
                  src="https://s3img.vcdn.vn/123phim/2020/11/1fa693a9170d38d1f4e4b304bc45dc7e.jpg"
                  // style="heigth:auto; width:auto"
                />
              </p>

              <p>
                <img
                  src="https://s3img.vcdn.vn/123phim/2020/11/595b2227b19c8ab61481ab70d87e4b79.jpg"
                  // style="heigth:auto; width:auto"
                />
              </p>

              <p>
                Về mức giá, Beta Cinemas hoàn toàn phù hợp với các bạn học sinh, sinh viên, mới đi làm. Hàng tuần, rạp
                đều có các chương trình khuyến mãi như Thứ 3 vui vẻ (đồng giá 50k vé xem phim), Mad Sale Day (ưu đãi
                khủng vào thứ 2 đầu tiên hàng tháng, đồng giá vé chỉ từ 50k và tặng 1 bỏng), Beta Ten (xem phim sớm
                khuya), ưu đãi dành cho HSSV - đồng giá vé 50k cả tuần.
              </p>

              <p>
                <img
                  src="https://s3img.vcdn.vn/123phim/2020/11/88821eda929e2b5f8b85f59f458a7b28.jpg"
                  // style="heigth:auto; width:auto"
                />
              </p>

              <p>
                Nhân dịp khai trương, từ ngày<strong> 20/11 </strong>đến<strong> 30/11/2020</strong>, Beta Cinemas sẽ có
                3 Ưu đãi cực khủng dành riêng cho rạp Giải Phóng:
              </p>

              <ol>
                <li>
                  Đổi bim bim lấy vé xem phim: Một gói bimbim đổi được một vé xem phim, áp dụng với các phim: Bán Đảo,
                  Do You See Me, Leo DaVinci, Kế Hoạch Đổi Chồng.
                </li>
                <li>Combo Gấu mập: Với giá chỉ 56k bao gồm 1 Bắp 32oz và 1 vé xem phim.</li>
                <li>
                  Chụp ảnh Check in tự tin nhận quà: Khi khách đến rạp Beta Giải Phóng chụp ảnh check in địa điểm post
                  social media (Facebook, Instagram) sẽ được bốc thăm nhận quà hấp dẫn
                </li>
              </ol>

              <p>
                <img
                  src="https://s3img.vcdn.vn/123phim/2020/11/138d5dd120fa9f093008ea169d9ab0c6.jpg"
                  // style="heigth:auto; width:auto"
                />
              </p>

              <p>
                Không gian mới mẻ, chất lượng quốc tế, giá vé cực “nhẹ”. Chần chừ gì nữa mà không lên lịch hẹn hò thử
                ngay “món lạ” các bạn ơi!
              </p>

              <p>
                Địa chỉ: Tầng 3, IP2 toà Imperial, 360 Giải Phóng, Phương Liệt, Thanh Xuân, Hà Nội (ngã 3 Định Công -
                Giải Phóng)
              </p>

              <p>
                <em>Hotline: 0585 680 360</em>
              </p>

              <p>-----------------------------</p>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 line">
              <hr />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div id="detailReviewer">
                <div class="row isFlex detailMainStyle">
                  <div
                    class="col-sm-12 col-xs-12 dadInputReviewer dadInputReviewerNews newDesign"
                    ng-click="openCommentBox()"
                  >
                    <span class="imgReviewer">
                      <img ng-if="!user.user_id" src="app/assets/img/avatar.png" class="ng-scope" />
                    </span>
                    <input
                      class="inputReviwer"
                      type="text"
                      placeholder="Bạn nghĩ gì về bài viết này?"
                      readonly="readonly"
                    />
                  </div>
                </div>

                <div id="listComment"></div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 line">
              <hr />
            </div>
          </div>

          <div class="row list">
            <div class="col-sm-4 col-xs-12 film left">
              <div
                class="film13 showingDetailNews newsBigThumb"
                ng-click="showingDetailNews(first_related.news_slug, first_related.type_id)"
                data-id="7958"
              >
                <a href="/khuyen-mai/7958-bhd-59k-ve-ca-tuan">
                  <img
                    ng-src="https://s3img.vcdn.vn/123phim/2020/11/bhd-59k-ve-ca-tuan-16045659414321.jpg"
                    src="https://s3img.vcdn.vn/123phim/2020/11/bhd-59k-ve-ca-tuan-16045659414321.jpg"
                  />
                </a>
              </div>
              <div
                class="title13 showingDetailNews"
                ng-click="showingDetailNews(first_related.news_slug, first_related.type_id)"
                data-id="7958"
              >
                <p>
                  <a href="/khuyen-mai/7958-bhd-59k-ve-ca-tuan" class="ng-binding">
                    BHD 59K/VÉ CẢ TUẦN !!!
                  </a>
                </p>
              </div>
              <div class="info ng-binding">
                Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim
                trên ZaloPay.
              </div>
              <div class="row col-sm-12 col-xs-12 blockIconFacebook">
                <div
                  class="wrapIcon like"
                  data-type="1"
                  data-id="7958"
                  ng-click="likeAction($event, first_related, keyCache)"
                >
                  <img
                    class="iconFacebook postLike"
                    ng-src="app/assets/img/icons/like.png"
                    src="app/assets/img/icons/like.png"
                  />
                  <p class="amount like ng-binding">0</p>
                </div>

                <div class="wrapIcon">
                  <a
                    ui-sref="main.detailNews({slug: first_related.news_slug, tab: 'comment'})"
                    ng-click="showingDetailNews(first_related.news_slug, first_related.type_id)"
                    href="/goc-dien-anh/7958-bhd-59k-ve-ca-tuan?tab=comment"
                  >
                    <img class="iconFacebook postCmt" data-id="7958" src="app/assets/img/icons/comment.png" />
                    <p class="amount comment ng-binding">0</p>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12 film center">
              <div
                class="film13 showingDetailNews newsBigThumb"
                ng-click="showingDetailNews(second_related.news_slug, second_related.type_id)"
                data-id="7957"
              >
                <a href="/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                  <img src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043752411629.png" />
                </a>
              </div>
              <div
                class="title13 showingDetailNews"
                ng-click="showingDetailNews(second_related.news_slug, second_related.type_id)"
                data-id="7957"
              >
                <p>
                  <a
                    href="/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu"
                    class="ng-binding"
                  >
                    Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công chiếu{" "}
                  </a>
                </p>
              </div>
              <div class="info ng-binding">
                Sau 2 tuần ra mắt, Tiệc Trăng Máu chính thức gia nhập câu lạc bộ phim điện ảnh đạt 100 tỷ đồng doanh thu
                phòng vé. Dàn ngôi sao “bạc tỷ” của phim cũng lần đầu tiên hội tụ đầy đủ trong một khung hình để ăn mừng
                thành tích ấn tượng của tác phẩm.{" "}
              </div>
              <div class="row col-sm-12 col-xs-12 blockIconFacebook">
                <div
                  class="wrapIcon like"
                  data-type="1"
                  data-id="7957"
                  ng-click="likeAction($event, second_related, keyCache)"
                >
                  <img
                    class="iconFacebook postLike"
                    ng-src="app/assets/img/icons/like.png"
                    src="app/assets/img/icons/like.png"
                  />
                  <p class="amount like ng-binding">1</p>
                </div>

                <div class="wrapIcon">
                  <a
                    ui-sref="main.detailNews({slug: second_related.news_slug, tab: 'comment'})"
                    ng-click="showingDetailNews(second_related.news_slug, second_related.type_id)"
                    href="/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu?tab=comment"
                  >
                    <img class="iconFacebook postCmt" data-id="7957" src="app/assets/img/icons/comment.png" />
                    <p class="amount comment ng-binding">0</p>
                  </a>
                </div>
              </div>
            </div>
            <div
              class="col-sm-4 col-xs-12 film right ng-scope"
              ng-repeat="news in list_related.slice(numstart, numend)"
              ng-init="$last &amp;&amp; removeLoading()"
            >
              <div class="row wrapNewsRight">
                <a href="/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                  <div
                    class="col-sm-3 col-xs-2 filmSquare showingDetailNews"
                    ng-click="showingDetailNews(news.news_slug, news.type_id)"
                    data-id="7956"
                  >
                    <img
                      ng-src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                      src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                    />
                  </div>
                </a>
                <div
                  class="col-sm-9 col-xs-10 infoTextRight showingDetailNews"
                  ng-click="showingDetailNews(news.news_slug, news.type_id)"
                  data-id="7956"
                >
                  <a href="/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman"></a>
                  <div class="twoLineRight">
                    <a href="/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman"></a>
                    <p>
                      <a href="/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman"></a>
                      <a
                        href="/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman"
                        class="ng-binding"
                      >
                        NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ TRANG PHỤC CHO SIÊU ANH HÙNG ĐẦU TIÊN CỦA
                        VIỆT NAM – VINAMAN
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-sm-4 col-xs-12 film right ng-scope"
              ng-repeat="news in list_related.slice(numstart, numend)"
              ng-init="$last &amp;&amp; removeLoading()"
            >
              <div class="row wrapNewsRight">
                <a href="/khuyen-mai/7955-tix-1k-ve-ngai-chi-gia-ve">
                  <div
                    class="col-sm-3 col-xs-2 filmSquare showingDetailNews"
                    ng-click="showingDetailNews(news.news_slug, news.type_id)"
                    data-id="7955"
                  >
                    <img
                      ng-src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662665638.jpg"
                      src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662665638.jpg"
                    />
                  </div>
                </a>
                <div
                  class="col-sm-9 col-xs-10 infoTextRight showingDetailNews"
                  ng-click="showingDetailNews(news.news_slug, news.type_id)"
                  data-id="7955"
                >
                  <a href="/khuyen-mai/7955-tix-1k-ve-ngai-chi-gia-ve"></a>
                  <div class="twoLineRight">
                    <a href="/khuyen-mai/7955-tix-1k-ve-ngai-chi-gia-ve"></a>
                    <p>
                      <a href="/khuyen-mai/7955-tix-1k-ve-ngai-chi-gia-ve"></a>
                      <a href="/khuyen-mai/7955-tix-1k-ve-ngai-chi-gia-ve" class="ng-binding">
                        TIX 1K/VÉ NGẠI CHI GIÁ VÉ
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-sm-4 col-xs-12 film right ng-scope"
              ng-repeat="news in list_related.slice(numstart, numend)"
              ng-init="$last &amp;&amp; removeLoading()"
            >
              <div class="row wrapNewsRight">
                <a href="/khuyen-mai/7954-dong-gia-1k-ve-khi-mua-ve-qua-tix">
                  <div
                    class="col-sm-3 col-xs-2 filmSquare showingDetailNews"
                    ng-click="showingDetailNews(news.news_slug, news.type_id)"
                    data-id="7954"
                  >
                    <img
                      ng-src="https://s3img.vcdn.vn/123phim/2020/09/dong-gia-1k-ve-khi-mua-ve-qua-tix-16010092709537.png"
                      src="https://s3img.vcdn.vn/123phim/2020/09/dong-gia-1k-ve-khi-mua-ve-qua-tix-16010092709537.png"
                    />
                  </div>
                </a>
                <div
                  class="col-sm-9 col-xs-10 infoTextRight showingDetailNews"
                  ng-click="showingDetailNews(news.news_slug, news.type_id)"
                  data-id="7954"
                >
                  <a href="/khuyen-mai/7954-dong-gia-1k-ve-khi-mua-ve-qua-tix"></a>
                  <div class="twoLineRight">
                    <a href="/khuyen-mai/7954-dong-gia-1k-ve-khi-mua-ve-qua-tix"></a>
                    <p>
                      <a href="/khuyen-mai/7954-dong-gia-1k-ve-khi-mua-ve-qua-tix"></a>
                      <a href="/khuyen-mai/7954-dong-gia-1k-ve-khi-mua-ve-qua-tix" class="ng-binding">
                        ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX{" "}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row isFlex text-center ViewMoreNews ng-scope" ng-if="list_related.length > 4">
            <button id="btnNewsRelated" class="btnViewMore" ng-click="viewMoreNews()">
              XEM THÊM
            </button>
          </div>
        </div>

        <div class="row ng-scope">
          <div class="col-sm-12 block light" id="detailMain">
            <div
              class="overlay ng-hide"
              id="overlay-book"
              ng-hide="hideOverlayBook"
              // style="display: block;"
            >
              <div
                class="model glx-container"
                // style="margin-top: -166.5px;"
              >
                <div class="row closeOver">
                  <img ng-click="closeCommentBox()" src="app/assets/img/icons/xController.png" />
                </div>
                <div class="row incomment">
                  <textarea
                    rows="2"
                    class="inputComment ng-pristine ng-untouched ng-valid ng-empty"
                    ng-model="inputCmt"
                    placeholder="Nói cho mọi người biết bạn nghĩ gì về bài viết này..."
                  ></textarea>
                  <div class="error ng-binding"></div>
                </div>
                <div class="row listbutton commentFrame">
                  <input type="file" id="Upload" multiple="" />
                  <button
                    class="buttonCenter buttonChoseMedia"
                    // style="float: left"
                    ng-click="Upload()"
                  >
                    <img class="buttonMedia" src="app/assets/img/icons/buttonMedia.png" />
                    Ảnh/Video
                  </button>
                  <div class="review-images"></div>
                  <button
                    ng-click="submitCommentBox()"
                    class="buttonCenter button"
                    //  style="float: right"
                  >
                    ĐĂNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

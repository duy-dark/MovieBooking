import Api from "./api";
var ObjectID = require("bson-objectid");
const getTicketDetail = (id_ticket) => {
    // alert(id_ticket)
    let checkId = ObjectID.isValid(id_ticket);
    // console.log("checkId", checkId);
    if (!checkId) {
      return { status: "ok", code: 200, data: {} };
    }
    return Api.get(`/api/ticket/${id_ticket}/detail`).then(res => res.data)
}
const getCouponDetail = (id_coupon) => {
  // alert(id_ticket)
  let checkId = ObjectID.isValid(id_coupon);
  // console.log("checkId", checkId);
  if (!checkId) {
    return { status: "ok", code: 200, data: {} };
  }
  return Api.put(`/api/coupon/${id_coupon}`).then(res => res.data)
}

export default {
    getTicketDetail,
    getCouponDetail
};
import express from "express";
import { monthly, PaymentCount, UserCount, VideoCount, WorkshopCount } from "../controller/admindashboard.js";

const admin =  express.Router();


admin.route("/user/counts").get(UserCount);
admin.route("/videos/count").get(VideoCount);
admin.route("/payments/count").get(PaymentCount);
admin.route("/workshop/count").get(WorkshopCount);
admin.route("/monthly/count").get(monthly);

export default admin;
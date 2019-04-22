import RequestHelper from "../helpers/request.helper";
import { appConfig } from "../config/app.config";

export const verify = (orderNumber, agentId) => {
  return RequestHelper.get(
    appConfig.apiUrl +
      `order_detail?order_number=${orderNumber}&agent_id=${agentId}`
  );
};

export const checkIn = body => {
  return RequestHelper.post(appConfig.apiUrl + "checkin", { ...body });
};

export const getConfig = (agent_id = 13) => {
  return RequestHelper.get(appConfig.apiUrl+ "config?agent_id="+agent_id);
}

export const check_token_account_kit = async (token) => {
   let res = await RequestHelper.get('https://graph.accountkit.com/v1.0/me?access_token='+token);
   if(res.phone !== undefined) {
     return res.phone.national_number;
   }
   return null;
}

export const login = async (phone) => {
  let url = appConfig.apiUrl + 'loginphonedriver';
  let params = {
    type : 'login',
    phone : phone
  }
  let res = await RequestHelper.post(url, params);
  return res;
}

export const check_token = async (token) => {
  let url = appConfig.apiUrl + 'loginphonedriver';
  let params = {
    type : 'check_token',
    token : token
  }
  let res = await RequestHelper.post(url, params);
  return res;
}

export const get_schedule = async (driver_id, date) => {
  let url = appConfig.apiUrl + 'driver_schedule';
  let params = {driver_id,  date }
  let res = await RequestHelper.get(url, params);
  return res;
}

export const get_order_customer = async (bustrip_id, date) => {
  let url = appConfig.apiUrl + 'all_customer_order';
  let params = {bustrip_id : bustrip_id, date: date};
  let res = await RequestHelper.get(url, params);
  return res;
}
import RequestHelper from "../helpers/request.helper";
import { appConfig } from "../config/app.config";

export const verify = (orderNumber, agentId) => {
  return RequestHelper.get(
    appConfig.apiUrl +
      `rest/order_detail?order_number=${orderNumber}&agent_id=${agentId}`
  );
};

export const checkIn = body => {
  return RequestHelper.post(appConfig.apiUrl + "rest/checkin", { ...body });
};

export const getConfig = () => {
  return RequestHelper.get(appConfig.apiUrl+ "rest/config?agent_id=13",null);
}

export const check_token_account_kit = async (token) => {
   let res = await RequestHelper.get('https://graph.accountkit.com/v1.0/me?access_token='+token);
   if(res.phone !== undefined) {
     return res.phone.national_number;
   }
   return null;
}

export const login = async (phone) => {
  let url = appConfig.apiUrl + 'rest/loginphonedriver';
  let params = {
    type : 'login',
    phone : phone
  }
  let res = await RequestHelper.post(url, params);
  return res;
}

export const check_token = async (token) => {
  let url = appConfig.apiUrl + 'rest/loginphonedriver';
  let params = {
    type : 'check_token',
    token : token
  }
  let res = await RequestHelper.post(url, params);
  return res;
}
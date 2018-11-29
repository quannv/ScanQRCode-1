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

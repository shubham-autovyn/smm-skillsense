import axios from "axios";
import Config from "../../../Config/config";
import { addInterceptors } from "../utils/helperFunctions/api";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const baseClient = axios.create({
  baseURL: Config.SMM_ENDPOINT,
});

const platformClient = axios.create({
  //FOR FETCHING SHOP,
  baseURL: Config.USER_ENDPOINT,
});

addInterceptors(baseClient);
addInterceptors(platformClient);

export { baseClient, platformClient };

import _ from "lodash";
import * as shopRepository from "../../Repository/ShopRepository";

import {
  setSites,
  setShop,
  setLocation,
  setSite,
  setPlant,
  setLoading,
  setArea,
  setLine,
  setGroup,
  setSubcategory,
  setFiltersChanged,
} from "../ActionCreator/ShopActionCreator";

export const setShopDetails =
  (site, location, plant, shop,subcategory="All",group="All",line="All",area="All") => async (dispatch) => {
    dispatch(setSite(site));
    dispatch(setLocation(location));
    dispatch(setPlant(plant));
    dispatch(setShop(shop));
    dispatch(setSubcategory(subcategory));
    dispatch(setGroup(group));
    dispatch(setLine(line));
    dispatch(setArea(area));
  };
export const fetchAllSites =
  (dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setLoading(true));
      }
      const res = await shopRepository.fetchSiteDetails();
      const list = _.get(res, ["data", "response"], []);
      dispatch(setSites(list));
      if (dispatchApiStatus) {
        dispatch(setLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(setLoading(false));
      }
    }
  };

export const changeFilterChangeStatus = (status) => async (dispatch) => {
  dispatch(setFiltersChanged(status));
};

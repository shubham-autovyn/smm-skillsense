import _ from "lodash";
import {
  SMM_SET_SITES,
  SMM_SET_SHOP,
  SMM_SET_SITE,
  SMM_SET_LOCATION,
  SMM_SET_PLANT,
  SMM_SET_LOADING,
  SMM_FILTERS_CHANGED,
  //
  SMM_SET_SUBCATEGORY,
  SMM_SET_GROUP,
  SMM_SET_LINE,
  SMM_SET_AREA,
} from "../ActionTypes/ShopActionTypes";

export default function SMMShopReducer(
    state = { loading: true, filtersChanged: false },
    action = {}
  ) {
    switch (action.type) {
      case SMM_SET_SITES: {
        return {
          ...state,
          sites: action.payload,
        };
      }
      case SMM_SET_AREA: {
        return {
          ...state,
          area: action.payload,
        };
      }
      case SMM_SET_LINE: {
        return {
          ...state,
          line: action.payload,
        };
      }
      case SMM_SET_GROUP: {
        return {
          ...state,
          group: action.payload,
        };
      }
      case SMM_SET_SUBCATEGORY: {
        return {
          ...state,
          subCategory: action.payload,
        };
      }
      case SMM_SET_SHOP: {
        return {
          ...state,
          shop: action.payload,
        };
      }
      case SMM_SET_SITE: {
        return {
          ...state,
          site: action.payload,
        };
      }
      case SMM_SET_PLANT: {
        return {
          ...state,
          plant: action.payload,
        };
      }
      case SMM_SET_LOCATION: {
        return {
          ...state,
          location: action.payload,
        };
      }
      case SMM_SET_LOADING: {
        return {
          ...state,
          loading: action.payload,
        };
      }
      case SMM_FILTERS_CHANGED: {
        return {
          ...state,
          filtersChanged: action.payload,
        };
      }
      default:
        return state;
    }
  }
  
  export function getAllSites(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "sites"],
      undefined
    );
  }
  export function getArea(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "area"],
      "All"
    );
  }
  export function getLine(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "line"],
      "All"
    );
  }
  export function getGroup(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "group"],
      "All"
    );
  }
  export function getSubCategory(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "subCategory"],
      "All"
    );
  }
  export function getShop(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "shop"],
      {}
    );
  }
  export function getPlant(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "plant"],
      {}
    );
  }
  export function getLocation(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "location"],
      {}
    );
  }
  export function getSite(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "site"],
      {}
    );
  }
  export function getLoading(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "loading"],
      true
    );
  }
  export function getFiltersChangeStatus(state) {
    return _.get(
      state,
      ["SMMRootReducer", "SMMShopReducer", "filtersChanged"],
      false
    );
  }
  
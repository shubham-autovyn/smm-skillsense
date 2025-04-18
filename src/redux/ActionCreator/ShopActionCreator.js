import {
  SMM_FILTERS_CHANGED,
  SMM_SET_LOADING,
  SMM_SET_LOCATION,
  SMM_SET_PLANT,
  SMM_SET_SHOP,
  SMM_SET_SITE,
  SMM_SET_GROUP,
  SMM_SET_LINE,
  SMM_SET_AREA,
  SMM_SET_SITES,
  SMM_SET_SUBCATEGORY,
} from "../ActionTypes/ShopActionTypes";

export const setSites = (list) => ({
  type: SMM_SET_SITES,
  payload: list,
});
export const setArea = (data) => ({
  type: SMM_SET_AREA,
  payload: data,
});
export const setLine = (data) => ({
  type: SMM_SET_LINE,
  payload: data,
});
export const setGroup = (data) => ({
  type: SMM_SET_GROUP,
  payload: data,
});
export const setSubcategory = (data) => ({
  type: SMM_SET_SUBCATEGORY,
  payload: data,
});
export const setShop = (data) => ({
  //SHOP EQUIVALENT TO DEPT
  type: SMM_SET_SHOP,
  payload: data,
});

export const setPlant = (data) => ({
  //PLANT EQUIVALENT TO DIVISON
  type: SMM_SET_PLANT,
  payload: data,
});
export const setLocation = (data) => ({
  //LOCATION EQUIVALENT TO DIVISION CLUSTER
  type: SMM_SET_LOCATION,
  payload: data,
});
export const setSite = (data) => ({
  //WILL BE DEFAULT MSIL
  type: SMM_SET_SITE,
  payload: data,
});

export const setLoading = (val) => ({
  type: SMM_SET_LOADING,
  payload: val,
});

export const setFiltersChanged = (val) => ({
  type: SMM_FILTERS_CHANGED,
  payload: val,
});

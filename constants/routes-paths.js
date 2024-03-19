const ROOT_PATH = "/esogbea/api";

//uid: User id within the database
//id: The record id within the database
// if both needed in a route, then the order is: did/uid

const RoutesPaths = {
  AUTH_SIGN_UP: `${ROOT_PATH}/auth/user/sign-up`, //create new user
  AUTH_VERIFY_EMAIL: `${ROOT_PATH}/auth/user/verify/email`,
  AUTH_SEND_VERIFY_LINK: `${ROOT_PATH}/auth/user/get/verification/link`,
  AUTH_GET_NEW_VERIFY_LINK_PAGE: `${ROOT_PATH}/auth/user/get/verification/link/page`,
  AUTH_LOGIN: `${ROOT_PATH}/auth/user/login`, //log a user

  USER_GET_BY_ID: `${ROOT_PATH}/user/get/:uid`,

  TABLE_CREATE: `${ROOT_PATH}/table/create`,
  TABLE_UPDATE: `${ROOT_PATH}/table/update/:id`,
  TABLE_DELETE: `${ROOT_PATH}/table/delete/:id`,
  TABLE_GET_ALL: `${ROOT_PATH}/table/get/all`,
  TABLE_GET_AVAILABLE: `${ROOT_PATH}/table/get/available`,
  TABLE_GETWITH_CAPACITY: `${ROOT_PATH}/table/getwith/:capacity`,
  TABLE_GETBY_ID: `${ROOT_PATH}/table/getby/:id`,

  ITEM_ADD: `${ROOT_PATH}/item/add`, //Create or add a new food in database
  ITEM_UPDATE: `${ROOT_PATH}/item/update/:type/:id`,
  ITEM_FAVORITE: `${ROOT_PATH}/item/favorite/:uid`,
  ITEM_UNFAVORITE: `${ROOT_PATH}/item/unfavorite/:id/:uid`,
  ITEM_GET_BY_ID: `${ROOT_PATH}/item/get/:type/:id`,
  ITEM_GET_DRINKS: `${ROOT_PATH}/item/get/drinks`,
  ITEM_GET_FOODS: `${ROOT_PATH}/item/get/foods`,

  FOOD_DELETE: `${ROOT_PATH}/food/delete/:id`,
  FOOD_UPDATE_IMAGE: `${ROOT_PATH}/food/image/update/:id`,
  FOOD_SEARCH_ID: `${ROOT_PATH}/food/search/:id`,

  DRINK_UPDATE: `${ROOT_PATH}/drink/update/:id`,
  DRINK_UPDATE_IMAGE: `${ROOT_PATH}/drink/image/update/:id`,

  CART_ADD_ITEM: `${ROOT_PATH}/cart/item/add`,
  CART_UPDATE_ITEM: `${ROOT_PATH}/cart/item/update/:id/:itemID`,
  CART_DELETE_ITEM: `${ROOT_PATH}/cart/item/delete/:id/:itemID`,
  CART_EMPTY: `${ROOT_PATH}/cart/empty/:id`,
  USER_CART_GET: `${ROOT_PATH}/user/cart/get/:uid`,

  BOOKING_CREATE: `${ROOT_PATH}/booking/create`, //Create a new order for the current user
  BOOKING_GET_ALL: `${ROOT_PATH}/booking/get/all`,

  ORDER_CREATE: `${ROOT_PATH}/order/create`, //Create a new order for the current user
  ORDER_UPDATE: `${ROOT_PATH}/order/update/:id`,
  ORDER_GET_ALL: `${ROOT_PATH}/order/get/all`,
  USER_ORDERS_GET: `${ROOT_PATH}/user/orders/get/:userID`,
  USER_ORDERS_GET_LIMIT: `${ROOT_PATH}/user/orders/get/:userID/:limit`,
  ORDER_DELETE: `${ROOT_PATH}/order/delete/:id`,
  ORDER_GETBY_ID: `${ROOT_PATH}/order/getby/:id`,
  ORDER_GET_ALL_LIMIT: `${ROOT_PATH}/order/get/all/:limit`,

  ADDRESS_ADD: `${ROOT_PATH}/address/add/:uid`,
  ADDRESS_UPDATE: `${ROOT_PATH}/address/update/:id/:uid`,
  ADDRESS_DELETE: `${ROOT_PATH}/address/delete/:id/:uid`,
  ADDRESS_GET_BY_ID: `${ROOT_PATH}/address/get/:id/:uid`,
  USER_ADDRESS_GET: `${ROOT_PATH}/user/address/get/:uid`,
  USER_ADDRESS_DELETE_ALL: `${ROOT_PATH}/user/address/delete/all/:uid`,
};

module.exports = RoutesPaths;

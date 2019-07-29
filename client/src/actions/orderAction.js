import {
  GET_ORDER,
  GET_ORDERS,
  GET_TRANSACTION,
  DELIVERY_PURCHASE
} from "./types";
import {
  getOrdersByUser,
  getOrderById,
  getTransactionById,
  getOrders,
  productPurchaseDelivery
} from "../utils/requestManager";

export const fetchOrders = userId => dispatch => {
  getOrdersByUser(userId).then(orders => {
    dispatch({
      type: GET_ORDERS,
      payload: orders.data.orders
    });
  });
};

export const fetchAdminOrders = () => dispatch => {
  getOrders().then(orders => {
    dispatch({
      type: GET_ORDERS,
      payload: orders.data.orders
    });
  });
};

export const fetchOrder = orderId => dispatch => {
  getOrderById(orderId).then(order => {
    dispatch({
      type: GET_ORDER,
      payload: order.data
    });
  });
};

export const fetchTransaction = transId => (dispatch, getState) => {
  getTransactionById(transId).then(trans => {
    dispatch({
      type: GET_TRANSACTION,
      payload: trans.data[0]
    });
  });
};

export const fetchDeliveryPurchase = (info, total, product) => dispatch => {
  productPurchaseDelivery(info, total, product).then(response => {
    dispatch({
      type: DELIVERY_PURCHASE,
      payload: response.data
    });
  });
};

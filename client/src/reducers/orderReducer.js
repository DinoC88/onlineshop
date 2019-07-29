import {
  GET_ORDER,
  GET_ORDERS,
  GET_TRANSACTION,
  DELIVERY_PURCHASE
} from "../actions/types";

const initialState = {
  order: {},
  orders: [],
  transactionId: "",
  transaction: {},
  paymentDetails: {},
  isLoading: true,
  orderId: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        transactionId: action.payload.transactionId,
        isLoading: true
      };
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
        paymentDetails: action.payload.paymentDetails,
        isLoading: false
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false
      };
    case DELIVERY_PURCHASE:
      return {
        ...state,
        orderId: action.payload.orderId
      };
    default:
      return state;
  }
}

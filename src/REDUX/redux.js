import { combineReducers, createStore } from "redux";

//State
const initialData = {
  foodData: [],
};

//Action
export function addFoodData(recievedFood) {
  return {
    type: "BUY_FOOD",
    payload: recievedFood,
  };
}

//Reducer
const foodReducer = (state = initialData, action) => {
  if (action.type == "BUY_FOOD") {
    //logic to add the cart(from home.js) to our foodData
    return {
      foodData: action.payload,
    };
  }
  return state;
};

//Combined Reducer
const rootReducer = combineReducers({ foodReducer });

//Store
export const store = createStore(rootReducer);

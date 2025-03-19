import React, { useEffect, useState } from "react";
import "./home.css"; // Import CSS file
import { list } from "./utils/MenuList";
import { particularFoodData } from "./utils/particularfoodinfo";
import { useDispatch } from "react-redux";
import { addFoodData } from "./REDUX/redux";

function Home() {
  const [ClickedMenu, setClickedMenu] = useState("");
  const [cart, setCart] = useState([]);

  //logic for adding the cart to redux(foodData)

  const dispatch = useDispatch();

  useEffect(() => {
    //  ==> useDispatch(addFoodData(cart)) as we can't use useDispatch in user defined fun we create a const
    dispatch(addFoodData(cart));
  }, [cart]);

  function menuItemsClick(recievedItem) {
    setClickedMenu(recievedItem);
  }

  function decreaseQuantity(recievedFood) {
    setCart((oldCart) => {
      return oldCart
        .map((food) =>
          food.foodId === recievedFood.foodId
            ? { ...food, quantity: food.quantity - 1 }
            : food
        )
        .filter((food) => food.quantity > 0);
    });
  }

  function increaseQuantity(recievedFood) {
    setCart(function (oldCart) {
      const existingCart = oldCart.find(
        (food) => food.foodId == recievedFood.foodId
      );

      if (existingCart) {
        return oldCart.map((food) =>
          food.foodId == recievedFood.foodId
            ? { ...food, quantity: food.quantity + 1 }
            : food
        );
      } else {
        return [...oldCart, { ...recievedFood, quantity: 1 }];
      }
    });
  }

  console.log(cart);

  return (
    <div className="home-page">
      <h2 className="menu-title">Explore Our Menu</h2>

      <div className="menu-container">
        {list.map((item) => (
          <div
            //key={item.id}
            className={`menu-item ${
              ClickedMenu === item.menuItem ? "selectedMenu" : ""
            }`}
            onClick={() => menuItemsClick(item.menuItem)}
          >
            <img
              className="menu-image"
              src={item.menuImage}
              alt={item.menuItem}
            />
            <h3 className="menu-name">{item.menuItem}</h3>
          </div>
        ))}
      </div>

      <h2 className="food-list-title">Popular Dishes</h2>
      <div className="food-list-container">
        {particularFoodData
          .filter((item) => item.foodName.includes(ClickedMenu))
          .map((food) => (
            <div
              key={food.foodId}
              className="food-item"
              style={{ position: "relative" }}
            >
              <img
                className="food-image"
                src={food.foodImageUrl}
                alt={food.foodName}
              />

              {/* Quantity Control Buttons */}
              <div
                className="quantity-container"
                style={{
                  position: "absolute",
                  top: "320px", // ✅ Moves the buttons near the top-right corner
                  right: "10px",
                  display: "flex", // ✅ Aligns plus & minus buttons horizontally
                  alignItems: "center",
                  gap: "5px", // ✅ Adds spacing between plus & minus buttons
                  background: "rgba(255, 255, 255, 0.8)",
                  padding: "6px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                {/* Minus Button */}
                <img
                  onClick={() => decreaseQuantity(food)}
                  src="https://www.pngall.com/wp-content/uploads/5/Red-Minus-PNG-HD-Image.png"
                  alt="minus"
                  style={{ width: "20px", height: "20px" }}
                />

                <span style={{ fontSize: "20px" }}>
                  {cart.find((i) => i.foodId === food.foodId)?.quantity || 0}
                </span>

                {/* Plus Button */}
                <img
                  onClick={() => increaseQuantity(food)}
                  src="https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_640.png"
                  alt="plus"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>

              <h3 className="food-name">{food.foodName}</h3>
              <p className="food-description">{food.foodDescription}</p>
              <p className="food-price">₹{food.foodPrice}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;

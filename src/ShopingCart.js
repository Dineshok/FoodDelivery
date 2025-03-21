import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ShopingCart() {
  const navigate = useNavigate();

  function goBackToHome() {
    navigate("/");
  }

  const currentCart = useSelector((output) => {
    return output.foodReducer.foodData;
  });

  const totalPrice = currentCart.reduce((accumulator, item) => {
    return accumulator + Number(item.foodPrice) * Number(item.quantity);
  }, 0);

  return (
    <>
      <div
        class="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        {/* <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
        <div
          class="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        --> */}
              <div class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2
                        class="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Order Summary
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          onClick={goBackToHome}
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span class="absolute -inset-0.5"></span>
                          <span class="sr-only">Close panel</span>
                          <svg
                            class="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          {currentCart.map(function (item) {
                            return (
                              <li class="flex py-6">
                                <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.foodImageUrl}
                                    alt={item.foodName}
                                    class="size-full object-cover"
                                  />
                                </div>

                                <div class="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{item.foodName}</a>
                                      </h3>
                                      <p class="ml-4">₹{item.foodPrice}</p>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">
                                      {item.foodDescription}
                                    </p>
                                  </div>
                                  <div class="flex flex-1 items-end justify-between text-sm">
                                    <p class="text-gray-500">
                                      Qty {item.quantity}
                                    </p>

                                    <div class="flex">
                                      <button
                                        type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                          {/* <!-- More products... --> */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>₹{totalPrice}</p>
                    </div>

                    <div class="mt-6">
                      <a
                        href="#"
                        class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or .
                        <button
                          onClick={goBackToHome}
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopingCart;

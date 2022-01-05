/*eslint-disable*/

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import SucssesPayment from "../Payment/SucssesPayment";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [payment, setPayment] = useState(false);
  const [paySucsses, setPaySucsses] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
  });

  const user = useRef();
  const email = useRef();

  let totalValue = [];
  useEffect(() => {
    if (cart.length > 0) {
      if (cart.length <= 1) {
        return setTotalPrice(cart[0].priceCount);
      } else {
        for (var val in cart) {
          totalValue.push(cart[val].priceCount);
        }
        let total = totalValue.reduce((a, b) => {
          return a + b;
        });
        setTotalPrice(total);
      }
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  // submit payment form
  const paymentSubmit = (e) => {
    e.preventDefault();

    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (userData.userName.length < 5) {
      user.current.style.border = ".05rem solid red";
      toast.error("User name must be 5 character or more...", {
        autoClose: 2000,
      });
      return;
    } else {
      user.current.style.border = ".05rem solid #ddd";
    }

    if (userData.userEmail.match(re)) {
      email.current.style.border = ".05rem solid #ddd";
    } else {
      email.current.style.border = ".05rem solid red";
      toast.error("Please enter valid email !", {
        autoClose: 2000,
      });
      return;
    }
    setPaySucsses(true);
  };

  return (
    <section className="container mt-10 grid md:grid-cols-7 gap-8">
      <div className="md:col-span-5">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CartItem key={index} cart={cart} item={item} />
          ))
        ) : (
          <div className="text-2xl text-center">Empty list...</div>
        )}
      </div>
      {cart.length > 0 && (
        <div className=" md:col-span-2 border-0 md:border-l pl-4">
          <div className=" mb-6 py-6">
            <h2 className="font-bold text-xl w-full text-center mb-8">
              Payment Details
            </h2>
            <h4 className="flex space-x-2">
              <span> Product number : </span>
              <span className="font-bold mb-3">{cart.length}</span>
            </h4>
            <h4 className="flex space-x-2">
              <span>Total value : </span>{" "}
              <span className="font-bold mb-12">{totalPrice.toFixed(2)} $</span>
            </h4>
            {!payment && (
              <button
                className="w-full bg-orange-400 hover:bg-orange-300 text-sm md:text-xl border rounded-md px-4 py-1 capitalize cursor-pointer"
                onClick={() => setPayment(true)}
              >
                Proceed
              </button>
            )}
          </div>
          {payment && (
            <div className="mb-6">
              <form className="flex flex-col space-y-6">
                <div className="flex flex-col justify-start">
                  <label htmlFor="user">User name :</label>
                  <input
                    type="text"
                    name=""
                    id="user"
                    ref={user}
                    className="border rounded outline-none my-1 p-1"
                    placeholder="User name"
                    onChange={(e) =>
                      setUserData({ ...userData, userName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="text"
                    name=""
                    ref={email}
                    id="email"
                    className="border rounded outline-none my-1 p-1"
                    placeholder="Email address"
                    onChange={(e) =>
                      setUserData({ ...userData, userEmail: e.target.value })
                    }
                  />
                </div>
                <button
                  className="w-full bg-orange-400 hover:bg-orange-300 text-sm md:text-xl border rounded-md px-4 py-1 capitalize cursor-pointer"
                  onClick={(e) => paymentSubmit(e)}
                >
                  Payment
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      {paySucsses && (
        <SucssesPayment
          userData={userData}
          totalPrice={totalPrice}
          cart={cart}
        />
      )}
    </section>
  );
};

export default Cart;

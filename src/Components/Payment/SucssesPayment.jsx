import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

const SucssesPayment = ({ userData, totalPrice, cart }) => {
  const [sucsses, setSucsses] = useState(false);

  // Empty cart list after payment
  useEffect(() => {
    setTimeout(() => {
      setSucsses(true);
      localStorage.removeItem("cart501");
    }, 4000);
  }, []);

  return (
    <div className="h-full fixed top-0 left-0 w-full bg-gray-300/80">
      <div className="w-full md:w-1/2 bg-gray-50 rounded-md sticky top-1/2 left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 px-4 py-8">
        {!sucsses && (
          <div>
            <h1 className="flex justify-center items-center space-x-6 text-2xl text-cyan-500">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl" />{" "}
              <span>Please wait ...</span>
            </h1>
          </div>
        )}

        {sucsses && (
          <div>
            <h2 className="text-center text-green-600 mb-10 text-xl">
              Your order has been payment{" "}
            </h2>

            <div className="flex justify-start items-center space-x-4 mb-4">
              <span>Name : </span>{" "}
              <span className="text-slate-700 capitalize">
                {userData.userName}
              </span>
            </div>

            <div className="flex justify-start items-center space-x-4 mb-4">
              <span>Email : </span>{" "}
              <span className="text-slate-700 capitalize">
                {userData.userEmail}
              </span>
            </div>

            <div className="flex justify-start items-center space-x-4 mb-4">
              <span>Total : </span>{" "}
              <span className="text-slate-700 capitalize">
                {totalPrice.toFixed(2)} $
              </span>
            </div>

            <div className="flex justify-start items-start space-x-4">
              <span className="min-w-max">Products :</span>
              <div className="flex flex-col justify-start items-start">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start space-x-2 text-slate-700"
                  >
                    <span className="min-w-max">{item.count} x </span>
                    <p className="text-[14] break-all">{item.product.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-16 text-blue-600 hover:text-blue-500">
              <a href="/"> Back to products ...</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SucssesPayment;

/*eslint-disable*/

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { allPrice, deleteCartProduct } from "../../store/cartSlice";

const CartItem = ({ item, cart }) => {
  const [num, setNum] = useState(item.count);
  const [totalCount, setTotalCount] = useState(item.priceCount);

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalCount(item.product.price * num);
  }, [num, cart]);

  // Change price of product
  const changePrice = (e) => {
    setNum(e.target.value);
    dispatch(allPrice({ id: item.product.id, count: e.target.value }));
  };

  // Change price of product when enter value
  const handleKeyUp = (e) => {
    if (e.target.value <= 0) {
      e.target.value = 1;
      dispatch(allPrice({ id: item.product.id, count: e.target.value }));
    }
  };

  // Delete product from cart list
  const removeProduct = () => {
    dispatch(deleteCartProduct(item.product.id));
    toast.warning("Item has been deleted", {
      autoClose: 1500,
    });
  };

  return (
    <div
      className=" flex flex-col space-y-2 md:flex-row text-lg justify-between items-center border-b py-2"
      key={item.product.id}
    >
      <div className="flex justify-center items-center w-full">
        <Link to={`/product/${item.product.id}`}>
          <div className="object-cover w-12 h-max">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-full"
            />
          </div>
        </Link>
        <div className="h-full py-2 px-6 flex flex-col w-full justify-start space-y-2 md:space-y-6">
          <p className="text-[12px] font-semibold break-all">
            {item.product.title}
          </p>

          <div className="text-[14px] md:text-lg flex justify-between  md:justify-start  items-start capitalize md:space-x-10">
            <span className="font-semibold text-red-500 ">
              <small className="font-normal text-black">$</small>{" "}
              {item.product.price}
            </span>
            <div className="flex">
              <label htmlFor="">Count : </label>
              <input
                type="number"
                name=""
                id=""
                defaultValue={num}
                min={1}
                className="w-20 text-center border outline-none"
                onChange={(e) => changePrice(e)}
                onKeyUp={(e) => handleKeyUp(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between space-y-4 w-full">
        <span
          className="text-red-500 hover:bg-red-400 hover:text-slate-50 transition-all rounded-md text-[12px] border px-4 py-1 capitalize cursor-pointer w-full md:w-max  text-center"
          onClick={() => removeProduct()}
        >
          {" "}
          remove product
        </span>
      </div>
    </div>
  );
};

export default CartItem;

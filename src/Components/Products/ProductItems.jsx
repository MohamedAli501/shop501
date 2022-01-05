/*eslint-disable*/

import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addWishList } from "../../store/wishlistSlice";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../store/cartSlice";

const ProductItems = () => {
  const itemList = useSelector((state) => state.wishlist);
  const cartList = useSelector((state) => state.cart);
  const [itemData, setItemData] = useState(null);
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    axios({
      method: "GET",
      baseURL: "https://fakestoreapi.com",
      url: `/products/${id}`,
    }).then((res) => setItemData(res.data));
  }, []);

  // Check if product exsist
  const wishListAddHandle = () => {
    const chechProductExsist = (obj) => obj.id === itemData.id;
    if (itemList.some(chechProductExsist)) {
      toast.warning("this product already in list", {
        autoClose: 1500,
      });
    } else {
      dispatch(addWishList(itemData));
      toast.success("Product added to wishList", {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Add product to cart
  const addCart = () => {
    const chechProductExsists = (obj) => obj.product.id === itemData.id;

    if (cartList.some(chechProductExsists)) {
      toast.warning("this product already in list", {
        autoClose: 1500,
      });
    } else {
      dispatch(
        addToCart({
          product: itemData,
          priceCount: itemData.price,
          count: 1,
        })
      );
      toast.success("Product added to cart list", {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      {!!itemData && (
        <div className="container mt-10 grid grid-cols-1 md:grid-cols-5 gap-10 h-full">
          <div className="md:col-span-2 flex justify-center items-center">
            <div className="object-cover w-3/4 h-max">
              <img
                src={itemData.image}
                width={"100%"}
                height={"100%"}
                alt={itemData.title}
              />
            </div>
          </div>
          <div className="md:col-span-3 py-2 md:py-8">
            <div className="h-full p-6 flex flex-col justify-center space-y-4">
              <p className="text-lg font-medium">{itemData.title}</p>
              <p className="text-lg flex items-center capitalize space-y-1 md:space-y-2">
                <span>Price :</span>
                <span className="text-lg font-semibold text-red-500 ml-8">
                  <small className="font-normal text-black">$</small>{" "}
                  {itemData.price}
                </span>
              </p>
              <p className="text-lg flex items-center capitalize space-y-1 md:space-y-2">
                <span>Rate :</span>
                <span className="text-lg font-semibold text-orange-500 flex items-center ml-8">
                  <AiFillStar className="mr-2" /> {itemData.rating.rate}
                </span>
              </p>
              <p className="text-sm flex flex-col capitalize space-y-1 md:space-y-2 ">
                <span>description :</span>
                <span className="text-gray-600 ml-8">
                  {itemData.description}
                </span>{" "}
              </p>
              <div className="flex justify-center items-center flex-col md:flex-row space-y-2 md:space-x-8">
                <span
                  onClick={wishListAddHandle}
                  className="w-full text-center flex justify-center items-center text-red-500 hover:text-red-600 text-sm md:text-lg border px-4 py-1 capitalize cursor-pointer"
                >
                  {" "}
                  <AiOutlineHeart className="mr-1" />
                  add to wishlist
                </span>

                <span
                  className="w-full text-center flex justify-center items-center text-orange-500 hover:text-orange-600 text-sm md:text-lg border px-4 py-1 capitalize cursor-pointer"
                  onClick={() => addCart()}
                >
                  {" "}
                  <BsCart4 className="mr-1" />
                  add to cart
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItems;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteWishItem } from "../../store/wishlistSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../store/cartSlice";

const WishList = () => {
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.wishlist);
  const cartList = useSelector((state) => state.cart);

  // Delete product from wishList
  const deleteItem = (e) => {
    dispatch(deleteWishItem(e));
    toast.warning("Item has been deleted", {
      autoClose: 1500,
    });
  };

  // Add product to cart
  const itemAdded = (e) => {
    dispatch(addToCart(e));
    toast.success("Product added to cart", { autoClose: 1500 });
  };

  return (
    <section className="container mt-10">
      {wishList.length > 0 ? (
        wishList.map((item) => (
          <div
            className=" flex flex-col space-y-2 md:flex-row justify-between items-center border-b py-6"
            key={item.id}
          >
            <Link to={`/product/${item.id}`} className="flex items-center">
              <div className="object-cover w-36 h-max">
                <img src={item.image} alt={item.title} className="w-full" />
              </div>

              <div className="h-full p-6 flex flex-col justify-start space-y-2 md:space-y-6">
                <p className="text-[12px] md:text-xl font-semibold break-all">
                  {item.title}
                </p>

                <p className="text-[14px] md:text-xl flex items-center capitalize space-y-1 md:space-y-2">
                  <span className="font-semibold text-red-500 ">
                    <small className="font-normal text-black">$</small>{" "}
                    {item.price}
                  </span>
                </p>
              </div>
            </Link>

            <div className="flex flex-col justify-between space-y-4">
              <span
                className="flex items-center text-red-500 hover:bg-red-400 hover:text-slate-50 transition-all rounded-md text-sm md:text-xl border px-4 py-1 capitalize cursor-pointer w-max"
                onClick={() => deleteItem(item)}
              >
                {" "}
                <AiFillHeart className="mr-1" />
                remove to wishlist
              </span>

              <span
                className="flex justify-center items-center text-orange-500 hover:bg-orange-400 hover:text-slate-50 transition-all rounded-md text-sm md:text-xl border px-4 py-1 capitalize cursor-pointer"
                onClick={() => {
                  const chechProductExsist = (obj) =>
                    obj.product.id === item.id;

                  if (cartList.some(chechProductExsist)) {
                    toast.warning("this product already in list", {
                      autoClose: 1500,
                    });
                  } else {
                    itemAdded({
                      product: item,
                      priceCount: item.price,
                      count: 1,
                    });
                  }
                }}
              >
                {" "}
                <BsCart4 className="mr-1" />
                add to cart
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-2xl text-center">Empty list...</div>
      )}
    </section>
  );
};

export default WishList;

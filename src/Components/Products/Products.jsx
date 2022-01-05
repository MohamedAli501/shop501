import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductFilter from "./ProductFilter";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [filterd, setFilterd] = useState(null);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const cartList = useSelector((state) => state.cart);

  // Fetch API
  useEffect(() => {
    setLoad(true);
    axios({
      method: "GET",
      baseURL: "https://fakestoreapi.com",
      url: "/products",
    })
      .then((res) => {
        setProducts(res.data);
        setFilterd(res.data);
      })
      .catch((err) => console.dir(err))
      .finally(() => setLoad(false));
  }, []);

  // Category
  const categorys = (e) => {
    if (e.target.value === "") {
      setFilterd(products);
    } else {
      const categor = products.filter((cat) => cat.category === e.target.value);
      setFilterd(categor);
    }
  };

  // Add product to cart
  const itemAdded = (e) => {
    dispatch(addToCart(e));
    toast.success("Product added to cart", { autoClose: 1500 });
  };

  return (
    <section className="pt-4">
      <ProductFilter products={products} categorys={categorys} />
      <div className="container">
        <h3 className="py-4 capitalize font-bold">Products :</h3>
        {load && (
          <div className="text-2xl text-center w-full font-bold animate-pulse">
            {" "}
            Data loading ...
          </div>
        )}
        <ul className="grid grid-cols-1 gap-y-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3 py-4 ">
          {!!filterd && filterd.length > 0
            ? filterd.map((prod) => (
                <li
                  className="p-4 pb-8 text-black flex flex-col justify-between border-b"
                  key={prod.id}
                >
                  <Link
                    to={`/product/${prod.id}`}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="w-full h-80 ">
                      <img
                        src={prod.image}
                        className="w-full h-full"
                        alt="qqq"
                      />
                    </div>
                    <span className="text-[14px] py-2">{prod.title}</span>
                  </Link>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">$ {prod.price}</span>
                    <button
                      onClick={() => {
                        const chechProductExsist = (obj) =>
                          obj.product.id === prod.id;

                        if (cartList.some(chechProductExsist)) {
                          toast.warning("this product already in list", {
                            autoClose: 1500,
                          });
                        } else {
                          itemAdded({
                            product: prod,
                            priceCount: prod.price,
                            count: 1,
                          });
                        }
                      }}
                      className="bg-orange-300 hover:bg-orange-400 transition-all text-black py-1 px-4 rounded-sm capitalize"
                    >
                      add to cart
                    </button>
                  </div>
                </li>
              ))
            : " "}
        </ul>
      </div>
    </section>
  );
};

export default Products;

import React from "react";

const ProductFilter = ({ products, categorys }) => {
  return (
    <div>
      <div className="container border-b py-4 flex justify-between items-center">
        <div>
          <span className="capitalize mr-2">category :</span>
          <select
            name=""
            id=""
            className="py-1 px-2 border"
            onChange={(e) => categorys(e)}
          >
            <option value="">Featrued</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

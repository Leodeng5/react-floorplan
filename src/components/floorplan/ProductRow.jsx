import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSelectProduct,
  toggleUnmask,
} from "../../features/product/productSlice";
import { isLight } from "../../utils/generateColors";
import "./index.css";

const ProductRow = ({ ru, inverted, productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => createSelectProduct(productId)(state));
  const [diode, setDiode] = useState(false);

  if (!product) {
    return null;
  }

  const { unmask, color } = product;

  if (inverted) {
    return (
      <>
        <ProductCell product={product.product} color={color} />
        <DataCell data={ru} />
        <DataCell
          onClick={() => dispatch(toggleUnmask(productId))}
          color={unmask ? "yellow" : undefined}
        />
        <DataCell
          onClick={() => setDiode(!diode)}
          color={diode ? "blue" : undefined}
        />
      </>
    );
  }

  return (
    <>
      <DataCell
        onClick={() => setDiode(!diode)}
        color={diode ? "blue" : undefined}
      />
      <DataCell
        onClick={() => dispatch(toggleUnmask(productId))}
        color={unmask ? "yellow" : undefined}
      />

      <DataCell data={ru} />
      <ProductCell product={product.product} color={color} />
    </>
  );
};

const DataCell = ({ data, color, onClick }) => {
  return (
    <td
      className="dataCell"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {data}
    </td>
  );
};

const ProductCell = ({ product, color }) => {
  return (
    <td
      className="productCell"
      style={{
        backgroundColor: color,
        color: isLight(color) ? "black" : "white",
      }}
    >
      {product}
    </td>
  );
};

export default ProductRow;

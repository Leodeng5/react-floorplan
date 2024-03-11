import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSelectProduct,
  toggleUnmask,
} from "../../features/product/productSlice";
import { setSource, setTarget, swapProducts } from "../../features/grid/gridSlice";
import { isLight } from "../../utils/generateColors";
import "./index.css";

/**
 * Renders a row for a product in the floorplan.
 *
 * @component
 * @param {number} props.ru - The rack unit of the product.
 * @param {boolean} props.inverted - Indicates if the row is inverted.
 * @param {string} props.productId - The product name.
 * @returns {JSX.Element|null} The rendered product row.
 */
const ProductRow = ({ ru, inverted, productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => createSelectProduct(productId)(state));
  const [diode, setDiode] = useState(false);

  const handleSetSource = () => {
    dispatch(setSource(ru));
  };
  const handleSetTarget = () => {
    dispatch(setTarget(ru));
  };
  const handleClearTarget = () => {
    dispatch(setTarget(null));
  };
  const handleSwap = () => {
    dispatch(swapProducts());
  };

  const ProductCell = ({ product, color }) => {
    return (
      <td
        className="productCell"
        style={{
          backgroundColor: color,
          color: isLight(color) ? "black" : "white",
        }}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDragStart={(e) => {
          e.target.style.boxShadow = "0 0 10px 5px white inset";
          handleSetSource();
        }}
        onDragEnter={(e) => {
          e.target.style.boxShadow = "0 0 10px 5px yellow inset";
          handleSetTarget();
        }}
        onDragLeave={(e) => {
          e.target.style.boxShadow = "";
          handleClearTarget();
        }}
        onDragEnd={(e) => {
          e.target.style.boxShadow = "";
          handleSwap();
        }}
      >
        {product}
      </td>
    );
  };

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

export default ProductRow;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeProducts } from "../../features/product/productSlice";
import { getProductColor } from "../../utils/generateColors";
import GridSection from "./GridSection";
import products from "../../data/dataset.json";

const Floorplan = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeProducts(products.map((p) => ({
      product: p.product,
      repeat: p.repeat,
      unmask: false,
      color: getProductColor(p.product),
    }))));
  }, [dispatch]);

  return (
    <div className="floorplan">
      <table className="table">
        <thead>
          <tr><th colSpan={11} className="header navy">TAPE-IN DB VIEW</th></tr>
          <LabelsRow />
        </thead>
        <tbody>
          <GridSection sectionNo={1} />
          <MidhalfRow />
          <GridSection sectionNo={2} />
          <MiscRow />
        </tbody>
      </table>
    </div>
  );
};

const LabelsRow = () => {
  const ColumnLabel = ({ label }) => {
    return <th className="labelVertical navy">{label}</th>;
  };

  return (
    <tr>
      <ColumnLabel label={"Grid"} />
      <ColumnLabel label={"Diode"} />
      <ColumnLabel label={"Unmask"} />
      <ColumnLabel label={"RU#"} />
      <th colSpan={3} className="labelHorizontal navy">
        Seat UUID
      </th>
      <ColumnLabel label={"RU#"} />
      <ColumnLabel label={"Unmask"} />
      <ColumnLabel label={"Diode"} />
      <ColumnLabel label={"Grid"} />
      <th style={{ width: "15px" }}></th>
      <th style={{ width: "45px" }}></th>
    </tr>
  );
};

const MidhalfRow = () => {
  return (
    <tr>
      <td colSpan={11} className="tableRow">
        MIDHALF
      </td>
    </tr>
  );
};

const MiscRow = () => {
  return (
    <tr>
      <td colSpan={4}></td>
      <td colSpan={3} className="tableRow">
        MISC Block
      </td>
    </tr>
  );
};

export default Floorplan;

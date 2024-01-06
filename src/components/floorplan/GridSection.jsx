import React from "react";
import { useSelector } from "react-redux";
import { selectGridById } from "../../features/grid/gridSlice";
import { getProductColor, isLight } from "../../utils/generateColors";
import ProductRow from "./ProductRow";
import "./index.css";

const GridSection = ({ sectionNo }) => {
  const addIoColumn = sectionNo == 1 ? true : false;
  const leftGridNo = (sectionNo - 1) * 2 + 1;
  const rightGridNo = leftGridNo + 1;
  const leftGrid = useSelector((state) => selectGridById(state, leftGridNo));
  const rightGrid = useSelector((state) => selectGridById(state, rightGridNo));

  const getRuStart = (gridNo) => (gridNo - 1) * 20;

  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <tr key={i}>
          {i == 0 && <GridNoColumn gridNo={leftGridNo} />}
          <ProductRow
            productId={leftGrid[i]}
            ru={getRuStart(leftGridNo) + i}
          />
          <td className="emptyCell"></td>
          <ProductRow
            productId={rightGrid[i]}
            ru={getRuStart(rightGridNo) + i}
            inverted
          />
          {i == 0 && <GridNoColumn gridNo={rightGridNo} />}
          {i == 0 && addIoColumn && <IOColumn />}
        </tr>
      ))}
    </>
  );
};

const GridNoColumn = ({ gridNo }) => {
  // Choose arbitrary colors for grids
  const backgroundColor = getProductColor(`${gridNo}12`);
  const color = isLight(getProductColor(backgroundColor)) ? "black" : "white";

  return (
    <td
      rowSpan={20}
      className="tableColumn vertical"
      style={{ backgroundColor, color }}
    >
      {gridNo}
    </td>
  );
};

const IOColumn = () => {
  return (
    <>
      <td />
      <td rowSpan={41} className="tableColumn">
        I/Os
      </td>
    </>
  );
};

export default GridSection;

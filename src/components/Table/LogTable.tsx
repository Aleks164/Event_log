import React, { useState, useCallback, useEffect, useRef } from "react";
import { Grid, Paper } from "@mui/material";
import { defaultData } from "../../utils/defaultData";
import { SortArrow } from "./SortArrow";
import "./tableStyle.css";

const createHeaders = (headers: string[]) =>
  headers.map((item) => ({
    text: item,
    ref: useRef(),
  }));

export const LogTable = () => {
  const [tableHeight, setTableHeight] = useState("auto");
  const [choosedLog, setChoosedLog] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableElement = useRef(null);

  const minCellWidth = 150;

  const headers = [
    "Id устройства",
    "Состояние",
    "Цена",
    "Количество",
    "Тип устройства",
    "Компания",
    "Дата установки",
  ];
  const columns = createHeaders(headers);

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      console.log("1");
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          // Calculate the column width
          const width = e.clientX - col.ref.current.offsetLeft;

          if (width >= minCellWidth) {
            return `${width}px`;
          }
        }

        // Otherwise return the previous width (no changes)
        return `${col.ref.current.offsetWidth}px`;
      });

      // Assign the px values to the table
      tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
        " "
      )}`;
    },
    [activeIndex, columns, minCellWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  const calcStringStyle = (deviceType: string, index: number) => {
    if (index !== null && choosedLog === index) return "choosedLog";
    let resultClass = "type1Color";
    if (deviceType !== "Type1")
      resultClass = `${deviceType.toLowerCase()}Color`;
    return resultClass;
  };

  useEffect(() => {
    setTableHeight(tableElement?.current?.offsetHeight);
  }, []);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  return (
    <Paper elevation={3} className="table-wrapper">
      <table className="resizeable-table" ref={tableElement}>
        <thead>
          <tr>
            {columns.map(({ ref, text }, i) => (
              <th ref={ref} key={text}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minWidth: "max-content" }}
                >
                  <span>{text}</span>
                  <SortArrow />
                </Grid>
                <div
                  style={{ height: tableHeight }}
                  onMouseDown={() => mouseDown(i)}
                  className={`resize-handle ${
                    activeIndex === i ? "active" : "idle"
                  }`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {defaultData.map((item, index) => (
            <tr
              onClick={() => {
                if (choosedLog === index) setChoosedLog(null);
                else setChoosedLog(index);
              }}
            >
              <td className={calcStringStyle(item.deviceType, index)}>
                {item.deviceId}
              </td>
              <td className={calcStringStyle(item.deviceType, index)}>
                {item.isActive ? "On" : "Off"}
              </td>
              <td className={calcStringStyle(item.deviceType, index)}>
                {item.price}
              </td>
              <td className={calcStringStyle(item.deviceType, index)}>
                {item.quantity}
              </td>
              <td className={calcStringStyle(item.deviceType, index)}>
                {item.deviceType}
              </td>
              <td className={calcStringStyle(item.deviceType, index)}>
                {item.company}
              </td>
              <td className={calcStringStyle(item.deviceType, index)}>
                {item.installationDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
};

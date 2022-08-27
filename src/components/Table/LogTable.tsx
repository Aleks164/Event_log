import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { defaultData } from "../../utils/defaultData";
import { tableHeaders } from "../../utils/tableHeaders";
import { SortArrow } from "./SortArrow";
import { setIsLoading } from "../../store/reducers/eventLogStateManager";
import { setData } from "../../store/reducers/dataManager";
import { setNewPageDataAction } from "../../store/actions/setNewPageDataAction";
import { TableCustomSpiner } from "./TableCustomSpiner";
import "./tableStyle.css";
import { DataKeysType } from "../../types/types";

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
  const keyOfDataItem = Object.keys(defaultData[0]);

  const { data } = useTypedSelector((state) => state.dataManager);
  const { currentPage, tableRows, tableHeadersList } = useTypedSelector(
    (state) => state.eventLogStateManager
  );
  const minCellWidth = 150;
  const columnsHeaders = createHeaders(tableHeaders);

  const rowNumberCalc = (index: number) =>
    String((currentPage - 1) * tableRows + index + 1);

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      const gridColumns = columnsHeaders.map((col, i) => {
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
    [activeIndex, columnsHeaders, minCellWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  const calcStringStyle = (deviceType: string, index: number, i: number) => {
    if (index !== null && choosedLog === index) return "choosedLog";
    let resultClass = "type1Color";
    if (deviceType !== "Type1")
      resultClass = `${deviceType.toLowerCase()}Color`;
    if (!tableHeadersList.includes(tableHeaders[i]))
      resultClass += " hideColumn";

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
      <table
        className="resizeable-table"
        style={{
          gridTemplateColumns: `repeat(${tableHeadersList.length}, minmax(150px, 1fr))`,
        }}
        ref={tableElement}
      >
        <thead>
          <tr>
            {columnsHeaders.map(({ ref, text }, i) => (
              <th
                ref={ref}
                key={text}
                className={tableHeadersList.includes(text) ? "" : "hideColumn"}
                style={{ paddingTop: `${i === 0 ? "27px" : ""}` }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minWidth: "max-content" }}
                >
                  <span>{text}</span>
                  {i !== 0 && <SortArrow fieldIndex={i} />}
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
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => {
                if (choosedLog === index) setChoosedLog(null);
                else setChoosedLog(index);
              }}
            >
              {tableHeaders.map((header, i) => {
                if (i === 0)
                  return (
                    <td
                      key={i}
                      className={calcStringStyle(item.deviceType, index, i)}
                    >
                      {rowNumberCalc(index)}
                    </td>
                  );
                if (header === "Состояние")
                  return (
                    <td
                      key={i}
                      className={calcStringStyle(item.deviceType, index, i)}
                    >
                      {item.isActive ? "On" : "Off"}
                    </td>
                  );
                return (
                  <td
                    key={i}
                    className={calcStringStyle(item.deviceType, index, i)}
                  >
                    {item[keyOfDataItem[i - 1] as DataKeysType]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
};

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Grid, Paper } from "@mui/material";
import { useTypedSelector } from "@/hooks/redux";
import { defaultData } from "@/utils/defaultData";
import { tableHeaders } from "@/utils/tableHeaders";
import { SortArrow } from "./SortArrow/SortArrow";
import { DataKeysType, UserSettingsStateType } from "@/types/types";
import { readUserSettings } from "@/utils/readUserSettings";
import { firstLoadingSort } from "@/utils/firstLoadingSort";
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
  const keyOfDataItem = Object.keys(defaultData[0]);
  const storageTableHeaders = readUserSettings("tableHeadersList");

  const { data, serverDataLength } = useTypedSelector((state) => state.dataManager);
  
  const { curItem, type } = useTypedSelector((state) => state.sortManager);
  
  const storageSortParam = readUserSettings("sortParam");
  
  const lastSortParam = (storageSortParam as SortParamStorageType) || {
    curItem,
    type,
  };
  
  const lastData = storageSortParam? firstLoadingSort({ curItem:storageSortParam.curItem, type:storageSortParam.type, data }) : data;
  
  const { currentPage, tableRows, tableHeadersList, minColumnWidth } =
    useTypedSelector((state) => state.eventLogStateManager);
      
  const lastComposition =
    (storageTableHeaders as UserSettingsStateType["tableHeadersList"]) ||
    tableHeadersList;
    
  const columnsHeaders = createHeaders(tableHeaders);

  const rowNumberCalc = (index: number) =>
    String((currentPage - 1) * tableRows + index + 1);

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  };
  
  const filterParams = {    
    curItem: lastSortParam.curItem,
    type: lastSortParam.type,
    data:lastData,
    currentPage,
    tableRows,
    serverDataLength
  };

  const mouseMove = useCallback(
    (e) => {
      const gridColumns = columnsHeaders.map((col, i) => {
        if (i === activeIndex) {
          // Calculate the column width
          const width = e.clientX - col.ref.current.offsetLeft;

          if (width >= minColumnWidth) {
            return `${width}px`;
          }
        }

        // Otherwise return the previous width (no changes)
        return `${col.ref.current.offsetWidth}px`;
      });

      // Assign the px values to the table
      tableElement.current.style.gridTemplateColumns = `${gridColumns
        .filter((column) => column !== "0px")
        .join(" ")}`;
    },
    [activeIndex, columnsHeaders, minColumnWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  const calcStringClass = (deviceType: string, index: number, i: number) => {
    if (!lastComposition.includes(tableHeaders[i])) return "hideColumn";
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
      window.getSelection()?.removeAllRanges(); 
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
          gridTemplateColumns: `repeat(${lastComposition.length}, minmax(150px, 1fr))`,
        }}
        ref={tableElement}
      >
        <thead>
          <tr>
            {columnsHeaders.map(({ ref, text }, i) => (
              <th
                ref={ref}
                key={text}
                className={lastComposition.includes(text) ? "" : "hideColumn"}
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
                  {i !== 0 && <SortArrow sortArrowParam={{...filterParams,fieldIndex:i}} />}
                </Grid>
                <div
                  style={{ height: tableHeight }}
                  onMouseDown={() => mouseDown(i)}
                  className={`resize-handle ${
                    activeIndex === i ? "active" : ""
                  }`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lastData.map((item, index) => (
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
                      className={calcStringClass(item.deviceType, index, i)}
                    >
                      {rowNumberCalc(index)}
                    </td>
                  );
                if (header === "Состояние")
                  return (
                    <td
                      key={i}
                      className={calcStringClass(item.deviceType, index, i)}
                    >
                      {item.isActive ? "On" : "Off"}
                    </td>
                  );
                return (
                  <td
                    key={i}
                    className={calcStringClass(item.deviceType, index, i)}
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

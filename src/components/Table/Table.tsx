import React, { useState, useCallback, useEffect, useRef } from "react";
import { defaultData } from "../../utils/defaultData";
import "./tableStyle.css";

const createHeaders = (headers: string[]) =>
  headers.map((item) => ({
    text: item,
    ref: useRef(),
  }));

export const Table = ({ minCellWidth = 0 }) => {
  const [tableHeight, setTableHeight] = useState("auto");
  const [activeIndex, setActiveIndex] = useState(null);
  const tableElement = useRef(null);
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

  const mouseDown = (index) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
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
    <div className="table-wrapper">
      <table className="resizeable-table" ref={tableElement}>
        <thead>
          <tr>
            {columns.map(({ ref, text }, i) => (
              <th ref={ref} key={text}>
                <span>{text}</span>
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
          {defaultData.map((item) => (
            <tr>
              <td>{item.deviceId}</td>
              <td>{item.isActive}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.deviceType}</td>
              <td>{item.company}</td>
              <td>{item.installationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

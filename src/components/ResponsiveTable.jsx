import React, { useEffect, useState } from "react";
import './ResponsiveTable.css';

const ResponsiveTable = ({ data, headers, stickyKeys = [] , showActions = false , exportAllData = true}) => {
  const [columnsPerPage, setColumnsPerPage] = useState(getColumnsPerPage());
  const [startIndex, setStartIndex] = useState(0);
  const [theme, setTheme] = useState("light");

  // حذف ستون‌های آخر از لیست stickyKeys
  const allKeys = headers.slice(1, -1); // کلیدهای قابل اسلاید
  const allSlideKeys = headers.filter(
    (h) => !stickyKeys.includes(h) && h !== headers[0] 
  );
  const totalSlideCols = allSlideKeys.length;

  useEffect(() => {
    const handleResize = () => {
      setColumnsPerPage(getColumnsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // کلیدهایی که باید نمایش داده بشن
  const getVisibleKeys = () => {
    const visibleSlide = allSlideKeys.slice(startIndex, startIndex + columnsPerPage);
    const baseKeys = [headers[0], ...stickyKeys, ...visibleSlide];
    return showActions ? [...baseKeys, "Actions"] : baseKeys;
  };
  
  
  const handlePrev = () => {
    if (startIndex - columnsPerPage >= 0) {
      setStartIndex(startIndex - columnsPerPage);
    }
  };

  const handleNext = () => {
    if (startIndex + columnsPerPage < totalSlideCols) {
      setStartIndex(startIndex + columnsPerPage);
    }
  };

  const toggleTheme = () => {
    document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const exportToCSV = () => {
    // اگر exportAllData برابر با true باشه، تمام داده‌ها رو اکسپورت می‌کنیم
    const allKeysToExport = exportAllData
      ? [headers[0], ...stickyKeys, ...allSlideKeys] // همه ستون‌ها
      : getVisibleKeys(); // فقط ستون‌های نمایش داده شده
    const csvHeaders = allKeysToExport.join(",");
    const csvRows = data.map((row, i) =>
      allKeysToExport.map((key) =>
        key === headers[0] ? i + 1 : row[key.toLowerCase()] || ""
      ).join(",")
    );
    const csvContent = [csvHeaders, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const visibleKeys = getVisibleKeys();

  return (
    <div className="container">
      <button className="change-theme" onClick={toggleTheme}>
        {theme === "light" ? " Dark Mode 🌙" : " Light Mode ☀️"}
      </button>

      <div className="table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {visibleKeys.map((key, idx) => (
                  <th key={idx} className={idx === 0 ? "cell-number" : "slide-col active"}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {visibleKeys.map((key, i) => (
                    <td key={i} className={i === 0 ? "cell-number" : "slide-col active"}>
                    {key === headers[0]
                      ? idx + 1
                      : key === "Actions"
                      ? (
                          <div className="action-buttons">
                            <button onClick={() => console.log("Edit", row)}>✏️</button>
                            <button onClick={() => console.log("Delete", row)}>🗑️</button>
                          </div>
                        )
                      : row[key.toLowerCase()] || ""}
                  </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="wrapper-next-and-prev-btn">
          {startIndex > 0 && (
            <button className="prev-btn" onClick={handlePrev}>
              ◀
            </button>
          )}
          {startIndex + columnsPerPage < totalSlideCols && (
            <button className="next-btn" onClick={handleNext}>
              ▶
            </button>
          )}
        </div>

        <div className="status-bar">
          Showing columns <strong>{startIndex + 1}</strong> to{" "}
          <strong>{Math.min(startIndex + columnsPerPage, totalSlideCols)}</strong> of{" "}
          <strong>{totalSlideCols}</strong>
        </div>
      </div>

      <button className="export-btn" onClick={exportToCSV}>
        📁 Export CSV
      </button>
    </div>
  );
};

function getColumnsPerPage() {
  const width = window.innerWidth;
  if (width < 400) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 4;
  return 6;
}

export default ResponsiveTable;

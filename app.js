// array 
const tableData = [
    {
      id: 1,
      company: "Alfreds Futterkiste",
      contact: "Maria Anders",
      country: "Germany",
      number: "9915552360",
      number: "9915552360",
      number: "9915552360",
      email: "maria@gmail.com"
    },
    {
      id: 2,
      company: "Centro comercial Moctezuma",
      contact: "Francisco Chang",
      country: "Mexico",
      number: "9123456789",
      number: "9123456789",
      number: "9123456789",
      email: "francisco@gmail.com"
    },
    {
      id: 3,
      company: "Ernst Handel",
      contact: "Roland Mendel",
      country: "Austria",
      number: "9356482374",
      number: "9356482374",
      number: "9356482374",
      email: "roland@handel.at"
    },
    {
      id: 4,
      company: "Island Trading",
      contact: "Helen Bennett",
      country: "UK",
      number: "9876543210",
      number: "9876543210",
      number: "9876543210",
      email: "helen@island.co.uk"
    },
    {
      id: 5,
      company: "Laughing Bacchus Winecellars",
      contact: "Yoshi Tannamuri",
      country: "Canada",
      number: "9988776655",
      number: "9988776655",
      number: "9988776655",
      email: "yoshi@winecellars.ca"
    }
  ];

//   render table
  function renderTable(data) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
  
    data.forEach((item, index) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td class="cell-number">${index + 1}</td>
        <td>${item.company}</td>
        <td class="slide-col">${item.contact}</td>
        <td class="slide-col">${item.country}</td>
        <td class="slide-col">${item.country}</td>
        <td class="slide-col">${item.number}</td>
        <td class="slide-col">${item.number}</td>
        <td class="slide-col">${item.number}</td>
        <td class="slide-col">${item.email}</td>
        <td class="slide-col">${item.email}</td>
        <td class="slide-col"><button class="remove-btn">Remove</button></td>
      `;
  
      tbody.appendChild(row);
    });
  }
  //  تعریف تابع برای محاسبه ستون‌های قابل نمایش
  function getColumnsPerPage() {
    const width = window.innerWidth;
    if (width < 400) {
      return 1;
    }else if(width < 768) {
      return 2; // موبایل
    } else if (width < 1024) {
      return 4; // تبلت
    } else {
      return 6; // لپ‌تاپ و دسکتاپ
    }
  }
  

  //load 
  window.addEventListener('load' , ()=>{
    renderTable(tableData)
    updateVisibleColumns();

  })
  // resize
  window.addEventListener("resize", () => {
    columnsPerPage = getColumnsPerPage();
    updateVisibleColumns();
  });
  

  // ---------- کنترل ستون‌ها ---------- //
let startIndex = 0;
let  columnsPerPage =  getColumnsPerPage();

function updateVisibleColumns() {
  const allCols = document.querySelectorAll(".slide-col");
  allCols.forEach(col => col.classList.remove("active"));

  // گرفتن همه ستون‌ها برای هر سطر
  const rows = document.querySelectorAll("tr");

  rows.forEach(row => {
    const slideCols = Array.from(row.querySelectorAll(".slide-col"));

    
    slideCols.forEach((col, i) => {
      if (i >= startIndex && i < startIndex + columnsPerPage) {
        col.classList.add("active");
        col.style.animation = "fadeSlideIn 0.4s ease-out forwards";
      } else {
        col.style.animation = "fadeSlideOut 0.3s ease-in forwards";
        setTimeout(() => {
          col.classList.remove("active");
          col.style.animation = "";
        }, 300);
      }
    });
  });

   // 👇 آپدیت نوار وضعیت
   const totalCols = 9; // کل ستون‌های اسلایدی
   const currentStart = startIndex + 1;
   const currentEnd = Math.min(startIndex + columnsPerPage, totalCols);
  //  const statusText = `ستون‌های ${currentStart} تا ${currentEnd} از ${totalCols}`;
 
   document.getElementById("columnStatus").innerHTML  = `<strong>${currentEnd}</strong> / ${totalCols}`;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalCols = 9; // contact تا action یعنی ۵ ستون
  if (startIndex + columnsPerPage < totalCols) {
    startIndex += columnsPerPage;
    updateVisibleColumns();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (startIndex - columnsPerPage >= 0) {
    startIndex -= columnsPerPage;
    updateVisibleColumns();
  }
});
  

// change theme
const themeButton = document.querySelector(".change-theme");
const html = document.documentElement;

themeButton.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    themeButton.textContent = newTheme === "dark" ? "Light ☀️" : "Dark 🌙";
  });
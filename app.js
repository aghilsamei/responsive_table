// array 
const tableData = [
    {
      id: 1,
      company: "Alfreds Futterkiste",
      contact: "Maria Anders",
      country: "Germany",
      number: "9915552360",
      email: "maria@gmail.com"
    },
    {
      id: 2,
      company: "Centro comercial Moctezuma",
      contact: "Francisco Chang",
      country: "Mexico",
      number: "9123456789",
      email: "francisco@gmail.com"
    },
    {
      id: 3,
      company: "Ernst Handel",
      contact: "Roland Mendel",
      country: "Austria",
      number: "9356482374",
      email: "roland@handel.at"
    },
    {
      id: 4,
      company: "Island Trading",
      contact: "Helen Bennett",
      country: "UK",
      number: "9876543210",
      email: "helen@island.co.uk"
    },
    {
      id: 5,
      company: "Laughing Bacchus Winecellars",
      contact: "Yoshi Tannamuri",
      country: "Canada",
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
        <td>${index + 1}</td>
        <td>${item.company}</td>
        <td>${item.contact}</td>
        <td>${item.country}</td>
        <td>${item.number}</td>
        <td>${item.email}</td>
        <td><button class="remove-btn">Remove</button></td>
      `;
  
      tbody.appendChild(row);
    });
  }

  //load 
  window.addEventListener('load' , ()=>{
    renderTable(tableData)
  })
  

// change theme
const themeButton = document.querySelector(".change-theme");
const html = document.documentElement;

themeButton.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    themeButton.textContent = newTheme === "dark" ? "Light ☀️" : "Dark 🌙";
  });
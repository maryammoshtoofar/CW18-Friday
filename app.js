const API_URL = "https://62b40bbda36f3a973d2ab0ed.mockapi.io";
const table = document.querySelector("#table tbody");
const DEFAULT_PAGE_COUNT = 5;
let current_page = 1;
const spinner = document.querySelector("#loading");

const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const familyName = document.getElementById("familyName");
const birthday = document.getElementById("bDate");

const confirmDelete = document.getElementById("confirmDelete");

const addBtn= document.getElementById('addBtn');
const searchInput=document.getElementById("searchInput")
const searchHolder = document.getElementById("searchHolder");
//GET

document.addEventListener("DOMContentLoaded", () => {
  getData();
  createPagination();
});




function getData() {
  table.innerHTML = " ";
  spinner.style.display = "block";
  fetch(`${API_URL}/teamwork${generateQueryParams(current_page)}`)
    .then((response) => response.json())
    .then((data) => {
      const { persons, count } = data;
      persons.forEach(addToDom);
      createPagination(count);
      spinner.style.display = "none";
    });
}

document.querySelector("ul.pagination").addEventListener("click", (event) => {
  console.log("hi");
  const lis = document.querySelectorAll(".page-link");
  if (event.target.innerHTML === "previous") current_page--;
  else if (event.target.innerHTML === "next") current_page++;
  else current_page = Number(event.target.innerHTML);
  lis.forEach((li) => li.classList.remove("active"));
  event.target.classList.add("active");
  getData();
});

function addToDom(person) {
  const row = document.createElement("tr");
  row.dataset.id = person.id;
  const {
    idCell,
    nameCell,
    familyCell,
    birthdayCell,
    nationIdCell,
    fathersNameCell,
    jobCell,
    educationCell,
    genderCell,
    countryCell,
    stateCell,
    cityCell,
    streetCell,
    blockCell,
    noCell,
    floorCell,
    unitCell,
    editCell,
    deleteCell,
  } = createCell(person);

  row.appendChild(idCell);
  row.appendChild(nameCell);
  row.appendChild(familyCell);
  row.appendChild(birthdayCell);
  row.appendChild(nationIdCell);
  row.appendChild(fathersNameCell);
  row.appendChild(jobCell);
  row.appendChild(educationCell);
  row.appendChild(genderCell);
  row.appendChild(countryCell);
  row.appendChild(stateCell);
  row.appendChild(cityCell);
  row.appendChild(streetCell);
  row.appendChild(blockCell);
  row.appendChild(noCell);
  row.appendChild(floorCell);
  row.appendChild(unitCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);

  table.appendChild(row);
}

function createCell(data) {
  const idCell = document.createElement("td");
  idCell.innerHTML = data.id;

  const nameCell = document.createElement("td");
  nameCell.innerHTML = data.name;

  const familyCell = document.createElement("td");
  familyCell.innerHTML = data.family;

  const birthdayCell = document.createElement("td");
  birthdayCell.innerHTML = new Date(data.birthday);

  const nationIdCell = document.createElement("td");
  nationIdCell.innerHTML = data.nationId;

  const fathersNameCell = document.createElement("td");
  fathersNameCell.innerHTML = data.fathersName;

  const jobCell = document.createElement("td");
  jobCell.innerHTML = data.job;

  const educationCell = document.createElement("td");
  educationCell.innerHTML = data.education;

  const genderCell = document.createElement("td");
  genderCell.innerHTML = data.gender;

  const countryCell = document.createElement("td");
  countryCell.innerHTML = data.location.country;

  const stateCell = document.createElement("td");
  stateCell.innerHTML = data.location.state;

  const cityCell = document.createElement("td");
  cityCell.innerHTML = data.location.city;

  const streetCell = document.createElement("td");
  streetCell.innerHTML = data.location.street;

  const blockCell = document.createElement("td");
  blockCell.innerHTML = data.location.block;

  const noCell = document.createElement("td");
  noCell.innerHTML = data.location.no;

  const floorCell = document.createElement("td");
  floorCell.innerHTML = data.location.floor;

  const unitCell = document.createElement("td");
  unitCell.innerHTML = data.location.unit;

  const editCell = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.dataset.id = data.id;
  editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
  editCell.appendChild(editBtn);
  editBtn.setAttribute("onclick", `editPage(${data.id})`);

  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.id = data.id;
  deleteBtn.innerHTML = '<i class="bi bi-trash3"></i>';
  deleteCell.appendChild(deleteBtn);
  deleteBtn.dataset.bsToggle = "modal";
  deleteBtn.dataset.bsTarget = "#delete-modal";
  deleteBtn.setAttribute("onclick", `getModalData(${data.id})`);

  return {
    idCell,
    nameCell,
    familyCell,
    birthdayCell,
    nationIdCell,
    fathersNameCell,
    jobCell,
    educationCell,
    genderCell,
    countryCell,
    stateCell,
    cityCell,
    streetCell,
    blockCell,
    noCell,
    floorCell,
    unitCell,
    editCell,
    deleteCell,
  };
}

function createPagination(count) {
  const pageCount = Math.ceil(count / DEFAULT_PAGE_COUNT);
  let lis = " ";
  lis += `<li class="page-item " > <a class="page-link">previous</a> </li>`;
  for (let i = 1; i < pageCount; i++) {
    lis += `<li class="page-item ${
      i === current_page ? "active" : ""
    } "> <a class="page-link">${i}</a> </li>`;
  }
  lis += `<li class="page-item"> <a class="page-link">next</a> </li>`;
  document.querySelector("ul.pagination").innerHTML = lis;
}

function generateQueryParams(page = 1) {
  return `?page=${page}&limit=${DEFAULT_PAGE_COUNT}`;
}

function getModalData(id) {
  fetch(`${API_URL}/teamwork/${id}`)
    .then((response) => response.json())
    .then((data) => {
      userId.innerText = data.id;
      userId.dataset.value = data.id;
      userName.innerText = data.name;
      familyName.innerText = data.family;
      birthday.innerText = data.birthday;
    });
}

confirmDelete.addEventListener("click", () => {
  let id = userId.dataset.value;
  fetch(`${API_URL}/teamwork/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      getData();
      Toastify({
        text: "User deleted",
        duration: 2000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    })
    .catch(() => {
      Toastify({
        text: "Not deleted",
        duration: 2000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        style: {
          background: "red",
        },
      }).showToast();
    });
});
function editPage(id) {
  window.location.href = `http://127.0.0.1:5501/formPage.html?id=${id}&page=${current_page}`;
}

addBtn.addEventListener('click',()=>{
  window.location.href = "http://127.0.0.1:5501/formPage.html";
})


// add debounce search
const debounceSearch=_.debounce(searchUser,500)
searchInput.addEventListener("input",(e)=>{
  debounceSearch(e.target.value)
  searchHolder.style.display = "block";
})
searchInput.addEventListener("blur",(e)=>{
  searchHolder.style.display = "none";
  searchHolder.innerHTML = "";

})
function searchUser(item){
  return fetch(`${API_URL}/teamwork?search=${item}`)
  .then((res)=> res.json())
  .then((data)=>{
    searchHolder.innerHTML = "";
    data.persons.forEach(addItemToSearchHolder);

  })
}


function addItemToSearchHolder(item){
 let html = `
 <div>${item.name}</div>
 `
 searchHolder.innerHTML += html;
}
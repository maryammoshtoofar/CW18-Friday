// Get URL params
import { API_URL, Person, Place, FormInputs } from "./variables";
import Toastify from "toastify-js";

const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());
const form = document.getElementById("myForm") as HTMLFormElement;
const firstName = document.getElementById("name") as HTMLInputElement;
const bday = document.getElementById("bday") as HTMLInputElement;
const fatherName = document.getElementById("fathername") as HTMLInputElement;
const education = document.getElementById("edu") as HTMLInputElement;
const country = document.getElementById("country") as HTMLInputElement;
const city = document.getElementById("city") as HTMLInputElement;
const block = document.getElementById("block") as HTMLInputElement;
const floor = document.getElementById("floor") as HTMLInputElement;
const lastName = document.getElementById("lname") as HTMLInputElement;
const nationalId = document.getElementById("nationalid") as HTMLInputElement;
const job = document.getElementById("job") as HTMLInputElement;
const gender = document.getElementById("gender") as HTMLInputElement;
const state = document.getElementById("state") as HTMLInputElement;
const street = document.getElementById("street") as HTMLInputElement;
const no = document.getElementById("no") as HTMLInputElement;
const unit = document.getElementById("unit") as HTMLInputElement;
const formButton = document.getElementById("formButton")!;

function getUserData(id: string) {
  fetch(`${API_URL}/teamwork/${id}`)
    .then((response) => response.json())
    .then((data) => {
      firstName.value = data.name;
      bday.value = data.birthday;
      fatherName.value = data.fathersName;
      lastName.value = data.family;
      nationalId.value = data.nationId;
      job.value = data.job;
      education.value = data.education;
      gender.value = data.gender;
      country.value = data.location.country;
      city.value = data.location.city;
      state.value = data.location.state;
      street.value = data.location.street;
      no.value = data.location.no;
      block.value = data.location.block;
      floor.value = data.location.floor;
      unit.value = data.location.unit;

      console.log(data);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getUserData(params.id);
});

if (params.id) {
  formButton.innerHTML = "Edit Information";

  function userInfoEdit(data: Person, id: string) {
    return fetch(`${API_URL}/teamwork/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        () =>
          (window.location.href = `http://127.0.0.1:5501/index.html?${params.page}`)
      );
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const location: Place = {
      block: "",
      city: "",
      country: "",
      floor: "",
      no: "",
      state: "",
      street: "",
      unit: "",
    };

    location.unit = "test";

    let formData = new FormData(form);
    
    let updatedData: FormInputs = {
      birthday: "",
      education: "",
      family: "",
      fathersName: "",
      gender: "",
      job: "",
      block: "",
      city: "",
      country: "",
      floor: "",
      no: "",
      state: "",
      street: "",
      name: "",
      nationalId: "",
    };

    updatedData = Object.fromEntries(formData);
    updatedData.location = location;
    console.log(updatedData);
    userInfoEdit(updatedData, params.id);
  });
} else {
  formButton.innerHTML = "Add this Information";
  function addUserInfo(data: Person) {
    return fetch(`${API_URL}/teamwork`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        Toastify({
          text: "User added",
          duration: 2000,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        setTimeout(
          () => (window.location.href = `http://127.0.0.1:5501/index.html`),
          3000
        );
      })
      .catch(() => {
        Toastify({
          text: "Not added",
          duration: 2000,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          style: {
            background: "red",
          },
        }).showToast();
      });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const addData = Object.fromEntries(formData);
    addUserInfo(addData);
  });
}

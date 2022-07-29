"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Get URL params
const variables_1 = require("./variables");
const toastify_js_1 = __importDefault(require("toastify-js"));
const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());
const form = document.getElementById("myForm");
const firstName = document.getElementById("name");
const bday = document.getElementById("bday");
const fatherName = document.getElementById("fathername");
const education = document.getElementById("edu");
const country = document.getElementById("country");
const city = document.getElementById("city");
const block = document.getElementById("block");
const floor = document.getElementById("floor");
const lastName = document.getElementById("lname");
const nationalId = document.getElementById("nationalid");
const job = document.getElementById("job");
const gender = document.getElementById("gender");
const state = document.getElementById("state");
const street = document.getElementById("street");
const no = document.getElementById("no");
const unit = document.getElementById("unit");
const formButton = document.getElementById("formButton");
function getUserData(id) {
    fetch(`${variables_1.API_URL}/teamwork/${id}`)
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
    function userInfoEdit(data, id) {
        return fetch(`${variables_1.API_URL}/teamwork/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => (window.location.href = `http://127.0.0.1:5501/index.html?${params.page}`));
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const location = {
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
        let updatedData = {
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
}
else {
    formButton.innerHTML = "Add this Information";
    function addUserInfo(data) {
        return fetch(`${variables_1.API_URL}/teamwork`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
            (0, toastify_js_1.default)({
                text: "User added",
                duration: 2000,
                close: true,
                gravity: "bottom",
                position: "left",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            setTimeout(() => (window.location.href = `http://127.0.0.1:5501/index.html`), 3000);
        })
            .catch(() => {
            (0, toastify_js_1.default)({
                text: "Not added",
                duration: 2000,
                close: true,
                gravity: "bottom",
                position: "left",
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

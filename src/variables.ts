export const API_URL = "https://62b40bbda36f3a973d2ab0ed.mockapi.io";
export type Person = {
  birthday: string;
  education: string;
  family: string;
  fathersName: string;
  gender: string;
  id: string;
  job: string;
  location: {
    block: string;
    city: string;
    country: string;
    floor: string;
    no: string;
    state: string;
    street: string;
    unit: string;
  };
  name: string;
  nationId: string;
};
export type FormInputs = {
  birthday: string;
  block: string;
  city: string;
  country: string;
  education: string;
  family: string;
  fathersName: string;
  floor: string;
  gender: string;
  job: string;
  name: string;
  nationalId: string;
  no: string;
  state: string;
  street: string;
};

export type Place = {
  block: string;
  city: string;
  country: string;
  floor: string;
  no: string;
  state: string;
  street: string;
  unit: string;
};

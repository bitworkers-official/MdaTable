import axios from "axios";

export async function getAllPeople() {
  const res = await axios.get(
    "https://wa-universal-api-v12-container.azurewebsites.net/getPeoples"
  );
  return res.data;
}

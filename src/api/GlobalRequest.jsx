import axios from "axios";
const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: URL });

const config = {
  headers: {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
  },
};

// --------------------RECEIPTE----------------------
// POST
export const receiptGetAPI = async ({
  report_date = "",
  shift = "",
  pharmacy = "",
}) =>
  API.get(
    `/pharmacies/receipts/?report_date=${report_date}&shift=${shift}&pharmacy=${pharmacy}`,
    config
  );

// POST
export const receiptPostAPI = async (data) =>
  API.post(`/pharmacies/receipts/`, data, config);

// PUT
export const receiptPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/receipts/${id}/`, data, config);

// ----------------------OFFERS----------------------------
// GET
export const remeinderGetAPI = async ({
  pharmacy_id = "",
  report_date = "",
  shift = "",
}) =>
  API.get(
    `/pharmacies/remainders/?pharmacy_id=${pharmacy_id}&report_date=${report_date}&shift=${shift}`,
    config
  );

// ----------------------OFFERS----------------------------
// GET
export const offersGetAPI = async () => API.get(`/companies/offers/`, config);

// POST
export const offersPostAPI = async (data) =>
  API.post(`/companies/offers/`, data, config);

// DELET
export const offersDeleteAPI = async (id) =>
  API.delete(`/companies/offers/${id}`, config);

// ----------------------------POPULAR PRODUCTS------------------------------------------------
// GET
export const popularProductsGetAPI = async ({
  pharmacy = "",
  search = "",
  page = 1,
}) =>
  API.get(
    `/companies/drugs/?pharmacy=${pharmacy}&search=${search}&page=${page}`,
    config
  );

// POST
export const popularProductsPostAPI = async (data) =>
  API.post("/companies/drugs/", data, config);

// GET BY ID
export const popularProductsGetOneAPI = async (id) =>
  API.get(`/companies/drugs/${id}/`, config);

// PUT
export const popularProductsPutAPI = async (id, data) =>
  API.put(`/companies/drugs/${id}/`, data, config);

// PATCH
export const popularProductsPatchAPI = async (id, data) =>
  API.patch(`/companies/drugs/${id}/`, data, config);

// DELETE
export const popularProductsDeleteAPI = async (id) =>
  API.delete(`/companies/drugs/${id}/`, config);

// ------------------------------------KLIENTS--------------------------------------
// GET
export const clientsGetAPI = async ({ page = 1, search = "" }) =>
  API.get(`/companies/clients/?page=${page}&search=${search}`, config);

// POST
export const clientsPostAPI = async (data) =>
  API.post("/companies/clients/", data, config);

// GET BY ID
export const clientsGetOneAPI = async (id) =>
  API.get(`/companies/clients/${id}/`, config);

// PUT
export const clientsPutAPI = async (id) =>
  API.put(`/companies/clients/${id}/`, config);

// PATCH
export const clientsPatchAPI = async (id, data) =>
  API.patch(`/companies/clients/${id}/`, data, config);

// DELETE
export const clientsDeleteAPI = async (id) =>
  API.delete(`/companies/clients/${id}/`, config);

// -----------------------------------------/companies/details-----------------------

export const companiesDetailsGetApi = async () =>
  API.get("/companies/details", config);

// --------------------------------------- FIRMS INCOMES--------------------------------------------------
// GET
export const firmsInComesGetAPI = async ({
  is_paid = "",
  report_date = "",
  page = 1,
  from_firm = "",
}) =>
  API.get(
    `/firms/incomes/?is_paid=${is_paid}&report_date=${report_date}&page=${page}&from_firm=${from_firm}`,
    config
  );

// POST
export const firmsInComesPostAPI = async (data) =>
  API.post("/firms/incomes/", data, config);

// GET BY ID
export const firmsInComesGetOneAPI = async (id) =>
  API.get(`/firms/incomes/${id}/`, config);

// PUT
export const firmsInComesPutAPI = async (id, data) =>
  API.put(`/firms/incomes/${id}/`, data, config);

// PATCH
export const firmsInComesPatchAPI = async (id, data) =>
  API.patch(`/firms/incomes/${id}/`, data, config);

// DELETE
export const firmsInComesDeleteAPI = async (id) =>
  API.delete(`/firms/incomes/${id}/`, config);

// --------------------------------------- FIRMS EXPENSE FROM DEBT--------------------------------------------------
// GET
export const firmsExpenseDebtGetAPI = async ({
  report_date = "",
  from_pharmacy = "",
  shift = "",
  page = 1,
}) =>
  API.get(
    `/firms/expenses/?report_date=${report_date}&from_pharmacy=${from_pharmacy}&shift=${shift}&page=${page}`,
    config
  );

// POST
export const firmsExpenseDebtPostAPI = async (data) =>
  API.post("/firms/expenses/", data, config);

// GET BY ID
export const firmsExpenseDebtGetOneAPI = async (id) =>
  API.get(`/firms/expenses/${id}/`, config);

export const firmsExpenseVerifyPostAPI = async (data) =>
  API.post(`/firms/expenses/verify/`, data, config);

// ------------------------------------FIRM RETERN FOR INCOME-------------------------------------------------

// GET
export const returnFirmGetAPI = async ({ report_date = "", page = 1 }) =>
  API.get(`/firms/returns/?report_date=${report_date}&page=${page}`, config);

// POST
export const returnFirmPostAPI = async (data) =>
  API.post(`/firms/returns/`, data, config);

// GET BY ID
export const returnFirmGetOneAPI = async (id) =>
  API.get(`/firms/expenses/${id}/`, config);

export const returnFirmsVerifyPostAPI = async (data) =>
  API.post(`/firms/returns/verify/`, data, config);

// -----------------------------PHARMACY REPORTS --------------------------------

export const reportsPharmacyAPI = async ({
  pharmacy = "",
  year = "",
  month = "",
}) =>
  API.get(
    `/pharmacies/reports/?pharmacy=${pharmacy}&report_date__year=${year}&report_date__month=${month}`,
    config
  );

// --------------------------GET FIRMS --------------------------------------------
export const getFirmsAPI = async ({ page = 1 }) =>
  API.get(`/firms/?page=${page}`, config);

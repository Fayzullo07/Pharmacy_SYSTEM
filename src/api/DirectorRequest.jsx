import axios from "axios";
const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: URL });

const config = {
  headers: {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
  },
};

// ----------------------------------------DIRECTORS-----------------------------
// POST
export const directorPostAPI = async (data) =>
  API.post("/accounts/directors/create/", data, config);

// GET
export const directorGetAPI = async () => API.get("/accounts/?role=d", config);

// GET BY ID
export const directorGetOneAPI = async (id) =>
  API.get(`/accounts/directors/${id}/`, config);

// PUT
export const directorPutAPI = async (id) =>
  API.put(`/accounts/directors/${id}/`, config);

// PATCH
export const directorPatchAPI = async (id, data) =>
  API.patch(`/accounts/directors/${id}/`, data, config);

// DELETE
export const directorDeleteAPI = async (id) =>
  API.delete(`/accounts/directors/${id}/`, config);

// ----------------------------------------MANAGER---------------------------------
// POST
export const managerPostAPI = async (data) =>
  API.post("/accounts/managers/create/", data, config);

// GET
export const managerGetAPI = async ({ page = 1 }) =>
  API.get(`/accounts/?role=m&page=${page}`, config);

// GET BY ID
export const managerGetOneAPI = async (id) =>
  API.get(`/accounts/managers/${id}/`, config);

// PUT
export const managerPutAPI = async (id) =>
  API.put(`/accounts/managers/${id}/`, config);

// PATCH
export const managerPatchAPI = async (id, data) =>
  API.patch(`/accounts/managers/${id}/`, data, config);

// DELETE
export const managerDeleteAPI = async (id) =>
  API.delete(`/accounts/managers/${id}/`, config);

// ----------------------------------------XODIMLAR--------------------------------

// POST
export const xodimPostAPI = async (data) =>
  API.post("/accounts/workers/create/", data, config);

// GET
export const xodimGetAPI = async ({ page = 1 }) =>
  API.get(`/accounts/?role=w&page=${page}`, config);

// GET BY ID
export const xodimGetOneAPI = async (id) =>
  API.get(`/accounts/workers/${id}/`, config);

// PUT
export const xodimPutAPI = async (id) =>
  API.put(`/accounts/workers/${id}/`, config);

// PATCH
export const xodimPatchAPI = async (id, data) =>
  API.patch(`/accounts/workers/${id}/`, data, config);

// DELETE
export const xodimDeleteAPI = async (id) =>
  API.delete(`/accounts/workers/${id}/`, config);

// -----------------------------------------APTEKA---------------------------------
// POST
export const aptekaPostAPI = async (data) =>
  API.post("/pharmacies/", data, config);

// GET
export const aptekaGetAPI = async ({ page = 1 }) =>
  API.get(`/pharmacies/?page=${page}`, config);

// PATCH
export const aptekaPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/${id}/`, data, config);

// DELETE
export const aptekaDeleteAPI = async (id) =>
  API.delete(`/pharmacies/${id}/`, config);

// -------------------------------------FIRMS-----------------------------------------
// GET
export const firmsGetAPI = async ({
  page = 1,
  is_favorite = "",
  search = "",
}) =>
  API.get(
    `/firms/?page=${page}&is_favorite=${is_favorite}&search=${search}`,
    config
  );

// POST
export const firmsPostAPI = async (data) => API.post("/firms/", data, config);

// GET BY ID
export const firmsGetOneAPI = async (id) => API.post(`/firms/${id}/`, config);

// PUT
export const firmsPutAPI = async (id) => API.put(`/firms/${id}/`, config);

// PATCH
export const firmsPatchAPI = async (id, data) =>
  API.patch(`/firms/${id}/`, data, config);

// DELETE
export const firmsDeleteAPI = async (id) => API.delete(`/firms/${id}/`, config);

// -------------------------------PHARMACIES EXPENSES TYPES----------------------------------
// GET
export const pharmacyExpensesTypesGetAPI = async ({ page = 1 }) =>
  API.get(`/pharmacies/expenses/types/?page=${page}`, config);

// POST
export const pharmacyExpensesTypesPostAPI = async (data) =>
  API.post("/pharmacies/expenses/types/", data, config);

// GET BY ID
export const pharmacyExpensesTypesGetOneAPI = async (id) =>
  API.post(`/pharmacies/expenses/types/${id}/`, config);

// PUT
export const pharmacyExpensesTypesPutAPI = async (id, data) =>
  API.put(`/pharmacies/expenses/types/${id}/`, data, config);

// PATCH
export const pharmacyExpensesTypesPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/expenses/types/${id}/`, data, config);

// DELETE
export const pharmacyExpensesTypesDeleteAPI = async (id) =>
  API.delete(`/pharmacies/expenses/types/${id}/`, config);

// -------------------------------TRANSFERS TYPES----------------------------------
// GET
export const transfersTypesGetAPI = async ({ page = 1 }) =>
  API.get(`/companies/transfers/types/?page=${page}`, config);

// POST
export const transfersTypesPostAPI = async (data) =>
  API.post("/companies/transfers/types/", data, config);

// GET BY ID
export const transfersTypesGetOneAPI = async (id) =>
  API.post(`/companies/transfers/types/${id}/`, config);

// PUT
export const transfersTypesPutAPI = async (id, data) =>
  API.put(`/companies/transfers/types/${id}/`, data, config);

// PATCH
export const transfersTypesPatchAPI = async (id, data) =>
  API.patch(`/companies/transfers/types/${id}/`, data, config);

// DELETE
export const transfersTypesDeleteAPI = async (id) =>
  API.delete(`/companies/transfers/types/${id}/`, config);

// ------------------------------- ACCOUNT EXPENSES------------------------------------
// GET
export const accountsExpensesGetAPI = async ({
  expense_type = "",
  expense_type__gte = "",
  shift = "",
  report_date = "",
  to_pharmacy = "",
}) =>
  API.get(
    `/accounts/expenses/?expense_type=${expense_type}&expense_type__gt=${expense_type__gte}&shift=${shift}&report_date=${report_date}&to_pharmacy=${to_pharmacy}`,
    config
  );

// POST
export const accountsExpensesPostAPI = async (data) =>
  API.post("/accounts/expenses/", data, config);

// GET BY ID
export const accountsExpensesGetOneAPI = async (id) =>
  API.get(`/accounts/expenses/${id}/`, config);

// PUT
export const accountsExpensesPutAPI = async (id, data) =>
  API.put(`/accounts/expenses/${id}/`, data, config);

// PATCH
export const accountsExpensesPatchAPI = async (id, data) =>
  API.patch(`/accounts/expenses/${id}/`, data, config);

// DELETE
export const accountsExpensesDeleteAPI = async (id) =>
  API.delete(`/accounts/expenses/${id}/`, config);

// -------------------------------PHARMACY INCOMES-----------------------------
// GET
export const pharmaciesInComesGetAPI = async ({
  report_date = "",
  shift = "",
  to_pharmacy = "",
}) =>
  API.get(
    `/pharmacies/incomes/?report_date=${report_date}&shift=${shift}&to_pharmacy=${to_pharmacy}`,
    config
  );

// POST
export const pharmaciesInComesPostAPI = async (data) =>
  API.post("/pharmacies/incomes/", data, config);

// GET BY ID
export const pharmaciesInComesGetOneAPI = async (id) =>
  API.post(`/pharmacies/incomes/${id}/`, config);

// PUT
export const pharmaciesInComesPutAPI = async (id, data) =>
  API.put(`/pharmacies/incomes/${id}/`, data, config);

// PATCH
export const pharmaciesInComesPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/incomes/${id}/`, data, config);

// DELETE
export const pharmaciesInComesDeleteAPI = async (id) =>
  API.delete(`/pharmacies/incomes/${id}/`, config);

// -------------------------------PHARMACY EXPENSES-----------------------------
// GET
export const pharmaciesExpensesGetAPI = async ({
  expense_type = "",
  expense_type__gte = "",
  shift = "",
  report_date = "",
  from_pharmacy = "",
}) =>
  API.get(
    `/pharmacies/expenses/?expense_type=${expense_type}&expense_type__gt=${expense_type__gte}&shift=${shift}&report_date=${report_date}&from_pharmacy=${from_pharmacy}`,
    config
  );

// POST
export const pharmaciesExpensesPostAPI = async (data) =>
  API.post("/pharmacies/expenses/", data, config);

// GET BY ID
export const pharmaciesExpensesGetOneAPI = async (id) =>
  API.post(`/pharmacies/expenses/${id}/`, config);

// PUT
export const pharmaciesExpensesPutAPI = async (id, data) =>
  API.put(`/pharmacies/expenses/${id}/`, data, config);

// PATCH
export const pharmaciesExpensesPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/expenses/${id}/`, data, config);

// DELETE
export const pharmaciesExpensesDeleteAPI = async (id) =>
  API.delete(`/pharmacies/expenses/${id}/`, config);

// ----------------------------PHARMACY DEBTS------------------------------------------------
// GET
export const pharmaciesDebtsGetAPI = async ({
  is_paid = "",
  page = 1,
  search = "",
  year = "",
  month = "",
  pharmacy = "",
  report_date = "",
}) =>
  API.get(
    `/pharmacies/debts/?is_paid=${is_paid}&report_date__year=${year}&report_date__month=${month}&page=${page}&search=${search}&to_pharmacy=${pharmacy}&report_date=${report_date}`,
    config
  );

export const pharmaciesDebtsGetAPINOT = async ({
  report_date = "",
  shift = "",
  to_pharmacy = "",
  search = "",
}) =>
  API.get(
    `/pharmacies/debts/not-pagination/?report_date=${report_date}&shift=${shift}&to_pharmacy=${to_pharmacy}&search=${search}`,
    config
  );

// POST
export const pharmaciesDebtsPostAPI = async (data) =>
  API.post("/pharmacies/debts/", data, config);

// GET BY ID
export const pharmaciesDebtsGetOneAPI = async (id) =>
  API.get(`/pharmacies/debts/${id}/`, config);

// PUT
export const pharmaciesDebtsPutAPI = async (id, data) =>
  API.put(`/pharmacies/debts/${id}/`, data, config);

// PATCH
export const pharmaciesDebtsPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/debts/${id}/`, data, config);

// DELETE
export const pharmaciesDebtsDeleteAPI = async (id) =>
  API.delete(`/pharmacies/debts/${id}/`, config);

// ----------------------------PHARMACY DEBTS REPAY------------------------------------------------
// GET
export const pharmaciesDebtsRePayGetAPI = async ({
  report_date = "",
  shift = "",
  to_debt__to_pharmacy = "",
  page = 1,
}) =>
  API.get(
    `/pharmacies/debts/repay/?report_date=${report_date}&shift=${shift}&to_debt__to_pharmacy=${to_debt__to_pharmacy}&page=${page}`,
    config
  );

// POST
export const pharmaciesDebtsRePayPostAPI = async (data) =>
  API.post("/pharmacies/debts/repay/", data, config);

// GET BY ID
export const pharmaciesDebtsRePayGetOneAPI = async (id) =>
  API.post(`/pharmacies/debts/repay/${id}/`, config);

// PUT
export const pharmaciesDebtsRePayPutAPI = async (id, data) =>
  API.put(`/pharmacies/debts/repay/${id}/`, data, config);

// PATCH
export const pharmaciesDebtsRePayPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/debts/repay/${id}/`, data, config);

// DELETE
export const pharmaciesDebtsRePayDeleteAPI = async (id) =>
  API.delete(`/pharmacies/debts/repay/${id}/`, config);

// ----------------------------PHARMACY TO DEBTS------------------------------------------------
// GET is_paid=&report_date=2023-05-20&shift=&is_client=false
export const pharmaciesToDebtsGetAPI = async ({
  is_client = "",
  is_paid = "",
  page = 1,
  search = "",
  year = "",
  month = "",
  pharmacy = "",
}) =>
  API.get(
    `/pharmacies/to-debts/?is_client=${is_client}&is_paid=${is_paid}&report_date__year=${year}&report_date__month=${month}&page=${page}&search=${search}&from_pharmacy=${pharmacy}`,
    config
  );

// GET WITHOUT PAGINATION
export const pharmaciesToDebtsGetAPINOT = async ({
  is_client = "",
  is_paid = "",
  search = "",
  report_date = "",
  shift = "",
  from_pharmacy = "",
}) =>
  API.get(
    `/pharmacies/to-debts/not-pagination/?is_client=${is_client}&is_paid=${is_paid}&report_date=${report_date}&search=${search}&shift=${shift}&from_pharmacy=${from_pharmacy}`,
    config
  );

// POST
export const pharmaciesToDebtsPostAPI = async (data) =>
  API.post("/pharmacies/to-debts/", data, config);

// GET BY ID
export const pharmaciesToDebtsGetOneAPI = async (id) =>
  API.get(`/pharmacies/to-debts/${id}/`, config);

// PUT
export const pharmaciesToDebtsPutAPI = async (id, data) =>
  API.put(`/pharmacies/to-debts/${id}/`, data, config);

// PATCH
export const pharmaciesToDebtsPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/to-debts/${id}/`, data, config);

// DELETE
export const pharmaciesToDebtsDeleteAPI = async (id) =>
  API.delete(`/pharmacies/to-debts/${id}/`, config);

// ----------------------------PHARMACY TO DEBTS REPAY------------------------------------------------
// GET
export const pharmaciesToDebtsRePayGetAPI = async ({
  report_date = "",
  shift = "",
  is_client = "",
  from_debt__from_pharmacy = "",
  page = 1,
}) =>
  API.get(
    `/pharmacies/to-debts/repay/?report_date=${report_date}&shift=${shift}&from_debt__is_client=${is_client}&from_debt__from_pharmacy=${from_debt__from_pharmacy}&page=${page}`,
    config
  );

// POST
export const pharmaciesToDebtsRePayPostAPI = async (data) =>
  API.post("/pharmacies/to-debts/repay/", data, config);

// GET BY ID
export const pharmaciesToDebtsRePayGetOneAPI = async (id) =>
  API.get(`/pharmacies/to-debts/repay/${id}/`, config);

// PUT
export const pharmaciesToDebtsRePayPutAPI = async (id, data) =>
  API.put(`/pharmacies/to-debts/repay/${id}/`, data, config);

// PATCH
export const pharmaciesToDebtsRePayPatchAPI = async (id, data) =>
  API.patch(`/pharmacies/to-debts/repay/${id}/`, data, config);

// DELETE
export const pharmaciesToDebtsRePayDeleteAPI = async (id) =>
  API.delete(`/pharmacies/to-debts/repay/${id}/`, config);

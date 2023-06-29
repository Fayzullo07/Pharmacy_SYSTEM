import { toast } from "react-toastify";
import * as DirectorApi from "../api/DirectorRequest";

// ---------------------------------------DIRECTOR--------------------------------
// DIREKTOR POST
export const directorPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.directorPostAPI(datas);
    toast.success(`Director yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// DIRECTOR PATCH
export const directorPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.directorPatchAPI(id, datas);
    toast.success(`O'zgartirildi!`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// ---------------------------------------MANAGER-----------------------------------
// MANAGER POST
export const managerPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.managerPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// MANAGER PATCH
export const managerPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.managerPatchAPI(id, datas);
    toast.success(`O'zgartirildi!`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// ---------------------------------------XODIM-------------------------------------
// XODIM POST
export const workerPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.xodimPostAPI(datas);
    toast.success(`Yaratildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// XODIM PATCH
export const workerPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.xodimPatchAPI(id, datas);
    toast.success(`O'zgartirildi!`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -------------------------------------------APTEKA------------------------------
// APTEKA YARATISH
export const aptekaPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.aptekaPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// APTEKA PATCH
export const aptekaPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.aptekaPatchAPI(id, datas);
    toast.success(`O'zgartirildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// --------------------------------------------FIRMA-----------------------------------

// FIRMA YARATISH
export const firmaPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.firmsPostAPI(datas);
    toast.success(`Yaratildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// FIRMA PATCH
export const firmaPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.firmsPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------PHARMACIES EXPENSES TYPES--------------------------
// PHARMACIES EXPENSES TYPES POST
export const pharmacyExpensesTypesPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.pharmacyExpensesTypesPostAPI(datas);
    toast.success(`Yaratildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status}  ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACIES EXPENSES TYPES PATCH
export const pharmacyExpensesTypesPatchAction = async (
  id,
  datas,
  setShowModal
) => {
  try {
    await DirectorApi.pharmacyExpensesTypesPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status}  ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------TRANSFERS TYPES--------------------------
// TRANSFERS TYPES POST
export const transfersTypesPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.transfersTypesPostAPI(datas);
    toast.success(`Yaratildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status}  ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// TRANSFERS TYPES PATCH
export const transfersTypesPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.transfersTypesPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};
// -----------------------------------------PHARMACY EXPENSES--------------------------
// PHARMACY EXPENSES POST
export const accountsExpensesPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.accountsExpensesPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.error(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACY EXPENSES PATCH
export const accountsExpensesPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.accountsExpensesPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.error(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------PHARMACY INCOMES--------------------------
// PHARMACY INCOMES POST
export const pharmacyInComesPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesInComesPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACY INCOMES PATCH
export const pharmacyInComesPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesInComesPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------PHARMACY EXPENSES--------------------------
// PHARMACY EXPENSES POST
export const pharmacyExpensesPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesExpensesPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACY EXPENSES PATCH
export const pharmacyExpensesPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesExpensesPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    toast.error(error.response.status);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------PHARMACY DEBTS--------------------------
// PHARMACY DEBTS POST
export const pharmacyDebtsPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesDebtsPostAPI(datas);
    toast.success(`Qarz olindi!`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACY DEBTS PATCH
export const pharmacyDebtsPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesDebtsPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.error(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------PHARMACY DEBTS REPAY--------------------------
// PHARMACY DEBTS REPAY POST
export const pharmacyDebtsRePayPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesDebtsRePayPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACY DEBTS REPAY PATCH
export const pharmacyDebtsRePayPatchAction = async (
  id,
  datas,
  setShowModal
) => {
  try {
    await DirectorApi.pharmaciesDebtsRePayPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------PHARMACY TO DEBTS--------------------------
// PHARMACY TO DEBTS POST
export const pharmacyToDebtsPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesToDebtsPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.error(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACY TO DEBTS PATCH
export const pharmacyToDebtsPatchAction = async (id, datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesToDebtsPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.error(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -----------------------------------------PHARMACY TO DEBTS REPAY--------------------------
// PHARMACY TO DEBTS REPAY POST
export const pharmacyToDebtsRePayPostAction = async (datas, setShowModal) => {
  try {
    await DirectorApi.pharmaciesToDebtsRePayPostAPI(datas);
    toast.success(`Yaratildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// PHARMACY TO DEBTS REPAY PATCH
export const pharmacyToDebtsRePayPatchAction = async (
  id,
  datas,
  setShowModal
) => {
  try {
    await DirectorApi.pharmaciesToDebtsRePayPatchAPI(id, datas);
    toast.success(`O'zgartirildi.`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

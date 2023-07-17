import { toast } from "react-toastify";
import * as GlobalApi from "../api/GlobalRequest";

// -----------------------------RECEIPTS---------------------
// RECEIPTS POST
export const receiptsPostAction = async datas => {
  try {
    await GlobalApi.receiptPostAPI(datas);
    // toast.success(`Yaratildi`);
  } catch (error) {
    console.log(error);
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    const keys = Object.keys(error.response.data);
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]} `
      );
      return;
    }
  }
};

// RECEIPTS PATCH
export const receiptsPatchAction = async (id, datas) => {
  try {
    await GlobalApi.receiptPatchAPI(id, datas);
    // toast.success(`O'zgartirildi.`);
  } catch (error) {
    const keys = Object.keys(error.response.data);
    toast.error(error.response.status);
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    for (let key of keys) {
      toast.warning(
        `${error.response.status} ${key} ${error.response.data[key][0]}`
      );
      return;
    }
  }
};

// -------------------------------------CLINETS-----------------------------------
// CLIENT POST
export const offersPostAction = async datas => {
  try {
    await GlobalApi.offersPostAPI(datas);
    // toast.success(`Jo'natildi`);
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

// -------------------------------------CLINETS-----------------------------------
// CLIENT POST
export const clientPostAction = async (datas, setShowModal) => {
  try {
    await GlobalApi.clientsPostAPI(datas);
    // toast.success(`Yaratildi`);
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

// CLINET PATCH
export const clientPatchAction = async (id, datas, setShowModal) => {
  try {
    await GlobalApi.clientsPatchAPI(id, datas);
    // toast.success(`O'zgartirildi`);
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

// -------------------------------------POPULAR PRODUCTS-----------------------------------
// POPULAR PRODUCTS POST
export const popularProductsPostAction = async (datas, setShowModal) => {
  try {
    await GlobalApi.popularProductsPostAPI(datas);
    // toast.success(`Yaratildi`);
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

// POPULAR PRODUCTS PATCH
export const popularProductsPatchAction = async (id, datas, setShowModal) => {
  try {
    await GlobalApi.popularProductsPatchAPI(id, datas);
    // toast.success(`O'zgartirildi`);
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

// -------------------------------------FIRM INCOME-----------------------------------
// FIRM INCOEM POST
export const firmIncomePostAction = async (datas, setShowModal) => {
  try {
    await GlobalApi.firmsInComesPostAPI(datas);
    // toast.success(`Yaratildi`);
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

// FIRM INCOME PATCH
export const firmIncomePatchAction = async (id, datas, setShowModal) => {
  try {
    await GlobalApi.firmsInComesPatchAPI(id, datas);
    // toast.success(`O'zgartirildi`);
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

// -------------------------------------FIRMS EXPENSES -----------------------------------
// FRIMS EXPENSES
export const firmsExpenseDebtPostAction = async (
  datas,
  setViewModal,
  setShowModal,
  setFirmExpenseId,
  isSms
) => {
  try {
    const { data } = await GlobalApi.firmsExpenseDebtPostAPI(datas);
    if (isSms) {
      toast.success(`SMS`);
      // setShowModal(false);
      setViewModal(true);
    } else {
      setShowModal(false);
      // toast.success(`Yaratildi`);
    }
    setFirmExpenseId(data);
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

// -------------------------------------FIRMS EXPENSES VERIFY-----------------------------------
// FRIMS EXPENSES FROM VERIFY
export const firmsExpenseVerifyPostAction = async (
  datas,
  setShowModal,
  isLeader,
  mutationAccount,
  setDataModal
) => {
  try {
    await GlobalApi.firmsExpenseVerifyPostAPI(datas);
    // toast.success(`Tekshirildi`);
    setShowModal(false);
    setDataModal(false);
    if (isLeader.isTrue) {
      mutationAccount.mutate({ price: isLeader.price });
    }
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    toast.error(`SMS Parolni to'g'ri kiriting!!`);
    // const keys = Object.keys(error.response.data);
    // for (let key of keys) {
    //   toast.warning(
    //     `${error.response.status} ${key} ${error.response.data[key][0]}`
    //   );
    //   return;
    // }
  }
};

// -------------------------------------FIRMS EXPENSES -----------------------------------
// FRIMS EXPENSES
export const firmsReturnPostAction = async (
  datas,
  setViewModal,
  setShowModal,
  setFirmReturnId
) => {
  try {
    const { data } = await GlobalApi.returnFirmPostAPI(datas);
    setFirmReturnId(data);
    toast.success(`SMS`);
    setShowModal(false);
    setViewModal(true);
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

// -------------------------------------FIRMS RETURNS VERIFY-----------------------------------
// FRIMS RETURNS FROM VERIFY
export const firmsReturnsVerifyPostAction = async (datas, setShowModal) => {
  try {
    await GlobalApi.returnFirmsVerifyPostAPI(datas);
    // toast.success(`Tekshirildi`);
    setShowModal(false);
  } catch (error) {
    if (error.response.status == 403) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    toast.error(`Xato!`);
    // const keys = Object.keys(error.response.data);
    // for (let key of keys) {
    //   toast.warning(
    //     `${error.response.status} ${key} ${error.response.data[key][0]}`
    //   );
    //   return;
    // }
  }
};

export const routes = [
  { name: "Asosiy", img: "fas fa-gauge ", slug: "/" },
  { name: "Filiallar", img: "fas fa-code-branch ", slug: "/branchs" },
  { name: "Firmalar", img: "fas fa-building", slug: "/firms" },
  { name: "Qarz oldi berdi", img: "fas fa-rotate", slug: "/take_give_debt" },
  { name: "Hisobotlar", img: "fa fa-chart-pie", slug: "/reports" },
  {
    name: "Firma bilan oldi berdi",
    img: "fas fa-money-bill-transfer ",
    slug: "/take_give_firm"
  },
  { name: "Ommabop mahsulotlar", img: "fas fa-cart-plus", slug: "/products" }
];

export const routesEmployee = [
  { name: "Asosiy", img: "fas fa-gauge ", slug: "/" },
  {
    name: "Hisobot topshirish",
    img: "fas fa-chart-pie ",
    slug: "/edit/report"
  },
  {
    name: "Mijoz qo'shish",
    img: "fas fa-user-plus",
    slug: "/add/clients"
  },
  {
    name: "Ommabop mahsulotlar",
    img: "fas fa-cart-plus",
    slug: "/add/products"
  }
];

export const months = [
  {
    id: 1,
    month: "YANVAR"
  },
  {
    id: 2,
    month: "FEBRAL"
  },
  {
    id: 3,
    month: "MART"
  },
  {
    id: 4,
    month: "APREL"
  },
  {
    id: 5,
    month: "MAY"
  },
  {
    id: 6,
    month: "IYUN"
  },
  {
    id: 7,
    month: "IYUL"
  },
  {
    id: 8,
    month: "AVGUST"
  },
  {
    id: 9,
    month: "SETYABR"
  },
  {
    id: 10,
    month: "OKTYABR"
  },
  {
    id: 11,
    month: "NOYABR"
  },
  {
    id: 12,
    month: "DEKABR"
  }
];

export const years = [
  {
    years: 2023
  },
  {
    years: 2022
  },
  {
    years: 2021
  },
  {
    years: 2020
  },
  {
    years: 2019
  },
  {
    years: 2018
  },
  {
    years: 2017
  },
  {
    years: 2016
  },
  {
    years: 2015
  }
];

export let shifts = [
  {
    shift: 1
  },
  {
    shift: 2
  },
  {
    shift: 3
  }
];

const bugun = new Date();
const yil = bugun.getFullYear();
const oy = bugun.getMonth() + 1;
const kun = bugun.getDate();

const bugunTungiSana = `${yil}-${oy < 10 ? "0" + oy : oy}-${kun < 10
  ? "0" + kun
  : kun}`;

export const today = bugunTungiSana;

export const transfers = [
  {
    id: 4,
    name: "XISOB RAQAM"
  },
  {
    id: 5,
    name: "UZKARD"
  },
  {
    id: 8,
    name: "HUMO"
  },
  {
    id: 3,
    name: "CLICK"
  },
  {
    id: 2,
    name: "PAYME"
  },
  {
    id: 6,
    name: "APELSIN"
  },
  {
    id: 7,
    name: "UZUM"
  }
];

export const naxt = 1;
export const xisob_raqam = 4;
export const xodim = 1;
export const vozvrat = 2;
export const chegirma = 3;

export const transfersWorker = [
  {
    id: 8,
    name: "HUMO"
  },
  {
    id: 5,
    name: "UZKARD"
  },
  {
    id: 3,
    name: "CLICK - XODIM"
  },
  {
    id: 2,
    name: "PAYME"
  },
  {
    id: 6,
    name: "APELSIN"
  },
  {
    id: 7,
    name: "UZUM"
  }
];

export const number_0 = "0.00";
export const Naqd = "NAQD";
export const Naqd_siz = "NAQD PULSIZ";

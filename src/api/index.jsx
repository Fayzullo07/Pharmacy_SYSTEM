import {
  branches,
  clients,
  dashboard,
  debts,
  firms,
  products,
  reports,
  return1,
} from "../assets";

export const routes = [
  { name: 0, img: dashboard, slug: "/" },
  { name: 1, img: branches, slug: "/branchs" },
  { name: 2, img: firms, slug: "/firms" },
  { name: 3, img: debts, slug: "/take_give_debt" },
  { name: 4, img: reports, slug: "/reports" },
  { name: 5, img: return1, slug: "/take_give_firm" },
  { name: 6, img: products, slug: "/products" },
  { name: 9, img: clients, slug: "/clients" },
];

export const routesEmployee = [
  { name: 0, img: dashboard, slug: "/" },
  {
    name: 8,
    img: reports,
    slug: "/edit/report",
  },
  {
    name: 9,
    img: clients,
    slug: "/add/clients",
  },
  {
    name: 6,
    img: products,
    slug: "/add/products",
  },
];

export const months = [
  {
    id: 1,
    month: "ЯНВАРЬ",
  },
  {
    id: 2,
    month: "ФЕВРАЛЬ",
  },
  {
    id: 3,
    month: "МАРТ",
  },
  {
    id: 4,
    month: "АПРЕЛЬ",
  },
  {
    id: 5,
    month: "МАЙ",
  },
  {
    id: 6,
    month: "ИЮНЬ",
  },
  {
    id: 7,
    month: "ИЮЛЬ",
  },
  {
    id: 8,
    month: "АВГУСТ",
  },
  {
    id: 9,
    month: "СЕНТЯБРЬ",
  },
  {
    id: 10,
    month: "ОКТЯБРЬ",
  },
  {
    id: 11,
    month: "НОЯБРЬ",
  },
  {
    id: 12,
    month: "ДЕКАБРЬ",
  },
];

export const years = [
  {
    years: 2030,
  },
  {
    years: 2029,
  },
  {
    years: 2028,
  },
  {
    years: 2027,
  },
  {
    years: 2026,
  },
  {
    years: 2025,
  },
  {
    years: 2024,
  },
  {
    years: 2023,
  },
  {
    years: 2022,
  },
  {
    years: 2021,
  },
  {
    years: 2020,
  },
  {
    years: 2019,
  },
  {
    years: 2018,
  },
  {
    years: 2017,
  },
  {
    years: 2016,
  },
  {
    years: 2015,
  },
];

export let shifts = [
  {
    shift: 1,
  },
  {
    shift: 2,
  },
  {
    shift: 3,
  },
];

const bugun = new Date();
const yil = bugun.getFullYear();
const oy = bugun.getMonth() + 1;
const kun = bugun.getDate();

const bugunTungiSana = `${yil}-${oy < 10 ? "0" + oy : oy}-${
  kun < 10 ? "0" + kun : kun
}`;

export const today = bugunTungiSana;

export const transfers = [
  {
    id: 4,
    name: "XISOB RAQAM",
  },
  {
    id: 5,
    name: "UZKARD",
  },
  {
    id: 8,
    name: "HUMO",
  },
  {
    id: 3,
    name: "CLICK",
  },
  {
    id: 2,
    name: "PAYME",
  },
  {
    id: 6,
    name: "APELSIN",
  },
  {
    id: 7,
    name: "UZUM",
  },
];

export const naxt = 1;
export const xisob_raqam = 4;
export const xodim = 1;
export const vozvrat = 2;
export const chegirma = 3;

export const transfersWorker = [
  {
    id: 8,
    name: "HUMO",
  },
  {
    id: 5,
    name: "UZKARD",
  },
  {
    id: 3,
    name: "CLICK",
  },
  {
    id: 2,
    name: "PAYME",
  },
  {
    id: 6,
    name: "APELSIN",
  },
  {
    id: 7,
    name: "UZUM",
  },
];

export const number_0 = "0.00";
export const Naqd = "NAQD";
export const Naqd_siz = "NAQD PULSIZ";
export const pagination = 14;

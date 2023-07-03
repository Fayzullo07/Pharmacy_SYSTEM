import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./layout/UserAdmin/Home/Home";
import Profile from "./layout/UserAdmin/Profile/Profile";
import Login from "./components/Auth/Login";
import Loading from "./utils/Loading";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "./redux/Actions/GlobalAction";
import Branchs from "./layout/UserAdmin/Home/Branchs/Branchs";
import Firms from "./layout/UserAdmin/Home/Firms/Firms";
import OneFirmReport from "./layout/UserAdmin/Home/Firms/OneFirm/OneFirmReport";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OneBranchReport from "./layout/UserAdmin/Home/Branchs/OneBranch/OneBranchReport";

// LANGUAGES
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import tUz from "./languages/uz/transaltion.json";
import tRu from "./languages/ru/transaltion.json";
import tEn from "./languages/en/transaltion.json";
import Reports from "./layout/UserAdmin/Reports/Reports";
import Clients from "./layout/UserAdmin/Home/Clients/Clients";
import WorkersDeteils from "./layout/UserAdmin/Home/Workers/WorkersDeteils";
import Products from "./layout/UserAdmin/Home/ProductsPopular/Products";
import TakeGiveDebt from "./layout/UserAdmin/Home/TakeGiveDebt/TakeGiveDebt";
import TakeGiveFirm from "./layout/UserAdmin/Home/TakeGiveFirm/TakeGiveFirm";
import Managers from "./layout/UserAdmin/Profile/Managers/Managers";
import Expenses from "./layout/UserAdmin/Profile/Expenses/Expenses";
import Incomes from "./layout/UserAdmin/Profile/Incomes/Incomes";
import EditReport from "./layout/UserAdmin/EditReport/EditReport";
import EmployeeHome from "./layout/UserEmployee/Home/EmployeeHome";
import EditReportWorker from "./layout/UserEmployee/EditReport/EditReportWorker";
import FirmsProfile from "./layout/UserAdmin/Profile/FirmsPofile/FirmsProfile";
import ProfileBranches from "./layout/UserAdmin/Profile/Branches/ProfileBranches";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      uz: {
        translation: tUz,
      },
      ru: {
        translation: tRu,
      },
      en: {
        translation: tEn,
      },
    },
    lng: "uz", // if you're using a language detector, do not define the lng option
    fallbackLng: "uz",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export const changeLang = (l) => {
  i18n.changeLanguage(l);
  localStorage.setItem("lang", l);
  return;
};

export const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const Routing = ({ user, handleLogin, navigate }) => {
  function AdminElement({ children }) {
    if (user && user.role === "Director") {
      return <>{children}</>;
    } else {
      navigate("/notFound");
    }
  }

  function HodimElement({ children }) {
    if (user && user.role === "Worker") {
      return <>{children}</>;
    } else {
      navigate("/notFound");
    }
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          user && user.role === "Director" ? (
            <Home />
          ) : user && user.role === "Worker" ? (
            <EmployeeHome />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/edit/report/:to_pharmacy/:shift/:report_date"
        element={
          <AdminElement>
            <EditReport />
          </AdminElement>
        }
      />

      <Route
        path="/edit/report"
        element={
          <HodimElement>
            <EditReportWorker user={user} />
          </HodimElement>
        }
      />
      {/* PHARMACIES */}
      <Route
        path="/branchs"
        element={
          <AdminElement>
            <Branchs />
          </AdminElement>
        }
      />

      {/* FIRMS */}
      <Route
        path="/firms"
        element={
          <AdminElement>
            <Firms />
          </AdminElement>
        }
      />

      {/* REPOSTS */}
      <Route
        path="/reports"
        element={
          <AdminElement>
            <Reports />
          </AdminElement>
        }
      />

      {/* CLIENTS */}
      <Route
        path="/clients"
        element={
          <AdminElement>
            <Clients />
          </AdminElement>
        }
      />

      {/* WORKERS */}
      <Route
        path="/workers"
        element={
          <AdminElement>
            <WorkersDeteils />
          </AdminElement>
        }
      />

      {/* PRODUCTS */}
      <Route
        path="/products"
        element={
          <AdminElement>
            <Products />
          </AdminElement>
        }
      />

      {/* MANAGERS */}
      <Route
        path="/managers"
        element={
          <AdminElement>
            <Managers />
          </AdminElement>
        }
      />

      {/* MANAGERS */}
      <Route
        path="/expenses"
        element={
          <AdminElement>
            <Expenses />
          </AdminElement>
        }
      />

      {/* MANAGERS */}
      <Route
        path="/incomes"
        element={
          <AdminElement>
            <Incomes />
          </AdminElement>
        }
      />

      {/* TAKE GIVE DEBT */}
      <Route
        path="/take_give_debt"
        element={
          <AdminElement>
            <TakeGiveDebt />
          </AdminElement>
        }
      />

      {/* TAKE GIVE FIRM */}
      <Route
        path="/take_give_firm"
        element={
          <AdminElement>
            <TakeGiveFirm />
          </AdminElement>
        }
      />
      {/* FIRMS REPORTS */}
      <Route
        path="/firms/:id/:name"
        element={
          <AdminElement>
            <OneFirmReport />
          </AdminElement>
        }
      />

      {/* BRANCHS REPORTS */}
      <Route
        path="/branchs/:id/:name"
        element={
          <AdminElement>
            <OneBranchReport />
          </AdminElement>
        }
      />

      <Route
        path="/firms/profile"
        element={
          <AdminElement>
            <FirmsProfile />
          </AdminElement>
        }
      />

      <Route
        path="/branches/profile"
        element={
          <AdminElement>
            <ProfileBranches />
          </AdminElement>
        }
      />

      <Route
        path="/profile"
        element={
          <AdminElement>
            <Profile userData={user} />
          </AdminElement>
        }
      />

      {/* CLIENTS */}
      <Route
        path="/add/clients"
        element={
          <HodimElement>
            <Clients />
          </HodimElement>
        }
      />

      {/* PRODUCTS */}
      <Route
        path="/add/products"
        element={
          <HodimElement>
            <Products />
          </HodimElement>
        }
      />

      
    </Routes>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);
    setUser(JSON.parse(savedUser)?.user);
    if (savedUser) {
      dispatch(getGlobalDeteilsAction());
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <ToastContainer />
          <Routing user={user} handleLogin={handleLogin} navigate={navigate} />
        </>
      )}
    </>
  );
}

export default App;

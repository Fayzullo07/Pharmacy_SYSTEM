import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CountUp from "react-countup";

import "./Home.css";
import { useQuery } from "react-query";
import { clientsGetAPI } from "../../../api/GlobalRequest";
import Offers from "../Offers/Offers";
import SliderShow from "../../UserEmployee/Home/SliderShow";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;
  const { deteils } = reduxData.deteils;


  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return await clientsGetAPI({});
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;
  const { t } = useTranslation("translation", { keyPrefix: "Home" });
  return (
    <>
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar />

          {/* TABLE */}
          <div className="row">
            <div className="col-md-8">
              <SliderShow />
            </div>
            <div className="col-md-4">
              <h2 style={{ color: "var(--text_color_blue)" }}>{t(4)}</h2>
              <Offers />
            </div>
          </div>
          <div className="cardBox row">
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div onClick={() => navigate("/branchs")} className="card">
                <div>
                  <div className="numbers">
                    {
                      <CountUp
                        start={0}
                        end={deteils?.pharmacies?.length}
                        duration={2}
                        delay={0}
                      />
                    }
                  </div>
                  <div className="cardName">{t(0)}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div onClick={() => navigate("/workers")} className="card">
                <div>
                  <div className="numbers">
                    {
                      <CountUp
                        start={0}
                        end={deteils?.employees?.length - 1}
                        duration={2}
                        delay={0}
                      />
                    }
                  </div>
                  <div className="cardName">{t(2)}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div onClick={() => navigate("/firms")} className="card">
                <div>
                  <div className="numbers">
                    {
                      <CountUp
                        start={0}
                        end={deteils?.firms?.length}
                        duration={2}
                        delay={0}
                      />
                    }
                  </div>
                  <div className="cardName">{t(1)}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div onClick={() => navigate("/clients")} className="card">
                <div>
                  <div className="numbers">
                    {isLoading ? (
                      "0"
                    ) : (
                      <CountUp
                        start={0}
                        end={data.data.count}
                        duration={2}
                        delay={0}
                      />
                    )}
                  </div>
                  <div className="cardName">{t(3)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CountUp from "react-countup";

import { useQuery } from "react-query";
import {
  clientsGetAPI,
  popularProductsGetAPI,
} from "../../../api/GlobalRequest";
import Offers from "../../UserAdmin/Offers/Offers";
import SliderShow from "./SliderShow";
import { useTranslation } from "react-i18next";

const EmployeeHome = () => {
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return await clientsGetAPI({});
    },
    keepPreviousData: true,
  });

  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["popular_products"],
    queryFn: async () => {
      return await popularProductsGetAPI({});
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;
  if (productsError) return `Error: ${productsError.message}`;

  const { t: h } = useTranslation("translation", { keyPrefix: "Home" });
  const { t: n } = useTranslation("translation", { keyPrefix: "Navbar" });
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
              <h2 style={{ color: "var(--text_color_blue)" }}>{h(4)}</h2>
              <Offers />
            </div>
          </div>
          <div className="cardBox row">
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div onClick={() => navigate("/add/clients")} className="card">
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
                  <div className="cardName">{h(3)}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div onClick={() => navigate("/add/products")} className="card">
                <div>
                  <div className="numbers">
                    {productsIsLoading ? (
                      "0"
                    ) : (
                      <CountUp
                        start={0}
                        end={products.data.count}
                        duration={2}
                        delay={0}
                      />
                    )}
                  </div>
                  <div className="cardName">{n(6)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeHome;

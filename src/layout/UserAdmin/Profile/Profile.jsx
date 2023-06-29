import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import { user } from "../../../assets";
import { useNavigate } from "react-router-dom";

const Profile = ({ userData }) => {
  const toggleData = useSelector((state) => state.toggle);
  const { toggle } = toggleData;

  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={user}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                  />
                  <h5 className="my-3">
                    {userData.role == "Director" ? "Director" : "Worker"}
                  </h5>
                  <h2 className="text-muted">
                    {userData.first_name} {userData.last_name}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row  mb-4">
                <div className="col-md-12">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <div
                        className="d-flex align-items-center justify-content-between cursor_pointer"
                        onClick={() => navigate("/managers")}
                      >
                        <div className="d-flex align-items-center">
                          <i className="fa fa-user mx-4 fs-4 border p-2 px-3 rounded"></i>
                          <h4 className="mb-0">Mangerlar</h4>
                        </div>

                        <i className="fa fa-angle-right fs-4"></i>
                      </div>
                      <hr />

                      <div
                        className="d-flex align-items-center justify-content-between cursor_pointer"
                        onClick={() => navigate("/workers")}
                      >
                        <div className="d-flex align-items-center">
                          <i
                            className="fa fa-users mx-4 fs-4 border  rounded"
                            style={{ padding: "12px" }}
                          ></i>
                          <h4 className="mb-0">Xodimlar</h4>
                        </div>

                        <i className="fa fa-angle-right fs-4"></i>
                      </div>
                      <hr />

                      <div
                        className="d-flex align-items-center justify-content-between cursor_pointer"
                        onClick={() => navigate("/expenses")}
                      >
                        <div className="d-flex align-items-center">
                          <i className="fa fa-arrow-up mx-4 fs-4 border p-2 px-3 rounded"></i>
                          <h4>Xarajat turlari</h4>
                        </div>

                        <i className="fa fa-angle-right fs-4"></i>
                      </div>
                      <hr />

                      <div
                        className="d-flex align-items-center justify-content-between cursor_pointer"
                        onClick={() => navigate("/incomes")}
                      >
                        <div className="d-flex align-items-center">
                          <i className="fa fa-arrow-down mx-4 fs-4 border p-2 px-3 rounded"></i>
                          <h4>Tushum turlari</h4>
                        </div>

                        <i className="fa fa-angle-right fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">First Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.first_name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Sure Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.last_name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Telefon raqam</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.phone_number}</p>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.address}</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

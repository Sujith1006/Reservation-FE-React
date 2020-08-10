import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { authApi } from "../../ApiServer";
import Nodata from "../../Assets/page-empty.svg"
import ShowReservation from "./showReservationcard"
import "./reservation.css";
import swal from "sweetalert";
function Reservations(props) {
  const [allReservation, setAllReservation] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let token = localStorage.getItem("Usercredential");
    authApi
      .get("/reservation/allreservation", { headers: { token } })
      .then(async (res) => {
        if (res.data.code === 200) {
          await setAllReservation(res.data.data);
          setLoading(false);
        } else if (res.data.code === 400) {
          localStorage.clear("Usercredential");
          swal({ icon: "warning", text: "Session Expired" });
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <h1>All Reservations</h1>
      </div>
      <div className="main-panel">
        {allReservation.length > 0 && isLoading === false ? (
          <ShowReservation data={allReservation} page="allReservation"/>
        ) : (
          <div className="nodata">
            <img src={Nodata} alt="Empty"/>
          <h1>  No Data Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(Reservations);

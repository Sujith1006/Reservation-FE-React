import React, { useEffect, useState } from "react";
import { authApi } from "../../ApiServer";
import Nodata from "../../Assets/page-empty.svg";
import ShowReservation from "./showReservationcard";
import swal from "sweetalert";
function ViewReservation(props) {
  let [myreservation, setMyReservation] = useState([]);
  let [loading, isLoading] = useState(true);
  useEffect(() => {
   fetchMyReservation();
  }, []);
 const fetchMyReservation=()=>{
  let token = localStorage.getItem("Usercredential");
  authApi
    .get("/reservation/myreservation", { headers: { token } })
    .then(async (res) => {
      await setMyReservation(res.data.data);
      isLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
 }
  const editReservation = (val) => {
    const editableData = myreservation[val];
    props.getEditableValues(editableData);
  };
  const deleteReservation = (val) => {
    console.log(myreservation[val]._id);
    let id = myreservation[val]._id;
    let token = localStorage.getItem("Usercredential");
    authApi
      .delete("/reservation/delete", {
        data: { id },
        headers: {
          token,
        },
      })
      .then(async(res) => {
        if (res.data.code === 200) {
        await fetchMyReservation()
          swal({
            icon: "Success",
            text: "Your Reservation has been Cancelled",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <h1>My Reservations</h1>
      </div>
      <div className="main-panel">
        {myreservation.length > 0 && loading === false ? (
          <ShowReservation
            data={myreservation}
            page="myReservation"
            editReservation={editReservation}
            deleteReservation={deleteReservation}
          />
        ) : (
          <div className="nodata">
            <img src={Nodata} alt="Empty" />
            <h1> No Data Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReservation;

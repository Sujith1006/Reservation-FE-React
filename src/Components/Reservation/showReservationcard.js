import React from "react";
import "./reservation.css";
import {Button} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit"
import swal from "sweetalert";
function showReservation(props) {
  const deleteReservation=(index)=>{
    swal({
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      icon:"warning",
      text:"Are You sure you want to cance this reservation"
    })
    .then((isDelete)=>{
      console.log(isDelete)
      if(isDelete !=null){
        props.deleteReservation(index)
      }
    })
  }
  return (
    <div>
      {props.data.map((reservation, index) => {
        return (
          <div key={index} className="single-reservation">
            <div className="single-top">
              <p>Reserved User:{reservation.name}</p>
              <p>No of Guests:{reservation.noofguests}</p>
              <p>Type Of Food:{reservation.typeOfFood}</p>
              <p>Date & Time:{reservation.dateTime}</p>
            </div>
            {props.page === "myReservation" ? (
              <div className="btn">
                 <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<EditIcon />}
                  onClick={()=>props.editReservation(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={()=>deleteReservation(index)}
                >
                  Delete
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default showReservation;

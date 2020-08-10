import React, { useState } from "react";
import "./homepage.css";
import { withRouter } from "react-router-dom";
import logo from "../../Assets/download.jpeg";
import { Button } from "@material-ui/core";
import AddReservation from "../Home/addReservation";
import Exittoapp from "@material-ui/icons/ExitToApp";
import Reservationsget from "../Reservation/Reservationsgetall";
import ViewReservation from "../Reservation/ViewMyReservation";
function Homepage(props) {
  const [content, setContent] = useState(<Reservationsget />);
  const [color, setColor] = useState("All Reservations");
  const handleContent = (value,isedit) => {
    switch (value) {
      case "All Reservations":
        setColor("All Reservations");
        setContent(<Reservationsget />);
        break;
      case "Add new Reservation":
        setColor("Add new Reservation");
        setContent(<AddReservation isEdit={isedit} />);
        break;
      case "View my Reservation":
        setColor("View my Reservation");
        setContent(<ViewReservation getEditableValues={editableValues} />);

        break;
      default:
        setContent("Def");
    }
  };
  
  const editableValues = async (value) => {
    await handleContent("Add new Reservation",value);
  };

  const logout = () => {
    localStorage.clear("Usercredential");
    props.history.push("/");
  };
  return (
    <div>
      <div className="main-container">
        <div className="Nav-content">
          <img src={logo} alt="cafe90s" />
          <h1>Cafe90s Restaurant</h1>
          <div className="logout-user">
            {/* <h3>sujith</h3> */}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Exittoapp />}
              onClick={() => logout()}
            >
              LogOut
            </Button>
          </div>
        </div>
        <div className="content-div">
          <div className="dash-content">
            <li
              className={color === "All Reservations" ? "active" : ""}
              onClick={() => {
                handleContent("All Reservations","");
              }}
            >
              All Reservations
            </li>
            <li
              className={color === "Add new Reservation" ? "active" : ""}
              onClick={() => {
                handleContent("Add new Reservation","");
              }}
            >
              Add new Reservation
            </li>
            <li
              className={color === "View my Reservation" ? "active" : ""}
              onClick={() => {
                handleContent("View my Reservation","");
              }}
            >
              View my Reservation
            </li>
          </div>
          <div className="center-page">{content}</div>
          <div className="empty-div"></div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Homepage);

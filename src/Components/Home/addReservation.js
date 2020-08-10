import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import "./addreservation.css";
import swal from "sweetalert";
import { authApi } from "../../ApiServer";
function AddReservation(props) {
  let [name, setName] = useState("");
  let [noofguests, setNoofguests] = useState(0);
  let [typeOfFood, setTypeOfFood] = useState("Vegeterian");
  let [dateTime, setDateTime] = useState("");
  let [editDataId,setEditDataId]=useState("")
  const useStyles = makeStyles((theme) => ({
    container: {},
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  useEffect(() => {
    if (props.isEdit !== "") {
      let { isEdit } = props;
      let { dateTime } = isEdit;
      console.log(props.isEdit)
      let newDate = dateTime.slice(0, 19);
      setDateTime(newDate);
      setName(isEdit.name);
      setNoofguests(isEdit.noofguests);
      setTypeOfFood(isEdit.typeOfFood);
      setEditDataId(isEdit._id)
    }
  }, [props]);

  const makeReservation = () => {
    if (
      name === "" ||
      noofguests === "" ||
      typeOfFood === "" ||
      dateTime === ""
    ) {
      swal({ icon: "error", text: "Please Fill in all the fields" });
    } else {
      let token = localStorage.getItem("Usercredential");
      authApi
        .post(
          "/reservation/create",
          { name, noofguests, typeOfFood, dateTime },
          {
            headers: { token },
          }
        )
        .then((res) => {
          if (res.data.code === 400 && res.data.msg === "Invalid Credential") {
            localStorage.clear("Usercredential");
            swal({ icon: "warning", text: "Session Expired" });
            props.history.push("/");
          } else if (res.data.code === 200) {
            swal({ icon: "success", text: "Reservation made Successfully" });
            clearState();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let clearState = () => {
    setTypeOfFood();
    setDateTime();
    setName("");
    setNoofguests(0);
  };
  const editReservation = () => {
    if (
      name === "" ||
      noofguests === "" ||
      typeOfFood === "" ||
      dateTime === ""
    ) {
      swal({ icon: "error", text: "Please Fill in all the fields" });
    } else {
      let token = localStorage.getItem("Usercredential");
      authApi
        .put(
          "/reservation/update",
          { data:{name, noofguests, typeOfFood, dateTime},id:editDataId },
          {
            headers: { token },
          }
        )
        .then((res) => {
          if (res.data.code === 400 && res.data.msg === "Invalid Credential") {
            localStorage.clear("Usercredential");
            swal({ icon: "warning", text: "Session Expired" });
            props.history.push("/");
          } else if (res.data.code === 200) {
            swal({ icon: "success", text: "Reservation Edited Successfully" });
            clearState();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const classes = useStyles();
  return (
    <div>
      <div className="main-reser">
        <h1>New Reservation</h1>
        <div className="input-boxes">
          <TextField
            id="outlined-basic login1"
            label="Guest Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-boxes">
          <TextField
            id="outlined-basic login1"
            label="No Of Guests"
            type="number"
            value={noofguests}
            onChange={(e) => setNoofguests(e.target.value)}
            required
          />
        </div>
        <div className="input-boxes">
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              value={dateTime}
              label="Reservation Date"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </form>
        </div>
        <div className="input-boxes">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Type of food
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              onChange={(e) => setTypeOfFood(e.target.value)}
              value={typeOfFood}
            >
              <MenuItem value="vegeterian">Vegeterian</MenuItem>
              <MenuItem value="Non-vegeterian">Non-Vegeterian</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="input-boxes">
          {props.isEdit !== "" ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => editReservation()}
            >
              Edit Reservation
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => makeReservation()}
            >
              Make Reservation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(AddReservation);

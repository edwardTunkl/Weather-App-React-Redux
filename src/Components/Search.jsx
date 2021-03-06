import React, { useEffect } from "react";
import "../index.css";
import { Form} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchCityAction, setQueryAction, randomizeImg } from "../actions";

export default function () {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserIp();
  }, []);

  const fetchUserIp = async () => {
    try {
      let apiIp = await fetch(`https://api.freegeoip.app/json/?apikey=${process.env.REACT_APP_GEO_KEY}`);
      let res = await apiIp.json();
      console.log("API-IP", res);
        dispatch(setQueryAction(res.city));
        dispatch(searchCityAction());
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <Form className="form-input">
        <Form.Group controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                dispatch(setQueryAction(e.target.value));
                dispatch(searchCityAction());
                dispatch(randomizeImg())
              }
            }}
          />
          <Form.Text className="text-muted ml-1">
            We'll find the best weather for you.
          </Form.Text>
        </Form.Group>
      </Form>
  );
}

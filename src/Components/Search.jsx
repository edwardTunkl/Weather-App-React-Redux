import React, { useEffect } from "react";
import "../index.css";
import { Form} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchCityAction, setQueryAction } from "../actions";

export default function () {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TEST");
    fetchUserIp();
  }, []);

  const fetchUserIp = async () => {
    try {
      let apiIp = await fetch("https://api.my-ip.io/ip.json");
      let res = await apiIp.json();
      console.log("API-IP", res.ip);
      if (apiIp.ok) {
        let apiLoc = await fetch(`https://ip-api.com/json/${res.ip}`);
        let resp = await apiLoc.json();
        console.log("APILOC", resp);
        dispatch(setQueryAction(resp.city));
        dispatch(searchCityAction());
      }
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

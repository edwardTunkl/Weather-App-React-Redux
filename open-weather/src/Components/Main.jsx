import React from "react";
import {
  Card,
  Container,
  Form,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import "../index.css";
import pic from "../assets/winter.jpg";
import { useDispatch, useSelector } from "react-redux";
import { searchCityAction, setQueryAction } from "../actions";
import { fromUnixTime, format } from "date-fns";
import { useEffect } from "react";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TEST")
    fetchUserIp()
  }, []);
  
  const fetchUserIp = async () => {
     try {
       let apiIp = await fetch("https://api.my-ip.io/ip.json");
       let res = await apiIp.json();
       console.log("API-IP", res.ip);
       if(apiIp.ok){
         let apiLoc = await fetch(`http://ip-api.com/json/${res.ip}`)
         let resp = await apiLoc.json()
         console.log("APILOC", resp)
         dispatch(setQueryAction(resp.city));
        dispatch(searchCityAction());
       }
     } catch (error) {
       console.log(error);
     }
   };
  const query = useSelector((state) => state.search.query);
  console.log("QUERY", query);
  const results = useSelector((state) => state.search.results);
  console.log("RESULTS", results);


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <Container className="pt-5 vh-100">
        <Card className="bg-dark text-black">
          <Card.Img id="image" src={pic} alt="Card image" />

          <Card.ImgOverlay>
            <Card.Title id="title">Your Weather</Card.Title>
            <Row>
              <Col md={4}>
                <Form>
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
              </Col>
              { results.length > 0 && 
              <Col className="temp-container">
                <Card
                  style={{ width: "36rem" }}
                  className="bg-transparent border-0"
                >
                  <Card.Body>
                    <Card.Title>
                      <div className="city">
                        {" "}
                        {capitalizeFirstLetter(query)}{" "}
                      </div>
                    </Card.Title>

                    <Card.Text>
                      <Row>
                        <Col md={3}>
                          <div className="main-temp">
                            {Math.round(results[0].current.temp)}°C{" "}
                          </div>
                          <div className="d-flex temp-range ml-2">
                            <div className="font-italic">max:</div>
                            <div className="ml-2">
                              {Math.round(results[0].daily[0].temp.max)}°C{" "}
                            </div>
                          </div>
                          <div className="d-flex temp-range ml-2">
                            <div className="font-italic">min:</div>
                            <div className="ml-3">
                              {" "}
                              {Math.round(results[0].daily[0].temp.min)}°C{" "}
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="d-flex justify-content-center">
                            <Image
                              src={`http://openweathermap.org/img/wn/${results[0].current.weather[0].icon}@2x.png`}
                              rounded
                            />
                          </div>
                          <div className="description d-flex justify-content-center font-weight-bold">
                            {results[0].current.weather[0].description}{" "}
                          </div>
                        </Col>
                        <Col md={5} className="p-0">
                          <div className="sunset ml-4">
                            <div className="d-flex">
                              <div className="font-italic mr-1 sunrise-color">
                                sunrise:
                              </div>
                              <div className="ml-2">{format(fromUnixTime(results[0].current.sunrise), "p")}</div>
                            </div>
                            <div className="d-flex">
                              <div className="font-italic mr-1 sunset-color">
                                sunset:
                              </div>
                              <div className="ml-3">{format(fromUnixTime(results[0].current.sunset), "p")}</div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              }
            </Row>
            { results.length > 0 && 
            <Row className="mt-4">
              <Col className="p-1">
                <Card
                  style={{
                    width: "9rem",
                    height: "15rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  className="daily-card"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center date-cards">
                      {format(fromUnixTime(results[0].daily[0].dt), "iiii")}{" "}
                    </div>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${results[0].daily[0].weather[0].icon}@2x.png`}
                      style={{ width: "7rem" }}
                    />
                    <Card.Text>
                      <div className="temps">
                        <div className="maxTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[0].temp.max)}
                        </div>
                        <div className="minTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[0].temp.min)}
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="p-1">
                <Card
                  style={{
                    width: "9rem",
                    height: "15rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  className="daily-card"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center date-cards">
                      {format(fromUnixTime(results[0].daily[1].dt), "iiii")}{" "}
                    </div>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${results[0].daily[1].weather[0].icon}@2x.png`}
                      style={{ width: "7rem" }}
                    />
                    <Card.Text>
                      <div className="temps">
                        <div className="maxTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[1].temp.max)}
                        </div>
                        <div className="minTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[1].temp.min)}
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="p-1">
                <Card
                  style={{
                    width: "9rem",
                    height: "15rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  className="border-0 daily-card"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center date-cards">
                      {format(fromUnixTime(results[0].daily[2].dt), "iiii")}{" "}
                    </div>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${results[0].daily[2].weather[0].icon}@2x.png`}
                      style={{ width: "7rem" }}
                    />
                    <Card.Text>
                      <div className="temps">
                        <div className="maxTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[2].temp.max)}
                        </div>
                        <div className="minTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[2].temp.min)}
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="p-1">
                <Card
                  style={{
                    width: "9rem",
                    height: "15rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  className="border-0 daily-card"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center date-cards">
                      {format(fromUnixTime(results[0].daily[3].dt), "iiii")}{" "}
                    </div>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${results[0].daily[3].weather[0].icon}@2x.png`}
                      style={{ width: "7rem" }}
                    />
                    <Card.Text>
                      <div className="temps">
                        <div className="maxTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[3].temp.max)}
                        </div>
                        <div className="minTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[3].temp.min)}
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="p-1">
                <Card
                  style={{
                    width: "9rem",
                    height: "15rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  className="border-0 daily-card"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center date-cards">
                      {format(fromUnixTime(results[0].daily[4].dt), "iiii")}{" "}
                    </div>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${results[0].daily[4].weather[0].icon}@2x.png`}
                      style={{ width: "7rem" }}
                    />
                    <Card.Text>
                      <div className="temps">
                        <div className="maxTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[4].temp.max)}
                        </div>
                        <div className="minTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[4].temp.min)}
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="p-1">
                <Card
                  style={{
                    width: "9rem",
                    height: "15rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  className="border-0 daily-card"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center date-cards">
                      {format(fromUnixTime(results[0].daily[5].dt), "iiii")}{" "}
                    </div>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${results[0].daily[5].weather[0].icon}@2x.png`}
                      style={{ width: "7rem" }}
                    />
                    <Card.Text>
                      <div className="temps">
                        <div className="maxTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[5].temp.max)}
                        </div>
                        <div className="minTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[5].temp.min)}
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="p-1">
                <Card
                  style={{
                    width: "9rem",
                    height: "15rem",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  className="daily-card"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center date-cards">
                      {format(fromUnixTime(results[0].daily[6].dt), "iiii")}{" "}
                    </div>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${results[0].daily[6].weather[0].icon}@2x.png`}
                      style={{ width: "7rem" }}
                    />
                    <Card.Text>
                      <div className="temps">
                        <div className="maxTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[6].temp.max)}
                        </div>
                        <div className="minTemp d-flex justify-content-center">
                          {Math.round(results[0].daily[6].temp.min)}
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            }
          </Card.ImgOverlay>
        </Card>
      </Container>
    </div>
  );
};
export default Main;

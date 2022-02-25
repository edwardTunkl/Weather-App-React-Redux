import React from "react";
import {Container} from "react-bootstrap";
import "../index.css";
import Daily from "./Daily";
import Current from "./Current";
import Search from "./Search";
import MapComponent from "./MapComponent";

const Main = () => {
  return (
    <>
      <div>
        <Container className="pt-5 vh-100">
          <Container className="main-container">
            <div className="d-flex">
              <div className="col-search ml-4 mt-5">
                <div id="title">Your Weather</div>
                <Search />
              </div>
              <div className="col-current">
                {/* <MapComponent/> */}
                <Current />
              </div>
            </div>
            <div className="daily-row">
              <Daily />
          
            </div>
          </Container>
        </Container>
      </div>
    </>
  );
};
export default Main;

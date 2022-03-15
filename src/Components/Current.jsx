import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { fromUnixTime, format } from "date-fns";

export default function Current() {
  const results = useSelector((state) => state.search.results);
  const query = useSelector((state) => state.search.query);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      {results.length > 0 && (
        <div>
          <div className="city mt-5 ml-3"> {capitalizeFirstLetter(query)} </div>
          <div className="d-flex">
            <div className="col-3 d-flex align-items-end">
              <div>
              <div className="main-temp">
                {Math.round(results[0].current.temp)}°C{" "}
              </div>
              <div className="d-flex temp-range ml-2">
                <div>max:</div>
                <div className="ml-2">
                  {Math.round(results[0].daily[0].temp.max)}°C{" "}
                </div>
              </div>
              <div className="d-flex temp-range ml-2">
                <div>min:</div>
                <div className="ml-3">
                  {" "}
                  {Math.round(results[0].daily[0].temp.min)}°C{" "}
                </div>
              </div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <div className="d-flex justify-content-center">
                  <Image
                    src={`http://openweathermap.org/img/wn/${results[0].current.weather[0].icon}@2x.png`}
                    rounded
                  />
                </div>
                <div className="description d-flex font-weight-bold justify-content-center">
                  {results[0].current.weather[0].description}
                </div>
              </div>
            </div>
            <div className="p-0 d-flex align-items-end">
              <div className="sunset ml-4">
                <div className="d-flex">
                  <div className="font-italic mr-1 sunrise-color">sunrise:</div>
                  <div className="ml-2">
                    {format(fromUnixTime(results[0].current.sunrise), "p")}
                  </div>
                </div>
                <div className="d-flex">
                  <div className="font-italic mr-1 sunset-color">sunset:</div>
                  <div className="ml-3">
                    {format(fromUnixTime(results[0].current.sunset), "p")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

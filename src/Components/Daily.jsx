import React from "react";
import { Image } from "react-bootstrap";
import { fromUnixTime, format } from "date-fns";
import { useSelector } from "react-redux";

export default function Daily() {
  const results = useSelector((state) => state.search.results);

  return (
    <>
      {results.length > 0 &&
        results[0].daily.slice(0, 7).map((res, i) => (
          <div
            key={i}
            className="daily-card ml-1 mb-3 pt-2"
            style={{ background: "rgba(255,255,255,0.4)" }}
          >
           
              <div className="d-flex justify-content-center date-cards">
                {format(fromUnixTime(res.dt), "iiii")}{" "}
              </div>
              <div className="d-flex justify-content-center mt-1">
              <Image
                src={`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`}
                style={{ maxwidth: "7rem" }}
              />
              </div>
              <div>
                <div className="temps">
                  <div className="maxTemp d-flex justify-content-center">
                    {Math.round(res.temp.max)}
                  </div>
                  <div className="minTemp d-flex justify-content-center">
                    {Math.round(res.temp.min)}
                  </div>
                </div>
              </div>
            </div>
       
        ))}
    </>
  );
}

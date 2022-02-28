import pic1 from "../assets/1.jpg";
import pic2 from "../assets/2.jpg";
import pic3 from "../assets/3.jpg";
import pic4 from "../assets/4.jpg";
import pic5 from "../assets/5.jpg";
import pic6 from "../assets/6.jpg";
import pic7 from "../assets/7.jpg";
import pic8 from "../assets/8.jpg";
import pic9 from "../assets/9.jpg";
import pic10 from "../assets/10.jpg";
import pic11 from "../assets/11.jpg";
import pic12 from "../assets/12.jpg";
import pic13 from "../assets/13.jpg";
export const SET_USERNAME = "SET_USERNAME";
export const ADD_CITY = "ADD_CITY";
export const REMOVE_CITY = "REMOVE CITY";
export const GET_WEATHER_LOADING = "GET_WEATHER_LOADING";
export const SET_SEARCH = "SET_SEARCH";
export const SET_RESULTS = "SET_RESULTS";
export const SET_LAT = "SET_LAT";
export const SET_LONG = "SET_LONG";
export const SET_BACKGROUNDIMAGE = "SET_BACKGROUNDIMAGE";

export const randomizeImg = () => {
  return (dispatch, getState) => {
    let picArray = [
      pic1,
      pic2,
      pic3,
      pic4,
      pic5,
      pic6,
      pic7,
      pic8,
      pic9,
      pic10,
      pic11,
      pic12,
      pic13,
    ];
    let number = Math.floor(Math.random() * picArray.length);
    dispatch({
      type: SET_BACKGROUNDIMAGE,
      payload: picArray[number],
    });
  };
};

export const addCityAction = (city) => ({
  type: ADD_CITY,
  payload: city,
});

export const removeCityAction = (index) => ({
  type: REMOVE_CITY,
  payload: index,
});

export const setUsernameAction = (name) => ({
  type: SET_USERNAME,
  payload: name,
});

export const setUsernameActionWithThunk = (name) => {
  return (dispatch, getState) => {
    console.log(
      "This username has been dispatched with a function!",
      getState()
    );
    dispatch({
      type: SET_USERNAME,
      payload: name,
    });
  };
};

export const searchCityAction = (value) => {
  return async (dispatch, getState) => {
    let query = await getState();
    try {
      let resp = await fetch(
        `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${query.search.query}`
      );
      let res = await resp.json();
      console.log("RES", res.results[0].locations[0].latLng);
      const latQuery = res.results[0].locations[0].latLng.lat;
      const longQuery = res.results[0].locations[0].latLng.lng;
      if (resp.ok) {
        dispatch({
          type: SET_LAT,
          payload: latQuery,
        });
        dispatch({
          type: SET_LONG,
          payload: longQuery,
        });
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latQuery}&lon=${longQuery}&exclude=hourly&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        );
        let result = await response.json();
        console.log("RESULT", result);
        if (response.ok) {
          dispatch({
            type: SET_RESULTS,
            payload: result,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setQueryAction = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: value,
    });
  };
};

export const SET_USERNAME = 'SET_USERNAME'
export const ADD_CITY = "ADD_CITY"
export const REMOVE_CITY = "REMOVE CITY"
export const GET_WEATHER_LOADING="GET_WEATHER_LOADING"
export const SET_SEARCH = 'SET_SEARCH'
export const SET_RESULTS = 'SET_RESULTS'
export const SET_LAT = 'SET_LAT'
export const SET_LONG = 'SET_LONG'

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
})

export const setUsernameActionWithThunk = (name) => {
  return (dispatch, getState) => {
    // here we can do anything!
    // we can fetch data, or ...
    console.log('This username has been dispatched with a function!', getState())
    dispatch({
      type: SET_USERNAME,
      payload: name,
    })
  }
}

export const searchCityAction = (value) => {

  return async (dispatch, getState) => {
    let query = await getState();
      try {
        let resp = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${query.search.query}`)
        let res = await resp.json()
        console.log("RES", res.results[0].locations[0].latLng)
        const latQuery = res.results[0].locations[0].latLng.lat
        const longQuery =  res.results[0].locations[0].latLng.lng
         if(resp.ok){
          dispatch({
            type: SET_LAT,
            payload: latQuery
          })
          dispatch({
            type: SET_LONG,
            payload: longQuery
          })
           let response = await fetch(
             `https://api.openweathermap.org/data/2.5/onecall?lat=${latQuery}&lon=${longQuery}&exclude=hourly&units=metric&appid=${process.env.REACT_APP_API_KEY}`    
           );
           let result = await response.json();
            console.log("RESULT", result)
           if (response.ok) {
             dispatch({
               type: SET_RESULTS,
               payload: result,
             })
           } 

         }
      } catch (err) {
        console.log(err);
      }
    }
  };

  export const setQueryAction = (value) => {
    return async (dispatch) => {
      dispatch({
        type: SET_SEARCH,
        payload: value,
      });
    };
  };
  
export const SET_USERNAME = 'SET_USERNAME'



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
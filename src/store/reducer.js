import {
  INPUT_VALUE_CHANGE,
  ADD_ITEM,
  DELETE_ITEM,
  RESTORE_ITEM,
  GET_INIT_DATA

} from './actionTypes'


const defaultState = {
  inputValue: '',
  list: [],
  dList: []
}

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  if (action.type === INPUT_VALUE_CHANGE) {
    newState.inputValue = action.value
    return newState
  } else if (action.type === ADD_ITEM) {
    newState.list = [...state.list, state.inputValue]
    newState.inputValue = ''
    return newState
  } else if (action.type === DELETE_ITEM) {
    newState.dList = [...state.dList, state.list[action.index]]
    newState.list.splice(action.index, 1)
    console.log("new state is now",state.dList);
    return newState
  } else if (action.type === RESTORE_ITEM) {
    newState.list = [...state.list, state.dList[action.index]]
    newState.dList.splice(action.index, 1)
    return newState
  } else if (action.type === GET_INIT_DATA) {
    newState.list = action.value
    return newState
  }


  return state
}

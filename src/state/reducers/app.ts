import { Action } from "../../types/interfaces"
import * as types from "../types/app";

interface AppState {
  connected: boolean
}

const initialState: AppState = {
  connected: false
}

export default (state: AppState = initialState, { type, payload }: Action): AppState => {
  switch (type) {

    case types.SET_CONNECTED:
      return {
        ...state,
        connected: payload
      }

      default:
        return state;
  }
}
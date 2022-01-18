import { User } from "../../types/interfaces"
import * as types from "../types/user";

interface Action {
  type: string,
  payload: any
}

interface UserState {
  details: User | null
}

const initialState: UserState = {
  details: null
}

export default (state: UserState = initialState, { type, payload }: Action): UserState => {
  switch (type) {

    // --- Set Global Loading ---
    case types.GET_USER:
      return {
        ...state,
        details: payload
      }

    // default as needed......
      default:
        return state;
  }
}
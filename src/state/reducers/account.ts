import { Account } from "../../types/interfaces"
import * as types from "../types/account";

interface Action {
  type: string,
  payload: any
}

interface AccountState {
  details: Account | null
}

const initialState: AccountState = {
  details: null
}

export default (state: AccountState = initialState, { type, payload }: Action): AccountState => {
  switch (type) {

    // --- Set Global Loading ---
    case types.GET_ACCOUNT:
      return {
        ...state,
        details: payload
      }

    // default as needed......
      default:
        return state;
  }
}
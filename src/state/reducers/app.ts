import { Action, AppState } from "../../types/interfaces"
import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json';
import Token from '../../artifacts/contracts/Token.sol/Token.json';

// import * as types from "../types/app";



const initialState: AppState = {
  greeterAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  tokenAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  contracts: {
    Greeter,
    Token
  }
}

export default (state: AppState = initialState, { type, payload }: Action): AppState => {
  switch (type) {

      default:
        return state;
  }
}
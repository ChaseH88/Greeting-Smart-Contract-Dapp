import { useSelector } from "react-redux";
import { ApplicationState, AppState } from "../types/interfaces";

/**
 * This hook will get you the global app state
 * @returns App State
 */
const useAppState = (): AppState => (

  useSelector((state: ApplicationState) => (
    state.app
  )) as AppState

);

export { useAppState };

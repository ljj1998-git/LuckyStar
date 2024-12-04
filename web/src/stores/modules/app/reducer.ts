import { AnyAction } from "redux";
import produce from "immer";
import { IAppState } from "@/stores/interface";
import * as types from "@/stores/modules/app/constant";

const appState: IAppState = {
  token: "",
  userInfo: "",
  theme: "",
};

// global reducer
const global = (state: IAppState = appState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case types.SET_TOKEN:
        draftState.token = action.token;
        break;
      default:
        return draftState;
    }
  });

export default global;

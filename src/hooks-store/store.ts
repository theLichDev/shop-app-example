import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';

type DispatchSetState = Dispatch<SetStateAction<{}>>;
export type StoreActions = { [key: string]: Function };
export interface GlobalState { 
  [key: string]: any
};

let globalState: GlobalState = {};
let listeners: DispatchSetState[] = [];
let actions: StoreActions = {};

export const useStore: () => [GlobalState, (actionId: string, payload?: any) => void] = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionId: string, payload?: any) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };
    localStorage.setItem('state', JSON.stringify(globalState));
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter(lis => lis !== setState);
    }
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions: StoreActions, initialState?: any) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};

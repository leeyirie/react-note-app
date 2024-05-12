import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./noteSlice";
import { RootState } from "@reduxjs/toolkit/query";

function safeLocalStorageAccess<T>(action: () => T): T | undefined {
  try {
      return action();
  } catch (err) {
      console.error("LocalStorage access failed:", err);
      return undefined;
  }
}

//로컬 스토리지 로드 함수
const loadState = (): RootState | undefined => {
  return safeLocalStorageAccess(() => {
      const serializedState = localStorage.getItem("state");
      return serializedState ? JSON.parse(serializedState) as RootState : undefined;
  });
};

//로컬스토리지에 상태 저장 함수
const saveState = (state: RootState): void => {
  safeLocalStorageAccess(() => {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
  });
};

//로컬스토리지 저장 미들웨어
const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  saveState(store.getState());
  return result;
};

//리듀서 구성 및 상태 초기화 설정.
const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',  // Enable Redux DevTools in development

  preloadedState: loadState(),  // 로드된 상태를 초기 상태로 설정
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
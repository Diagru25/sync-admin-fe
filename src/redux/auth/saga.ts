/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "apis/authApi";
import { LoginData } from "constants/types/auth";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { login, checkSession, updateState, logout } from "redux/auth/slice";
import { notifications } from "@mantine/notifications";
import { ACCESS_TOKEN } from "constants/common/common";

function* loginSaga(action: PayloadAction<LoginData>): unknown {
  try {
    const res = yield authApi.login(action.payload);

    console.log(res);

    if (res.status === 200) {
      yield put({
        type: updateState.type,
        payload: { isLoggedIn: true, user: res.data.user },
      });

      localStorage.setItem(ACCESS_TOKEN, res.data.token);
      notifications.show({
        title: "Đăng nhập thành công",
        message: `Chào mừng ${res.data.user.Username}`,
        color: "green",
      });
    } else {
      notifications.show({
        title: "Đăng nhập không thành công",
        message: res.response.data,
        color: "red",
      });
    }
  } catch (error: any) {
    yield put({
      type: updateState.type,
      payload: { isLoggedIn: false },
    });

    localStorage.removeItem(ACCESS_TOKEN);
  }
}

function* logoutSaga(): unknown {
  try {
    localStorage.removeItem(ACCESS_TOKEN);

    yield put({
      type: updateState.type,
      payload: { isLoggedIn: false, user: undefined },
    });
  } catch (error: any) {
    localStorage.removeItem(ACCESS_TOKEN);

    yield put({
      type: updateState.type,
      payload: { isLoggedIn: false, user: undefined },
    });
  }
}

function* checkSessionSaga(): unknown {
  try {
    const response = yield authApi.checkSession();
    if (response.status === 200) {
      yield put({
        type: updateState.type,
        payload: { isLoggedIn: true },
      });
    } else {
      yield put({
        type: updateState.type,
        payload: { isLoggedIn: false },
      });
      localStorage.removeItem(ACCESS_TOKEN);
    }
  } catch (error) {
    yield put({
      type: updateState.type,
      payload: { isLoggedIn: false },
    });
    localStorage.removeItem(ACCESS_TOKEN);
  }
}

function* authSaga() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga);
  yield takeEvery(checkSession.type, checkSessionSaga);
}

export default authSaga;

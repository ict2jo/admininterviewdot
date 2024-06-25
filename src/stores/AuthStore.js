import { makeAutoObservable } from "mobx";

class AuthStore {
  admin = null;
  token = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  adminlogin(admin, token) {
    this.admin = admin;
    this.token = token;
    localStorage.setItem("token", token);
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
  }

  // 토큰 설정 액션
  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem("token", token);
      this.setAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      this.setAuthenticated(false);
    }
  }
  // 로컬 스토리지에서 토큰 가져오기
  loadToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
    }
  }

  // 인증상태 변경 액션 
  setAuthenticated(authenticated) {
    this.isAuthenticated = authenticated;
  }

}

const authStore = new AuthStore(); // AuthStore 인스턴스 생성
export default authStore;
import axios from "axios";
import { makeAutoObservable } from "mobx";

class AuthStore {
  admin = null;
  token = null;
  isAuthenticated = false;
  adminInfo = {
    a_id:'',
    a_name : '',
    a_email : '',
}
  constructor() {
    makeAutoObservable(this);
  }

    // 인증상태 변경 액션 
    setAuthenticated(authenticated){
      this.isAuthenticated = authenticated;
  }

  // 토큰 설정 액션 
  setToken(token){
    this.token = token
    if(token){
        localStorage.setItem("token", token);
        this.setAuthenticated(true);
    }else{
        localStorage.removeItem("token");
        this.setAuthenticated(false);
    }
}
  // 로컬 스토리지에서 토큰 가져오기
  loadToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    }
  }
  async loadUserFromServer() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get('/api/userInfo', {params:{token}});
        const userData = response.data;
        this.setAdminInfo(userData);
        console.log("Loaded user data:", userData);
      } catch (error) {
        console.error("Error loading user data", error);
      }
    }
  }
  setAdminInfo(adminInfo){
    this.adminInfo = adminInfo ;
}
logout() {
  this.token = null;
  this.isAuthenticated = false;
  localStorage.removeItem("token");

  this.setAdminInfo({
    a_id: '',
    a_name: '',
    a_email: '',
  });
}
}
const authStore = new AuthStore(); // AuthStore 인스턴스 생성
export default authStore;
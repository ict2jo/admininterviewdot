import { makeAutoObservable } from "mobx";


class MenuStore{
    selectedMenu = "successlist" ;  // 선택된 메뉴
    isAuthenticated = false;     // 사용자 인증상태
    token = null  ;              // 사용자 토큰
    userList = [] ;             // 서버에서 가져온 
    reviewList = [] ;
    adminList = [] ;
    queryList = [] ;
    inquiryList=[] ;

    constructor(){
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu){
        this.selectedMenu = menu;
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

    // 로컬 스토리지에서토큰 가져오기 
    loadToken(){
        const token = localStorage.getItem("token")
        this.setToken(token)
    }

    setInquiryList(inquiryList){
        this.inquiryList = inquiryList;
    }

    // setAdminList(adminList){
    //     this.adminList = adminList;
    // }
    // setReviewList(reviewList){
    //     this.reviewList = reviewList;
    // }
    // setSuccessList(successlist){
    //     this.successlist = successlist;
    // }
    // setUserList(userlist){
    //     this.userlist = userlist;
    // }
    // setQueryList(querylist){
    //     this.querylist = querylist;
    // }
}

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore ;
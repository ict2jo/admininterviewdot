import { makeAutoObservable } from "mobx";


class MenuStore{
    selectedMenu = 
    localStorage.getItem("selectedMenu") || "main"
    ;  // 선택된 메뉴
    reportlist = [] ;             // 서버에서 가져온 
    reviewList = [] ;
    adminList = [] ;
    queryList = [] ;
    inquiryList=[] ;
    payList=[];
    dashboard=[];

    constructor(){
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu){
        this.selectedMenu = menu;
        localStorage.setItem("selectedMenu", menu);
    }

    setInquiryList(inquiryList){
        this.inquiryList = inquiryList;
    }
    setReportList(reportlist){
        this.reportlist = reportlist;
    }
    setAdminList(adminList){
        this.adminList = adminList;
    }
    setReviewList(reviewList){
        this.reviewList = reviewList;
    }
    setSuccessList(successlist){
        this.successlist = successlist;
    }
    setAdminInfo(adminInfo){
        this.adminInfo = this.adminInfo;
    }
    setPayList(payList){
        this.payList = payList;
    }
    setDashboard(dashboard){
        this.dashboard = dashboard;
    }
    }

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore ;
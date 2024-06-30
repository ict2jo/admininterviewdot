"use client";

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Typography, CircularProgress, Grid } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import './Userdetail.css';
import Mail from '@/app/inquiry/mail/page';
import Nav from '@/app/Nav/page';
import authStore from '@/stores/AuthStore';

const Reportdetail = observer(({rep_idx}) => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [rvo, setRvo] = useState({
    rep_idx: rep_idx,
    a_id: authStore.a_id,
    u_idx: '',
    u2_idx: '',
    rep_okdate: '',
    rep_sysdate: '',
    r_idx: '',
    s_idx: '',
    r_title: '',
    r_content: '',
    s_title: '',
    s_content: '',
    rep_active: '',
    id: '',
    active: '',
    u_report: ''
  });
  const API_URL = `/report/reportdetail?rep_idx=${rep_idx}`;
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setRvo(data[0]);
      console.log(data[0]);
    } catch (error) {
      alert("데이터를 가져오는 데 실패했습니다.");
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rep_idx]);

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
    router.push("/adminmain");
  };

  const handleReportClick = () => {
    axios.post('/report/reportclick', rvo)
      .then(response => {
        console.log("사용자 정지 요청이 성공했습니다.", response.data);
        alert("사용자 정지 완료했습니다.");
        fetchData(); // 데이터 다시 불러오기
      })
      .catch(error => {
        console.error("사용자 정지 요청 중 오류가 발생했습니다.", error);
      });
  };
  
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (!rvo) {
      return <Typography variant="h6">데이터를 가져오는데 실패했습니다.</Typography>;
    }

    return (
        <div>
  <FormControl className="reportdetailcontainer">
    <h1>신고 내역</h1>
    <div className="report-detail-wrapper">
      {/* 첫 번째 열 */}
      <div className="reportdetailbox1">
        <div className="reporttitlebox">
          <div className="bluebox"></div>
          <Typography variant="h6" sx={{ lineHeight: 2 }} gutterBottom>
            {rvo.r_title ? (
              <p>제목: {rvo.r_title}</p>
            ) : (
              <p>제목: {rvo.s_title}</p>
            )}
          </Typography>
        </div>
        <div className="reporttextbox">
          <div className="bluebox"></div>
          <Typography variant="h6" sx={{ lineHeight: 2, marginTop: 2 }} gutterBottom>
            {rvo.r_content ? (
              <p>내용: {rvo.r_content}</p>
            ) : (
              <p>내용: {rvo.s_content}</p>
            )}
          </Typography>
        </div>
      </div>

      {/* 두 번째 열 */}
      <div className="reportdetailbox2">
            <div>
              <div className="bluebox"></div>
              <Typography variant="h6" sx={{ lineHeight: 2, marginLeft: 2, marginRight: 2 }} gutterBottom>
                <p>신고날짜: {rvo.rep_sysdate}</p>
              </Typography>
            </div>
          <div>
            <div className="bluebox"></div>
            <Typography variant="h6" sx={{ lineHeight: 2, marginLeft: 2,marginRight: 2 }} gutterBottom>
              <p>{rvo.rep_active == 0 ? '신고 처리날짜: 신고처리대기중' : `신고처리날짜: ${rvo.rep_okdate}`}</p>
            </Typography>
        </div>
          <div>
            <div className="bluebox"></div>
            <Typography variant="h6" sx={{ lineHeight: 2, marginLeft: 2,marginRight: 2 }} gutterBottom>
            <p>{rvo.rep_active == 0 ? '신고 상태: 신고처리대기중' : `신고처리자: ${rvo.a_id}`}</p>
            </Typography>
          </div>
          <div>
            <div className="bluebox"></div>
              <Typography variant="h6" sx={{ lineHeight: 2, marginLeft: 2,marginRight: 2 }} gutterBottom>
                <p>사용자 아이디: {rvo.id}</p>
              </Typography>
          </div>
          <div>
            <div className="bluebox"></div>
              <Typography variant="h6" sx={{ lineHeight: 2, marginLeft: 2,marginRight: 2 }} gutterBottom>
                <p>신고누적: {rvo.u_report}</p>
              </Typography>
          </div>
      </div>
    </div>
      <div className="reportbut">
      {rvo.rep_active === '0' ? (
          <Button variant="contained" onClick={() => handleReportClick()}>정지하기</Button>
      ) : (
          <Button variant="contained">정지완료</Button>
      )}

          <Button variant="outlined" onClick={() => handleMenuClick("reportlist")}>목록으로</Button>
      </div>
  </FormControl>
</div>

    );
  };

  return (
    <div>
              {renderContent()}
    </div>
  );
});

export default Reportdetail;

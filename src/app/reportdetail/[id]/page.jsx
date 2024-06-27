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

const Userdetail = observer(() => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [rvo, setRvo] = useState(null); // 초기값을 null로 설정
  
  const API_URL = `/report/reportdetail?rep_idx=${id}`;
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setRvo(data[0]);
    } catch (error) {
      alert("데이터를 가져오는 데 실패했습니다.");
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
    router.push("/adminmain");
  };

  const handleReportClick = (u_idx) => {
        axios.post('/report/reportclick', null, {
          params: { u_idx }
      })
      .then(response => {
        console.log("사용자 정지 요청이 성공했습니다.", response.data);
        alert("사용자 정지 완료했습니다.");
        window.location.reload();
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
  <FormControl className="inquirydetailcontainer">
    <h1>신고 내역</h1>
    <div className="inquiry-detail-wrapper">
      {/* 첫 번째 열 */}
      <div className="inquirydetailbox1">
        <div className="inquirytitlebox">
          <div className="bluebox"></div>
          <Typography variant="h6" sx={{ lineHeight: 2, marginLeft: 2 }} gutterBottom>
            {rvo.r_title ? (
              <p className="ellipsis-cell">제목: {rvo.r_title}</p>
            ) : (
              <p className="ellipsis-cell">제목: {rvo.s_title}</p>
            )}
          </Typography>
        </div>
        <div className="inquirytextbox">
          <div className="bluebox"></div>
          <Typography variant="body1" sx={{ lineHeight: 2, marginTop: 2, marginLeft: 2, whiteSpace: 'pre-line' }} gutterBottom>
            {rvo.r_content ? (
              <p>내용: {rvo.r_content}</p>
            ) : (
              <p>내용: {rvo.s_content}</p>
            )}
          </Typography>
        </div>
      </div>

      {/* 두 번째 열 */}
      <div className="inquirydetailbox2">
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
      <div className="inquirybut">
      {rvo.rep_active === '0' ? (
          <Button variant="contained" onClick={() => handleReportClick(rvo.u_idx)}>정지하기</Button>
      ) : (
          <Button variant="contained">정지완료</Button>
      )}

          <Button variant="outlined" onClick={() => handleMenuClick("inquirylist")}>목록으로</Button>
      </div>
  </FormControl>
</div>

    );
  };

  return (
    <div className="innerwrap">
      <div className="whiteboard">
        <Grid container>
          <Grid item xs={2}>
            <div className="grayboard">
              <Nav handleMenuClick={handleMenuClick} />
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className="maintext">
              {renderContent()}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
});

export default Userdetail;

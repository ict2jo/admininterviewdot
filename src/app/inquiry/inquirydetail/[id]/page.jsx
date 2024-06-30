"use client";

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Typography, CircularProgress, Grid } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import './inquirydetail.css';
import Mail from '@/app/inquiry/mail/page';
import Nav from '@/app/Nav/page';

const Inquirydetail = observer(({i_idx}) => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [ivo, setIvo] = useState(null); // 초기값을 null로 설정
  
  const API_URL = `/inquiry/inquirydetail?i_idx=${i_idx}`;
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setIvo(data[0]);
    } catch (error) {
      alert("데이터를 가져오는 데 실패했습니다.");
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [i_idx]);

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
    router.push("/adminmain");
  };
  
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (!ivo) {
      return <Typography variant="h6">데이터를 가져오는데 실패했습니다.</Typography>;
    }

    return (
      <div>
        <FormControl className="inquirydetailcontainer">
          <h1>1:1문의 내역</h1>
          <div className='inquirydetailbox'>
            <div className='inquirytitlebox'>
              <div className='bluebox'></div>
              <Typography variant="h6" sx={{ lineHeight: 2, marginLeft: 2 }} gutterBottom>
                {ivo.i_subject}
              </Typography>
            </div>
            <div className='inquirytextbox'>
              <div className='bluebox'></div>
              <Typography variant="body1" sx={{ lineHeight: 2, marginTop: 2, marginLeft: 2, whiteSpace: 'pre-line' }} gutterBottom>
                {ivo.i_content}
              </Typography>
            </div>
            <div className='inquirybut'>
              <Button variant='contained' onClick={clickModal}>답변 보내기</Button>
              <Button variant='outlined' onClick={() => handleMenuClick("inquirylist")}>목록으로</Button>
            </div>
          </div>
        </FormControl>
        {showModal && <Mail clickModal={clickModal} ivo={ivo} />}
      </div>
    );
  };

  return (
    <div>
              {renderContent()}
    </div>
  );
});

export default Inquirydetail;

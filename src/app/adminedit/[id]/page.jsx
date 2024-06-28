"use client";

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Typography, CircularProgress, Grid, Input } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import './inquirydetail.css';
import Nav from '@/app/Nav/page';

const Adminedit= observer(() => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [avo, setAvo] = useState(null); // 초기값을 null로 설정
  
  const API_URL = `/admin/admindetail?a_idx=${id}`;
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setAvo(data[0]);
    } catch (error) {
      alert("데이터를 가져오는 데 실패했습니다.");
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  async function edit() {
    try {
      const response = await axios.post(`/admin/adminedit`, avo);
      console.log('수정 완료:', response.data);
      menuStore.setSelectedMenu("adminlist");
      router.push("/adminmain");
    } catch (error) {
      alert("작성 실패");
      console.error(error); // 에러 출력
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
    router.push("/adminmain");
  };
  
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (!avo) {
      return <Typography variant="h6">데이터를 가져오는데 실패했습니다.</Typography>;
    }
    function changeAvo(e) {
      setAvo({
        ...avo,
        [e.target.name]: e.target.value
      });
    }
    return (
      <div>
        <FormControl className="inquirydetailcontainer">
          <h1>관리자 정보 수정</h1>
          <div className='inquirydetailbox'>
            <div className='inquirytitlebox'>
              <div className='bluebox'></div>
              <Input type='text' label="id" name='a_id' value={avo.a_id} onChange={changeAvo}>
                {avo.a_id}
              </Input>
            </div>
            <div className='inquirytitlebox'>
              <div className='bluebox'></div>
              <Input type='text' label="name" name='a_name' value={avo.a_name} onChange={changeAvo}>
                {avo.a_name}
              </Input>
            </div>
            <div className='inquirytitlebox'>
              <div className='bluebox'></div>
              <Input type='text' label="phone" name='a_phone' value={avo.a_phone} onChange={changeAvo}>
                {avo.a_phone}
              </Input>
            </div>
            <div className='inquirytitlebox'>
              <div className='bluebox'></div>
              <Input type='text' label="Email" name='a_email' value={avo.a_email} onChange={changeAvo}>
                {avo.a_email}
              </Input>
            </div>
            <div className='inquirybut'>
              <Button variant='contained' onClick={edit}>수정완료</Button>
              <Button variant='outlined' onClick={() => handleMenuClick("inquirylist")}>목록으로</Button>
            </div>
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

export default Adminedit;

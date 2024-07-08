"use client";

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Typography, CircularProgress, Grid, Input } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import './userdetail.css';
import authStore from '@/stores/AuthStore';

const Userdetail= observer(({u_idx}) => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [uvo, setUvo] = useState(null); // 초기값을 null로 설정
  
  const API_URL = `/report/userdetail?u_idx=${u_idx}`;
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setUvo(data[0]);
    } catch (error) {
      alert("데이터를 가져오는 데 실패했습니다.");
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  async function edit() {
    try {
      const response = await axios.post(`/report/useredit`, uvo);
      alert('사용자 정보 수정 완료');
      location.reload();
    } catch (error) {
      alert("작성 실패");
      console.error(error); // 에러 출력
    }
  }
  useEffect(() => {
    fetchData();
  }, [u_idx]);

  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (!uvo) {
      return <Typography variant="h6">데이터를 가져오는데 실패했습니다.</Typography>;
    }
    function changeUvo(e) {
      setUvo({
        ...uvo,
        [e.target.name]: e.target.value
      });
    }
    return (
      <div>
        <FormControl className="admineditdetailcontainer">
          <h1>회원 정보 수정</h1>
          <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>ID:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px', marginRight: '30px'}} label="id" name='id' value={uvo.id} onChange={changeUvo} disabled>
                {uvo.id}
              </Input>
              </div>
              </div>
            </div>
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>NAME:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px' }} label="name" name='name' value={uvo.name} onChange={changeUvo}>
                {uvo.name}
              </Input>
              </div>
              </div>
            </div>
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>PHONE:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px' }} label="phone" name='phonenumber' value={uvo.phonenumber} onChange={changeUvo}>
                {uvo.phonenumber}
              </Input>
            </div>
            </div>
              </div>
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>EMAIL:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px' }} label="Email" name='email' value={uvo.email} onChange={changeUvo}>
                {uvo.email}
              </Input>
              </div>
              </div>
            </div>
            <div className='admineditbut'>
              <Button variant='contained' onClick={edit}>수정완료</Button>
              <Button variant='outlined' onClick={() => handleMenuClick("userlist")}>목록으로</Button>
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

export default Userdetail;

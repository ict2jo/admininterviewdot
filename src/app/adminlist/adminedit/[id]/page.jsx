"use client";

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Typography, CircularProgress, Grid, Input } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter, useSearchParams } from 'next/navigation';
import './adminedit.css';
import Nav from '@/app/Nav/page';

const Adminedit= observer(({a_idx}) => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [avo, setAvo] = useState(null); // 초기값을 null로 설정
  
  const API_URL = `/admin/admindetail?a_idx=${a_idx}`;
  
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
  async function idcheck(a_id) {
    try {
      const response = await axios.get('api/idCheck', {
        params: { a_id },
      });
      console.log("Response data:", response.data);
      if (response.data) {
        alert("아이디가 이미 사용 중입니다. 다른 아이디를 사용해주세요.");
        return false;
      } else {
        alert("사용 가능한 아이디입니다.");
        return true;
      }
    } catch (error) {
      console.error(error);
      alert("아이디 중복 체크 중 오류가 발생했습니다. 다시 시도해주세요.");
      return false;
    }
  }
  useEffect(() => {
    fetchData();
  }, [a_idx]);

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
        <FormControl className="admineditdetailcontainer">
          <h1>관리자 정보 수정</h1>
          
          <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>ID:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px', marginRight: '30px'}} label="id" name='a_id' value={avo.a_id} onChange={changeAvo}>
                {avo.a_id}
              </Input>
              <Button variant='contained' onClick={()=>idcheck(avo.a_id)}>중복검사</Button>
              </div>
              </div>
            </div>
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>NAME:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px' }} label="name" name='a_name' value={avo.a_name} onChange={changeAvo}>
                {avo.a_name}
              </Input>
              </div>
              </div>
            </div>
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>PHONE:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px' }} label="phone" name='a_phone' value={avo.a_phone} onChange={changeAvo}>
                {avo.a_phone}
              </Input>
            </div>
            </div>
              </div>
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>EMAIL:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px' }} label="Email" name='a_email' value={avo.a_email} onChange={changeAvo}>
                {avo.a_email}
              </Input>
              </div>
              </div>
            </div>
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>PASSWORD:</div> 
              <div className='admineditdetail'>
              <Input type='password' sx={{ width: '300px' }} label="Password" name='a_pwd' value={avo.a_pwd} onChange={changeAvo}>
                {avo.a_pwd}
              </Input>
              </div>
              </div>
            </div>
            <div className='admineditbut'>
              <Button variant='contained' onClick={edit}>수정완료</Button>
              <Button variant='outlined' onClick={() => handleMenuClick("inquirylist")}>목록으로</Button>
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

export default Adminedit;

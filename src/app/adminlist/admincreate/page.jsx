"use client";
import { useContext, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, TextField } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import './inquirywrite.css';

const AdminCreate = observer(() => {
  const menuStore = useContext(MenuContext);
  const API_URL = '/api/create';
  const [avo, setAvo] = useState({
    a_id: '',
    a_name: '',
    a_email: '',
    a_phone: '',
    a_pwd: ''
  }); // 초기값을 null로 설정

  async function create() {
    try {
      const response = await axios.post(API_URL, avo);
      console.log('작성 완료:', response.data);
      menuStore.setSelectedMenu('adminlist');
    } catch (error) {
      alert("작성 실패");
      console.error(error); // 에러 출력
    }
  }

  function changeAvo(e) {
    setAvo({
      ...avo,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className=''>
    <FormControl className="inquirydetailcontainer">
    <h1 className='inqwrite'>1:1문의 내역</h1>
      <div className='inquirydetailbox'>
      <p className='inqwrite'>아이디</p>
      <div className='inquirytitlebox'>
      <div className='bluebox'></div>
      <input className="inqwritefield" type='text' label="ID" name='a_id' value={avo.a_id} onChange={changeAvo}></input>
      </div>
      
      <p className='inqwrite'>이름</p>
      <div className='inquirytitlebox'>
      <div className='bluebox'></div>
      <input className="inqwritefield" type='text' label="Name" name='a_name' value={avo.a_name} onChange={changeAvo}></input>
      </div>

      <p className='inqwrite'>이메일</p>
      <div className='inquirytitlebox'>
      <div className='bluebox'></div>
      <input className="inqwritefield" type='email' label="Email" name='a_email' value={avo.a_email} onChange={changeAvo}></input>
      </div>

      <p className='inqwrite'>전화번호</p>
      <div className='inquirytitlebox'>
      <div className='bluebox'></div>
      <input className="inqwritefield" type='text' label="a_Phone" name='a_phone' value={avo.a_phone} onChange={changeAvo}></input>
      </div>

      <p className='inqwrite'>비밀번호</p>
      <div className='inquirytitlebox'>
      <div className='bluebox'></div>
      <input className="inqwritefield" type='password' label="Pwd" name='a_pwd' value={avo.a_pwd} onChange={changeAvo}></input>
      </div>

          <div className='inquirybut'>
          <Button variant='contained' onClick={create}>작성완료</Button>
          <Button variant='outlined' onClick={() => {handleMenuClick("adminlist"); router.push("/");}}>목록으로</Button>
          </div>
        </div>
        </FormControl>
      </div>
  );
});

export default AdminCreate;

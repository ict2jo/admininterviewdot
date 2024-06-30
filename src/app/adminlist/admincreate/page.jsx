"use client";
import { useContext, useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Input, TextField } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import './admincreate.css';

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
    <div>
        <FormControl className="admineditdetailcontainer">
          <h1>관리자 정보 수정</h1>
          
            <div className='adminedittitlebox'>
              <div className='admintext'>
              <div className='adminedittitle'>ID:</div> 
              <div className='admineditdetail'>
              <Input type='text' sx={{ width: '300px' }} label="id" name='a_id' value={avo.a_id} onChange={changeAvo}>
                {avo.a_id}
              </Input>
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
              <Button variant='contained' onClick={create}>관리자 생성하기</Button>
              <Button variant='outlined' onClick={() => handleMenuClick("adminlist")}>목록으로</Button>
            </div>
        </FormControl>
      </div>
    );
});

export default AdminCreate;

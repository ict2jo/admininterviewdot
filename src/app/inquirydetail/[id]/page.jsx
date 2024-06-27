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

const Inquirydetail = observer(() => {
  const menuStore = useContext(MenuContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [ivo, setIvo] = useState({
    i_subject: '',
    i_content: '',
    i_idx: id, // id를 초기값으로 설정합니다.
    email:''
  });
  
  const API_URL = `/inquiry/inquirydetail?i_idx=${id}`;
  
  const fetchData = () => {
      axios.get(API_URL).then((data)=>{
        
        setIvo(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        alert("데이터를 가져오는 데 실패했습니다.");
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    console.log(ivo)
  }, [id]); // id가 변경될 때마다 데이터를 다시 가져옵니다.


  const handleMenuClick = (menu) => {
    menuStore.setSelectedMenu(menu);
  };
  
    const [showModal, setShowModal] = useState(false)
    const clickModal = () => setShowModal(!showModal)

  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }
    return (
      <div className=''>
        <FormControl className="inquirydetailcontainer">
        <h1>1:1문의 내역</h1>
        <div className='inquirydetailbox'>
          <div className='inquirytitlebox'>
          <div className='bluebox'></div>
          <Typography variant="h6" sx={{lineHeight: 2, marginLeft: 2}} gutterBottom>
            {ivo.i_subject}
          </Typography>
          </div>
          <div className='inquirytextbox'>
          <div className='bluebox'></div>
          <Typography variant="body1" sx={{lineHeight: 2, marginTop:2,marginLeft: 2,whiteSpace: 'pre-line' }} gutterBottom>
            {ivo.i_content}
          </Typography>
          </div>
          <div className='inquirybut'>
          <Button variant='contained' onClick={clickModal}>답변 보내기</Button>
          <Button variant='outlined' onClick={() => {handleMenuClick("inquiry"); router.push("/");}}>목록으로</Button>
          </div>
        </div>
        </FormControl>
        {showModal && <Mail clickModal={clickModal} ivo={ivo} />}
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

export default Inquirydetail;

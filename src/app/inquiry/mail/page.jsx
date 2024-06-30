"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './mail.css';
import { Button, Input, TextField } from '@mui/material';
import { Textarea } from '@nextui-org/react';

const Mail = ({ clickModal, ivo }) => {

  useEffect(() => {
    console.log(ivo);
  }, []);
  const [showModal, setShowModal] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      console.log("ivo",ivo);
      const response = await axios.post('/inquiry/mail2', formData);
      console.log(response)
      if (response.status === 200) {
        alert('Mail sent successfully!');
        clickModal();
      } else {
        console.error('Failed to send mail. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error sending mail:', error);
    }
  };
  if (!ivo) {
    return <div>Loading...</div>; // 예시로 간단하게 로딩 메시지를 보여줍니다.
  }
  const renderContent = () => {
  return (
    <div className='SearchModalBox' onClick={clickModal}>
      <div className='SearchModalContent' onClick={(e) => e.stopPropagation()}>
        <h1>메일 보내기</h1>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <p>문의 제목</p>
                  <p>문의 내용</p>
                </td>
                <td>
                  <p>{ivo.i_subject}</p>
                  <p>{ivo.i_content}</p>
                  <input type='hidden' name="i_idx" value={ivo.i_idx} />
                </td>
              </tr>
              <tr>
                <td>메일 주소</td>
                <td>
                <Input type='email' label="email" name='title' defaultValue={ivo.email} required />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                <Input type='text' label="title" name='title'placeholder="제목을 입력하세요" required />
                </td>
              </tr>
              <tr>
                <td>내용</td>
                <td>
                <TextField  name="content" multiline id="outlined-multiline-flexible"
                  rows={4} variant="standard"InputProps={{ style: { whiteSpace: 'pre-wrap' } }}placeholder="보낼 내용을 입력하세요" required/>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ textAlign: 'center' }}>
          <Button variant="contained"type="submit">발송하기</Button>
          </div>
        </form>
      </div>
    </div>
     );
    };
    return (
      <>
      {renderContent()}
      </>
  );
};

export default Mail;

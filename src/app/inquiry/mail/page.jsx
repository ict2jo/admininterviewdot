"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './mail.css';

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
                <td>문의 내용</td>
                <td>
                  <p>제목 : {ivo.i_subject}</p>
                  <p>내용 : {ivo.i_content}</p>
                  <input type='hidden' name="i_idx" value={ivo.i_idx} />
                </td>
              </tr>
              <tr>
                <td>메일 주소</td>
                <td>
                  <input type="email" name="email" defaultValue={ivo.email} required />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" name="title" placeholder="제목을 입력하세요" required />
                </td>
              </tr>
              <tr>
                <td>내용</td>
                <td>
                  <textarea name="content" placeholder="보낼 내용을 입력하세요" required></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">발송</button>
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

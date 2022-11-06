import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Loader from "../../components/Loader";
import { isLogin } from "../../util/common";
import TopBar from "../../components/TopBar";

const NotiSend = () =>{
  const [lists, setLists] = useState('');
  const [loading, setLoading] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);
  const [inputStatus2, setInputStatus2] = useState(false);


  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     setLoading(true);
      try {
        const response = await api.memberInfo();
        setLists(response.data);
        setPrepared(true);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if(!isLogin){
    alert("잘못된 접근입니다!");
    window.location.replace("/");
  }
  
  if(loading) {
    return <div className="center"><Loader/></div>
  }


  const adminNotiSend = () => {
    setPrepared(false);
    const fetchDeleteData = async () => {
      setLoading(true);
       try {
         const response = await api.adminNotiSend();
         setLists(response.data);
         setPrepared(true);
       } catch (e) {
         console.log(e);
       }
       setLoading(false);
     };
    fetchDeleteData();
    setCheckItems([]);
  }

  if(!isLogin){
    alert("잘못된 접근입니다!");
    window.location.replace("/");
  }
  
  if(loading) {
    return <div className="center"><Loader/></div>
  }

const handleClickRadioButton = () => {
  setInputStatus(!inputStatus)
}
const handleClickRadioButton2 = () => {
  setInputStatus2(!inputStatus2)
}
console.log("라디오값1" + inputStatus);
console.log("라디오값2" + inputStatus2);

 
return(
  <div className="center">
    <TopBar name="알림 발송" high1="알림 관리"/>
    <label>
      <span>알림 분류</span>
      <div>
      <label><input type="radio" name="radio" id={'radio'} onChange={() => handleClickRadioButton('radio')} checked={inputStatus === 'radio'} readOnly />공지사항</label>
      <label><input type="radio" name="radio" id={'radio2'} onChange={() => handleClickRadioButton2('radio2')} checked={inputStatus2 === 'radio2'} readOnly />광고</label>
      </div>
    </label>
    <br/>
      <label>
        <span>제목</span>
        <input type="text"/>
      </label>
      <br/>
      <label>
        <span>내용</span>
        <textarea/>
      </label>
      <br/>
      <button onClick={adminNotiSend}>발송</button>
    </div>
  );
};
export default NotiSend;
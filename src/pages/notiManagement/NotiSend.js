import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Loader from "../../components/Loader";
import { isLogin } from "../../util/common";
import TopBar from "../../components/TopBar";

const NotiSend = () =>{
  const [lists, setLists] = useState('');
  const [loading, setLoading] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [Q1, setQ1] = useState('');
  const [Q2, setQ2] = useState('');

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


  const adminAdSend = () => {
    setPrepared(false);
    const fetchDeleteData = async () => {
      setLoading(true);
       try {
         const response = await api.adminAdSend();
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
  const changeRadioQ1= (e) => {
    setQ1(e.target.value);
    console.log(setQ1(e.target.value));
  }
  const changeRadioQ2= (e) => {
    setQ2(e.target.value);
  }


  console.log(changeRadioQ2);
  return(
    <div className="center">
      <TopBar name="알림 발송" high1="알림 관리"/>
      <label>
        <span>알림 분류</span>
        <label><input type="radio" name="notiType" onChange = {changeRadioQ1} value={1} checked={Q1 ==="1" ? true: false}/>공지사항</label>
        <label><input type="radio" name="notiType" onChange = {changeRadioQ2} value={2} checked={Q2 ==="2" ? true: false}/>광고</label>
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
      <button onClick={adminAdSend}>발송</button>
    </div>
  );
};
export default NotiSend;
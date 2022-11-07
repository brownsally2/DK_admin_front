import { useState, useEffect } from "react";
import api from "../../api/api";
import Loader from "../../components/Loader";
import { isLogin } from "../../util/common";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";

const AdManagementAdd = () =>{
 

  const [lists, setLists] = useState('');
  const [loading, setLoading] = useState(false);
  const [prepared, setPrepared] = useState(false);

  const [ad_name, setad_name] = useState('');
  const [ad_url, setad_url] = useState('');
  const [ad_img, setad_img] = useState('');

  const onChangeAd_name = (e) => setad_name(e.target.value);
  const onChangeAd_url = (e) => setad_url(e.target.value);

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     setLoading(true);
      try {
        const response = await api.adInfo();
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

  const adminAdAdd = async () =>{

    const fetchAdUpdateData = async () => {
      setLoading(true);
       try {
         const response = await api.adminAdAdd(ad_name, ad_url);
         setLists(response.data);
         setPrepared(true);
       } catch (e) {
         console.log(e);
       }
       setLoading(false);
     };
     fetchAdUpdateData();
     window.location.reload();
  }
  
  
  return(
    <div className="center">
      <TopBar name="배너 추가" high1="배너 관리" high2="광고 관리"/>
      <div>
      <label>
          <span>광고 이름</span>
          <input type="text" value={ad_name} onChange={onChangeAd_name}/>
        </label>
        <label>
          <span>광고 이동 URL</span>
          <input type="text" value={ad_url} onChange={onChangeAd_url}/>
        </label>
        <label>
          <span>광고 이미지</span>
          <input type="file"/>
        </label>
        <br/>
        <button onClick={adminAdAdd}><Link to={"/adManagement"}>등록하기</Link></button>
      </div>
     
    </div>
  );
};
export default AdManagementAdd;

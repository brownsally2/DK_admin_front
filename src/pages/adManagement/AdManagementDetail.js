import { useState, useEffect, useRef} from "react";
import api from "../../api/api";
import Loader from "../../components/Loader";
import { isLogin } from "../../util/common";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {Fragment,Button} from "react";


// const adObj ={
//   ad_name : "",
//   ad_url : ""
// }

const AdManagementDetail = () =>{

  const{ ad_num } = useParams();
  console.log('ad_num :', ad_num)

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
     window.localStorage.setItem(ad_name, ad_url)
     console.log(ad_name)
     console.log(ad_url)
      try {
        const response = await api.adminAdUpdateInfo(ad_num);
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
  
  const adminAdUpdate = async () =>{

    const fetchAdUpdateData = async () => {
      setLoading(true);
       try {
         const response = await api.adminAdUpdate(ad_num, ad_name, ad_url);
         setLists(response.data);
         setPrepared(true);
       } catch (e) {
         console.log(e);
       }
       setLoading(false);
     };
     fetchAdUpdateData();
  }

 

  
  // const files => props => {

  //   const fileInput = useRef(null);
  
  //   const handleButtonClick = e => {
  //     fileInput.current.click();
  //   };
  
  //   const handleChange = e => {
  //     console.log(e.target.files[0]);
  //   };
  //   return(
  //   <Fragment>
  //   <Button onClick={handleButtonClick}>파일 업로드</Button>
  //   <input type="file"
  //         ref={fileInput}
  //         onChange={handleChange}
  //         style={{ display: "none" }} />
  //   </Fragment>
  //   );
  // }
  

  return(
    <div className="center">
      <TopBar name="배너 상세" high1="배너 관리" high2="광고 관리"/>
      <div>
        <label>
          <span>광고 이름</span>
          <input type="text" value={ad_name} onChange={onChangeAd_name}/>
        </label>
        <label>
          <span>광고 이동 URL</span>
          <input type="text" value={ad_url} onChange={onChangeAd_url}/>
        </label>
        {/* 이미지 아직 미구현  */}
        <label>
          <span>광고 이미지</span>
          <input type="file" value={ad_img}/>
        </label>
        <br/>
        <button onClick={adminAdUpdate}><Link to={"/adManagement"}>수정하기</Link></button>
      </div>
     
    </div>
  );
};

export default AdManagementDetail;

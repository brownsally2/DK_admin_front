import { useState, useEffect } from "react";
import api from "../../api/api";
import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/TopBar";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import { isLogin } from "../../util/common";

const AdManagement = () =>{
  const [lists, setLists] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [pageStart, setPageStart] = useState(0);

  const [loading, setLoading] = useState(false);
  const [prepared, setPrepared] = useState(false);

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
  
  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      // data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  }

  return(
    <div className="center">
      <TopBar name="광고 관리" high1="배너 관리"/>
      <SearchBar/>
      <div>
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <input type='checkbox' name='select-all'
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                  // checked={checkItems.length === data.length ? true : false} 
                />
                <th>광고 번호</th>
                <th>광고 이름</th>
                <th>이동 URL</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              { prepared &&
                lists.slice(offset, offset + limit)
                .map(({ memberNum, nickname, grade, countWrite, countComment, phone, email, regDate, ad_num, ad_name, ad_url, ad_img }) => (
                  <tr>
                    <td>
                    <input type='checkbox' 
                      // name={`select-${data.id}`}
                      // onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                      // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                      // checked={checkItems.includes(data.id) ? true : false} 
                      />
                    </td>
                    <td>{ad_num}</td>
                    <td>{ad_name}</td>
                    <td><button>수정</button></td>
                    <td>{ad_url}</td>
                    <td>{ad_img}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button>삭제</button>
          <button>추가</button>
        </div>
        <Pagination
          total={lists.length}
          limit={limit}
          page={page}
          setPage={setPage}
          pageStart={pageStart}
          setPageStart={setPageStart}
        />
      </div>
    </div>
  );
};
export default AdManagement;
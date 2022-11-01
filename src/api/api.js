import axios from "axios";
const HEADER = 'application/json';
const BASE_URL = "http://localhost:8300/developerKirby/";

const api = {
  // 회원 정보 조회
  memberInfo: async function() {
    const regCmd = {
      cmd : "MemberInfo" //조회는 이름만 날려주면됨
    }
    return await axios.post(BASE_URL + "AdminMemberServlet", regCmd, HEADER);
  },
  adInfo : async function() {
    const adCmd ={
      cmd :  "AdInfo"
    }
    return await axios.post(BASE_URL + "AdminAdServlet", adCmd, HEADER);
  }
};

export default api;
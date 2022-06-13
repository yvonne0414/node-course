import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL, IMAGE_URL } from '../utils/config';

const About = () => {
  const [member, setMember] = useState(null);
  useEffect(() => {
    let getMemberInfo = async () => {
      let response = await axios.get(`${API_URL}/member/info`, {
        withCredentials: true,
      });
      console.log(response.data);
      setMember(response.data.photo);
    };
    getMemberInfo();
  }, []);

  return (
    <div className="m-7">
      <h2 className="m-7 text-2xl text-gray-600">這裡是魚股市</h2>
      {member ? (
        <>
          <h3>Hi, 小明</h3>
          <img src={`${IMAGE_URL}${member}`} alt="" />
        </>
      ) : (
        <h3>尚未登入</h3>
      )}
    </div>
  );
};

export default About;

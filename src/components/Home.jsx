import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RajImg from "./img/rajimg.jpg";

const Home = () => {
  
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData"))[0]);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLogin", false);
    localStorage.removeItem("userData");
    navigate("/");
  };

  const editProfile = () => {
    navigate("/editform");
  };

  const HandleProfile = () => {
    setProfile(!profile);
  };
console.log("clicked",profile)
  return (
    <>
      <div className="homepage">
        <div className="navbar">
          <div className="logoDiv" onClick={HandleProfile}>
            <div className="logoImage">
              <img src={RajImg} alt="RajImg" className="img" />
            </div>
            <div>
              <span className="homename"> {userData.name}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btnhome">
            Logout
          </button>
        </div>
        {profile && 
        <div className="cardmain">
        
            <div className="card">
              <table>
                <thead>
                  <tr className="tr">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tr">
                    <td>{userData.name}</td>
                    <td>{userData.email}</td>
                    <td>{userData.mob}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="btndiv">
                <button className="editbtn" onClick={editProfile}>
                 Edit
                </button>
            </div>
        </div>
        } 
      </div>
     
    </>
  );
};

export default Home;

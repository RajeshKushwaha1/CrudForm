import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CrossIcon from "./img/cross.svg";

const Editform = () => {
  const navigate = useNavigate();
  const [cross, setCross] = useState(true);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    mob: "",
    psw: "",
    psw_repeat: "",
  });
  const [loginData, setLoginData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    setContact(JSON.parse(localStorage.getItem("userData"))[0]);
    setLoginData(JSON.parse(localStorage.getItem("userData")));
    setAllData(JSON.parse(localStorage.getItem("contacts")));
  }, []);

  const handlingEnterData = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id;
    const found = allData.find((element,index) => {
      if(element.email === loginData[0].email){
        id=index;
        return element;
      }
    });
    allData[id]=contact;
    localStorage.setItem("userData", JSON.stringify([contact]));
    localStorage.setItem("contacts", JSON.stringify(allData));
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const HandleCross = () => {
    setCross(!cross);
    navigate("/home");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1 className="text-center">Update Form</h1>
          <img
            src={CrossIcon}
            alt="CrossIcon"
            className="cross"
            onClick={HandleCross}
          />
          <p className="text-center">Please fill in this form to Update.</p>
          <hr />
          <label htmlFor="email">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={contact.name}
            onChange={handlingEnterData}
            autoComplete="off"
            required
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={contact.email}
            onChange={handlingEnterData}
            autoComplete="off"
            required
          />

          <label htmlFor="email">
            <b>Mobile</b>
          </label>
          <input
            type="number"
            placeholder="Enter Mobile"
            name="mob"
            value={contact.mob}
            onChange={handlingEnterData}
            autoComplete="off"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={contact.psw}
            name="psw"
            onChange={handlingEnterData}
            autoComplete="off"
            required
          />

          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            value={contact.psw_repeat}
            name="psw_repeat"
            onChange={handlingEnterData}
            autoComplete="off"
            required
            contentEditable={true}
          />

          <div className="clearfix text-center">
            <button className="signupbtn text-center">Update</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Editform;

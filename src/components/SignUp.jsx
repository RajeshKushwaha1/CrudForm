import React, { useState, useEffect,useRef } from "react";
import "../signUp.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CrossIcon from "./img/cross.svg";


const SignUp = () => {

  const [namevalidate, setNamevalidate] = useState("");
  const [emailvalidate,setEmailvalidate] = useState("");
  const [mobileNoValidate, setMobileNoValidate] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [repeatPaswordValidate, setrepeatPaswordValidate] = useState("");
  const [matchPassword, setmatchPassword] = useState("");
  let ColorRef =useRef(null);
  
  const navigate = useNavigate();
  const gettingLocalStorageData = () => {
    let list = JSON.parse(localStorage.getItem("contacts"));
    if (list && list.length > 0) {
      return list;
    } else {
      return [];
    }
  };

  const [cross, setCross] = useState(true);

  const [allData, setAllData] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    mob: "",
    psw: "",
    psw_repeat: "",
  });

  useEffect(() => {
    setAllData(gettingLocalStorageData());
  }, []);

  const handlingEnterData = (e) => {
    const {name,value} = e.target;
    setContact({ ...contact, [name]: value }); 
  };
  
  const HandleNameValidate =()=>{
    let usernamepattern =  /^[a-zA-Z ]{3,30}$/;
    if(usernamepattern.test(contact.name)){
      setNamevalidate("Valid name");
    }else{
      setNamevalidate("Enter Valid name");
    }
  }

  const HandleEmailValidate =()=>{
    let userEmailPattern =  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(userEmailPattern.test(contact.email)){
      setEmailvalidate("Valid Email");
    }else{
      setEmailvalidate("Enter Valid Email");
    }
  }
  const HandleMobileNumberValidate =()=>{
    let userMobileNumberPattern =  /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if(userMobileNumberPattern.test(contact.mob)){
      setMobileNoValidate("Valid number");
    }else{
      setMobileNoValidate("Enter Valid number");
    }
  }

  const HandlePasswordValidate =()=>{
    let userPasswordPattern =  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    if(userPasswordPattern.test(contact.psw)){
      setPasswordValidate("Valid password");
    }else{
      setPasswordValidate("Enter Valid password");
    }
  }
  
  const HandleRepeatPasswordValidate =()=>{
    let userRepeatPasswordPattern =  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    if(userRepeatPasswordPattern.test(contact.psw_repeat)){
      setrepeatPaswordValidate("");
    }else{
      setrepeatPaswordValidate("");
    }
    if(contact.psw ===contact.psw_repeat ){
      setmatchPassword("Match Password")
      ColorRef.current.style.color="green";
    }else{
      setmatchPassword("Not Match Password")
    }
  }
  
  const handleSubmit = (e) => {

    e.preventDefault();
    const newRecord = { ...contact, id: new Date().getTime().toString() };
    setAllData([...allData, newRecord]);

    let docs = localStorage.getItem("contacts");
    if (docs !== null) {
      let docArray = JSON.parse(docs) || [];
      docArray = [...docArray, newRecord];
      localStorage.setItem("contacts", JSON.stringify(docArray));

    // function getdata(key, value){
    //     localStorage.setItem(key,value);
    // }
    // getdata("contacts", JSON.stringify(docArray));

    } else {
      let docArray = [newRecord];
      localStorage.setItem("contacts", JSON.stringify(docArray));
    }
    setContact({
      name: "",
      email: "",
      mob: "",
      psw: "",
      psw_repeat: "",
    });
    alert("signup is successful...");
    navigate("/");
  };

  const HandleCross = () =>{
    setCross(!cross);
    navigate("/");
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
        {cross && 
        <div className="container">
          <h1 className="text-center">Sign Up</h1><img src={CrossIcon} alt="CrossIcon" className="cross" onClick={HandleCross}/>
          <p className="text-center">
            Please fill in this form to create an account.
          </p>
          <hr />
          <span className="validate1">{namevalidate}</span>
          <label htmlFor="email">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={contact.name}
            onChange={handlingEnterData}
            onKeyUp={HandleNameValidate}
            autoComplete="off"
            required
          />
          
          <span className="validate1">{emailvalidate}</span>
          <label htmlFor="email">
           <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={contact.email}
            onChange={handlingEnterData}
            onKeyUp={HandleEmailValidate}
            autoComplete="off"
            required
          />
           <span className="validate1">{mobileNoValidate}</span>
          <label htmlFor="email">
            <b>Mobile</b>
          </label>
          <input
            type="number"
            placeholder="Enter Mobile"
            name="mob"
            value={contact.mob}
            onChange={handlingEnterData}
            onKeyUp={HandleMobileNumberValidate}
            autoComplete="off"
            required
          />
          <span className="validate1">{passwordValidate}</span>
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={contact.psw}
            name="psw"
            onChange={handlingEnterData}
            onKeyUp={HandlePasswordValidate}
            autoComplete="off"
            required
          />
            {/* <span className="validate1">{repeatPaswordValidate}</span> */}
            <span className="validate1" ref={ColorRef}>{matchPassword}</span>
          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            
            type="password"
            placeholder="Repeat Password"
            value={contact.psw_repeat}
            name="psw_repeat"
            onChange={handlingEnterData}
            onKeyUp={HandleRepeatPasswordValidate}
            autoComplete="off"
            required
          />
          <div className="clearfix text-center">
            <button type="submit" className="signupbtn text-center">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <Link type="button" className="btn btn-outline-primary" to="/">
              Sign In
            </Link>
          </div>
        </div>
      }
      </form> 
    </>
  );
};

export default SignUp;

import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
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
    const handlingEnterData = (e) => {
        const {name,value} = e.target;
        setContact({ ...contact, [name]: value });
    };
    
    useEffect(() => {
      setContact(JSON.parse(localStorage.getItem('userData'))[0]);
      setLoginData(JSON.parse(localStorage.getItem('userData'))[0]);
      setAllData(JSON.parse(localStorage.getItem('contacts')));
    }, [])

    // let index;
    // function findIndex(data,arr){
    //     arr.forEach((el,index)=>{
    //       if(el.email===data){
    //        setId(index);
    //        index=index;
    //       }
    //     })
    // }
    
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(contact);
      // findIndex(loginData.email,allData);
      // setContact(contact);
      // console.log(id,index);
      // const found = allData.find(element => element.email === loginData[0].email);
      // const replaced=allData.map(obj => [loginData].find(o => o.email === obj.email) || obj);
      // localStorage.setItem('userData',JSON.stringify(contact));
      // console.log(replaced);
      // if(replaced){
      //   allData[found.id]=contact;
      //   setAllData(replaced);
      //   // localStorage.setItem('contacts',JSON.stringify(setContact(replaced)));
      // }
      // navigate("/home");
    }
   
    const HandleCross = () =>{
      setCross(!cross);
      navigate("/home");
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="container"> 
          <h1 className="text-center">Update Form</h1><img src={CrossIcon} alt="CrossIcon" className="cross" onClick={HandleCross}/>
          <p className="text-center">
            Please fill in this form to Update.
          </p>
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
            <button  className="signupbtn text-center">
              Update
            </button>
          </div>
        </div>
      </form>
        </>
    )
}

export default Editform;

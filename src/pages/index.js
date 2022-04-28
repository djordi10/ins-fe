import './Home.css';
import axios from "axios";
import React from "react";
import ReactLoading from 'react-loading';
import { BiCheckboxSquare } from "react-icons/bi";

const baseURL = "http://localhost:5000";

export default function Home() {
  const [loading, setLoading] = React.useState(true); //for showing loading
  const [plan, setPlan] = React.useState(null);
  const [detail, setDetail] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${baseURL}/plan`).then((response) => {
      console.log(response.data.data)
      setPlan(response.data.data)
      setDetail([])
    });
  }, []);

  React.useEffect(async() => {
    if(plan){
      setDetail([])
      for(let i = 0; i < plan.length; i++){
        await axios.get(`${baseURL}/detail?id=`+plan[i].plan_id).then((response) => {
          console.log(response.data.data[0])
          setDetail( arr => [...arr, response.data.data[0]]);
        });
      }
    }

  }, [plan]);

  React.useEffect(async() => {
    if(detail){
      setTimeout(
        () => setLoading(false),  // to give loading effect more dramatic
        1000
      );
    }

  }, [detail]);

  if (!plan) return (
    <div className="App">
      <div className="table centered">
        <div className="center"><h1>NO PLAN YET</h1></div>
      </div>
    </div>
  )

  return (
    <div className="App">
    {!loading? (
      <div className="table centered">
        <div className="center"><h1>CHOOSE PLAN</h1></div>
        
        <div className="row">
          <div className="column">
            <ul className="price">
              <li className="header">
                <br />
                <br />
                Features
              </li>
              <li>General</li>
              <li>Specialist</li>
              <li>Physiotherapy</li>
              <li>Dentist</li>
              <li>Chemo</li>
            </ul>
          </div>
          
          {plan.map((item,i)=>
            <div className="column">
              <ul className="price">
                <li className="header">
                  {item.plan_name}
                  <br />
                  <div className="button_cont" align="center">
                  </div>
                </li>
                <li></li><li></li>
                {detail.map((details,i)=>
                  <div>
                    {details.plan_id ==  item.plan_id? (
                      <div>
                        <li>
                          {details.insurance_general == 1? <BiCheckboxSquare color="green" />: <BiCheckboxSquare color="red" /> }
                        </li>
                        <li>
                          {details.insurance_specialist == 1? <BiCheckboxSquare color="green" />: <BiCheckboxSquare color="red" /> }
                        </li>
                        <li>
                          {details.insurance_physiotherapy == 1? <BiCheckboxSquare color="green" />: <BiCheckboxSquare color="red" /> }
                        </li>
                        <li>
                          {details.insurance_dentist == 1? <BiCheckboxSquare color="green" />: <BiCheckboxSquare color="red" /> }
                        </li>
                        <li>
                          {details.insurance_chemo == 1? <BiCheckboxSquare color="green" />: <BiCheckboxSquare color="red" /> }
                        </li>
                    </div>
                    ) : null}
                  </div>
                )}
                <li>
                  <div className="form-check">
                    <label>
                      <input
                        type="radio"
                        name="react-tips"
                        value="option1"
                        checked={true}
                        className="form-check-input"
                      /> {' '} HK$ {item.plan_price} / Month
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          )}

          

        </div>
      </div>
    ) : (
      <div className='container'>
        <div className="centerVetical">
          <ReactLoading type={"cubes"} color="#ddd" height={'10%'} width={'10%'} />
        </div>
      </div>
    )}
  </div>
  );
}

import React, { Fragment, useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
// import{Link} from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import CheckoutSteps from './Checkoutsteps';
ChartJS.register(ArcElement, Tooltip, Legend);

const RadioInput = ({ label, value, checked, setter, className }) => {
  return (
    <label className={className}>
      <input
        type="radio"
        checked={checked == value}
        onChange={() => setter(value)}
        className="in"
      />
      <span className={checked === value ? "selected" : ""}>{label}</span>
    </label>
  );
};

const Form = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
//   const navigate =useNavigate();

  const [question1, setquestion1] = useState();
  const [question2, setquestion2] = useState();
  const [question3, setquestion3] = useState();
  const [question4, setquestion4] = useState();
  const [question5, setquestion5] = useState();
  const [question6, setquestion6] = useState();
  const [question7, setquestion7] = useState();
  const [question8, setquestion8] = useState();
  const [question9, setquestion9] = useState();
  const [question10, setquestion10] = useState();
  const [question11, setquestion11] = useState();
  const [question12, setquestion12] = useState();
  const [responseData, setResponseData] = useState(null);
  const [pieChartData, setPieChartData] = useState({});

  const switchquestion = (Question) => {
    if (Question == "1") {
      document.getElementById("first").classList.add("active");
      document.getElementById("second").classList.remove("active");
      document.getElementById("submit").classList.remove("active");
      document.getElementById("next").classList.add("active");
      document.getElementById("perv").classList.remove("active");
     
    }
    if (Question == "2") {
      document.getElementById("second").classList.add("active");
      document.getElementById("first").classList.remove("active");
      document.getElementById("third").classList.remove("active");
      // document.getElementById("fourth").classList.remove("active");
      // document.getElementById("five").classList.remove("active");
      // document.getElementById("six").classList.remove("active");
      document.getElementById("next").classList.add("active");
      document.getElementById("perv").classList.add("active");
    }
    if (Question == "3") {
      document.getElementById("third").classList.add("active");
      document.getElementById("second").classList.remove("active");
      document.getElementById("fourth").classList.remove("active");
      document.getElementById("next").classList.add("active");
      document.getElementById("perv").classList.add("active");
    }
    if (Question == "4") {
      document.getElementById("fourth").classList.add("active");
      document.getElementById("third").classList.remove("active");
      document.getElementById("five").classList.remove("active");
      document.getElementById("next").classList.add("active");
      document.getElementById("perv").classList.add("active");
    }
    if (Question == 5) {
      document.getElementById("five").classList.add("active");
      document.getElementById("fourth").classList.remove("active");
      document.getElementById("six").classList.remove("active");
      document.getElementById("next").classList.add("active");
      document.getElementById("perv").classList.add("active");
    }
    if (Question == "6") {
      document.getElementById("six").classList.add("active");
      document.getElementById("five").classList.remove("active");
      document.getElementById("next").classList.add("active");
      document.getElementById("perv").classList.add("active");
    }
    if(Question=='7'){
      document.getElementById("seventh").classList.add("active");
      document.getElementById("six").classList.remove("active");
      document.getElementById("eigth").classList.remove("active");
      document.getElementById("perv").classList.remove("active");
    }
    if(Question=='8'){
      document.getElementById("eigth").classList.add("active");
      document.getElementById("seventh").classList.remove("active");
      document.getElementById("nineth").classList.remove("active");
      document.getElementById("perv").classList.add("active");
    }
    if(Question=='9'){
      document.getElementById("nineth").classList.add("active");
      document.getElementById("eigth").classList.remove("active");
      document.getElementById("tenth").classList.remove("active");
    }
    if(Question=='10'){
      document.getElementById("tenth").classList.add("active");
      document.getElementById("nineth").classList.remove("active");
      document.getElementById("eleventh").classList.remove("active");
    }
    if(Question=='11'){
      document.getElementById("eleventh").classList.add("active");
      document.getElementById("tenth").classList.remove("active");
      document.getElementById("tweleth").classList.remove("active");
    }
    if(Question=='12'){
      document.getElementById("tweleth").classList.add("active");
      document.getElementById("eleventh").classList.remove("active");
      document.getElementById("submit").classList.add("active");
      document.getElementById("next").classList.remove("active");
      document.getElementById("perv").classList.remove("active");
    }
  };

  useEffect(() => {
    switchquestion(currentQuestion);
  }, [currentQuestion]);

  const nexthandler = (e) => {
    setCurrentQuestion(currentQuestion + 1);
  };
  const pervhandler = (e) => {
    setCurrentQuestion(currentQuestion - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
      question11,
      question12,
    };
    const result = Object.values(data);
    console.clear();
    console.log(result);

    const formData = new FormData();
    formData.append("output", JSON.stringify(result));

    try {
      const response = await axios.post(
        // "https://carrier-guidance.onrender.com/predict",
        "https://backend-sih-project-5wz7dep6ya-uc.a.run.app/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response from the API
      console.log(response.data);
      setResponseData(response.data);
      const dataArray = [];

      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          dataArray.push({ key, value: response.data[key] });
        }
      }
      const labels = dataArray.map((item) => item.key);
      const values = dataArray.map((item) => item.value);
      // const integerValues = values.map((value) => +value.toFixed(0));
      
      console.log(values);
      const pieChart = {
        labels: labels,
        datasets: [
          {
            data:values,
            backgroundColor: ["#00A6B4", "#6800B4","red","yellow","orange"],

            // You can customize the colors
          },
        ],
      };

      setPieChartData(pieChart);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };
  const options = {};

  return (
    <Fragment>
      {responseData ? (
        <div className="response-data">
          <h2>YOUR Result:</h2>
          <pre className="json-container">{JSON.stringify(responseData, null,2).slice(1, -1)}</pre>
          <div className="piechart"><Pie data={pieChartData} options={options}/></div>
          
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
        {currentQuestion>6 ?<CheckoutSteps currentStep={currentQuestion-6}/>:<CheckoutSteps currentStep={currentQuestion} />}
        {currentQuestion>6?<h1> Personality Test</h1>:<h1>Aptitude Test</h1>}
          <div className="questions" id="first">
            <label className="head">
              1: What subjects in school do you enjoy the most?
            </label>
            <div className="options">
              <RadioInput
                label="Mathematics and Science "
                value="7E"
                checked={question1}
                setter={setquestion1}
                className="answer"
              />
              <RadioInput
                label="Physical Education and Sports "
                value="7S"
                checked={question1}
                setter={setquestion1}
                className="answer"
              />
              <RadioInput
                label="Art and Design"
                value="7A"
                checked={question1}
                setter={setquestion1}
                className="answer"
              />
              <RadioInput
                label="Social Studies and Economics"
                value="7B"
                checked={question1}
                setter={setquestion1}
                className="answer"
              />
            </div>
          </div>

          <div className="questions" id="second">
            <label className="head">
              2: What activities do you enjoy outside of school?
            </label>
              <div className="options">
                <RadioInput
                  label="Playing sports "
                  value="8S"
                  checked={question2}
                  setter={setquestion2}
                  className="answer"
                />
                <RadioInput
                  label="Painting or drawing "
                  value="7A"
                  checked={question2}
                  setter={setquestion2}
                  className="answer"
                />
                <RadioInput
                  label="Reading books "
                  value="6A"
                  checked={question2}
                  setter={setquestion2}
                  className="answer"
                />
                <RadioInput
                  label="Building things"
                  value="8E"
                  checked={question2}
                  setter={setquestion2}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="third">
            <label className="head">
              3: Is there a particular field or profession that you find
              fascinating?
            </label>
            
              <div className="options">
                <RadioInput
                  label="Professional Sports and Athletics "
                  value="7S"
                  checked={question3}
                  setter={setquestion3}
                  className="answer"
                />
                <RadioInput
                  label="Data Analysis and Machine Learning"
                  value="7D"
                  checked={question3}
                  setter={setquestion3}
                  className="answer"
                />
                <RadioInput
                  label="Medical Research and Healthcare Innovation"
                  value="7H"
                  checked={question3}
                  setter={setquestion3}
                  className="answer"
                />
                <RadioInput
                  label="Entrepreneurship and Business Development"
                  value="7B"
                  checked={question3}
                  setter={setquestion3}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="fourth">
            <label className="head">
              4: Have you ever thought about what kind of problems in the world
              you'd like to solve?
            </label>
            
              <div className="options">
                <RadioInput
                  label="Advancing Technology for Education and Learning"
                  value="7T"
                  checked={question4}
                  setter={setquestion4}
                  className="answer"
                />
                <RadioInput
                  label="Improving Healthcare Access and Treatment"
                  value="7H"
                  checked={question4}
                  setter={setquestion4}
                  className="answer"
                />
                <RadioInput
                  label="Innovating Solutions for Global Poverty and Inequality"
                  value="7C"
                  checked={question4}
                  setter={setquestion4}
                  className="answer"
                />
                <RadioInput
                  label="Designing Sustainable Infrastructure for Growing Cities"
                  value="7E"
                  checked={question4}
                  setter={setquestion4}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="five">
            <label className="head">
              5: Which of the following options aligns most with your interests?
            </label>
              <div className="options">
                <RadioInput
                  label="Analyzing complex data sets and finding patterns"
                  value="7D"
                  checked={question5}
                  setter={setquestion5}
                  className="answer"
                />
                <RadioInput
                  label="Designing and building innovative products or technologies"
                  value="8E"
                  checked={question5}
                  setter={setquestion5}
                  className="answer"
                />
                <RadioInput
                  label="Providing care and support to individuals in need"
                  value="7H"
                  checked={question5}
                  setter={setquestion5}
                  className="answer"
                />
                <RadioInput
                  label="Creating and performing artistic works"
                  value="7A"
                  checked={question5}
                  setter={setquestion5}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="six">
            <label className="head">
              6: When faced with a problem, how do you like to approach it?
            </label>
              <div className="options">
                <RadioInput
                  label="Analyzing data and facts to find a logical solution"
                  value="7D"
                  checked={question6}
                  setter={setquestion6}
                  className="answer"
                />
                <RadioInput
                  label="Talking to others and getting different perspectives"
                  value="8C"
                  checked={question6}
                  setter={setquestion6}
                  className="answer"
                />
                <RadioInput
                  label="Getting creative and trying new approaches"
                  value="7A"
                  checked={question6}
                  setter={setquestion6}
                  className="answer"
                />
                <RadioInput
                  label="Using technology or tools to find solutions"
                  value="8E"
                  checked={question6}
                  setter={setquestion6}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="seventh">
            <label className="head">
              1: Are you inclined towards expressing yourself through art or creative outlets?
            </label>
            <div className="options">
              <RadioInput
                label="Yes, I'm drawn to various forms of artistic expression."
                value="8A"
                checked={question7}
                setter={setquestion7}
                className="answer"
              />
              <RadioInput
                label="I appreciate the power of visual communication."
                value="7A"
                checked={question7}
                setter={setquestion7}
                className="answer"
              />
              <RadioInput
                label="I find joy in creating music or visual arts."
                value="6A"
                checked={question7}
                setter={setquestion7}
                className="answer"
              />
              <RadioInput
                label="I prefer analyzing and interpreting data."
                value="7D"
                checked={question7}
                setter={setquestion7}
                className="answer"
              />
            </div>
          </div>

          <div className="questions" id="eigth">
            <label className="head">
              2:Are you interested in upholding justice and working towards a fair society?
            </label>
              <div className="options">
                <RadioInput
                  label="Yes, I'm passionate about advocating for justice and fairness."
                  value="7L"
                  checked={question8}
                  setter={setquestion8}
                  className="answer"
                />
                <RadioInput
                  label="I find fulfillment in defending the rights of others."
                  value="6L"
                  checked={question8}
                  setter={setquestion8}
                  className="answer"
                />
                <RadioInput
                  label="I'm dedicated to making a positive impact in my community."
                  value="7C"
                  checked={question8}
                  setter={setquestion8}
                  className="answer"
                />
                <RadioInput
                  label="I prefer working with numbers and data analysis."
                  value="7D"
                  checked={question8}
                  setter={setquestion8}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="nineth">
            <label className="head">
              3:Are you drawn to solving complex problems and designing innovative solutions?
            </label>
            
              <div className="options">
                <RadioInput
                  label="Yes, I love tackling technical challenges! "
                  value="7E"
                  checked={question9}
                  setter={setquestion9}
                  className="answer"
                />
                <RadioInput
                  label="I prefer exploring the intricacies of the human body."
                  value="7H"
                  checked={question9}
                  setter={setquestion9}
                  className="answer"
                />
                <RadioInput
                  label="I enjoy researching and uncovering new knowledge."
                  value="7R"
                  checked={question9}
                  setter={setquestion9}
                  className="answer"
                />
                <RadioInput
                  label="I find joy in analyzing data and extracting insights."
                  value="7D"
                  checked={question9}
                  setter={setquestion9}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="tenth">
            <label className="head">
              4: Do you have a strong desire to inspire and educate others?
            </label>
            
              <div className="options">
                <RadioInput
                  label="Absolutely, I love sharing knowledge and insights!"
                  value="7T"
                  checked={question10}
                  setter={setquestion10}
                  className="answer"
                />
                <RadioInput
                  label=" I'm passionate about guiding individuals towards their goals."
                  value="7C"
                  checked={question10}
                  setter={setquestion10}
                  className="answer"
                />
                <RadioInput
                  label="I find fulfillment in coaching and mentoring others."
                  value="7S"
                  checked={question10}
                  setter={setquestion10}
                  className="answer"
                />
                <RadioInput
                  label="I find fulfillment in coaching and mentoring others."
                  value="7B"
                  checked={question10}
                  setter={setquestion10}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="eleventh">
            <label className="head">
              5: Do you enjoy organizing events, managing projects, or leading groups?
            </label>
              <div className="options">
                <RadioInput
                  label="Absolutely, I thrive in leadership roles!"
                  value="7B"
                  checked={question11}
                  setter={setquestion11}
                  className="answer"
                />
                <RadioInput
                  label="I'm more interested in exploring the wonders of the natural world."
                  value="7R"
                  checked={question11}
                  setter={setquestion11}
                  className="answer"
                />
                <RadioInput
                  label="I find joy in analyzing and interpreting data sets."
                  value="7D"
                  checked={question11}
                  setter={setquestion11}
                  className="answer"
                />
                <RadioInput
                  label="I prefer expressing myself through artistic or creative means."
                  value="7A"
                  checked={question11}
                  setter={setquestion11}
                  className="answer"
                />
            </div>
          </div>

          <div className="questions" id="tweleth">
            <label className="head">
              6:Are you naturally curious and enjoy conducting experiments or investigations?
            </label>
              <div className="options">
                <RadioInput
                  label="Yes, I love exploring scientific concepts!"
                  value="7R"
                  checked={question12}
                  setter={setquestion12}
                  className="answer"
                />
                <RadioInput
                  label="I'm more interested in helping people feel their best."
                  value="7H"
                  checked={question12}
                  setter={setquestion12}
                  className="answer"
                />
                <RadioInput
                  label="I find joy in analyzing data and drawing conclusions."
                  value="7D"
                  checked={question12}
                  setter={setquestion12}
                  className="answer"
                />
                <RadioInput
                  label="I prefer expressing myself through creative outlets."
                  value="7A"
                  checked={question12}
                  setter={setquestion12}
                  className="answer"
                />
            </div>
          </div>

          <button type="submit" id="submit">
            submit
          </button>
        </form>
      )}
      <div className="but">
      {currentQuestion==6?<button id="next" onClick={nexthandler}>Next Test</button>:<button id="next" onClick={nexthandler}>
        Next
      </button>}
      <button id="perv" onClick={pervhandler}>
        Back
      </button>
      </div>
    </Fragment>
  );
};

export default Form;

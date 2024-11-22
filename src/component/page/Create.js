import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const API_URL = "https://672ef45a229a881691f16451.mockapi.io/students";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    studentID: "",
  });
  const navigate = useNavigate();

  const nameRef = useRef();
  const ageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age) {
      if (!formData.name) nameRef.current.focus();
      if (!formData.age) ageRef.current.focus();
      alert("모든 항목을 채워주세요!!");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        alert("학생 정보가 정상적으로 추가되었습니다!");
        navigate("/list");
      })
      .catch(() => alert("학생 정보 추가에 실패하였습니다."));
  };

  return (
    <div className="main-container">
      <h1>Create Student</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          ref={nameRef}
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Age</label>
        <input
          ref={ageRef}
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <label>Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label>Student ID</label>
        <input
          type="text"
          value={formData.studentID}
          onChange={(e) =>
            setFormData({ ...formData, studentID: e.target.value })
          }
        />
        <div className="button-container">
          <button type="submit">Create</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/list")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Update.css";

const API_URL = "https://672ef45a229a881691f16451.mockapi.io/students";

const UpdatePage = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    studentID: "",
  });
  const [modifications, setModifications] = useState(0); // 수정 횟수 상태
  const navigate = useNavigate();
  const nameRef = useRef();
  const ageRef = useRef();
  const id = searchParams.get("id");

  // 페이지 로드 시 localStorage에서 modifications 값 가져오기
  useEffect(() => {
    const savedModifications = localStorage.getItem(`modifications_${id}`);
    if (savedModifications) {
      setModifications(parseInt(savedModifications, 10));
    }

    if (id) {
      fetch(`${API_URL}/${id}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch(() => alert("Failed to load student details."));
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 2) {
      alert("이름은 2글자 이상 적어야 합니다.");
      nameRef.current.focus();
      return false;
    }

    if (!formData.age || parseInt(formData.age, 10) < 1) {
      alert("나이는 0보다 커야 합니다.");
      ageRef.current.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        const newModifications = modifications + 1;
        setModifications(newModifications); // 상태 업데이트
        localStorage.setItem(`modifications_${id}`, newModifications); // localStorage에 저장
        alert("수정되었습니다!");
        navigate("/list");
      })
      .catch(() => alert("Failed to update student."));
  };

  const handleCancel = () => {
    navigate("/list");
  };

  return (
    <div className="main-container">
      <h1>Update Student</h1>
      <p>Total Modifications: {modifications}</p> {/* SUBMIT 시 증가 */}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          ref={nameRef}
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <label>Age</label>
        <input
          ref={ageRef}
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
        />
        <label>Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label>Student ID</label>
        <input
          type="text"
          value={formData.studentID}
          onChange={(e) => handleInputChange("studentID", e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="submit-button">
            SUBMIT
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";

const API_URL = "https://672ef45a229a881691f16451.mockapi.io/students";

const ListPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch(() => alert("학생 정보를 불러오는 데 실패했습니다.."));
  }, []);

  const handleDelete = () => {
    const id = prompt("삭제 할 학생의 ID를 입력해주세요.:");
    if (id) {
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert(`학생 ID ${id} 가 정상적으로 삭제되었습니다.`);
          setStudents((prevStudents) =>
            prevStudents.filter((s) => s.id !== id)
          ); // 로컬 상태에서 제거
        })
        .catch(() =>
          alert("삭제에 실패했습니다. 학생 ID를 다시 확인해주세요.")
        );
    }
  };

  return (
    <div className="main-container">
      <h1>Student List</h1>
      <p>학생 정보를 수정하려면 항목을 클릭해주세요!</p>
      <div className="button-container">
        <button onClick={() => navigate("/create")}>CREATE</button>
        <button onClick={handleDelete}>DELETE</button>
      </div>
      <div className="students-container">
        {students.map((student) => (
          <div
            className="student-item"
            key={student.id}
            onClick={() => navigate(`/update?id=${student.id}`)}
          >
            <p>ID: {student.id}</p>
            <p>Name: {student.name}</p>
            <p>Age: {student.age}</p>
            <p>Gender: {student.gender}</p>
            <p>Student ID: {student.studentID}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;

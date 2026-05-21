import { useEffect, useState } from "react";
import api from "./api";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

function App() {

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await api.get("/students");
    setStudents(response.data);
  };

  useEffect(()=>{
    fetchStudents();
  },[]);

  return (
    <div>

      <h1>Axios CRUD Example</h1>

      <StudentForm fetchStudents={fetchStudents} />

      <StudentList
        students={students}
        fetchStudents={fetchStudents}
      />

    </div>
  );
}

export default App;
import { useState } from "react";
import api from "./api";

function StudentForm({ fetchStudents }) {

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/students", {
      name: name,
      course: course
    });

    setName("");
    setCourse("");

    fetchStudents();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e)=>setCourse(e.target.value)}
      />

      <button>Add Student</button>
    </form>
  );
}

export default StudentForm;
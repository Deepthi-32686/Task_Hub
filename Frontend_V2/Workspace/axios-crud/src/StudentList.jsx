import api from "./api";

function StudentList({ students, fetchStudents }) {

  const deleteStudent = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <h2>Student List</h2>

      {students.map((s) => (
        <div key={s.id}>
          {s.name} - {s.course}

          <button onClick={() => deleteStudent(s.id)}>
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}

export default StudentList;
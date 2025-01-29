import { useState, useEffect } from 'react'
import './App.css'
import * as studentService from './services/studentService'
import NavBar from './NavBar'

const App = () => {

  const [students, setStudents] = useState([])
  const [refreshTrigger, setRefreshTrigger] = useState(true)

  const fetchAllStudents = async () => {
    const studentData = await studentService.index()
    setStudents(studentData)
  }

  useEffect(() => {
    fetchAllStudents()
  }, [refreshTrigger])

  const handleDelete = async (id) => {
    await studentService.deleteStudent(id)
    setRefreshTrigger(!refreshTrigger)
  }

  return (
    <>
    <NavBar />
      <h1>Fetch All the Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name}
          <button className='btn btn-danger' onClick={() => handleDelete(student._id)}>X</button>
          </li>
        ))}
      </ul>
      <button className='btn btn-warning'>Submit</button>
    </>
  )
}

export default App
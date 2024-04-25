
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
function Create() {
    const navigate = useNavigate();
    const [department, setDepartment] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/department").then(e => {
            setDepartment(e.data);
            console.log(e.data)
        })
    }, [])

    const FormAdd = useFormik({
        initialValues: {
            name: '',
            age: '',
            salary: '',
            department: {
                id: ''
            }
        },
        onSubmit: (values) => {
            axios.post('http://localhost:8080/api/v1/create', values).then(response => {
                navigate('/')

            })

        }

    })

    return (
        <>
            <div className='container' style={{marginTop:50}}>
                <h2 >Add New Employee</h2>
                <form onSubmit={FormAdd.handleSubmit}>

                    <div className='row'>
                        <div className='col'>
                            <label>Name</label>
                            <input type="text" name="name" id="name" className='form-control' onChange={FormAdd.handleChange} />
                        </div>
                        <div className='col'>
                            <label>Age</label>
                            <input type="number" className='form-control' name="age" id="age" onChange={FormAdd.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label>Salary</label>
                            <input type="number" className='form-control' name="salary" id="salary" onChange={FormAdd.handleChange} />
                        </div>

                    </div>
                    <div className='col'>
                        <label>Department</label>
                        <select name="department.id" defaultValue={1} className='form-select' onChange={FormAdd.handleChange}>
                            {department.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}

                        </select>
                    </div>
                    <br />
                    <div className='md-3'>
                        <button type='submit' className='btn btn-primary'>Save</button>
                        <Link to={'/'} className='ms-3 btn btn-secondary'>Cancel</Link>
                    </div>
                </form>
            </div>

        </>
    )
}
export default Create;

import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
function Update() {
    const navigate = useNavigate();
    const params = useParams();
    const [department, setDepartment] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/department").then(e => {
            setDepartment(e.data);
            console.log(e.data)
        })
    }, [])

    async function getDetailEmployee() {
        const response = await axios.get(`http://localhost:8080/api/v1/${params.id}/info`);
        FormEdit.setValues({ ...response.data });
        console.log(response.data)
    }
    useEffect(() => {
        getDetailEmployee();
    }, [])

    const FormEdit = useFormik({
        initialValues: {
            name: '',
            age: '',
            salary: '',
            department: {
                id: ''
            }
        },
        onSubmit: (values) => {
            axios.put(`http://localhost:8080/api/v1/update/${params.id}`, values).then(response => {
                navigate('/')
            })

        }

    })

    return (
        <>
            <div className='container' style={{marginTop:50}}>
                <h2 >Update Employee</h2>
                <form onSubmit={FormEdit.handleSubmit}>

                    <div className='row'>
                        <div className='col'>
                            <label>Name</label>
                            <input type="text" name="name" id="name" className='form-control' value={FormEdit.values.name} onChange={FormEdit.handleChange} />
                        </div>
                        <div className='col'>
                            <label>Age</label>
                            <input type="number" className='form-control' name="age" id="age" value={FormEdit.values.age} onChange={FormEdit.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label>Salary</label>
                            <input type="number" className='form-control' name="salary" id="salary" value={FormEdit.values.salary} onChange={FormEdit.handleChange} />
                        </div>

                    </div>
                    <div className='col'>
                        <label>Department</label>
                        <select name="department.id" className='form-select' value={FormEdit.values.department} onChange={FormEdit.handleChange}>
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
export default Update;
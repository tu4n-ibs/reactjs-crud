import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Home() {

    const [users, setUser] = useState([]);
    const [page, setPage] = useState();


    async function getUsers() {
        const response = await axios.get(`http://localhost:8080/api/v1/findAll`);
        setUser(response.data.content);
        setPage(response.data.pageable.pageNumber)
        console.log(response.data.pageable.pageNumber)
    }

    useEffect(() => {
        getUsers();
    }, [])

    const pageChange = async (idPage,key) => {
        const response = await axios.get(`http://localhost:8080/api/v1/findAll?page=` + idPage);
        setUser(response.data.content);
        setPage(response.data.pageable.pageNumber)
    }

    async function DeleteUser(id) {
        if (window.confirm("Are you sure?")) {
            const response = await axios.delete(`http://localhost:8080/api/v1/delete/${id}`);
            if (!response.data) {
                await getUsers();
            } else {
                console.error("not deleted");
            }

        }
    }
  

    return (
        <>
            <div className="container" style={{ marginTop: 50 }}>
                <h2 style={{ textAlign: "center" }}>List Employee</h2>
                <div className="row">
                    <div className="col">
                        <Link to={'/create'}>
                            <button className="btn btn-primary">Create</button>
                        </Link>
                    </div>
                    {/* <div className="col">
                        <form>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" onChange={changeSearch()} name="keyword" placeholder="search ..." aria-describedby="button-addon2" />
                                <button class="btn btn-outline-secondary" onClick={() => pageChange(0,keyword)} type="button" id="button-addon2">Search</button>
                            </div>

                        </form>
                    </div> */}
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Salary</th>
                            <th>Department</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(item => (
                            <>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.salary}</td>
                                    <td>{item.department.name}</td>
                                    <td>
                                        <Link to={`/update/${item.id}`} className="btn btn-success">Update</Link>

                                        <Link className="ms-3 btn btn-danger" onClick={() => DeleteUser(item.id)}>Delete</Link>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
                <div className="row">
                    <div className="col">
                        <button onClick={() => pageChange(page - 1)} className="btn btn-light">prev</button>
                        <button onClick={() => pageChange(page + 1)} className="ms-3 btn btn-light">next</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Home;
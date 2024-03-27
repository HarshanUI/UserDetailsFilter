import React, { memo,  useContext } from "react";
import {  useParams } from 'react-router-dom';
import {UserContext} from './../../UserContext';
import { Table } from 'react-bootstrap';

const Todo = () => {
    let { userId } = useParams();
    const { todo } = useContext(UserContext);
    const filterTodo = todo.filter(item=> item.userId == userId && !!item.completed );
    return (
        <div class="header-text"> To Do List Table
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>UserId</th>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
            {filterTodo.map((value, index)=>{
            return(
                <tr key={index}>
                <td>{value.userId}</td>
                <td>{value.id}</td>
                <td>{value.title}</td>
            </tr> 
            );
        })}
            </tbody>
        </Table>
    </div>
    )
}
export default memo(Todo)
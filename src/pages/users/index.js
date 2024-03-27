import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { Table, Button, Nav, Modal, ModalFooter } from 'react-bootstrap';
import { UserContext } from './../../UserContext';
import UIPagination from '../../components/UIPagination';
import sortArrow from '../../images/sortArrow.jpg';

const Users = () => {
    const { users, setUserDetails } = useContext(UserContext);
    const [edit, setEdit] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [searchPharse, setSearchPharse] = useState('');
    const [sorted, setSorted] = useState({sorted: "name", reversed: false});

    const sortById = () => {
        const usersCopy = [...users];
        usersCopy.sort((a,b) => {
           if(sorted.reversed) {
               return a.id - b.id;
           }
           return b.id - a.id;
        });
        setUserDetails(usersCopy);
        setSorted({reversed: true});
    }

    const sortByName = () => {
        setSorted({sorted: "name", reversed: false});
        const usersCopy = [...users];
        console.log('--clicktest');
        usersCopy.sort((userA,userB) => {
           if(sorted.reversed) {
               return userB.name.localeCompare(userA.name);
           }
           return userA.name.localeCompare(userB.name);
        });
        setUserDetails(usersCopy);
        setSorted({reversed: true});
    }

    const handleSearch = (event) => {
        const matchedUsers = users.filter((item)=>{
            return (item.name).toLowerCase().includes(event.target.value.toLowerCase())
        });
        setUserDetails(matchedUsers);
        setSearchPharse(event.target.value);

    };

    const handleDelete = (index) => {
        setUserDetails(users.filter((v, i) => i !== index));
    }

    const handleEdit = (e) => {
        setEdit(old => {
            return {
                ...old,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleupdate = function (id) {
        const data = users.map(item => (item.id === id ? Object.assign({}, item, { ...edit }) : item))
        setUserDetails(data)
        setEdit({})
    }

    const getFromTo = (activePagevalue) => {
        if (activePagevalue > 1) {
            return [activePagevalue * 5 - 5, activePagevalue * 5] // 5 , 10 \\10 , 15 //15 , 20
        } else {
            return [0, 5]
        }
    }

    const pagination = (activePagevalue) => {
        const data = getFromTo(activePagevalue)
        return users && users.slice(data[0], data[1]);
    }

    const userLength = users.length / 5
    console.log(userLength)
    return (
        <>
        <div className="header-text"> Users Table
          <span className="search">
            <input id="search" type="text" placeholder="search with name" value = {searchPharse} onChange={handleSearch} />
        </span>
                <Table striped bordered hover> 
                    <thead>
                        <tr>
                            <th onClick={sortById}>Id
                            <img src={sortArrow} class="width-15" alt=""/>
                            </th>
                            <th onClick={sortByName}>Name
                            <img src={sortArrow} class="width-15" alt=""/>
                            </th>
                            <th >Email</th>
                            <th >City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagination(activePage) && pagination(activePage).map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.address.city}</td>
                                    <td>
                                    <Button variant="outline-primary" onClick={() => setEdit(value)}>Edit</Button> <Button variant="outline-danger" onClick={(e) => handleDelete(index, e)}>Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <UIPagination total={userLength} active={activePage} setActivePage={setActivePage} />
                {/* modal-popup starts */}
                <Modal
                    size="lg"
                    show={!!edit && Object.keys(edit).length}
                    onHide={() => setEdit(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg" class="header-text">
                            Edit the below data
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>city</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input name="name" value={edit.name} onChange={handleEdit} /></td>
                                    <td>  <input name="email" value={edit.email} onChange={handleEdit} /></td>
                                    <td><input name="city" value={edit.address && edit.address.city} onChange={handleEdit} /></td>
                                    <td>
                                        <Button variant="outline-primary" onClick={() => handleupdate(edit.id)}>Update</Button>
                                    </td>
                                </tr>
                            </tbody>

                        </Table>

                    </Modal.Body>
                </Modal>
            </div>
            </>
    )
}

export default memo(Users)
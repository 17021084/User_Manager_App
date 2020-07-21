import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import "./ContentComponent.css"
import 'antd/dist/antd.css';
import { Table, Space, Form, Input, Button, Spin, Modal, Popconfirm } from 'antd';

ContentComponent.propTypes = {
    search: PropTypes.func,
    data: PropTypes.array
};



function ContentComponent(props) {
    const { search, deleteUser, modifyUser, addUser, data, loading } = props;

    const [searchValue, setSearchValue] = useState("");
    const typingTimeOut = useRef(null);

    const onChangeSearchInput = event => setSearchValue(event.target.value);

    useEffect(() => {
        //Debounce
        if (typingTimeOut.current) {
            clearInterval(typingTimeOut.current);
        }
        typingTimeOut.current = setTimeout(() => {
            search(searchValue);
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);


    const [addUserModal, setAddUserModal] = useState(false);
    const [formAddUser, setFormAddUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const onChangeAddUserModal = event => {
        setFormAddUser({
            ...formAddUser,
            [event.target.name]: event.target.value
        });
    }

    const handleAddUserModalOk = () => {
        setAddUserModal(false);
        addUser(formAddUser);
    }

    const [modifyUserModal, setModifyUserModal] = useState(false);
    const [formModifyUser, setFormModifyUser] = useState({});
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },

        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">

                    <a onClick={() => onClickModifyUser(record)}> Modify </a>

                    <Popconfirm
                        title="Are you sure delete this User ?? "
                        onConfirm={() => onClickDeleteUser(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a> Delete </a>
                    </Popconfirm>


                </Space>
            ),
        },

    ];

    const onChangeModifyUserModal = event => {
        setFormModifyUser({
            ...formModifyUser,
            [event.target.name]: event.target.value
        });
    }


    const onClickModifyUser = user => {
        setFormModifyUser(user);
        setModifyUserModal(true);

    }

    const handleModifyUserModalOk = () => {
        modifyUser(formModifyUser);
        setModifyUserModal(false);

    }

    function onClickDeleteUser(id) {

        deleteUser(id)
    }



    return (
        <div className="Content">
            <div className="function">
                <Form.Item
                    className="form"
                    label="Search"
                    name="search"
                >
                    <Input
                        className="search"
                        onChange={onChangeSearchInput}
                        value={searchValue}
                    />
                </Form.Item>
                <Button className="add" type="primary" onClick={() => { setAddUserModal(true) }} > add new  </Button>
            </div>

            {loading ? (<Spin className="spin" size="large" />) :
                (<Table columns={columns}
                    dataSource={data}
                    pagination={{
                    }}
                />)

            }



            {/* Add user modal  */}
            <Modal
                title="Add User "
                visible={addUserModal}
                onOk={handleAddUserModalOk}
                onCancel={() => { setAddUserModal(false) }}
            >
                <form>
                    <h3>Name :</h3>
                    <Input name='name' value={formAddUser.name} onChange={onChangeAddUserModal} />

                    <h3>Email :</h3>
                    <Input name='email' value={formAddUser.email} onChange={onChangeAddUserModal} />

                    <h3>Phone :</h3>
                    <Input name='phone' value={formAddUser.phone} onChange={onChangeAddUserModal} />
                    <h3>Address :</h3>
                    <Input name='address' value={formAddUser.address} onChange={onChangeAddUserModal} />

                </form>
            </Modal>


            {/* Modify user modal  */}
            <Modal
                title="Modify User"
                visible={modifyUserModal}
                onOk={handleModifyUserModalOk}
                onCancel={() => { setModifyUserModal(false) }}
            >
                <form>
                    <h3>Name :</h3>
                    <Input name='name' value={formModifyUser.name} onChange={onChangeModifyUserModal} />

                    <h3>Email :</h3>
                    <Input name='email' value={formModifyUser.email} onChange={onChangeModifyUserModal} />

                    <h3>Phone :</h3>
                    <Input name='phone' value={formModifyUser.phone} onChange={onChangeModifyUserModal} />
                    <h3>Address :</h3>
                    <Input name='address' value={formModifyUser.address} onChange={onChangeModifyUserModal} />


                </form>
            </Modal>

        </div>
    );
}

export default ContentComponent;
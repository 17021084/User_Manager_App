import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './UsersContainer.css'
import { Layout, notification } from 'antd';
import SiderComponent from '../../components/SiderComponent';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import ContentComponent from '../../components/ContentComponent';
import Axios from 'axios';
import { renameKey, transformArray } from '../../utils/convertData';
const { Header, Footer, Sider, Content } = Layout;

const UserAPI = Axios.create({
    baseURL: 'http://localhost:8080/api/users',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    }
});


function UsersContainer(props) {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UserAPI.get("/")
            .then((res) => {
                let newArray = transformArray(res.data.data);
                setData(newArray);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, []);




    function search(value) {
        setLoading(true)
        setTimeout(() => {
            UserAPI.post("/filter", {
                searchTerm: value
            })
                .then((res) => {
                    let newArray = transformArray(res.data.data);
                    setData(newArray);
                    setLoading(false);
                })
                .catch(error => console.log(error));
        }, 200)
    }

    function deleteUser(id) {
        setLoading(true);
        UserAPI.delete(`/${id}`)
            .then((res) => {
                console.log(res.data.message);
                notification.success({
                    message: 'Delete Success',
                    description: res.data.message,
                    placement: 'bottomRight',
                    duration: 3,
                });
                UserAPI.get("/")
                    .then((res) => {
                        let newArray = transformArray(res.data.data);
                        setData(newArray);
                        setLoading(false);
                    })
                    .catch(error => console.log(error));

            })
            .catch(error => {
                console.log(error);
                notification.error({
                    message: "Ops Delete Fail",
                    description: error,
                    placement: 'bottomRight',
                    duration: 5,
                });
            });

    }
    function modifyUser(user) {
        setLoading(true);
        const newUser = renameKey(user, 'key', 'id');
        UserAPI.put('/', newUser)
            .then(res => {
                notification.success({
                    message: 'Put User Success',
                    description: res.data.message,
                    placement: 'bottomRight',
                    duration: 3,
                });

                UserAPI.get("/")
                    .then((res) => {
                        let newArray = transformArray(res.data.data);
                        setData(newArray);
                        setLoading(false);
                    })
                    .catch(error => console.log(error));

            }).catch(error => {
                console.log(error);
                notification.error({
                    message: "Ops Modify Fail",
                    description: error,
                    placement: 'bottomRight',
                    duration: 5,
                });
            });

    }



    function addUser(user) {
        UserAPI.post('/', user)
            .then(res => {
                notification.success({
                    message: 'Add User Success',
                    description: res.data.message,
                    placement: 'bottomRight',
                    duration: 3,
                });

                UserAPI.get("/")
                    .then((res) => {
                        let newArray = transformArray(res.data.data);
                        setData(newArray);
                        setLoading(false);
                    })
                    .catch(error => console.log(error));

            }).catch(error => {
                console.log(error);
                notification.error({
                    message: "Ops Add Fail",
                    description: error,
                    placement: 'bottomRight',
                    duration: 5,
                });
            });
    }


    return (
        <div>
            <Layout>
                <Header className="Header"> <HeaderComponent />  </Header>
                <Layout>
                    <Sider className="Sider">  <SiderComponent /> </Sider>
                    <Content className="Content">
                        <ContentComponent search={search} deleteUser={deleteUser}
                            modifyUser={modifyUser} addUser={addUser}
                            data={data} loading={loading}
                        />
                    </Content>

                </Layout>
                <Footer className="Footer">  <FooterComponent /> </Footer>
            </Layout>
        </div>
    );
}

export default UsersContainer;
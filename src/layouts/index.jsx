import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Layout, Menu, Input } from 'antd';
import Logo from './logo';

const { Search } = Input;
const { Header, Content, Sider } = Layout;

function Layouts({ children, dashboard, location }){
    const { appList } = dashboard;
    const { query } = location;
    const [appName, setAppName] = useState('');
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        if(query.appName){
            setAppName(query.appName);
        }
    }, []);

    

    const onSelectApp = (app) => {
        setAppName(app.key);
        history.push(`?appName=${app.key}`);
    }

    const filteredList = appList.filter((app) => app.appName.indexOf(filterName) !== -1)

    return (
        <Layout style={{ height: '100%' }}>
            <Header className="header">
                <Logo
                    title={"配置中心"}/>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Search onChange={({ target }) => setFilterName(target.value)}/>
                    <Menu
                        mode="inline"
                        selectedKeys={[appName]}
                        onSelect={onSelectApp}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {
                            filteredList.map(app => (
                                <Menu.Item key={app.appName} value={app.appName}>{app.appName}</Menu.Item>
                            ))
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: 24 }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default connect(({ 
    dashboard
}) => ({ dashboard }))(Layouts);
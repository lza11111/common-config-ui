import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Divider, Table, Button, Tooltip, message, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateModal from './update-modal';
import styles from './index.less';

const { Search } = Input;

function app({ dashboard, location, dispatch, loading }) {
    const { configList } = dashboard;
    const { query } = location;
    const [modalData, setModalData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [filterName, setFilterName] = useState('');

    const openModal = (data) => {
        setModalData(data);
        setModalVisible(true);
    }

    const saveData = (data) => {
        dispatch({
            type: 'dashboard/updateConfig',
            payload: data,
        }).then((res) => {
            if(res.length !== undefined) {
                message.success(`${data.key1}修改成功!`)
            } else {
                message.success(`${data.key1}修改失败!${JSON.stringify(res)}`)
            }
        });
        setModalVisible(false);
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    const columns = [{
        title: 'key',
        dataIndex: 'key1',
    }, {
        title: '描述',
        dataIndex: 'description',
    }, {
        title: '值',
        dataIndex: 'value1',
        render: (text) => (
            <Tooltip title={text}>
                <span className={styles.ellipsis}>{text}</span>
            </Tooltip>
        )
    }, {
        title: '环境',
        dataIndex: 'profile',
    }, {
        title: '标签',
        dataIndex: 'label',
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (_, record) => (
            <Button onClick={() => openModal(record)}>编辑</Button>
        )
    }]
    if (!query.appName) {
        return <div><h1>请选择一个应用</h1></div>
    }

    const filterList = configList.filter((config) => config.key1.indexOf(filterName) !== -1);

    return (
        <div style={{ overflow: 'scroll', height: '100%' }}>
            <h1>应用配置列表</h1>
            <Search onChange={({ target }) => setFilterName(target.value)}/>
            <Divider />
            <Table 
                loading={loading.effects['dashboard/getConfigList']}
                dataSource={filterList} 
                columns={columns} 
                pagination={false} 
                rowKey="id"/>
            <UpdateModal 
                visible={modalVisible} 
                modalData={modalData} 
                onOk={saveData} 
                onCancel={closeModal}/>
        </div>
    )
}

export default connect(({
    dashboard,
    loading
}) => ({ dashboard, loading }))(app);
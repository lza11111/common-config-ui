import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

export default function updateModal({ visible, onOk, onCancel, modalData }) {

    const handleSave = (values) => {
        console.log(values);
        onOk({...values, id: modalData.id});
    }
    console.log(modalData);
    return (
        <Modal
            title="修改配置项"
            visible={visible}
            footer={null}
            onCancel={onCancel}
            destroyOnClose>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                name="basic"
                initialValues={modalData}
                onFinish={handleSave}
            >
                <Form.Item
                    label="应用名称"
                    name="application"
                >
                    <span>{modalData.application}</span>
                </Form.Item>
                <Form.Item
                    label="key"
                    name="key1"
                >
                    <span>{modalData.key1}</span>
                </Form.Item>
                <Form.Item
                    label="环境"
                    name="profile"
                    rules={[{ required: true }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="标签"
                    name="label"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="值"
                    name="value1"
                    rules={[{ required: true }]}
                >
                    <TextArea rows={10}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 18, span: 4 }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
import React, { PureComponent } from 'react';
import { Modal, Input, Select, notification, Form, Row, Col, Radio } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;
class NewWorkers extends PureComponent {
    constructor() {
        super();
        this.state = {
            visible: false,
            confirmLoading: false,
            name: '', //姓名
            phone: '', //联系电话1
            post: '',//职务
            remarks:'',//备注
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    onInputChange = (fields) => (event) => {
        this.setState({
            [fields]: event.target.value,
        })
    }
    onSelectChange = (fields) => (value) => {
        this.setState({
            [fields]: value,
        })
        console.log("ss", value)
    }
    handleOk = () => {
        this.props.form.validateFields((err) => {
            if (!err) {
                console.log('idCardType',this.state.idCardType)
                //this.submit();
            }
        });
    }
    render() {
        const { visible, phone, post,remarks} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (<Modal
            title="新建员工"
            width={400}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
            <Form onSubmit={this.handleOk}>
                <Row>
                    <Col>
                        <span>姓名</span>
                    </Col>
                    <FormItem
                    >
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{ required: true, message: '请输入' }],
                        })(
                            <Input
                                onChange={this.onInputChange('name')}
                                placeholder="请输入"
                                style={{ width: 248 }}
                            />
                        )}
                    </FormItem>
                </Row>
                <Row>
                    <Col>
                        <span>手机号</span>
                    </Col>
                    <FormItem
                    >
                        {getFieldDecorator('phone', {
                            initialValue: phone,
                            rules: [{ required: true, message: '请输入' }],
                        })(
                            <Input
                                onChange={this.onInputChange('phone')}
                                placeholder="请输入"
                                style={{ width: 248 }}
                            />
                        )}
                    </FormItem>

                </Row>
                <Row>
                    <Col span={12}>
                        <Col>
                            <span>职务</span>
                        </Col>
                        <FormItem
                        >
                            {getFieldDecorator('post', {
                                initialValue: post,
                                rules: [{ required: true, message: '请选择！' }],
                            })(
                                <Select onChange={this.onSelectChange('post')} style={{ width: 248 }}>
                                    <Option value="1">男</Option>
                                    <Option value="2">女</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span>备注</span>
                    </Col>
                    <FormItem
                    >
                        {getFieldDecorator('remarks', {
                            initialValue: remarks,
                            rules: [{ required: true, message: '请输入' }],
                        })(
                            <TextArea 
                            autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={this.onInputChange('remarks')}
                                placeholder="请输入"
                                style={{ width: 248 }}
                            />
                        )}
                    </FormItem>

                </Row>
            </Form>
        </Modal>)
    }
}
export default Form.create()(NewWorkers); 
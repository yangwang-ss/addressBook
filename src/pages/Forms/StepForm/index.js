import React, { PureComponent, Fragment } from 'react';
import { Card, Steps,Button,Table,Divider } from 'antd';
import AddRole from '../components/addRole';
import styles from '../base.less';


export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }
  addRoles = () => {
    this.addMembersRef.showModal();
  }
  render() {
    const { location, children } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
    };
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width:200,
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '描述',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '操作',
      key: 'action',
      width:120,
      render: text =><Fragment>
        <a href="javascript:;">删除</a>
        <Divider type="vertical" />
        <a href="">修改</a>
      </Fragment>,

    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
    }];
    return (
      <div className={styles.container2}>
        <div className={styles.flexRow}>
          <div className={styles.titles2}>角色列表</div>
          <div>
              <Button className={styles.YelBtn} onClick={this.addRoles}>添加角色</Button>
          </div>
        </div>
        <Table  pagination={paginationProps} columns={columns} dataSource={data} />
        <AddRole wrappedComponentRef={(e) => this.addMembersRef = e} refresh={this.refresh}/>
      </div>
    );
  }
}

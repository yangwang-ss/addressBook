import React, { PureComponent } from 'react';
import $ from '@/utils/jquery.js'
import NewWork from './components/newWorker'
import NewOrganize from './components/neworgnize'
import zTree from 'zTree';
import styles from './base.less';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  Table
} from 'antd';
//样式文件一定不要忘了引入，不然会没有样式
import 'ztree/css/zTreeStyle/zTreeStyle.css';
const FormItem = Form.Item;
const { Option } = Select;
class BasicForms extends PureComponent {
  state = { visible: false, content: '', assignFlag: '', pageNum: 1, pageSize: 10 }
  componentDidMount() {
    var setting = {
      view: {
        addHoverDom: this.addHoverDom, //当鼠标移动到节点上时，显示用户自定义控件
        removeHoverDom: this.removeHoverDom, //离开节点时的操作
        // showIcon: this.showIconForTree,
        showLine: true,
        fontCss: { color: "#666" }
      },
      //增删改，移动复制
      edit: {
        enable: true, //如果enable为flase，那么树就不能移动了
        showRemoveBtn: true, //是否显示树的删除按钮
        showRenameBtn: true, //是否显示数的重命名按钮
        isSimpleData: true, //数据是否采用简单 Array 格式，默认false
        treeNodeKey: "id",  //在isSimpleData格式下，当前节点id属性
        treeNodeParentKey: "parentId",//在isSimpleData格式下，当前节点的父节点id属性
        showLine: true, //是否显示节点间的连线
        removeTitle: "删除节点",//删除Logo的提示
        renameTitle: "编辑节点",//修改Logo的提示

      },

      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeEditName: this.beforeEditName,
        beforeRemove: this.beforeRemove,
        beforeRename: this.beforeRename,
        onRemove: this.onRemove,
        onRename: this.onRename,
        beforeClick: this.beforeClick,
				onClick: this.onClick
      }
    };
    var zNodes = [
      {
        id: 1, pId: 0, name: "父节点1", children: [
          { id: 11, pId: 1, name: "子节点1" },
          { id: 12, pId: 1, name: "子节点2" }
        ]
      }
    ];
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
  }
  beforeEditName(treeId, treeNode) {
    // className = (className === "dark" ? "":"dark");
    // showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    setTimeout(function () {
      if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
        setTimeout(function () {
          zTree.editName(treeNode);
        }, 0);
      }
    }, 0);
    return false;
  }
  beforeRemove(treeId, treeNode) {
    // className = (className === "dark" ? "":"dark");
    // showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
  }
  onRemove(e, treeId, treeNode) {
    showLog("[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
  }
  beforeRename(treeId, treeNode, newName, isCancel) {
    if (newName.length == 0) {
      setTimeout(function () {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.cancelEditName();
        alert("节点名称不能为空.");
      }, 0);
      return false;
    }
    return true;
  }
  onRename(e, treeId, treeNode, isCancel) {

  }
  showRemoveBtn(treeId, treeNode) {
    alert("2")
    console.log("====", treeNode);
    return treeNode;
  }
  showRenameBtn(treeId, treeNode) {
    //return !treeNode.isLastNode;
    return treeNode;
  }
  showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
      log.get(0).removeChild(log.children("li")[0]);
    }
  }
  getTime() {
    var now = new Date(),
      h = now.getHours(),
      m = now.getMinutes(),
      s = now.getSeconds(),
      ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
  }
  beforeClick(treeId, treeNode, clickFlag) {
   console.log("treeNode",treeNode)
    return (treeNode.click != false);
  }
  onClick(event, treeId, treeNode, clickFlag) {
    console.log("======",treeNode)
  }
  //var newCount = 1;
  addHoverDom=(treeId, treeNode)=> {
    // console.log('=====', treeNode);
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
      + "' title='add node' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", ()=> {
      alert("添加一个节点")
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    
      this.newOrganize();
      // zTree.addNodes(treeNode, {id:(100), pId:treeNode.id, name:"new node"});
      return false;
    });
  }
  removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
  };
  selectAll() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
  }

  showIconForTree(treeId, treeNode) {
    return !treeNode.isParent;
  }
  //change事件
  onInputchange = (event) => {
    this.setState({ content: event.target.value });
  }
  onSelectChange = (value) => {
    this.setState({ assignFlag: value }, () => {
      // this.search();
    });
  }
  refresh = () => {
    const { pageNum, pageSize } = this.state;
    //this.fetchVipData(pageNum,pageSize); // 获取列表信息
  }
  //新增员工
  addMembers = () => {
    this.addMembersRef.showModal();
  }
  //新增组织
  newOrganize = () =>{
    this.addOrganize.showModal();
  }
  render() {


    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '职务',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '手机号',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '注册时间',
      key: 'tags',
      dataIndex: 'tags',

    }, {
      title: '操作',
      key: 'action',
      render: text => <a href="javascript:;">查看</a>,

    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
    };
    return (

      <div className={styles.container}>
        {/* 类名ztree一定要加上，不然也是没有样式 */}
        <div className={styles.slideMenu}>
          <div className={styles.titles}>组织管理</div>
          <ul id='treeDemo' className="ztree"></ul>
        </div>
        <div className={styles.rightTables}>
          <div className={styles.titles}>员工管理</div>

          <Form layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}>
                <FormItem label="姓名/手机号：">
                  <Input onChange={this.onInputchange} placeholder="请输入" />
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="职位：">
                  <Select placeholder="请选择" style={{ width: 200 }} onChange={this.onSelectChange}>
                    <Option value="0">关闭</Option>
                    <Option value="1">运行中</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col md={7} sm={24}>
                <span className={styles.submitButtons}>
                  <Button type="primary" onClick={this.addMembers}>
                    新建员工
              </Button>
                </span>
              </Col>
            </Row>
          </Form>

          <Table pagination={paginationProps} columns={columns} dataSource={data} />
          <NewWork wrappedComponentRef={(e) => this.addMembersRef = e} refresh={this.refresh}></NewWork>
          {/* 新建组织 */}
          <NewOrganize wrappedComponentRef={(e) => this.addOrganize = e} refresh={this.refresh}/>
        </div>
      </div>
    )
  }
}

export default BasicForms;

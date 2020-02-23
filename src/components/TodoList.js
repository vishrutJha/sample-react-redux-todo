import React, { Component } from 'react';
import { connect,} from 'react-redux'

import 'antd/dist/antd.css';
import { Input, Button,List  } from 'antd';

import {
  getInputValueChangeAction, 
  getAddItemAction,
  getDeleteItemAction,
  getRestoreItemAction,
  getInitListAction
} from '../store/createActions'


class TodoList extends Component{

  componentDidMount(){
    // get init data
    this.props.getInitList()
  }
  
  render () {
    const {inputValue, list, dList, inputValueChange, handleAddItem, handleDeleteItem, handleRestoreItem} = this.props
    return (
      <div style={{marginTop:50, marginLeft:50}}>
        <Input 
          placeholder="Todo Info" 
          style={{width:400, marginRight:10}}
          value={inputValue}
          onChange={inputValueChange}
        />
        <Button type="primary" onClick={handleAddItem}>Add</Button>

        <h3>ToDo Items <small>(Click to delete)</small></h3>
        <List
          style={{width:400,marginTop:10}}
          bordered
          dataSource={list}
          renderItem={(item,index) => (<List.Item onClick={() => {handleDeleteItem(index)}}>{item}</List.Item>)}
        />

        <h3>Deleted Items <small>(Click to restore)</small></h3>

        <List
          style={{width:400,marginTop:10}}
          bordered
          dataSource={dList}
          renderItem={(item,index) => (<List.Item onClick={() => {handleRestoreItem(index)}}>{item}</List.Item>)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
    dList: state.dList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitList() {
      const action = getInitListAction()
      dispatch(action)
    },
    handleAddItem() {
      const action = getAddItemAction()
      dispatch(action)
    },
    handleDeleteItem(index) {
      const action = getDeleteItemAction(index)
      dispatch(action)
    },
    handleRestoreItem(index) {
      const action = getRestoreItemAction(index)
      dispatch(action)
    },
    inputValueChange(e) {
      const action = getInputValueChangeAction(e.target.value)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

import React, { Fragment, useState } from 'react';
import './creatingTopicModal.scss';
import { useHistory } from 'react-router';
import { withRouter } from "react-router-dom";
import { gql, useMutation } from '@apollo/react-hooks';
/*
const CREATE_NEW_TOPIC = gql `
  mutation createNewTopic($topicName:String!, $topicType:String!, $topicDesc:String){
    createNewTopic(topicName:$topicName, topicType:$topicType, topicDesc: $topicDesc){
      ok
      error
      token
    }
  }
`
*/

const BOOKTRIPS = gql `
  mutation BookTrips($launchIds:[ID]!){
    bookTrips(launchIds:$launchIds){
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`

function CreatingTopicModal(props){
  //const [createTopic, {data}] = useMutation(CREATE_NEW_TOPIC);
  const [bookTrips, {data}] = useMutation(BOOKTRIPS);
  const [TopicName, setTopicName] = useState("");
  const [TopicType, setTopicType] = useState("");
  const [TopicDesc, setTopicDesc] = useState("");
  const topicTypes = ["Select Category","chatting","calendar", "stockManagement", "financialManagement"];
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    //createTopic({variables : { TopicName, TopicType, TopicDesc }});
    bookTrips({variables : { launchIds : [TopicName] }});
    history.go(0);
  } 
  
  const onChangeTopic = (e) => {
    setTopicName(e.target.value);
  }
  const onChangeDes = (e) => {
    setTopicDesc(e.target.value);
  }
  const handleOptionChange = (e) => {
    setTopicType(topicTypes[e.target.value])
  }
  return (
    <Fragment>
      {props.visible && (
        <div className="modalOverlay">
        <div className="modalWrapper" tabIndex="-1">
          <div className="modalContent">
            <div className="modalHeader">
              <h3 className="modalTitle">새토픽 생성</h3>
              <div className="modalCloser" onClick={props.onClose}><i></i></div>
            </div>
            
            {/* Creating Topic Model Widget*/}
            <div className="sidebar-widget certificate-widget">
              <div className="widget-content">
                <div className="content">
                현재 apollo tutorial의 final 서버 사용으로, TopicName에 87~106 숫자만 받아 true로 바꾸는 것으로 대체
                  {/* Form */}
                  <div className="styled-form">
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                          <input type="text" name="topicName" onChange={onChangeTopic} value={TopicName} placeholder="New Topic Name" required />
                      </div>
                      <div className="form-group">
                        <select className="custom-select-box" id="ui-id-1" onChange={handleOptionChange}>
                          <option value={0}>Select Category</option>
                          <option value={1}>채팅</option>
                          <option value={2}>달력</option>
                          <option value={3}>재고관리</option>
                          <option value={4}>재무관리</option>
                        </select>
                        
                       
                      </div>
                      <div className="form-group">
                        <input type="text" name="description" onChange={onChangeDes} value={TopicDesc} placeholder="Description" />
                      </div>
                      
                      <div className="form-group text-center">
                        <button type="submit" className="theme-btn btn-style-two"><span className="txt">생성하기</span></button>
                      </div>
                    </form>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </Fragment>
  )
}

export default withRouter(CreatingTopicModal);

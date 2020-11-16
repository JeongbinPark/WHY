import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalPortal from '../../../utils/ModalPortal';
import CreateTopicModal from "./CreatingTopicModal";
import { getTopicList } from "../../../../_actions/topicAction";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
/*
const GET_TOPICLIST = gql `
  query {
    topics {
      id
      name
    }
  }
`
*/
const GET_LAUNCHES = gql `
  query {
    launches{
      launches{
       id
       mission{
         name
       }
       isBooked
      }
    }
  }
`

function TopicListWidget(props) {
    
  const title = props.title;
  const [lists, setLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  }
  const handleCloseModal = () => {
    setModalVisible(false);
  }
/*
    const mapList = lists.map(list => 
    <li key={list._id}><a href={`${list.topicName}.html`}><span className="icon flaticon-web-programming"></span>{list.topicName}</a></li>
    )
*/
  return (
      <div className="sidebar-widget categories-widget">
          <div className="widget-content">
              <div className="sidebar-header">
                  <div className="sidebar-title">
                      <h6>{title}</h6>
                  </div>
                  <div className="add-list" onClick={handleOpenModal}><i></i></div>
                  <ModalPortal>
                    <CreateTopicModal visible={modalVisible} onClose={handleCloseModal} topicList={lists}/>
                  </ModalPortal>
              </div>
              <div className="content">
                  <MapList />
                  <a href="category.html" className="all-category">View All Categories</a>
              </div>
      </div>
  </div>
  );
}

export default TopicListWidget;

function MapList() {
  //const { loading, error, data } = useQuery(GET_TOPICLIST);
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  if(loading) return <p>Loading...</p>
  if(error) {
    //console.log(error);
    return <p>Can't get Lists!</p>
  }
  /*
  return (
    <ul>
      {data.topics.map(({id, name}) => (
         <li key={id}><a href={`${name}.html`}><span className="icon flaticon-web-programming"></span>{name}</a></li>
      ))}
    </ul>
  )
  */
 return (
    <ul>
      {data.launches.launches.map(({id, mission, isBooked}) => (
      <li key={id}><a href={`${mission.name}.html`}><span className="icon flaticon-web-programming"></span>{mission.name} ({id}) {isBooked?"true":"false"}</a></li>
      ))}
    </ul>
  )
}
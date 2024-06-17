import React from 'react'
import { useContext } from 'react';
import { MyContext } from '../context';

function ActivityFeed() {
    const { notifications, setNotifications} = useContext(MyContext);
    return (
        <div>
          {console.log(notifications,"notification")}
          {notifications.map((notification, index) => (
          <div key={notification._id || index}>
            <p>{notification.message} - {new Date(notification.timestamp).toLocaleString()}</p>
            
          </div>
        ))}
        </div>
    )
}

export default ActivityFeed

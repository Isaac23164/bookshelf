import React from 'react';

const User = (props) => {
    let myuser = props.user_reducer.login?.user;    
    return (
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png" />
            </div>
            <div className="nfo">
                <div><span>Name:</span> {myuser?.name}</div>
                <div><span>Last Name:</span> {myuser?.lastname}</div>
                <div><span>Email:</span> {myuser?.email}</div>
            </div>
            
        </div>
    );
};

export default User;
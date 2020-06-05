import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux'

const SideNavItems = ({user_reducer}) => {

    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Profile',
            link: '/user',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'sign-in',
            text: 'Login',
            link: '/login',
            restricted: false,
            exclude: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Reviews',
            link: '/user/user-reviews',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Reviews',
            link: '/user/add',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'sign-out',
            text: 'Logout',
            link: '/user/logout',
            restricted: true
        }
    ]
    //className={item.type}
    const element = (item, i) => (
        
        <div key={i} style={{ padding:'10px' }}>
            <Link to={item.link} style={{color: '#fff', background: '#242424'}}>
                <FontAwesome name={item.icon} style={{padding: '0 5px 0 0'}}/>
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        user_reducer.login ?
            items.map((item, i) => {
                if (user_reducer.login.isAuth) {
                    return !item.exclude ? element(item, i) : null
                } else {
                    return !item.restricted ? element(item, i) : null
                }

            })
        :
            items.map((item, i) => {
                return !item.restricted || item.exclude ? element(item, i) : null
            })
    )

    return (
        <div>
            {showItems()}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(SideNavItems)
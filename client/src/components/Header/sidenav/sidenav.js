import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sidenav_items';

const SNav = (props) => {
    return (
        <SideNav 
            showNav={props.showNav} 
            onHideNav={props.onHideNav}
            navStyle={{
                background: '#242424',
                maxWidth: '220px',
                color: '#fff'
            }}
        >
            <SideNavItems />
        </SideNav>
        
    );
};

export default SNav;
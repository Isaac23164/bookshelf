import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getUserPosts } from '../../actions'
import moment from 'moment-js'
import {Link} from 'react-router-dom'

class UserPosts extends Component {

    state = {
        mystate: null
    }

    componentDidMount() {
        this.props.dispatch(getUserPosts(this.props.user_reducer.login?.user._id));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user_reducer.login) {
            if (this.state.mystate !== prevProps.user_reducer.login) {
                this.setState({mystate: prevProps.user_reducer.login});
                this.props.dispatch(getUserPosts(prevProps.user_reducer.login.user._id));

            }
        }

    }


    showUserPosts = (user) => (
     
        Array.isArray(user.userPosts) ?
            user.userPosts.map((item, i) => (
                <tr key={i}>
                    <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                </tr>

            ))
            : null            
        
    )

    render() {
        let user = this.props.user_reducer;
        //console.log(user);
        return (
            <div>
                <div className="user_posts">
                   <h4>Your reviews:</h4>
                   <table>
                       <thead>
                           <tr>
                               <th>Name</th>
                               <th>Author</th>
                               <th>Date</th>
                           </tr>
                       </thead>
                       <tbody>
                           {this.showUserPosts(user)}
                       </tbody>
                   </table>
               </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return {
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(UserPosts)
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getUsers, registerUser} from '../../actions'

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        error: ''
    }

    constructor(props) {
        super(props);
        this.props.dispatch(getUsers());
    }

    handleInputName = (e) => {
        this.setState({name: e.target.value})
    }

    handleInputEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handleInputPassword = (e) => {
        this.setState({password: e.target.value})
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error: ''})
        this.props.dispatch(registerUser({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }, this.props.user_reducer.users));
    }

    showUsers = (user) => (
        user.users ?
            user.users.map((item, i) => (
                <tr key={i}>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                </tr>
            ))
            :null
    )

    render() {
        let user = this.props.user_reducer;
        //console.log(user);
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>
                    <div className="form_element">
                        <input type="text" placeholder="Enter Name" value={this.state.name} onChange={this.handleInputName}/>
                    </div>
                    <div className="form_element">
                        <input type="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleInputEmail}/>
                    </div>
                    <div className="form_element">
                        <input type="password" placeholder="Enter Password 6 letters" value={this.state.password} onChange={this.handleInputPassword}/>
                    </div>
                    <button type="submit">Add User</button>
                    <div className="error">{user.error}</div>
                </form>
                <div className="current_users">
                    <h4>Current Users</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return {
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(Register)
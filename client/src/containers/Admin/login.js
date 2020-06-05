import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../../actions'

class Login extends Component {
    
    state = {
        email: '',
        password: '',
        error: '',
        success: false
        
    }

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
    }

    handleInputeEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handleInputePassword = (e) => {
        this.setState({password: e.target.value})
    }

    submitForm(e) {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user_reducer.login?.isAuth) {
            nextProps.history.push('/user');
        }

        return null;
    }

    render() {
        let user = this.props.user_reducer.login;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Login Here</h2>
                    {/*<span>email:is@sd.com pw:123654</span>*/}
                    <span>Contact me for login</span>
                    <div className="form_element"><input type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputeEmail} /></div>
                    <div className="form_element"><input type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputePassword} /></div>
                    <button type="submit">Log In</button>
                    <div className="error">{
                        user ? <div>{user.message}</div> : null
                    }</div>
                </form>
                
            </div>
        ) 
    }
}

function mapStateToProps(state, ownProps){
    //console.log(ownProps);
    return {
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(Login)
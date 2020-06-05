import React, { Component } from 'react'
import {connect} from 'react-redux'
import {auth_action} from '../actions'

export default function(ComposedClass, reload?){

    class auth extends Component {

        state = {
            loading: reload
        }

        constructor(props) {
            super(props);
            props.dispatch(auth_action());
        }

        // static getDerivedStateFromProps(nextProps, prevState) {
        //
        //     // if (!nextProps.user_reducer.login?.isAuth) {
        //     //     if(reload) {
        //     //       nextProps.history.push('/login');
        //     //     }
        //     //}
        //
        //     return {
        //         loading: false
        //     }
        // }

        componentDidMount() {
            //console.log(this.props);
            if (!this.props.user_reducer.login || !this.props.user_reducer.login.isAuth) {
                this.props.history.push('/login');
            }

            // if (!this.props.user_reducer.login?.isAuth) {
            //     if(reload) {
            //       this.props.history.push('/login');
            //     }
            // }

            this.setState({loading: false});

        }

        render() {
            if (this.state.loading) {
                return <div className="loader">Loading...</div>
            }
            return (
                <ComposedClass {...this.props} user={this.props.user_reducer}/>
            )
        }
    }

    function mapStateToProps(state){
        return {
            user_reducer: state.user_reducer
        }
    }
    
    return connect(mapStateToProps)(auth)
}



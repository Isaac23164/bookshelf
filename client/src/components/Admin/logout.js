import React, {Component} from 'react';
import axios from 'axios'

class Logout extends Component {

    componentDidMount() {
        axios.get(`/api/logout`)
            .then(req => {
                setTimeout(() => {
                    this.setState({user_reducer: ''});
                    this.props.history.push('/');
                    window.location.reload(false);
                }, 2000);

            })

    }

    render() {
        return (
            <div className="logout_container">
                <h1>Good bye</h1>
            </div>
        );
    }
}

export default Logout;


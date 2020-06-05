import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBook, updateBook, clearBook, deleteBook} from '../../actions'
//import book_reducer from "../../reducers/book_reducer";

class EditBook extends PureComponent {

    state = {
        formdata: {
            _id: this.props.match.params.id,
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: 1,
            price: ''
        }
    }

    constructor(props) {
        super(props);
        this.props.dispatch(getBook(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearBook());
    }

    handleInput = (e, name) => {
        let newFormdata = {...this.state.formdata}
        newFormdata[name] = e.target.value;
        this.setState({formdata: newFormdata});
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata));
    }

    deletePost = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log(nextProps);
        let book = nextProps.book_reducer.book || '';
        if (!prevState.formdata.name) {

            return {
                formdata: {
                    _id: book._id || '',
                    name: book.name || '',
                    author: book.author || '',
                    review: book.review || '',
                    pages: book.pages || '',
                    rating: book.rating || '',
                    price: book.price || 0
                }
            }
        }
        return null;

    }

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-reviews')
        }, 2000)
    }

    render() {
        let books = this.props.book_reducer;
        //console.log(books);
        return (
            <div className="rl_container article">
                {
                    books.bookUpdated ?
                        <div className="edit_confirm">
                            Post updated, <Link to={`/books/${books.book._id}`}>
                            View Post
                            </Link>
                        </div>
                        : null
                }
                {
                    books.postDeleted ?
                        <div className="red_tag">
                            Post Deleted {this.redirectUser()}
                        </div>
                        :null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>
                    <div className="form_element">
                        <input type="text" placeholder="Enter Name" value={this.state.formdata.name} onChange={(e) => this.handleInput(e, 'name')} />
                    </div>
                    <div className="form_element">
                        <input type="text" placeholder="Enter Author" value={this.state.formdata.author} onChange={(e) => this.handleInput(e, 'author')} />
                    </div>
                    <textarea value={this.state.formdata.review} onChange={(e) => this.handleInput(e, 'review')} />
                    <div className="form_element">
                        <input type="number" placeholder="Enter Pages" value={this.state.formdata.pages} onChange={(e) => this.handleInput(e, 'pages')} />
                    </div>
                    <div className="form_element">
                        <select value={this.state.formdata.rating} onChange={(e) => this.handleInput(e, 'rating')}>
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input type="number" placeholder="Enter Price" value={this.state.formdata.price} onChange={(e) => this.handleInput(e, 'price')}/>
                    </div>
                    <button type="submit">Update Review</button>
                    <div className="delete_post" onClick={this.deletePost}>
                        <div className="button">Delete Review</div>
                    </div>

                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        book_reducer: state.book_reducer
    }
}

export default connect(mapStateToProps)(EditBook)
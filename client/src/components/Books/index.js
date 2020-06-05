import React, { Component } from 'react'
import {getBookWithReviewer, clearBookWithReviewer} from '../../actions'
import {connect} from 'react-redux'

class BookView extends Component {

    constructor(props) {
        super(props);
        props.dispatch(getBookWithReviewer(this.props.match.params.id));
        
    }

    componentWillUnmount() {
        this.props.dispatch(clearBookWithReviewer());
    }

    renderBook = (books) => {
        if (!books.book || !books.reviewer) return null;
        return (
            <div className="br_container">
                <div className="br_header">
                    <h2>{books.book.name}</h2>
                    <h5>{books.book.author}</h5>
                    <div className="br_reviewer">
                        <span>Review by: </span>{books.reviewer.name} {books.reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {books.book.review}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Pages: </span>{books.book.pages}
                        </div>
                        <div>
                            <span>Price: </span>${books.book.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>{books.book.rating}/5</div>
                    </div>
                </div>
                
            </div>
        )
    }

    render() {
        let books = this.props.book_reducer;
        return (
            <div>
               {this.renderBook(books)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        book_reducer: state.book_reducer
    }
}

export default connect(mapStateToProps)(BookView);
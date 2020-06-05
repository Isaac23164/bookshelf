import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBooks } from '../actions'
import BookItem from '../widgetsUI/book_item'


class HomeContainer extends Component {

    constructor(props) {
        super(props);
        props.dispatch(getBooks(1, 0, 'desc'));
    }

    renderItems = (books) => {
        
        return books ? books.map(item => {
          return <BookItem {...item} key={item._id} />
        })
        : false
    }

    loadmore = () => {
        let count = this.props.book_reducer.list.length;
        this.props.dispatch(getBooks(1, count, 'desc', this.props.book_reducer.list));
    }

    render() {
        return (
            <div>
                {this.renderItems(this.props.book_reducer.list)}
                <div className="loadmore" onClick={this.loadmore}>Load More</div>     
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        book_reducer: state.book_reducer
    }
}

export default connect(mapStateToProps)(HomeContainer)
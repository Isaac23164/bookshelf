import axios from 'axios'

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
) { 
    const req = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                .then(res => {

                    if (list) {
                        return [...list, ...res.data]
                    } else {
                        return res.data;
                    }

                }
                );

    return {
        type: 'GET_BOOKS',
        payload: req
    }

}

export function getBook(id) {
    const req = axios.get(`/api/getBook?id=${id}`)
                .then(res => res.data);

    return {
        type: 'GET_BOOK',
        payload: req
    }
}

export function updateBook(data) {
    //console.log(data);
    const req = axios.post(`/api/book_update`, data)
        .then(function (res) {
            //console.log(res.data);
            return res.data;
        })

    return {
        type: 'UPDATE_BOOK',
        payload: req
    }
}

export function getBookWithReviewer(id) {
    const req = axios.get(`/api/getBook?id=${id}`);
    
    return (dispatch) => {
        req.then(({data}) => {
            let book = data;
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data}) =>{
                let res = {
                    book,
                    reviewer: data
                }

                dispatch({
                    type: 'GET_BOOK_W_REVIEWER',
                    payload: res
                })
                
            })
            
        })
    }
}

export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book: null,
            reviewer: null
        }
    }
}

export function loginUser({email, password}) {

    const req = axios.post('/api/login', {email, password})
                .then(res => res.data);

    return {
        type: 'USER_LOGIN',
        payload: req 
    }
}

export function auth_action() {
    const req = axios.get('/api/auth')
      .then(res => res.data);

    return {
        type: 'USER_AUTH',
        payload: req
    }

}

export function addbook_action(book) {
    
    const req = axios.post('/api/book', book)
      .then(res => res.data);

    return {
        type: 'ADD_BOOK',
        payload: req
    }
}

export function clearNewBook() {
    return {
        type: 'CLEAR_NEWBOOK',
        payload: {}
    }
}

export function getUserPosts(userId) {
    const req = axios.get(`/api/user_posts?user=${userId}`)
                .then(res => res.data);

    return {
        type: 'GET_USER_POSTS',
        payload: req
    }
}

export function deleteBook(id) {
    const req = axios.delete(`/api/deletebook?id=${id}`)
        .then(res => res.data);

    return {
        type: 'DELETE_BOOK',
        payload: req
    }
}

export function clearBook() {
    return {
        type: 'CLEAR_BOOK',
        payload: {
            book: null,
            bookUpdated: false,
            postDeleted: false
        }
    }
}

export function getUsers() {
    const req = axios.get(`/api/users`)
        .then(res => res.data);

    return {
        type: 'GET_USER',
        payload: req
    }
}

export function registerUser(newUser, userList) {
    return axios.post(`/api/register`, newUser)
        .then(res => res.data)
        .then(data => ({
            type: 'USER_REGISTER',
            registered: data.success,
            payload: [...userList, data.user]
        }))
        .catch(error => ({
            type: 'USER_REGISTER',
            error: error.message,
            payload: [...userList]
        }));

}
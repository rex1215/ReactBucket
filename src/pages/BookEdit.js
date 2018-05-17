import React from 'react';
import BookEditor from '../components/BookEditor';
import request, {
  get
} from '../utils/request';

class BookEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Book: null
    };
  }

  componentWillMount() {
    console.log(this.context.router);
    //const BookId = this.context.router.params.id;
    const bookId = 10000;
    get('http://localhost:3000/book/' + bookId)
      .then(res => {
        this.setState({
          book: res
        });
      });
  }

  render() {
    const {
      book
    } = this.state;
    return ({
      book ? <BookEditor editTarget={book}/> : '加载中...'
    });
  }
}

BookEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BookEdit;
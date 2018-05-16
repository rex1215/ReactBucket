import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

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
    fetch('http://localhost:3000/book/' + bookId)
      .then(res => res.json())
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
    return (
      <HomeLayout title="编辑用户">
        {
          book ? <BookEditor editTarget={book}/> : '加载中...'
        }
      </HomeLayout>
    );
  }
}

BookEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BookEdit;
import React from 'react';
import UserEditor from '../components/UserEditor';
import request, {
  get
} from '../utils/request';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    console.log(this.context.router);
    //const userId = this.context.router.params.id;
    const userId = 10000;
    get('http://localhost:3000/user/' + userId)
      .then(res => {
        this.setState({
          user: res
        });
      });
  }

  render() {
    const {
      user
    } = this.state;
    return ({
      user ? <UserEditor editTarget={user}/> : '加载中...'
    });
  }
}

UserEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UserEdit;
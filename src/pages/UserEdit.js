import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';

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
    fetch('http://localhost:3000/user/' + userId)
      .then(res => res.json())
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
    return (
      <HomeLayout title="编辑用户">
        {
          user ? <UserEditor editTarget={user}/> : '加载中...'
        }
      </HomeLayout>
    );
  }
}

UserEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UserEdit;
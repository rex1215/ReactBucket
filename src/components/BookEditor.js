import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from './FormItem';
import AutoComplete from './AutoComplete';

class BookEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendUsers: []
    };
  }

  getRecommendUsers(partialUserId) {
    fetch('http://localhost:3000/user?id_like=' + partialUserId)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 1 && res[0].id === partialUserId) {
          // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
          return;
        }

        // 设置建议列表
        this.setState({
          recommendUsers: res.map((user) => {
            return {
              text: `${user.id}（${user.name}）`,
              value: user.id
            };
          })
        });
      });
  }

  timer = 0;
  handleOwnerIdChange(value) {
    this.props.onFormChange('owner_id', value);
    this.setState({
      recommendUsers: []
    });

    // 使用“节流”的方式进行请求，防止用户输入的过程中过多地发送请求
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (value) {
      // 200毫秒内只会发送1次请求
      this.timer = setTimeout(() => {
        // 真正的请求方法
        this.getRecommendUsers(value);
        this.timer = 0;
      }, 200);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      form: {
        name,
        price,
        owner_id
      },
      formValid,
      editTarget
    } = this.props;
    if (!formValid) {
      alert('请填写正确的信息后重试');
      return;
    }

    let editType = '添加';
    let apiUrl = 'http://localhost:3000/book';
    let method = 'post';
    if (editTarget) {
      editType = '编辑';
      apiUrl += '/' + editTarget.id;
      method = 'put';
    }

    fetch(apiUrl, {
        method,
        body: JSON.stringify({
          name: name.value,
          price: price.value,
          owner_id: owner_id.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          alert(editType + '用户成功');
          this.context.router.push('/book/list');
          return;
        } else {
          alert(editType + '失败');
        }
      })
      .catch((err) => console.error(err));
  }
  componentWillMount() {
    const {
      editTarget,
      setFormValues
    } = this.props;
    if (editTarget) {
      setFormValues(editTarget);
    }
  }
  render() {
    const {
      recommendUsers
    } = this.state;
    const {
      form: {
        name,
        price,
        owner_id
      },
      onFormChange
    } = this.props;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormItem label="书名：" valid={name.valid} error={name.error}>
          <input
            type="text"
            value={name.value}
            onChange={(e) => onFormChange('name', e.target.value)}
          />
        </FormItem>
        <FormItem label="价格：" valid={price.valid} error={price.error}>
          <input
            type="number"
            value={price.value || ''}
            onChange={(e) => onFormChange('price', +e.target.value)}
          />
        </FormItem>
        <FormItem label="所有者：" valid={owner_id.valid} error={owner_id.error}>
          <AutoComplete
            value={owner_id.value ? owner_id.value + '' : ''}
            options={recommendUsers}
            onValueChange={value => this.handleOwnerIdChange(value)}
          />
        </FormItem>
        <br/>
        <input type="submit" value="提交"/>
      </form>
    );
  }
}

// 必须给BookEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
BookEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

BookEditor = formProvider({
  name: {
    defaultValue: '',
    rules: [{
      pattern: function(value) {
        return value.length > 0;
      },
      error: '请输入书名'
    }, {
      pattern: /^.{1,100}$/,
      error: '书名最多100个字符'
    }]
  },
  price: {
    defaultValue: 0,
    rules: [{
      pattern: function(value) {
        return value >= 1 && value <= 100;
      },
      error: '请输入1~100的价格'
    }]
  },
  owner_id: {
    defaultValue: '',
    rules: [{
      pattern: function(value) {
        return !!value;
      },
      error: '请选择用户ID'
    }]
  }
})(BookEditor);

export default BookEditor;
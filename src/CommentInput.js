import React, { Component } from 'react'
import PropTypes from 'prop-types';


class CommentInput extends Component {
    static propTypes={
        onSubmit:PropTypes.func
    }
    constructor(){
        super();
        this.state={
            username:'',
            content:''
        }
    }
    componentWillMount(){
        this._loadUsername()
        this._loadComments()
    }
    componentDidMount(){
        this.textarea.focus()
    }
    handleSubmit () {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username:this.state.username,
                 content:this.state.content,
                 createTime:+new Date()

             })
        }
        this.setState({ content: '' })
    }
    handleUsernameChange(event){
        this.setState({
            username:event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content:event.target.value
        })
    }
    _loadUsername(){
        const username=localStorage.getItem('username');
        if(username){
            this.setState({username})
        }
    }
    _loadComments(){
        let comments=localStorage.getItem('comments')
        if(comments){
            comments=JSON.parse(comments);
            this.setState({comments})
        }
    }
    _saveUsername(username){
        localStorage.setItem('username',username)
    }
    handleUsernameBlur(event){
        this._saveUsername(event.target.value);
    }
    _saveComments(comments){
        localStorage.setItem('comments',JSON.stringify(comments))
    }

    handleSubmitComment(comment){
        if(!comment){
            return;
        }
        if(!comment.username){
            return alert('请输入用户名')
        }
        if(!comment.content){
            return alert('请输入评论内容')
        }
        const comments=this.state.comments
        comments.push(comment)
        this.setState({comments})
        this._saveComments(comments);
    }
    render () {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username} onBlur={this.handleUsernameBlur.bind(this)} onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea  ref={(textarea)=>{this.textarea=textarea}} value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentInput
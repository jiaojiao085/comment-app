import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
class CommentApp extends Component {
    constructor(){
        super()
        this.state={
            comments:[]
        }
    }
    handleSubmitComment (comment) {
        if(!comment){
            return false;
        }
        if(!comment.username){
            return alert('请输入用户名');
        }
        if(!comment.content){
            return alert('请输入评论内容');
        }
        this.state.comments.push(comment);
        this.setState({
            comments:this.state.comments
        })
    }
    handleDeleteComment(index){
        console.log(index)
        const comments=this.state.comments
        comments.splice(index,1)
        this.setState({comments})
        //this._saveComments(comments)
    }
    render() {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList 
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                    />
            </div>
        )
    }
}
export default CommentApp;
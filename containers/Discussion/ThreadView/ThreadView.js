import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CommentHead from '../../../components/DiscussionScreen/CommentHead/CommentHead';
import CommentView from '../../../components/DiscussionScreen/CommentView/CommentView';
import PlusButton from '../../../components/DiscussionScreen/Plus/Plus';
import EditView from '../CommentWindow/CommentWindow';

const data =[
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
    {
        commentCtr: 10,
        authorName:'Chris',
        commentDesc: 'ABC',
    },
    {
        commentCtr: 20,
        authorName:'Li',
        commentDesc: 'DEF',
    },
    {
        commentCtr: 10,
        authorName:'Chetan',
        commentDesc: 'XYZ',
    },
];
export default class ThreadView extends React.Component{

    render(){
        return(
            <View>
                <View>
                    <FlatList
                        data={data}
                        renderItem={({item}) => <CommentView param={item}/>}
                        ListHeaderComponent={CommentHead}
                    />
                </View>
                <EditView
                    ref={editView => this.editView = editView}
                    //inputText={this.state.name}
                    titleTxt={'Comment'}
                    ensureCallback={input => {this.setState({showText : input})}}
                />
                <PlusButton showCommentWindow = {() => this.editView.show()} />
            </View>
        );
    }

    componentDidMount() {
        // fetch results from server. props will have the id of the buzz/event
    }


}
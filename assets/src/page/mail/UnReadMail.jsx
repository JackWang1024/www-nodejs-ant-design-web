import React from 'react';
import Page from '../../framework/page/Page';
const NewMail = React.createClass({
    getInitialState(){
        return {
            /*
             * 修改loading,并以props方式传给Page组件，页面即可切换loading非loading状态。
             * */
            loading: false
        }
    },
    componentDidMount: function () {
    },
    render() {
        return (
            <Page header='auto' loading={this.state.loading}>
                <h5>新邮件</h5>
            </Page>
        );
    }
});

export default NewMail;

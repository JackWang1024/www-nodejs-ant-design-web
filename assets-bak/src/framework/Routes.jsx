import React from 'react';
import {Router, Link} from 'react-router'
import {Menu, Tooltip} from 'antd';
import FAIcon from './faicon/FAIcon';
import createBrowserHistory from 'history/lib/createBrowserHistory'
const browserHistory = createBrowserHistory();
import PubSubMsg from './common/pubsubmsg';
import {getSidebarMenus, getCurrentSidebarMenu} from './SidebarMenu';
import {getHeaderMenus} from './HeaderMenu';
import pageRouts from '../page/RoutesCfg';

/*
 * 根据菜单数据，初始化路由
 * */
const routes = {
    path: '/',
    component: require('./app/App'),
    indexRoute: {
        getComponent: (location, cb) => {require.ensure([], (require) => {cb(null, require('../page/home/Home'));})}
    },
    childRoutes: pageRouts
};
pageRouts.push(
    {path: '/system/settings', getComponent: (location, cb) => {require.ensure([], (require) => {cb(null, require('./settings/SettingsPage'));})}},
    {path: '*', getComponent: (location, cb) => {require.ensure([], (require) => {cb(null, require('./error/Error404'));})}}
);

/*
 for (let i = 0; i < pageRouts.length; i++) {
 let r = {
 path: pageRouts[i].path,
 getComponent: (location, cb) => {
 require.ensure([], (require) => {
 cb(null, require(pageRouts[i].component))
 })
 }
 };
 routes.childRoutes.push(r);
 }*/
/*
 * 监听地址栏改变，通过左侧菜单状态
 * */
browserHistory.listen(function (data) {
    let [headerMenu, headerMenuCurrent] = getHeaderMenus();
    PubSubMsg.publish('header-menu', {
        menu: headerMenu,
        current: headerMenuCurrent
    });
    let menu = getSidebarMenus();
    let currentSidebarMenu = getCurrentSidebarMenu();
    let current = currentSidebarMenu ? currentSidebarMenu.key : '';
    let openKeys = currentSidebarMenu ? currentSidebarMenu.openKeys : [];
    PubSubMsg.publish('sidebar-menu', {
        menu,
        current,
        openKeys
    });
    PubSubMsg.publish('set-header-breadcrumb')
});

export default React.createClass({
    render() {
        return (
            <Router routes={routes} history={browserHistory}/>
        );
    }
});
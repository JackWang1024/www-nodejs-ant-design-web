import React from 'react';
import FAIcon from '../../component/faicon/FAIcon';
import {Link} from 'react-router'
import {Menu, Tooltip} from 'antd';
import headerMenuData from './HeaderMenus'

/*
 * 获取头部菜单构建完成的jsx数据,直接可以用于显示
 * */
export let getHeaderMenus = function () {
    let headerMenuCurrent = getCurrentKey();
    let headerMenu = buildHeaderMenu(headerMenuData);
    return [headerMenu, headerMenuCurrent];
};
/*
 * 获取头部需要设为当前状态的菜单数据.
 * */
export let getCurrentHeaderMenu = function () {
    let headerMenuCurrent = getCurrentKey();
    for (let i = 0; i < headerMenuData.length; i++) {
        if (headerMenuCurrent == headerMenuData[i].key) {
            return headerMenuData[i]
        }
    }
    return null
};
/*
 * 根据地址栏url 获取 头部菜单对应的key
 * */
function getCurrentKey() {
    let pathNames = location.pathname.split('/');
    let headerMenuCurrent = null;
    if (pathNames && pathNames.length > 0) {
        headerMenuCurrent = pathNames[1];
    }
    return headerMenuCurrent
}

/*
 * 创建头部菜单jsx形式数据。
 * */
function buildHeaderMenu(menuData) {
    let menuItems = [];
    for (let i = 0; i < menuData.length; i++) {
        let md = menuData[i];
        menuItems.push(
            <Menu.Item key={md.key}>
                <Link to={md.path}>
                    <FAIcon type={md.icon}/>
                    <span className="admin-header-sys-menu-text">{md.text}</span>
                </Link>
            </Menu.Item>
        );
    }
    return menuItems;
}
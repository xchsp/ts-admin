import * as React from 'react';
import { Menu } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IReduxState } from '../../../redux/types';
import { updateModuleAction } from '../Layout/redux/actions/actions';
import Loadble from './components/SiderLoadble';
import MyIcon from '../../components/MyIcon';

const logo = require('../../../resource/assets/logo.jpg');

const { SubMenu, Item } = Menu;

export interface ISiderProps {
  siderModuleMenu: any[];
  siderSelectedKey: any[];
  collapsed: boolean;
  siderOpenKeys: any[];
  theme: any;
  dispatch: Dispatch;
}

const Sider: React.FunctionComponent<ISiderProps> = (props) => {
  const {
    collapsed,
    theme,
    siderModuleMenu,
    siderSelectedKey,
    siderOpenKeys,
  } = props;
  const siderModuleMenuLen = siderModuleMenu.length;
  const renderMenuItem = (item: any) => {
    // 路由跳转到 配置文件中的 value
    return (
      <Item key={item.name} icon={<MyIcon type='icon-github-fill' />}>
        <Link to={item.path}>
          <span>
            {/* {icon && <Icon type={item.icon} style={{ color: '#08c' }} />} */}
            <span>{item.title}</span>
          </span>
        </Link>
      </Item>
    );
  };

  const renderSubMenu = (item: any) => {
    // console.log('renderSubMenu的name', name)
    return (
      <SubMenu
        key={item.name}
        icon={<MyIcon type='icon-lock' />}
        title={
          <span>
            {/* {icon && <Icon type={item.icon} style={{ color: '#08c' }} />} */}
            <span>{item.title}</span>
          </span>
        }
      >
        {item.children &&
          item.children.map((_item: any) =>
            _item.children && _item.children.length
              ? renderSubMenu(_item)
              : renderMenuItem(_item),
          )}
      </SubMenu>
    );
  };

  const menuOpenchange = (v: any) => {
    console.log('sider按钮展开的回调函数', v);
    const { dispatch } = props;

    dispatch(updateModuleAction({ siderOpenKeys: v }));
  };
  return (
    <>
      <div
        style={{
          height: '50px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        }}
      >
        <img
          src={logo}
          alt='logo'
          style={{
            height: 34,
            width: 34,
          }}
        />
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            // width: '120px',,
            padding: '0 10px',
            marginLeft: '10px',
            backgroundColor: '#ffff88',
            color: '#0070CC',
            display: collapsed ? 'none' : 'block',
          }}
        >
          TS-andmin
        </div>
      </div>
      <Menu
        mode='inline'
        theme={theme}
        // onClick={menuOnClick}
        onOpenChange={menuOpenchange}
        selectedKeys={siderSelectedKey}
        openKeys={siderOpenKeys}
        style={{
          height: '100%',
          overflow: 'auto',
          // paddingTop: 49,
          border: 'none',
          paddingBottom: '80px',
        }}
      >
        {siderModuleMenuLen ? (
          siderModuleMenu.map((item) =>
            item.children && item.children.length
              ? renderSubMenu(item)
              : renderMenuItem(item),
          )
        ) : (
          <Loadble num={7} />
        )}
      </Menu>
    </>
  );
};

const mapStateToProps = (state: IReduxState) => {
  return {
    siderSelectedKey: state.app.siderSelectedKey,
    siderOpenKeys: state.app.siderOpenKeys,
    theme: state.app.theme,
  };
};

export default connect(mapStateToProps)(Sider);

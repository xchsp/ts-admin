import * as React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IReduxState } from '../../../redux/types';
import ResetDB from './components/ResetDB';
import SearchInput from './components/SearchInput';
import FullScreen from './components/FullScreen';
import ModuleMenu from './components/ModuleMenu';
import UserCenter from './components/UserCenter';
import Loadble from './components/RenderLoadble';
import MyIcon from '../../components/MyIcon';
import './index.less';

const logo = require('../../../resource/assets/logo.jpg');

export interface IHeaderProps extends RouteComponentProps {
  collapsed?: boolean;
  toggle: () => void;
  navTabshow: boolean;
  theme: any;
  avatar: string;
  headerCurrentModuleName: string;
  moduleList: any[];
  responsive: boolean;
}

const MyHeader: React.FunctionComponent<IHeaderProps> = (props) => {
  const { moduleList, headerCurrentModuleName, responsive } = props;
  const { theme } = props;
  const HeaderModuleList = moduleList.filter((item: any) => item.leftMenu);
  const moduleListLen = moduleList.length;

  // // 更新左侧的菜单
  const onMenuClick = (e: any) => {
    const { history, location } = props;
    const accesseMenu = props.moduleList;
    const ImoduleList = accesseMenu.filter((item) => {
      return item.leftMenu && item.name === e.key;
    });

    if (location.pathname !== ImoduleList[0].path) {
      history.push(ImoduleList[0].path);
    }
  };

  console.log('Header-render');
  return (
    <div
      style={{
        display: 'flex',
        height: '50px',
        // borderBottom: '1px solid #000',
        zIndex: 999,
        boxShadow: '0px -2px 8px #e0e0e0',
      }}
    >
      <Menu
        theme={theme}
        style={{
          display: 'flex',
          border: 'none',
          width: '180px',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
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
            fontSize: '16px',
            padding: '0 10px',
            marginLeft: '10px',
            backgroundColor: '#ffff88',
            color: '#0070CC',
            // display: responsive ? 'none' : 'block',
          }}
        >
          TS-andmin
        </div>
      </Menu>
      <div
        style={{
          flex: 3,
          minWidth: '200px',
        }}
      >
        {moduleListLen ? (
          <ModuleMenu
            moduleList={HeaderModuleList}
            onMenuClick={onMenuClick}
            headerCurrentModuleName={headerCurrentModuleName}
            theme={theme}
          />
        ) : (
          <Loadble num={5} />
        )}
      </div>
      <Menu
        theme={theme}
        style={{
          flex: 2,
          border: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <SearchInput responsive={responsive} />
          <a href='https://github.com/songtianen'>
            <MyIcon
              type='icon-github-fill'
              style={{
                fontSize: 17,
              }}
            />
          </a>
          <FullScreen />
          <ResetDB responsive={responsive} />
        </div>
      </Menu>
      <div
        style={{
          flex: 1,
          minWidth: '40px',
        }}
      >
        <UserCenter />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IReduxState) => {
  return {
    name: state.app.name,
    theme: state.app.theme,
    avatar: state.app.avatar,
    headerCurrentModuleName: state.app.headerCurrentModuleName,
    moduleList: state.app.moduleList,
  };
};
export default withRouter(connect(mapStateToProps)(MyHeader));

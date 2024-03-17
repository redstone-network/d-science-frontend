import React, {useState} from 'react';
import {Button, Layout, Menu, MenuProps, Typography} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { useAccountState } from '@stores';
const { Text } = Typography;

const {Header, Content} = Layout;

const items = [
  {
    key: '/paper',
    label: `paper`,
  },
  {
    key: '/treasury',
    label: `treasury`,
  },
  {
    key: '/proposals',
    label: `proposals`,
  },
];
const appName = import.meta.env.VITE_APP_NAME


const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {account, setAccount} = useAccountState()

  const path = location.pathname;
  const [current, setCurrent] = useState(path);
  const handleOnClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const getAccounts = async (): Promise<undefined> => {
    const extensions = await web3Enable(appName)

    if (extensions.length === 0) {
      return
    }
    const accounts = await web3Accounts()
    if (accounts.length === 0) {
      return
    }
    const acc = accounts[0].address;
    console.log(acc,acc);
    setAccount(acc);
    return
  }

  return (
    <Layout>
      <Header style={{display: 'flex', alignItems: 'center'}}>
        <Menu
          onClick={handleOnClick}
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          defaultSelectedKeys={['paper']}
          style={{flex: 1, minWidth: 0}}
        >
          {items.map(item => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
        {
          account ?     <Text style={{width: '150px',color: '#fefefe'}} ellipsis>{account}</Text>
           :         <Button onClick={getAccounts} type="primary">connect wallet</Button>

        }
      </Header>
      <Content style={{padding: '35px'}}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;

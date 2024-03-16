import React, {useState} from 'react';
import { Button, Layout, Menu, MenuProps } from 'antd';
import { Outlet, useLocation, useMatches, useNavigate, useRoutes } from "react-router-dom";

const { Header, Content } = Layout;

const items = [
  {
    key: '/paper',
    label: `paper`,
  },
  {
    key: '/treasury',
    label: `treasury`,
  },{
    key: '/proposals',
    label: `proposals`,
  }
]

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [current, setCurrent] = useState(path);
  const handleOnClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
         onClick={handleOnClick}
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          defaultSelectedKeys={['paper']}
          style={{ flex: 1, minWidth: 0 }}
        >
          {items.map(item => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
        <Button type="primary">connect wallet</Button>
      </Header>
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  );
};

export default App;


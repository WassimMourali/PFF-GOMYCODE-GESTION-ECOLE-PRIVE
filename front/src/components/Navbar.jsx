import React from 'react';
import { Layout, Menu, Badge, Dropdown, List, Card } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton'; // Assurez-vous que le chemin est correct

const { Sider } = Layout;
const { SubMenu } = Menu;

// Sample notifications
const notifications = [
  { id: 1, message: "New student registered" },
  { id: 2, message: "Payment received" },
  { id: 3, message: "Class event scheduled" },
];

const Navbar = () => {
  const notificationMenu = (
    <List
      size="small"
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card
            style={{
              width: 300,
              border: '1px solid #f0f0f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
            }}
          >
            {item.message}
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div
          className="logo"
          style={{
            padding: '20px',
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          MyApp
        </div>

        {/* Notification Area */}
        <div
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: '#001529',
          }}
        >
          <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
            <Badge count={notifications.length} style={{ backgroundColor: '#f5222d' }}>
              <BellOutlined style={{ color: 'white', fontSize: '20px' }} />
            </Badge>
          </Dropdown>
        </div>

        {/* Sidebar Menu */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">Tableau du Bord</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            <Link to="/calendar">Calendrier</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Administrations">
            <Menu.Item key="3">
              <Link to="/people/students">Élèves</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/people/teachers">Enseignants</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/people/staff">Administrations</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Classes & Événements">
            <Menu.Item key="6">
              <Link to="/classes">Classes</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/subjects">Matières</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/events">Événements</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/affectation">Affectation</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="10" icon={<CreditCardOutlined />}>
            <Link to="/payments">Payments</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<FileTextOutlined />}>
            <Link to="/reports">Rapports</Link>
          </Menu.Item>
        </Menu>

        {/* Logout Button */}
        <LogoutButton />
      </Sider>
    </Layout>
  );
};

export default Navbar;

import React from 'react';
import {Button, Space, Table, Tag} from 'antd';
import type {TableProps} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'paper-filename',
    dataIndex: 'name',
    key: 'name',
    width: 300,
  },
  {
    title: 'desc',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: 'Action',
    width: 200,
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" icon={<DownloadOutlined />} size="small">
          Download
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const App: React.FC = () => <Table columns={columns} dataSource={data} />;

export default App;

import React from 'react';
import {Button, Space, Table } from 'antd';
import type {TableProps} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import { saveAs } from 'file-saver'
import Axios from 'axios'

export interface DataType {
  id: string;
  name: string;
}
async function downloadFile(
  hash: string,
  name: string
) {
  console.log('sss')
  const res = await Axios({
    baseURL: import.meta.env.VITE_CESS_URL,
    url: `/api/storage/raw/${hash}`,
    method: 'GET',
    responseType: 'blob',
  })
  const blob = new Blob([res.data])
  saveAs(blob, decodeURIComponent(name), { autoBom: true })

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
        <Button type="primary" onClick={() => downloadFile(_.id, _.name)} icon={<DownloadOutlined />} size="small">
          Download
        </Button>
      </Space>
    ),
  },
];

const App: React.FC<{data: DataType[]}> = ({data}: {data: DataType[]}) => {

  return <Table columns={columns} dataSource={data} />;
};

export default App;



import React, { useEffect, useState } from 'react';
import {Space, Table} from 'antd';
import type {TableProps} from 'antd';
import { getProposals, submitVote } from '@apis';
import { useAccountState } from '@stores';

interface DataType {
  proposalId: number;
  orgId: number;
  paymentRequested: string;
  paymentFrequency: string;
  votes: string;
  approveVotes: string;
  denyVotes: string;
  details: string;
}


const Proposals: React.FC = () => {
  const { account } = useAccountState();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<DataType[]>([]);
  const approve =async (record: DataType) => {
    try {
      setLoading(true)
    await submitVote(record.orgId, record.proposalId, 0, account)
    await fetchData();
  } finally {
    setLoading(false)

  }
  }
  const deny =async (record: DataType) => {
    try {
      setLoading(true)
    await submitVote(record.orgId, record.proposalId, 1, account)
    await fetchData();
    } finally {
      setLoading(false)
    }
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Treasury Id',
      dataIndex: 'orgId',
      key: 'orgId',
    },
    {
      title: 'Proposal Id',
      dataIndex: 'proposalId',
      key: 'proposalId',
    },
    {
      title: 'Detail',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Application Funding',
      dataIndex: 'paymentRequested',
      key: 'paymentRequested',
    },
    {
      title: 'Payment Frequency',
      dataIndex: 'paymentFrequency',
      key: 'paymentFrequency',
    },
    {
      title: 'Approve Votes',
      dataIndex: 'approveVotes',
      key: 'approveVotes',
    },
    {
      title: 'Deny Votes',
      dataIndex: 'denyVotes',
      key: 'denyVotes',
    },
    {
      title: 'Total Votes',
      dataIndex: 'votes',
      key: 'votes',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => approve(record)} style={{color: '#1677ff'}}>approve</a> /
          <a onClick={() => deny(record)} style={{color: '#1677ff'}}>deny</a>
        </Space>
      ),
    },
  ];
  const fetchData =async () => {
    try {
      setLoading(true)
      const res = await getProposals();
      setData(res as any);
    }finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
return <Table columns={columns}       loading={loading}
dataSource={data} />
};

export default Proposals;

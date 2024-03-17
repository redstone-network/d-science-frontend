import React, {useEffect, useState} from 'react';
import {Button, message, Empty, Flex, Input, Space, Spin} from 'antd';
import TCard from './Card';
import css from './index.module.css';
import {summon, getOrgs} from '@apis';
import {useAccountState} from '@stores';
import {LoadingOutlined} from '@ant-design/icons';

const Treasury: React.FC = () => {
  const {account} = useAccountState();
  const [orgData, setOrgData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const handleOnClick = async () => {
    try {
      setLoading(true);
      const res = await summon(account, text);
      message.success(`created successfully`);
      setText('');
    } finally {
      setLoading(false);
    }
  };
  async function fetchList() {
    const res: any[] = await getOrgs();
    console.log(res);
    setOrgData(res);
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <Spin
        indicator={<LoadingOutlined style={{fontSize: 24}} spin />}
        spinning={loading}
      >
        <Space>
          <div>treasury name</div>
          <Input
            onChange={e => setText(e.target.value)}
            value={text}
            style={{width: '300px'}}
            placeholder="Treasury name"
          />
          <Button onClick={handleOnClick} type="primary">
            create treasury
          </Button>
        </Space>
        {setOrgData.length ? (
          <Flex wrap="wrap" gap="large" className={css.warp}>
            {orgData.map(item => (
              <TCard key={item.treasuryId} data={item} fetchList={fetchList} />
            ))}
          </Flex>
        ) : (
          <Empty />
        )}
      </Spin>
    </>
  );
};
export default Treasury;

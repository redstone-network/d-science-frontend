import React from 'react';
import {Button, Flex, Input, Space, Tag} from 'antd';
import TCard from './Card';
import css from './index.module.css';

const Treasury: React.FC = () => {
  return (
    <>
      <Space>
        <div>treasury name</div>
        <Input style={{width: '300px'}} placeholder="Basic usage" />
        <Button type="primary">create treasury</Button>
      </Space>
      <Flex wrap="wrap" gap="large" className={css.warp}>
        <TCard />
        <TCard />
        <TCard />
        <TCard />
        <TCard />
        <TCard />
        <TCard />
      </Flex>
    </>
  );
};
export default Treasury;

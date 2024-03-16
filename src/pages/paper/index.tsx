import {FC} from 'react';
import {Button, Flex, Input, Space} from 'antd';
import {SearchOutlined, UploadOutlined} from '@ant-design/icons';
import Table from './Table';
import css from './index.module.css';

const Paper: FC = function () {
  return (
    <div>
      <Flex className={css.header} justify="flex-end">
        <Button
          type="primary"
          shape="round"
          icon={<UploadOutlined />}
          size="large"
        >
          upload your paper
        </Button>
      </Flex>
      <div>
        <Space className={css.search}>
          <Input style={{width: '300px'}} placeholder="Basic usage" />
          <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </Space>
        <Table />
      </div>
    </div>
  );
};

export default Paper;

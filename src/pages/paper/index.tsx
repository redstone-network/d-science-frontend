import {FC, useState} from 'react';
import {Button, Flex, Input, Space, Upload, UploadProps, message} from 'antd';
import {SearchOutlined, UploadOutlined} from '@ant-design/icons';
import PTable, {DataType} from './Table';
import css from './index.module.css';

const Paper: FC = function () {
  const [keyWord, setKeyWord] = useState('');
  const handleOnClick = () => {
    console.log(handleOnClick);
  };
  const list: any = localStorage.getItem('paperList')
    ? JSON.parse(localStorage.getItem('paperList') as any)
    : [];
  const [tableData, settableData] = useState<DataType[]>(list);
  const uploadProps: UploadProps = {
    name: 'file',
    action: import.meta.env.VITE_CESS_URL + 'api/storage/mail3.json',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const response = info.file.response;

        if (response.code == 0) {
          list.push({
            id: response.data,
            name: info.file.name,
          });
          localStorage.setItem('paperList', JSON.stringify(list));
          settableData(list);
          message.success(`${info.file.name} file uploaded successfully`);
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Flex className={css.header} justify="flex-end">
        <Upload {...uploadProps}>
          <Button
            type="primary"
            shape="round"
            icon={<UploadOutlined />}
            size="large"
          >
            upload your paper
          </Button>
        </Upload>
      </Flex>
      <div>
        <Space className={css.search}>
          <Input
            onChange={e => {
              setKeyWord(e.target.value);
            }}
            style={{width: '300px'}}
            placeholder="Search key words"
          />
          <Button
            onClick={handleOnClick}
            type="primary"
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </Space>
        <PTable data={tableData} />
      </div>
    </div>
  );
};

export default Paper;

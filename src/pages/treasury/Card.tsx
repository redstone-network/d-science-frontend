import {Button, Card, Input, Modal, Space} from 'antd';
import {useState} from 'react';
import css from './index.module.css';

const {Meta} = Card;

const TCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Card
        style={{width: '30%', flexShrink: 0}}
        actions={[
          <Button type="link">Donate</Button>,
          <Button type="link">submit proposal</Button>,
        ]}
      >
        <p className={css.info}>treasury:</p>
        <p className={css.info}>available:</p>
      </Card>
      <Modal
        okText="submit"
        title="Donate Amount"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space>
          <div>treasury name</div>
          <Input style={{width: '300px'}} placeholder="Donate Amount" />
        </Space>
      </Modal>
      <Modal
        okText="submit"
        title="Donate Amount"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space>
          <div>proposal detail</div>
          <Input style={{width: '300px'}} placeholder="proposal detail" />
        </Space>
        <Space>
          <div>request amount</div>
          <Input style={{width: '300px'}} placeholder="request amount" />
        </Space>
      </Modal>
    </>
  );
};
export default TCard;

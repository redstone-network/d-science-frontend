import {Button, Card, Input, Modal, Space} from 'antd';
import {useState} from 'react';
import css from './index.module.css';
import { donate, createProposal } from '@apis';
import {useAccountState} from '@stores';

const {Meta} = Card;

const TCard = ({data, fetchList}) => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const { account } = useAccountState();
  const [amount, setAmount] = useState('');
  const [proposal, setProposal] = useState('');
  const [request, setRequest] = useState('');

  const handleOk = async () => {
    const res = await donate(data.id, amount, account)
    setIsDonateModalOpen(false);
    setAmount('');
    fetchList();
  };
  const handleSubmitOk = async  () => {
    await createProposal(data.id, request, proposal, account)
    setIsSubmitModalOpen(false);
    setProposal('');
    setRequest('');
    fetchList();
  };
  const handleCancel = () => {
    setIsDonateModalOpen(false);
    setIsSubmitModalOpen(false);
    setAmount('');
    setProposal('');
    setRequest('');
  };

  const handleDonate = () => {
    setIsDonateModalOpen(true);
  };
  const handleSubmit = async () => {
    setIsSubmitModalOpen(true);
  };
  return (
    <>
      <Card
        style={{width: '30%', flexShrink: 0}}
        actions={[
          <Button onClick={handleDonate} type="link">
            Donate
          </Button>,
          <Button onClick={handleSubmit} type="link">
            submit proposal
          </Button>,
        ]}
      >
        <p className={css.info}>treasury:{data.name}</p>
        <p className={css.info}>available:{data.available}</p>
      </Card>
      <Modal
        okText="submit"
        title="Donate Amount"
        open={isDonateModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space>
          <div>Donate Amount</div>
          <Input value={amount} onChange={(e) => setAmount(e.target.value) } style={{width: '300px'}} placeholder="Donate Amount" />
        </Space>
      </Modal>
      <Modal
        okText="submit"
        title="Submit proposal"
        open={isSubmitModalOpen}
        onOk={handleSubmitOk}
        onCancel={handleCancel}
      >
        <Space style={{padding: '18px'}}>
          <div>proposal detail</div>
          <Input value={proposal} onChange={(e) => setProposal(e.target.value) } style={{width: '300px'}} placeholder="proposal detail" />
        </Space>
        <Space style={{padding: '18px'}}>
          <div>request amount</div>
          <Input value={request} onChange={(e) => setRequest(e.target.value) } style={{width: '300px'}} placeholder="request amount" />
        </Space>
      </Modal>
    </>
  );
};
export default TCard;

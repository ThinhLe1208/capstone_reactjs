import React from 'react';
import { Collapse, Empty, Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

import styles from './styles.module.scss';
import LordIcon from 'components/LordIcon';
import { useDispatch } from 'react-redux';
import { usersThunk } from 'redux/thunks/usersThunk';
import { notifications } from 'utils/notifications';

const { Panel } = Collapse;

const UserOrderHistory = ({ userProfile }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'PRODUCT',
      dataIndex: 'product',
      key: 'product',
      align: 'center',
      width: 160,
      render: (data) => {
        return (
          <div className={styles.productCell}>
            <img
              src={data?.image}
              alt='img'
            />
            <Link
              className={styles.nameProduct}
              to={`/detail/${data?.id}`}
            >
              {data?.name}
            </Link>
          </div>
        );
      },
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      responsive: ['sm'],
      render: (data) => {
        return (
          <Link
            className={styles.name}
            to={`/detail/${data?.id}`}
          >
            {data?.name}
          </Link>
        );
      },
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (data) => {
        return <div>${data.price}</div>;
      },
    },
    {
      title: 'DESCRIPTTION',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      responsive: ['md'],
      render: (data) => {
        return <p>{data.description}</p>;
      },
    },
  ];

  const handleDeleteOrder = async (id) => {
    try {
      await dispatch(usersThunk.deleteOrder(id)).unwrap();
      notifications.success('Delete the order successfully');
    } catch (err) {
      notifications.error('Failed to delete the order');
    }
  };

  const renderordersHistoryList = (ordersHistory) => {
    if (Array.isArray(ordersHistory)) {
      return ordersHistory.map((order) => {
        const data = order?.orderDetail?.map((item, index) => {
          return {
            key: index,
            product: item,
            name: item,
            price: item,
            description: item,
          };
        });

        return (
          <Panel
            header={moment(order.date).format('MMMM Do YYYY, h:mm:ss a')}
            key={order?.id}
          >
            <div className={styles.orderId}>
              <span>Order ID: {order?.id}</span>
              <Popconfirm
                placement='topLeft'
                title={<p>Are you sure to delete this order?</p>}
                icon={
                  <LordIcon
                    icon='warning'
                    className={styles.lordWarningIcon}
                    trigger='loop'
                    delay='800'
                    state='intro'
                    size='20px'
                  />
                }
                okText='Delete'
                cancelText='Cancel'
                onConfirm={() => handleDeleteOrder(order?.id)}
              >
                <LordIcon
                  icon='trash'
                  className={styles.lordIcon}
                  size='30px'
                  state='hover-empty'
                />
              </Popconfirm>
            </div>

            <Table
              columns={columns}
              dataSource={data}
              rowKey={'key'}
              pagination={false}
            />
          </Panel>
        );
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <Collapse
        defaultActiveKey={[]}
        expandIconPosition='end'
      >
        {userProfile?.ordersHistory?.length && renderordersHistoryList(userProfile?.ordersHistory)}
        {!userProfile?.ordersHistory?.length && (
          <Panel header='You have 0 order'>
            <Empty description={<p>Empty</p>} />
          </Panel>
        )}
      </Collapse>
    </div>
  );
};

export default UserOrderHistory;

import React, { useState } from 'react';
import { Button, Checkbox, Col, Collapse, Row, Space } from 'antd';
import _ from 'lodash';

import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterResultByCategoryList, setFilterResultByPriceList } from 'redux/slices/productSlice';
import { notifications } from 'utils/notifications';

const { Panel } = Collapse;

const FilterSidebar = () => {
  const { categoryList, priceRangeList } = useSelector((state) => state.product);
  const [categoryCount, setCategoryCount] = useState(0);
  const [sizeCount, setSizeCount] = useState(0);
  const [priceCount, setPriceCount] = useState(0);
  const [categoryValue, setCategoryValue] = useState([]);
  const [sizeValue, setSizeValue] = useState([]);
  const [priceValue, setPriceValue] = useState([]);
  const dispatch = useDispatch();

  const handleChangeCategory = (checkedValues) => {
    setCategoryCount(checkedValues.length);
    setCategoryValue(checkedValues);
    dispatch(setFilterResultByCategoryList(checkedValues));
  };

  const handleChangeSize = (checkedValues) => {
    setSizeCount(checkedValues.length);
    setSizeValue(checkedValues);
    notifications.info('Oops! This API is so weird.');
  };

  const handleChangePrice = (checkedValues) => {
    setPriceCount(checkedValues.length);
    setPriceValue(checkedValues);
    dispatch(setFilterResultByPriceList(checkedValues));
  };

  const handleResetCategory = () => {
    setCategoryCount(0);
    setCategoryValue([]);
    dispatch(setFilterResultByCategoryList([]));
  };

  const handleResetSize = () => {
    setSizeCount(0);
    setSizeValue([]);
  };

  const handleResetPrice = () => {
    setPriceCount(0);
    setPriceValue([]);
    dispatch(setFilterResultByPriceList([]));
  };

  const renderCategoryList = (list) => {
    if (Array.isArray(list)) {
      return list.map((item, index) => {
        return (
          <Checkbox
            key={index}
            value={item.id}
          >
            {_.capitalize(item.category)}
          </Checkbox>
        );
      });
    }
  };

  const renderCategoryContent = () => {
    return (
      <div className={styles.category}>
        <div className={styles.info}>
          <p>{categoryCount} selected</p>
          <Button
            size='small'
            onClick={handleResetCategory}
          >
            Reset
          </Button>
        </div>
        <Checkbox.Group
          style={{
            width: '100%',
          }}
          value={categoryValue}
          onChange={handleChangeCategory}
        >
          <Space direction='vertical'>
            <Checkbox value='FEATURE'>Sale</Checkbox>
            {renderCategoryList(categoryList)}
          </Space>
        </Checkbox.Group>
      </div>
    );
  };

  const renderSizeContent = () => {
    const sizeList = [36, 37, 38, 39, 40, 41, 42];

    return (
      <div className={styles.size}>
        <div className={styles.info}>
          <p>{sizeCount} selected</p>
          <Button
            size='small'
            onClick={handleResetSize}
          >
            Reset
          </Button>
        </div>
        <Checkbox.Group
          style={{
            width: '100%',
          }}
          value={sizeValue}
          onChange={handleChangeSize}
        >
          <Row>
            {sizeList.map((item, index) => {
              return (
                <Col
                  key={index}
                  span={8}
                >
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </div>
    );
  };

  const renderPriceContent = () => {
    return (
      <div className={styles.price}>
        <div className={styles.info}>
          <p>{priceCount} selected</p>
          <Button
            size='small'
            onClick={handleResetPrice}
          >
            Reset
          </Button>
        </div>
        <Checkbox.Group
          style={{
            width: '100%',
          }}
          value={priceValue}
          onChange={handleChangePrice}
        >
          <Space direction='vertical'>
            {priceRangeList?.map((priceRange, index) => {
              return (
                <Checkbox
                  key={index}
                  value={priceRange.value}
                >{`$${priceRange.start} - $${priceRange.end}`}</Checkbox>
              );
            })}
          </Space>
        </Checkbox.Group>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Collapse
        defaultActiveKey={['1', '2', '3']}
        expandIconPosition='end'
      >
        <Panel
          header='Category'
          key='1'
        >
          {renderCategoryContent()}
        </Panel>
        <Panel
          header='Size'
          key='2'
        >
          {renderSizeContent()}
        </Panel>
        <Panel
          header='Price'
          key='3'
        >
          {renderPriceContent()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default FilterSidebar;

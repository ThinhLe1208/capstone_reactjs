import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './styles.module.scss';
import { changeQuantityByButton, changeQuantityByInput } from 'redux/slices/cartSlice';
import LordIcon from 'components/LordIcon';

const QuantityField = ({ product, large }) => {
  const dispatch = useDispatch();

  const handleDecreaseQuantity = () => {
    dispatch(
      changeQuantityByButton({
        productId: product?.id,
        qty: -1,
      })
    );
  };

  const handleIncreaseQuantity = () => {
    dispatch(
      changeQuantityByButton({
        productId: product?.id,
        qty: 1,
      })
    );
  };

  const handleChangeQuantity = (e) => {
    dispatch(
      changeQuantityByInput({
        productId: product?.id,
        qty: Number(e.target.value),
      })
    );
  };

  const handleBlurQuantity = (e) => {
    let qty = Number(e.target.value);
    if (qty < 1) {
      qty = 1;
    }
    dispatch(
      changeQuantityByInput({
        productId: product?.id,
        qty: Math.floor(qty),
      })
    );
  };

  return (
    <div className={styles.wrapper + ' ' + (large && styles.large)}>
      <LordIcon
        icon='arrowDown'
        className='lordIcon'
        state='hover-1'
        trigger='click'
        size={large ? '160px' : '140px'}
        onClick={handleDecreaseQuantity}
      />
      <input
        type='number'
        value={product?.qty ?? 1}
        onInput={handleChangeQuantity}
        onBlur={handleBlurQuantity}
        min={1}
        step={1}
      />
      <LordIcon
        icon='arrowUp'
        className='lordIcon'
        state='hover-1'
        trigger='click'
        size={large ? '160px' : '140px'}
        onClick={handleIncreaseQuantity}
      />
    </div>
  );
};

export default QuantityField;

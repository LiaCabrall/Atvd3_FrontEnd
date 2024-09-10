import React from 'react';
import PropTypes from 'prop-types';

const getDieImage = (value) => {
  return `/images/die${value}.png`; 
};

const Dado = ({ value, isRolling }) => {
  return (
    <div className={`dado ${isRolling ? 'rolling' : ''}`}>
      <img src={getDieImage(value)} alt={`Dado ${value}`} className="dado-imagem" />
    </div>
  );
};

Dado.propTypes = {
  value: PropTypes.number.isRequired,
  isRolling: PropTypes.bool.isRequired,
};

export default Dado;

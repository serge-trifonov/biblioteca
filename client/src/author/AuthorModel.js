import React from 'react';
import { Modal } from 'antd';

import AuthorForm from './AuthorForm';

const AuthorModel = ({ author, isModalVisible, onCancelModal, refetch }) => {

    return (
      <div>
      <Modal footer={null} title="CREATE AUTHOR" visible={isModalVisible} onCancel={onCancelModal}>
        <AuthorForm onCancelModal={onCancelModal} author={author} refetch={refetch} />
      </Modal>
      </div>
    );
  };
  
  export default AuthorModel;
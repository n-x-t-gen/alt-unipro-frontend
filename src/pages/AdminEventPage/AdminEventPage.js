import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminEventPage.module.css';
import AdminEventCatalogue from '../../components/AdminEventCatalogue/AdminEventCatalogue';
import HandSidebar from '../../components/HandSidebar/HandSidebar';
import { Row, Col } from 'react-bootstrap'

const AdminEventPage = () => (
  <div className={styles.AdminEventPage}>
    <Row>
      <Col lg={3}>
        <HandSidebar />
      </Col>
      <Col lg={9}>
        <AdminEventCatalogue />
      </Col>
    </Row>
  </div>
);

AdminEventPage.propTypes = {};

AdminEventPage.defaultProps = {};

export default AdminEventPage;

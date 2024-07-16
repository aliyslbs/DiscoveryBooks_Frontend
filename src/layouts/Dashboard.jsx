import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Outlet></Outlet>
        </Col>
      </Row>
    </Container>
  )
}

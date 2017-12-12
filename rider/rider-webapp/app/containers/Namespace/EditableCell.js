/*
 * <<
 * wormhole
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import React from 'react'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
const FormItem = Form.Item

export class EditableCell extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillReceiveProps (props) {

  }

  forceCheckSize = (rule, value, callback) => {
    const reg = /^[0-9]*$/
    if (reg.test(value)) {
      callback()
    } else {
      callback('必须是正整数')
    }
  }

  checkFieldType = () => {
    this.props.form.validateFieldsAndScroll((err, values) => { // eslint-disable-line
      if (!err) {
        this.props.initcheckFieldType(this.props.recordVal, values)
      }
    })
  }

  editFieldType = () => {
    this.props.initeditFieldType(this.props.recordVal)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { tupleForm, delimiterValue, sizeValue } = this.props
    let htmlFieldType = ''
    if (tupleForm === '') {
      htmlFieldType = ''
    } else if (tupleForm === 'edit') {
      htmlFieldType = (
        <Row gutter={4} style={{ marginBottom: '-28px' }}>
          <Col span={9}>
            <FormItem label="">
              {getFieldDecorator('delimiterValue', {
                rules: [{
                  required: true,
                  message: '请填写'
                }]
              })(
                <Input
                  placeholder="Sep"
                  onChange={this.handleChangeDelimiter}
                />
              )}
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem label="">
              {getFieldDecorator('sizeValue', {
                rules: [{
                  required: true,
                  message: '必须是正整数'
                }, {
                  validator: this.forceCheckSize
                }]
              })(
                <InputNumber
                  placeholder="Size"
                  style={{ width: '100%' }}
                  onChange={this.handleChangeSize}
                />
              )}
            </FormItem>
          </Col>
          <Col span={4} className="field-type-check-class">
            <Icon
              type="check"
              onClick={this.checkFieldType}
            />
          </Col>
        </Row>
      )
    } else if (tupleForm === 'text') {
      htmlFieldType = (
        <Row gutter={4}>
          <Col span={9}>
            <span style={{ marginLeft: '2px' }}>{`Sep: ${delimiterValue}`}</span>
          </Col>
          <Col span={11}>
            <span>{`Size: ${sizeValue}`}</span>
          </Col>
          <Col span={4}>
            <Icon
              type="edit"
              onClick={this.editFieldType}
            />
          </Col>
        </Row>
      )
    }

    return (
      <Form className="field-type-form-class">
        {htmlFieldType}
      </Form>
    )
  }
}

EditableCell.propTypes = {
  form: React.PropTypes.any,
  sizeValue: React.PropTypes.number,
  delimiterValue: React.PropTypes.string,
  recordVal: React.PropTypes.object,
  tupleForm: React.PropTypes.string,
  initcheckFieldType: React.PropTypes.func,
  initeditFieldType: React.PropTypes.func
}

export default Form.create({wrappedComponentRef: true})(EditableCell)
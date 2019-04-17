import React, {PureComponent} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

import {spring} from 'popmotion'

const COLOR = props => {
  const {transform} = props
  if (transform === 0)
    return '#FFBF00'
  if (transform === 1)
    return '#EB5757'
  if (transform === 2)
    return '#2274A5'
}

const ANGLE = props => {
  const {transform} = props
  if (transform === 0)
    return '-12deg'
  if (transform === 1)
    return '0deg'
  if (transform === 2)
    return '12deg'
}

const ADJUSTMENT = props => {
  const {transform} = props
  if (transform === 0)
    return '-4px'
  if (transform === 1)
    return '0px'
  if (transform === 2)
    return '4px'
}

const Button = posed.div({
  default: {
    background: COLOR,
    color: '#FFFFFF',
    borderColor: COLOR,
    transition: {spring},
  },
  selected: {
    background: '#FFFFFF',
    color: COLOR,
    borderColor: COLOR,
    transition: {spring},
  },
})
const Ring = styled(Button)`
  width: 130px;
  height: 130px;
  border-style: solid;
  border-radius: 100%;
  border-width: 4px;
  background: #FFFFFF;
  margin: 40px;
`
const Caption = styled.div`
  transform: rotate(${ANGLE}) translate(${ADJUSTMENT}, 0px);
  font-family: 'IBM Plex Sans';
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  padding-top: 50px;
  user-select: none;
`

export default class VoteItem extends PureComponent {
  render() {
    const {visible, id, caption, transform} = this.props

    return (
      <Ring
        pose={visible ? 'selected' : 'default'}
        id={id}
        transform={transform}>
        <Caption id={id} transform={transform}>
          {caption}
        </Caption>
      </Ring>
    )
  }
}

/********************************************************************************
This component is determined by two transformations from gamevote.js
  flip=0||1     index=0,1,2
     0 1            0 2
    1   0          1   1
     0 1            2 0
 indentation   angle & color
these values allow this component to quickly and progromatically find it's
position, color, and rotation when created in a 0,1,2 loop for each side of
a hexagonal circle pattern.
*********************************************************************************/

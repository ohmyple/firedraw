import React, {Component} from 'react'

import styled from 'styled-components'

const StyledCanvas = styled.canvas`
  width: ${props => (props.width ? `${props.width}px` : `350px`)};
  height: ${props => (props.height ? `${props.height}px` : `350px`)};
  background: #ffffff;
  border-style: solid;
  border-radius: 15px;
  border-color: #bdbdbd;
  border-width: 1px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`

export default class Canvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canvas: null,
      dragging: false,
      ctx: null,
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    ctx.lineWidth = 6
    ctx.strokeStyle = '#4F4F4F'
    ctx.fillStyle = ctx.strokeStyle
    this.setState({
      canvas: canvas,
      ctx: ctx,
    })
  }

  updateCanvas = coords => {
    const {x, y} = coords
    const {ctx} = this.state

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y, ctx.lineWidth / 3, 0, 2 * Math.PI)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  transform = coords => {
    const {canvas} = this.state

    const x =
      (coords.x * canvas.width) / canvas.clientWidth -
      canvas.getBoundingClientRect().x

    const y =
      (coords.y * canvas.height) / canvas.clientHeight -
      canvas.getBoundingClientRect().y

    return {x: x, y: y}
  }

  draw = e => {
    const {dragging} = this.state

    if (dragging) {
      const coords = this.transform({x: e.clientX, y: e.clientY})
      this.updateCanvas(coords)
    }
  }

  start = e => {
    if (e.button === 0) {
      this.setState({
        dragging: true,
      })
      const coords = this.transform({x: e.clientX, y: e.clientY})
      this.updateCanvas(coords)
    }
  }

  stop = () => {
    this.setState({
      dragging: false,
    })
    const {ctx} = this.state

    ctx.beginPath()
  }

  render() {
    const {width, height} = this.props
    return (
      <StyledCanvas
        ref="canvas"
        width={width}
        height={height}
        onMouseDown={this.start}
        onMouseMove={this.draw}
        onContextMenu={this.stop}
        onMouseLeave={this.stop}
        onMouseUp={this.stop}
      />
    )
  }
}

/********************************************************************************
This component takes in two props, Width and Height.
*********************************************************************************/

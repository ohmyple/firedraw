import React, {PureComponent} from 'react'
import styled from 'styled-components'

import ProgressBar from 'progressbar.js'

const FlexContainer = styled.section`
  padding-top: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`
const StyledProgressBar = styled.div`
  padding-top: 10px;
`

export default class Timer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bar: {},
    }
  }
  componentDidMount() {
    const {container} = this.refs
    const {width, height} = this.props

    var bar = new ProgressBar.Line(container, {
      strokeWidth: 4,
      color: '#6FCF97',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {
        width: width ? `${width}px` : `400px`,
        height: height ? `${height}px` : `25px`
      },
    })
    this.setState({bar: bar})
  }

  componentDidUpdate() {
    const {bar} = this.state
    const {value} = this.props
    if (value > 0.8) {
      bar.set(1)
    }
    bar.animate(value, {duration: 5000})
  }

  render() {
    return (
      <FlexContainer>
        <StyledProgressBar ref="container" />
      </FlexContainer>
    )
  }
}

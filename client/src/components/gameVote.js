import React, {PureComponent} from 'react'
import styled from 'styled-components'

import Drawing from './drawing.js'
import Timer from './timer.js'
import VoteItem from './voteItem.js'
import Header from './header.js'

const FlexRow = styled.section`
  padding-top: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`
const FlexCol = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`
const DrawingFrame = styled.div`
  width: 450px;
  height: 450px;
  border-style: solid;
  border-radius: 15px;
  border-color: #bdbdbd;
  border-width: 1px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin-top: 25px;
`
const IndentR = styled.div`
  margin-right: 3em;
`
const IndentL = styled.div`
  margin-left: 3em;
`

export default class GameCaption extends PureComponent {
  constructor(props) {
    super(props)

    const defaultUsernames = []
    for (let i = 0; i < 6; i++) {
      defaultUsernames[i] = `@username ${i}`
    }

    const defaultCaptions = ['...']
    for (let i = 1; i < 7; i++) {
      defaultCaptions[i] = `caption ${i}`
    }

    this.state = {
      usernames: defaultUsernames,
      progress: 0.5,
      captions: defaultCaptions,
      currentVote: 0,
    }
  }

  submitVote = (e) => {
    let {id} = e.target
    if (id === '') {
      return
    }
    id = Number(id)
    const {currentVote} = this.state

    if (id === currentVote) {
      this.setState({currentVote: 0})
    }
    if (id !== currentVote) {
      this.setState({currentVote: id})
    }
  }

  render() {
    const {usernames, progress, captions, currentVote} = this.state
    const leftside = usernames.filter((element, i) => i <= 2)
    const rightside = usernames.filter((element, i) => i >= 3)

    let $0to5 = 0
    const icons = side =>
      side.map((usernames, $0to2) => {
        let visible = false

        if ($0to5 + 1 === currentVote) {
          visible = true
        }
        if ($0to5++ % 2 === 0) {
          return (
            <IndentL key={$0to5} onClick={this.submitVote}>
              <VoteItem id={$0to5} visible={visible}
                transform={($0to2+($0to5%2)+$0to5)%3}
                caption={captions[$0to5]} />
            </IndentL>
          )
        }
        return (
          <IndentR key={$0to5} onClick={this.submitVote}>
            <VoteItem id={$0to5} visible={visible}
              transform={$0to2} caption={captions[$0to5]} />
          </IndentR>
        )
      })

    return (
      <FlexRow>
        <div>{icons(leftside)}</div>
        <div>
          <FlexCol>
            <Header text={captions[currentVote]} />
            <DrawingFrame>
              <Drawing />
            </DrawingFrame>
          </FlexCol>
          <Timer value={progress} />
        </div>
        <div>{icons(rightside)}</div>
      </FlexRow>
    )
  }
}

import React, {PureComponent} from 'react'
import styled                 from 'styled-components'

import DrawingIcon            from './drawingIcon'
import ReadyButton            from './readyButton'
import Waiting                from './waitingReady'

const FlexRow = styled.section`
  padding-top: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`
const IndentR = styled.div`
  margin-right: 3em;
`
const IndentL = styled.div`
  margin-left: 3em;
`

export default class GameRoom extends PureComponent {
  constructor(props) {
    super(props)

    const {users} = this.props
    const defaultUsers = []

    for (let i = 0; i < 6; i++) {
      const defaultUser = {
        name: `OPEN`,
        avatar: '',
      }
      defaultUsers[i] = defaultUser
    }

    this.state = {
      defaultUsers: defaultUsers,
      users: [...users, ...defaultUsers],
    }
  }

  componentDidUpdate (prevProps) {
    const {users} = this.props
    if (users !== prevProps.users) {
      this.setState(state => {
        return {users: [...users, ...state.defaultUsers]}
      })
    }
  }

  render() {
    const {users} = this.state
    const {user, op, game} = this.props

    const leftside = users.filter((element, i) => i <= 2)
    const rightside = users.filter((element, i) => i >= 3 && i <= 5)

    let $0to5 = 0
    const icons = side =>
      side.map((user, $0to2) => {
        if ($0to5++ % 2 === 0) {
          return (
            <IndentL key={$0to5}>
              <DrawingIcon color={($0to2+($0to5%2)+$0to5)%3}
                caption={user.name}
                photo={user.avatar} />
            </IndentL>
          )
        }
        return (
          <IndentR key={$0to5}>
            <DrawingIcon color={$0to2}
              caption={user.name}
              photo={user.avatar} />
          </IndentR>
        )
      })

    const readyButton = (user, op) => {
      if (user.username === op) {
        return (
          <ReadyButton gameid={game.gameid} username={user.username} />
        )
      } else {
        return (
          <Waiting op={op} />
        )
      }
    }

    return (
      <FlexRow>
        <div>{icons(leftside)}</div>
        {readyButton(user, op)}
        <div>{icons(rightside)}</div>
      </FlexRow>
    )
  }
}

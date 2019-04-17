import React, {PureComponent} from 'react'
import styled                 from 'styled-components'
import Drawing                from './drawing.js'
import DrawingIcon            from './drawingIcon.js'
import Timer                  from './timer.js'
import Caption                from './caption.js'

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
const PictureFrame = styled.div`
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
      answer: '',
    }
  }

  componentDidUpdate (prevProps) {
    const {users, progress, submit} = this.props
    if (submit) {
      this.submit()
    }
    if (users !== prevProps.users) {
      this.setState(state => {
        return {users: [...users, ...state.defaultUsers]}
      })
    }
    if (progress === -1) {
      this.submit()
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submit = () => {
    const {answer} = this.state
    console.log('SUBMIT CAPTION')
  }

  render() {
    const {users} = this.state
    const {drawing, progress} = this.props
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

    return (
      <FlexRow>
        <div>{icons(leftside)}</div>
        <div>
          <FlexCol>
            <Caption />
            <PictureFrame>
              <Drawing photo={drawing} />
            </PictureFrame>
          </FlexCol>
          <Timer value={progress} />
        </div>
        <div>{icons(rightside)}</div>
      </FlexRow>
    )
  }
}

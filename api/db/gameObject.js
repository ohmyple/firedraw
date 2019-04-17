
const User    = require('./userObject')
const prompts = require('./prompts')
const { io }  = require('../messaging')

class GameObject {
  constructor(name, gameid, gamename, isPrivate) {
    this.owner = name
    this.gameid = gameid
    this.gamename = gamename
    this.isPrivate = isPrivate
    this.partySize = 1
    this.users = []
    this.users.push(new User(name))
    this.currentPage =  'waiting'
    this.gameDrawings = []
    this.answers = new Map()
    this.round = 1
    this.lock = false
    this.prompts = prompts
    this.currentDrawing = ''
    this.currentPrompt = ''
    this.time = 0
    this.timerID = ''
  }

  getPublicGame() {
    const publicGame = {
      owner: this.owner,
      gameid: this.gameid,
      partySize: this.partySize,
      users: this.getPublicUsers(),
      currentPage: this.currentPage,
      round: this.round ,
      currentDrawing: this.currentDrawing
    }

    return publicGame
  }

  getPublicUsers() {
    var users = []

    for(let i = 0; i < this.partySize; i++) {
      users.push(this.users[i].getPublicUser())
    }

    return users
  }

  searchUsersByName(name) {
    for( let i = 0; i < this.partySize; i++) {
      if(name === this.users[i].getName()) {
        return this.users[i]
      }
    }
  }

  tick() {
    if (this.time <= 0) {
      clearInterval(this.timerID)
      io.emit(`timer-${this.gameid}`, -1)
    } else {
      this.time -= 1
      io.emit(`timer-${this.gameid}`, this.time)
    }
  }

  setTimer(time) {
    this.time = time
    io.emit(`timer-${this.gameid}`, this.time)
    this.timerID = setInterval(
      () => this.tick(),
      5000
    )
  }

  setGameDrawings() {
    const drawings = []
    for( let i = 0; i < this.partySize; i++) {
      let drawing = this.users[i].getDrawingUrl()

      drawings.push(drawing)
    }
    this.gameDrawings = drawings
    this.currentDrawing = drawings[0]
    io.emit(`updateGameState-${this.gameid}`, this)
  }

  checkUser(name) {
    if(this.searchUsersByName(name) != undefined) {
      return true
    }
    return false
  }

  initAnswers() {
    const innerMap = new Map()

    innerMap.set(this.currentPrompt, [])
    for(let user of this.users) {
      innerMap.set(user.getAnswer(), [])
    }
    this.answers.set(this.round, innerMap)
  }

  initRound() {
    this.setGameDrawings()
  }

  nextDrawing() {
    this.currentDrawing = this.gameDrawings.pop()
  }

  populateAnswerVotes() {
    const map = this.answers.get(this.round)

    for(let key of map.keys()) {
      map.get(key).push(...this.playerArrayOfAnswer(key))
    }
  }

  playerArrayOfAnswer(answer) {
    const players = []

    for( let user of this.users) {
      if(user.getAnswer() === answer) {
        players.push(user.getName() )
      }
    }
    return players
  }

  addUserByName(name) {
    if(!this.lock && !this.checkUser(name)) {
      this.partySize++
      this.users.push( new User(name))
    }
  }

  removeUserByName(name) {
    let index = this.users.indexOf(this.searchUsersByName(name))

    if(index > -1) {
      this.users.splice(index, 1)
      this.partySize--
    }
  }

  changeOwner() {
    if(this.partySize > 1) {
      this.removeUserByName(this.owner)
      this.owner = this.users[0].name
      return true
    } else {
      return false
    }
  }

  addPointByName(name) {
    if(this.checkUser(name)) {
      this.searchUsersByName(name).addPoint()
    }
  }

  setAvatarByName(name, url) {
    if(this.checkUser(name)) {
      this.searchUsersByName(name).setAvatar(url)
    }
  }

  setDrawingUrlByName(name, url) {
    if(this.checkUser(name)) {
      this.searchUsersByName(name).setDrawingUrl(url)
    }
  }

  setAnswerByName(name, answer) {
    if(this.checkUser(name)) {
      this.searchUsersByName(name).setAnswer(answer)
    }
  }

  setPromptByName(name, prompt) {
    if(this.checkUser(name)) {
      this.searchUsersByName(name).setPrompt(prompt)
    }
  }

  setPromptAll() {
    for( let i = 0; i < this.partySize; i++) {
      this.setPromptByName( this.users[i].getName(), this.prompts[i])
    }
  }

  setCurrentPage(page) {
    this.currentPage = page
  }

  setCurrentPrompt(prompt) {
    this.currentPrompt = prompt
  }

  setCurrentDrawing(drawing) {
    this.currentDrawing = drawing
  }

  setLock() {
    this.lock = true
  }

  nextRound() {
    this.round++
  }

  getOwner() {
    return this.owner
  }

  getGameId() {
    return this.gameid
  }

  getPartySize() {
    return this.partySize
  }

  getCurrentPage() {
    return this.currentPage
  }

  getCurrentPrompt() {
    return this.currentPrompt
  }

  getCurrentDrawing() {
    return this.currentDrawing
  }

  getRound() {
    return this.round
  }

  getGameDrawings() {
    return this.gameDrawings
  }

  getAllUsers() {
    return this.users
  }

  getUsersNameList() {
    let list = []
    for(let i = 0; i < this.partySize; i++) {
      list.push(this.users[i].name)
    }
    return list
  }

  getPointByName(name) {
    if(this.checkUser(name)) {
      return this.searchUsersByName(name).getPoints()
    }
  }

  getAvatarByName(name) {
    if(this.checkUser(name)) {
      return this.searchUsersByName(name).getAvatar()
    }
  }

  getDrawingUrlByName(name) {
    if(this.checkUser(name)) {
      return this.searchUsersByName(name).getDrawingUrl()
    }
  }

  getAnswerIdByName(name) {
    if(this.checkUser(name)) {
      return this.searchUsersByName(name).getAnswerId()
    }
  }

  getPromptByName(name) {
    if(this.checkUser(name)) {
      return this.searchUsersByName(name).getPrompt()
    }
  }

}

module.exports = GameObject

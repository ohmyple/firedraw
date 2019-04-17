
class User {
  constructor(name) {
    this.name = name
    this.points = 0
    this.avatar = ''
    this.drawingUrl = ''
    this.answer = ''
    this.prompt = ''
  }

  getPublicUser() {
    const publicUser = {
      name: this.name,
      points: this.points,
      avatar: this.avatar
    }
    
    return publicUser
  }

  addPoint() {
    this.points++
  }

  setAvatar(link) {
    this.avatar = link
  }

  setDrawingUrl(link) {
    this.drawingUrl = link
  }

  setAnswer(answer) {
    this.answer = answer
  }

  setPrompt(link) {
    this.prompt = link
  }

  getName() {
    return this.name
  }

  getPoints() {
    return this.points
  }

  getAvatar() {
    return this.avatar
  }

  getDrawingUrl() {
    return this.drawingUrl
  }

  getAnswer() {
    return this.answer
  }

  getPrompt() {
    return this.prompt
  }
}

module.exports = User


import request from './'


export const getCurrentGame = gameid => {
  console.log('getCurrentGame', gameid)

  return request({
    endpoint: `/api/game/${gameid}`,
    method: 'GET'
  })
    .then(response => response.json())
    .then(game => {
      return {
        game: {
          gamename: game.gamename,
          gameid: game.gameid,
          chatid: game.chatid,
        }}
    })
    .catch(error => console.error('Error:', error))
}


export const getCurrentUser = () => {
  console.log('getCurrentUser')

  return request({
    endpoint: '/api/lobby',
    method: 'GET'
  })
    .then(response => response.json())
    .then(user => {
      console.log(user)
      return {
        user: {
          username: user.username,
          userid: user.userid,
        }}
    })
    .catch(error => console.error('Error:', error))
}


export const getUsers = (gameid) => {
  console.log('getUsers', gameid)

  return request({
    endpoint: `/api/gameObject/getUsers/${gameid}`,
    method: 'GET',
  })
    .then(response => response.json())
    .then(response => {
      //this spread might be useless
      return {
        users: [...response],
      }
    })
    .catch(error => console.error('Error:', error))
}


export const createGame = (gamename, password) => {
  console.log('createGame', gamename, !!password)

  const body = {
    gamename: gamename,
    password: password,
  }

  return request({
    endpoint: '/api/game/create',
    body: JSON.stringify(body),
    headers:'application/json',
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if (response.error) {
        return {dup: true}
      } else {
        return {
          gameid: response.gameid,
          joinGame: true,
          dup: false,
        }
      }
    })
    .catch(error => console.error('Error:', error))
}

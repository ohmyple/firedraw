
import request from './'


export const getGameObjs = () => {
  console.log('getGamesObj')

  return request({
    endpoint: '/api/gameObject',
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
}


export const getGameObjById = (gameid) => {
  console.log('getGamesObj')

  return request({
    endpoint: `/api/gameObject/${gameid}`,
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
}


export const startGame = (gameid) => {
  console.log('startGame', gameid)
  const body = {}
  return request({
    endpoint: `/api/gameObject/startGame/${gameid}`,
    body: JSON.stringify(body),
    headers:'application/json',
  })
    .catch(error => console.error('Error:', error))
}


export const getPrompt = (gameid) => {
  console.log('getPrompt', gameid)

  return request({
    endpoint: `/api/gameObject/getPrompt/${gameid}`,
    method: 'GET',
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
}


export const setTimer = (gameid) => {
  console.log('setTimer', gameid)

  return request({
    endpoint: `/api/gameObject/setTimer/${gameid}`,
    method: 'GET',
  })
    .catch(error => console.error('Error:', error))
}

export const setPage = (gameid) => {
  console.log('setPage', gameid)

  return request({
    endpoint: `/api/gameObject/setPage/${gameid}`,
    body: JSON.stringify({body: 'vote'}),
    headers:'application/json',
  })
    .catch(error => console.error('Error:', error))
}

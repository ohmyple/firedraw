
import request from './'


export const uploadImage = (blobImg, username) => {
  console.log('uploadImage', blobImg, username)

  const formData = new FormData()
  formData.append('avatar', blobImg)
  formData.append('username', username)

  return request({
    endpoint: '/api/uploadImage',
    body: formData,
  })
    .then(response => response.json())
    .then(response => {
      return {imageURL: response}
    })
    .catch(error => console.error('Error:', error))
}


export const addGameAvatar = (avatar, username, gameid) =>  {
  console.log('addGameAvatar', avatar, username, gameid)

  const body = {
    avatar: avatar.imageURL.imageUrl,
    username: username,
  }

  return request({
    endpoint: `/api/gameObject/addGameAvatar/${gameid}`,
    body: JSON.stringify(body),
    headers:'application/json',
  })
    .then(response => {
      if (response.status === 204) {
        return {stage: 'waiting'}
      } else {
        return {stage: 'avatar'}
      }
    })
    .catch(error => console.error('Error:', error))
}


export const addPromptDrawing = (drawing, username, gameid) =>  {
  console.log('addPromptDrawing', drawing, username, gameid)

  const body = {
    drawing: drawing.imageURL.imageUrl,
    username: username,
  }

  return request({
    endpoint: `/api/gameObject/addPromptDrawing/${gameid}`,
    body: JSON.stringify(body),
    headers:'application/json',
  })
    .then(response => {
      return {stage: 'guess'}
    })
    .catch(error => console.error('Error:', error))
}

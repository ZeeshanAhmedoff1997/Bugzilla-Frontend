// redux-token-auth-config.js
import { generateAuthActions } from 'redux-token-auth'
import { authUrl } from './constant'

const config = {
  authUrl,
  userAttributes: {
    id: 'id',
    name: 'name',
    email:'email',
    type: 'type'
  },
  userRegistrationAttributes: {
    id:'id',
    name: 'name',
    email: 'email',
    type: 'type'
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
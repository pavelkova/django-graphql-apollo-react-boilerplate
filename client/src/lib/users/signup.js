esversion: 8

import { useMutation, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
// import cookies from '../cookies'
import CREATE_USER from './mutations/CreateUser.graphql'

export const useSignupMutation = () => {
  const client = useApolloClient()
  const router = useRouter()

  const [signup, signupResult] = useMutation(CREATE_USER, {
    onCompleted: data => {
      // send confirmation email
      router.push('/login')
      // client.cache.reset() // .then(() => { redirect()}
    },
    onError: error => {
      // handle errors
      // 1. user already exists (email or username)
      console.log(error)
      return error
    },
  })

  // mutation takes arguments (username, password)
  // returns data {token, payload {username, exp, original}, refreshExpiresIn}
  // console.log(client.cache.data)

  return [signup, signupResult]
}

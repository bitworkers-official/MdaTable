import axios from 'axios'

export interface Person {
  topFunction: string
  function: string
  subFunction: string
  subSubFunction: string
  comments: string
  functionalHead: string
  functionalExpert: string
  mdas: string[]
}

export const getPersons = async (): Promise<Person[]> => {
  const res = await axios.get(
    'https://wa-universal-api-v12-container.azurewebsites.net/getPeoples'
  )
  return res.data
}

export const updatePerson = async (person: Person) => {
  return new Promise(resolve => setTimeout(resolve, 1200))
}

export const createPerson = async (person: Person) => {
  return new Promise(resolve => setTimeout(resolve, 1200))
}

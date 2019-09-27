import axios from 'axios'

export interface Person {
  cwid: string
  name: string
}

export const getPersons = async (): Promise<Person[]> => {
  const res = await axios.get(
    'https://wa-universal-api-v12-container.azurewebsites.net/getPeoples'
  )
  return res.data
}

export const deletePerson = async (person: Person) => {
  return new Promise(resolve => setTimeout(resolve, 1200))
}

export const updatePerson = async (person: Person) => {}

export const createPerson = async (person: Person) => {}

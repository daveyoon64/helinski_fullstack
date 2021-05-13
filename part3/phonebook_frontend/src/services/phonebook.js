import axios from 'axios';

const baseUrl = '/api/persons'

const getAll = () => {
  // const request = axios.get(baseUrl)
  // return request.then(response => response.data)
  return axios.get(baseUrl).then(response => response.data)
}

const addPerson = (obj) => {
  const request = axios.post(baseUrl, obj)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const url = baseUrl + `/${id}`
  const request = axios.delete(url)
  return request.then(response => response.status)
}

const updatePerson = async(person, new_number) => {
  const url = baseUrl + `/${person.id}`

  const data = {
    name: person.name,
    number: new_number
  }
  const request = axios.put(url, data)
  return request.then(response => response)
}

const phonebook = { getAll, addPerson, deletePerson, updatePerson }
export default phonebook
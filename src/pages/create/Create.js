import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

import './Create.css'

export default function Create() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [response, setResponse] = useState('')
  const [socraticResponse, setSocraticResponse] = useState('')

  const { postData, data, error } = useFetch("http://localhost:3000/excuses", "POST")

  return (
    <div>Create</div>
  )
}

import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import './Create.css'

export default function Create() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [response, setResponse] = useState('')
  const [socraticResponse, setSocraticResponse] = useState('')

  const { postData, data, error } = useFetch("http://localhost:3000/excuses", "POST")

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({name, description, response, socraticResponse})
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate('/')
    }
  }, [data])

  return (
    <div className="create">
      <h2 className="page-title">Add a New Excuse</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Excuse:</span>
          <input 
            type="text"
            onChange={(e) => {setName(e.target.value)}}
            value={name}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <label>
          <span>Response:</span>
          <textarea 
            onChange={(e) => setResponse(e.target.value)}
            value={response}
            required
          />
        </label>

        <label>
          <span>Socratic Response:</span>
          <textarea 
            onChange={(e) => setSocraticResponse(e.target.value)}
            value={socraticResponse}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}

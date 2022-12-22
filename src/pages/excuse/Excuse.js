import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export default function Excuse() {
  const { id } = useParams()
  const url = 'http://localhost:3000/recipes/' + id
  const { error, isPending, data: recipe } = useFetch(url)
  
  return (
    <div>Excuse</div>
  )
}

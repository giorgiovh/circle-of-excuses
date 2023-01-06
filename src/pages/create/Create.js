import { ExcuseForm } from '../../components/ExcuseForm';

import './Create.css'

export default function Create({ uid }) {
  return (
    <div>
      <h2>Create excuse</h2>
      <ExcuseForm uid={uid}/>
    </div>
  )
}
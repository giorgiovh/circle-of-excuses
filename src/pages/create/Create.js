import { ExcuseForm } from '../../components/ExcuseForm';

export default function Create({ uid }) {
  return (
    <div className='page'>
      <h2>Create Excuse</h2>
      <ExcuseForm uid={uid}/>
    </div>
  )
}
import { ExcuseForm } from '../../components/ExcuseForm';

export default function CreatePresetExcuse({ uid }) {
  return (
    <div className='page'>
      <h2>Create Preset Excuse</h2>
      <ExcuseForm uid={uid}/>
    </div>
  )
}
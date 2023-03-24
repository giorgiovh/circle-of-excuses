import { PresetExcuseForm } from '../../components/PresetExcuseForm';

export default function CreatePresetExcuse({ uid }) {
  return (
    <div className='page'>
      <h2>Create Preset Excuse</h2>
      <PresetExcuseForm uid={uid}/>
    </div>
  )
}
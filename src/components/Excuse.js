import ImgMediaCard from './ImgMediaCard';

export default function Excuse( { id, name, description, response, socraticResponse } ) {
  return (
    <div className='excuse'>
      <ImgMediaCard id={id} name={name} description={description} response={response} socraticResponse={socraticResponse} />
    </div>
  )
}

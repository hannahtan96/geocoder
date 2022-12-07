import './NewGeoForm.css';
import { useState } from 'react';

const NewGeoForm = (props) => {
  const [formFields, setFormFields] = useState({ name: '' });

  const onLocationChange = (event) => {
    setFormFields({ ...formFields, name: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.addLocationCallback({
      locationData: formFields.name
    });

    setFormFields({
      name: ''
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className='inline'>
        <input
          name='name'
          value={formFields.name}
          onChange={onLocationChange}
        />
      </div>
      <input className='inline' type='submit' value='Search Now!' />
    </form>
  );
};

export default NewGeoForm;

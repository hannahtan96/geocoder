import './Geo.css';

const Geo = (props) => {
  return (
    <section>
      <ul>
        <li id='current-location'>
          {props.id ? `${props.id} .)` : ''} {props.name}
        </li>
        <li>Latitude: {props.lat}</li>
        <li>Longitude: {props.lon}</li>
      </ul>
    </section>
  );
};

export default Geo;

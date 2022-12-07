import Geo from './Geo';

const GeoList = (props) => {
  const geoComponents = props.geos.map((geo) => {
    return (
      <li key={geo.id}>
        <Geo
          id={geo.id}
          name={geo.nameData}
          lat={geo.latData}
          lon={geo.lonData}
        ></Geo>
      </li>
    );
  });

  return (
    <section>
      <h2>Past History</h2>
      <ul>{geoComponents}</ul>
    </section>
  );
};

export default GeoList;

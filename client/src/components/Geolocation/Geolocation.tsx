// 例えば、こんなコンポーネントを作る
import { LocateModel } from 'commonTypesWithClient/locationmodel';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Geolocation = () => {
  const [location, setLocation] = useState<LocateModel>();
  const latitude = location?.latitude;
  const longitude = location?.longitude;

  // const fetchLocation = async () => {
  //   const Location = await apiClient.geolocation.$get().catch(returnNUll);
  //   if (Location !== null) setLocation(Location);
  //   console.log('Location', Location);
  // };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }, //　setの間にconsole間に合わず一回目でnull出るから更新関数で回避
        //   setLocation((prevLocation) => {
        //     const newLocation = {
        //       latitude: position.coords.latitude,
        //       longitude: position.coords.longitude,
        //     };
        //     console.log('lati', newLocation.latitude, 'long', newLocation.longitude);
        //     return newLocation;
        //   });
        // },
        (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    if (!latitude || !longitude) return;
    console.log('lati', location.latitude, 'long', location.longitude);
    // const data = await apiClient
    //   .nearRecord({ query: { latitude: latitude, longitude: longitude } })
    //   .catch(returnNUll);
    // console.log(data);
    // await fetchLocation();
  };

  const [newLocation, setNewLatitude] = useState<number[]>([]);

  const test = async () => {
    console.log('aaa');
    if (location?.latitude === undefined || location.longitude === undefined) return;
    const data = await apiClient.nearRecord.$get({
      query: { latitude: location.latitude, longitude: location.longitude },
    });
    console.log('data', data);
  };

  useEffect(() => {
    test();
  }, [getLocation]);

  // const sendLocationToServer = async (latitude: number, logitude: number) => {};

  return (
    <div>
      <button onClick={getLocation}>Get My Location</button>
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default Geolocation;
function returnNUll(reason: any): PromiseLike<never> {
  throw new Error('Function not implemented.');
}

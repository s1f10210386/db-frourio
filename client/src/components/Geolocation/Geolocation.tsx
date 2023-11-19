// 例えば、こんなコンポーネントを作る

import { useAtom } from 'jotai';
import { locationAtom } from 'src/atoms/location';
import { apiClient } from 'src/utils/apiClient';

const Geolocation = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const latitude = location?.latitude;
  const longitude = location?.longitude;

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

    await apiClient.geolocation.post({ body: { latitude, longitude } }).catch(returnNUll);
  };

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

import type { TaskModel } from 'commonTypesWithClient/models';
import type { TestaModel } from 'commonTypesWithClient/testamodels';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Geolocation from 'src/components/Geolocation/Geolocation';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';
const Home = () => {
  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<TaskModel[]>();
  const [label, setLabel] = useState('');
  const [testa, setTesta] = useState<TestaModel[]>();
  const [content, setContent] = useState('');
  const [twodigit, setTwodigit] = useState<TestaModel[]>();
  const [lati_Str, setLati_Str] = useState('');
  const [long_Str, setLong_Str] = useState('');
  //([])なら初期値配列だからundefinedとならず.mapでzahyou?をつけずに使える
  const [zahyou, setZahyou] = useState<TestaModel[]>([]);

  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const inputContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const inputLatitude = (e: ChangeEvent<HTMLInputElement>) => {
    setLati_Str(e.target.value);
  };
  const inputLongitude = (e: ChangeEvent<HTMLInputElement>) => {
    setLong_Str(e.target.value);
  };

  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    await apiClient.tasks.post({ body: { label } }).catch(returnNull);
    setLabel('');
    await fetchTasks();
  };
  const toggleDone = async (task: TaskModel) => {
    await apiClient.tasks
      ._taskId(task.id)
      .patch({ body: { done: !task.done } })
      .catch(returnNull);
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).delete().catch(returnNull);
    await fetchTasks();
  };

  useEffect(() => {
    if (!user) return;

    fetchTasks();
  }, [user]);

  if (!tasks || !user) return <Loading visible />;

  //TestaModelあるおかげでsetTestaができる。引数もTestaModel[]になるから態々型を定義しなくてもいい

  const fetchTesta = async () => {
    const testa = await apiClient.testa.$get().catch(returnNull);

    if (testa !== null) setTesta(testa);
    console.log('testa', testa);
  };

  //縛りをつけた座標をget
  const fetch_nearZahyou = async () => {
    const zahyou = await apiClient.testa.$get().catch(returnNull);

    if (zahyou !== null) setZahyou(zahyou);
    console.log('zahyou', zahyou);
  };

  const createTesta = async (e: FormEvent) => {
    e.preventDefault();

    //inputしたやつは初めstring型だからNum型に自分で治す
    const latitude = parseFloat(lati_Str);
    const longitude = parseFloat(long_Str);

    if (!content || isNaN(latitude) || isNaN(longitude)) return;

    console.log('content', content, 'Latitude:', latitude, 'Longitude:', longitude);

    // content, latitude, longitude を含むオブジェクトをAPIに送信
    await apiClient.testa.post({ body: { content, latitude, longitude } }).catch(returnNull);

    //   try {
    //     const response = await apiClient.testa.post({ body: {content,latitude,longitude} });
    //     return response.zahyou;
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     return null;
    //   }
    // }
    // await apiClient.geolocation.post({ body: { latitude, longitude } }).catch(returnNull);

    setContent('');
    setLati_Str('');
    setLong_Str('');

    await fetchTesta();
    await fetch_nearZahyou();
  };

  return (
    <>
      <BasicHeader user={user} />

      <div>
        <h1>現在地取得</h1>
        <Geolocation />
      </div>

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTesta}>
        <input value={content} type="text" onChange={inputContent} placeholder="Content" />
        <input value={lati_Str} type="text" onChange={inputLatitude} placeholder="Latitude" />
        <input value={long_Str} type="text" onChange={inputLongitude} placeholder="Longitude" />
        <input type="submit" value="ADD" />
      </form>

      {/* <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTesta}>
        <input value={content} type="text" onChange={inputContent} />
        <input type="submit" value="ADD" />
      </form> */}

      <div className="containers">
        <div className="container">
          <div className="form-box">
            <h2 className="title">送った文章(testa)</h2>
            {testa?.map((item, index) => (
              <div key={index} className="list-item">
                <p>{item.id}</p>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="form-box">
            <h2 className="title">半径1km以内の緯度経度</h2>
            {zahyou?.map((item, index) => (
              <div key={index} className="list-item">
                <p>{item.id}</p>
                <p>{item.latitude}</p>
                <p>{item.longitude}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
              <span>{task.label}</span>
            </label>
            <input
              type="button"
              value="DELETE"
              className={styles.deleteBtn}
              onClick={() => deleteTask(task)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;

import type { TaskModel } from 'commonTypesWithClient/models';
import type { TestaModel } from 'commonTypesWithClient/testamodels';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
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
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const inputContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const inputLatitude = (e: ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value);
  };
  const inputLongitude = (e: ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
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

  //getだけ定義してるgetwo呼出す
  const getwoTesta = async () => {
    const twodigit = await apiClient.getwo.$get().catch(returnNull);

    if (twodigit !== null) setTwodigit(twodigit);
    console.log('twodigit', twodigit);
  };

  const createTesta = async (e: FormEvent) => {
    e.preventDefault();

    //inputしたやつは初めstring型だからNum型に自分で治す
    const lat_Num = parseFloat(latitude);
    const lon_Num = parseFloat(longitude);

    if (!content || isNaN(lat_Num) || isNaN(lon_Num)) return;

    console.log('content', content, 'Latitude:', lat_Num, 'Longitude:', lon_Num);

    // content, latitude, longitude を含むオブジェクトをAPIに送信
    // await apiClient.testa.post({ body: { content, latitude, longitude } }).catch(returnNull);

    setContent('');
    setLatitude('');
    setLongitude('');

    await fetchTesta();
    await getwoTesta();
  };

  return (
    <>
      <BasicHeader user={user} />

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTesta}>
        <input value={content} type="text" onChange={inputContent} />
        <input type="submit" value="ADD" />
      </form>

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTesta}>
        <input value={content} type="text" onChange={inputContent} placeholder="Content" />
        <input value={latitude} type="text" onChange={inputLatitude} placeholder="Latitude" />
        <input value={longitude} type="text" onChange={inputLongitude} placeholder="Longitude" />
        <input type="submit" value="ADD" />
      </form>

      {/* <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTesta}>
        <input value={content} type="text" onChange={inputContent} />
        <input type="submit" value="ADD" />
      </form> */}

      <div className="containers">
        <div className="container">
          <div className="form-box">
            <h2 className="title">自分の送った文章(testa)</h2>
            {testa?.map((item, index) => (
              <div key={index} className="list-item">
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="form-box">
            <h2 className="title">ID2桁の文章(twodigit)</h2>
            {twodigit?.map((item, index) => (
              <div key={index} className="list-item">
                <p>{item.content}</p>
                <p>{item.id}</p>
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

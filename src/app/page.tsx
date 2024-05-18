'use client'
import Tasks from './components/Tasks/page'
import { UseGlobalState } from './context/globalProvider';

export default function Home() {
  const {tasks} = UseGlobalState()
  return (
    <Tasks title='All Tasks' tasks={tasks}/>
  );
}

import { useEffect, useState } from 'react';

function useLightState<S>(key: string, value: S): [S, React.Dispatch<React.SetStateAction<S>>];

function useLightState(key: string, defaultValue: any) {
  // 从 localStorage 获取初始值，若无则使用 defaultValue
  const initialVal = localStorage.getItem(key) || defaultValue;
  // 创建状态和状态更新函数
  const [state, setState] = useState(initialVal);

  // 监听状态变化，将状态数据存入 localStorage
  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

export default useLightState;

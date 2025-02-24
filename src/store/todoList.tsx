import { createSlice } from '@reduxjs/toolkit';

interface DataType {
  key: string;
  event_name: string;
  desc: string;
  status: number,
  start_time: string;
  end_time: string;
}

const data: DataType[] = [
  {
    key: '焚香',
    event_name: "焚香",
    desc: "用两元防风打火机燃上一支兰州",
    status: 0,
    start_time: "2023-07-17 11:41:36",
    end_time: "2023-07-17 11:45:36",
  }, {
    key: '抚琴',
    event_name: "抚琴",
    desc: "开一局LOL并打开所有人聊天，敲击着拼多多砍得机械键盘与对面疯狂互动",
    status: 0,
    start_time: "2023-07-18 18:40:36",
    end_time: "2023-07-17 18:45:36",
  },
  {
    key: '品茗',
    event_name: "品茗",
    desc: "使用美团外卖点一杯古茗奶茶细细品味",
    status: 0,
    start_time: "2023-07-18 18:40:36",
    end_time: "2023-07-17 18:45:36",
  },
];

if (!localStorage.isRun) {
  localStorage.todoList = JSON.stringify(data);
  localStorage.isRun = true
}

const updateStorage = (data: DataType[]) => { localStorage.todoList = JSON.stringify(data) }

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    data: JSON.parse(localStorage.todoList),
  },
  reducers: {
    addTableData: (state, action) => {
      state.data.push({
        ...action.payload,
        key: action.payload.event_name
      });
      updateStorage(state.data)
    },
    deleteTableData: (state, action) => {
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].key === action.payload) {
          state.data.splice(i, 1);
          break
        }
      }
      updateStorage(state.data)
    },
    updateTableDataStatus: (state, action) => {
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].key === action.payload.key) {
          state.data[i].status = action.payload.status
          break
        }
      }
      updateStorage(state.data)
    },
    searchTableData: (state, action) => {
      if (action.payload.event_name || [0, 1].includes(action.payload.status)) {
        const data = state.data.filter((v: DataType) => v.event_name === action.payload.event_name || v.status === action.payload.status)
        state.data = data
      } else {
        state.data = JSON.parse(localStorage.todoList)
      }
    }
  }
})

export const { addTableData, deleteTableData, updateTableDataStatus, searchTableData } = todoListSlice.actions



export default todoListSlice
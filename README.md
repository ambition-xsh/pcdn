##  vite + react18 + ts + react-router-dom6 + redux + antd

# install
```js
node version >= 16.19.0

npm install

npm run dev
```


* 实现一个todoList覆盖react开发的核心技术`（组件通信，数据共享，路由跳转，状态更新，状态持久化）`


# 实践react18新特性

## setState批处理

1. 17跟18版本对比在react合成事件中都会进行批处理，区别在于js原生异步事件中17版本无法进行批处理，18则优化了这个点。

2. 批处理是一个破坏性改动，如果你想退出批量更新，你可以使用 flushSync，flushSync 函数内部的多个 setState 仍然为批量更新，这样可以精准控制哪些不需要的批量更新。

```js
import React, { useState } from 'react';

let render_count = 0;

const App: React.FC = () => {
  render_count++
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <button
      onClick={() => {
      setTimeout(() => {
          setCount1(count => count + 1);
          setCount2(count => count + 1);
        });
      }}
    >
      count1 is {count1}, count2 is {count2} render_count is {render_count}
    </button>
  );
};

export default App;
```

## 合并更新
1. 在react18之前状态的更新是没有优先级之分的（或者可以说都是紧急的），react18提供了startTransition与useDeferredValue实现了更新优先级，如果在更新过程中遇到更高优先级的优先级底的更新会被终止。
2. useDeferredValue的作用和useTransition一致，都是用于在不阻塞UI的情况下更新状态。但是使用场景不同。
3. useTransition是让你能够完全控制哪个更新操作应该以一个比较低的优先级被调度。但是，在某些情况下，可能无法访问实际的更新操作（例如，状态是从父组件上传下来的）。这时候，就可以使用useDeferredValue来代替。

### 不使用并发更新
```js
 <div>
  <Input
    value={value}
    onChange={(e) => {
      setInputValue(e.target.value);
      setContent(e.target.value);
    }}
  />
  </div>
  {content && <div style={{ height: "200px", overflow: 'scroll' }}>
    {Array.from(new Array(30000)).map((_, index) => (
      <div key={index}>{content}</div>
    ))}
  </div>}
```

### 使用并发更新之startTransition
```js
<div>
  <Input
    value={value}
    onChange={(e) => {
      setInputValue(e.target.value);
      // 降低 setContent2 的更新优先级
      startTransition(() => {
        setContent2(e.target.value);
      })
    }}
  />
  </div>
  {content && <div style={{ height: "200px", overflow: 'scroll' }}>
    {Array.from(new Array(30000)).map((_, index) => (
      <div key={index}>{content}</div>
    ))}
  </div>}
```

### 使用并发更新之useDeferredValue
```js
let [content3, setContent3] = useState("");
// 延迟更新
content3 = useDeferredValue(content3)

 <div>
  <Input
    value={value}
    onChange={(e) => {
      setInputValue3(e.target.value);
      setContent3(e.target.value);
    }}
  />
  </div>
  {content3 && <div style={{ height: "200px", overflow: 'scroll' }}>
    {Array.from(new Array(30000)).map((_, index) => (
      <div key={index}>{content3}</div>
    ))}
  </div>}
```
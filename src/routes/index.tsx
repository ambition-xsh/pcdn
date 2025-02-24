// import React, { memo } from 'react'
// import { useRoutes } from 'react-router-dom';
// import {
//   DesktopOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import SyntheticEvents from '../pages/SyntheticEvents';

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
//   type?: 'group',
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   } as MenuItem;
// }

// const router_list = [
//   {
//     path: "/",
//     element: <SyntheticEvents />,
//     label: "合成事件",
//     icon: <DesktopOutlined />,
//     children: [],
//     type: 'group'
//   },
// ];

// const items: any = router_list.map(({ label, path, icon }) => {
//   return getItem(label, path, icon)
// })


// const DefineRoutes = memo(() => {
//   const router = useRoutes(router_list);
//   return router
// })

// export {
//   items
// }

// export default DefineRoutes
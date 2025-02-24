// "use server"

// import type { DeviceStatus, DeviceBindingResponse } from "./types/device"


// // 辅助函数：生成随机布尔值
// // function randomBool(): boolean {
// //   return Math.random() < 0.5
// // }

// // 辅助函数：生成随机字符串
// // function randomString(length: number): string {
// //   return Math.random()
// //     .toString(36)
// //     .substring(2, 2 + length)
// // }

// // 调接口查询设备状态 ID 激活状态 绑定状态
// export async function checkDeviceStatus(sn: string): Promise<DeviceStatus> {
//   // GET(`${queryBySn}?sn_code=${sn}`, '').then((res: any) => {
//   //   console.log(res);
//   // })
//   const res = await fetch(`https://www-test4.titannet.io/api/network/sn_code=${sn}`);
//   const data = res.json();
//   console.log('data',data)
//   // const isOnline = randomBool()
//   // const isActivated = randomBool()
//   // const isBound = isActivated && randomBool()
//   const isOnline = true
//   const isActivated = true
//   const isBound = false
//   const agentId = 'qrrwerw'

//   return {
//     isOnline,
//     isBound,
//     isActivated,
//     serialNumber: sn,
//     agentId,
//   }
// }

// // 调接口设备绑定 传 ID SN KEY
// export async function bindDevice(sn: string, key: string): Promise<DeviceBindingResponse> {
//   console.log('sn', sn)
//   console.log('key', key)

//   // POST(bindBySnAndKey, { sn, key }).then((res: any) => {
//   //   console.log(res);
//   // })

//   const scenarios: DeviceBindingResponse[] = [
//     { success: true, message: "恭喜您，设备绑定成功！" },
//     { success: false, message: "抱歉，该设备已被绑定，请尝试其他设备。" },
//     { success: false, message: "无效的Key，请确保输入正确的设备Key。" },
//     { success: false, message: "网络错误，请检查您的网络连接并重试。" },
//     { success: false, message: "系统错误，请稍后重试。" },
//   ]

//   return scenarios[0]
// }


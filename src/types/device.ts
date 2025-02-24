export interface DeviceStatus {
  isOnline: number
  isBound: boolean
  isActivated: boolean
  sn: string
  node_id: string
}

export interface DeviceBindingResponse {
  success: boolean
  message: string
}

export interface DynamicObject {
  [key: string]: string;
}
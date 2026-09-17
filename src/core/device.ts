export interface DeviceProofEvent {
  deviceId: string
  eventType: string
  recordedAt: string
  integrityStatus: 'trusted' | 'pending' | 'revoked'
}

export function recordDeviceEvent(deviceId: string, eventType: string): DeviceProofEvent {
  return {
    deviceId,
    eventType,
    recordedAt: new Date().toISOString(),
    integrityStatus: 'pending',
  }
}

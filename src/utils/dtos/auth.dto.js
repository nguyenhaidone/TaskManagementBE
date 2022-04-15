import { plan, permission } from '*/utils/constants'

const registerDto = (data) => {
  const dataMapping = {
    email: data.email || '',
    password: data.password || '',
    fullname: data.fullname || '',
    address: data.address || '',
    phoneNumber: data.phoneNumber || '',
    avatar: data.avatar || '',
    dateOfBirth: data.dateOfBirth || new Date('1900-01-01'),
    createdAt: data.createdAt || new Date('1900-01-01'),
    plan: data.plan || plan.free,
    permission: data.permission || permission.normal_user,
    metadata: data.metadata || { key: '', value: '' },
    private_metadata: data.private_metadata || { key: '', value: '' },
    isActive: data.isActive || true,
    refreshToken: data.refreshToken || ''
  }
  return dataMapping
}

const loginDto = (data) => {
  const dataMapping = {
    email: data.email || '',
    password: data.password || ''
  }
  return dataMapping
}

export const authDto = { registerDto, loginDto }

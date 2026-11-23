import api from './api'

export const getOverview = async () => {
  const response = await api.get('/admin/analytics/overview')
  return response.data.data
}

export const getApplicationsByStatus = async () => {
  const response = await api.get('/admin/analytics/applications-by-status')
  return response.data.data
}

export const getTopCompanies = async () => {
  const response = await api.get('/admin/analytics/top-companies')
  return response.data.data
}

export const getBranchStatistics = async () => {
  const response = await api.get('/admin/analytics/branch-statistics')
  return response.data.data
}
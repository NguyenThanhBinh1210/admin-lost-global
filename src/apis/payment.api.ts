import http from '~/utils/http'

export const getPayment = () => http.get('v1/payment/get-payment')
export const searchPayment = (name: string) => http.get(`/v1/payment/search?bankName=${name}`)
export const deletePayment = (id: string) => http.delete(`v1/payment/delete/${id}`)
export const updatePayment = (id: string, body: any) => http.patch(`v1/payment/update/${id}`, body)
export const createPayment = (body: any) => http.post('v1/payment/create', body)

export const AllHistory = (params: any) => http.get('/v1/wallet/all-history', { params })
export const UpdateHistory = (id: any) => http.patch(`/v1/wallet/update-history?id=${id}`)

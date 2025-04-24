import cafeLumiereApi from '@/api/cafe-lumiere.api'

export const deleteOrderAction = async (id: string) => {
  await cafeLumiereApi.delete(`/orders/${id}`)
  return
}

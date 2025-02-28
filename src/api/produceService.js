import api from './axios'

export default {
  getAll() {
    return api.get('produce/get_Produces/') // Django's default list endpoint
  },

  getById(id) {
    return api.get(`/produce/${id}/`) // Default retrieve endpoint
  },

  getCustomList() {
    return api.get('/produce/get_produce/') // Calls `get_produce` action
  },

  create(produceData) {
    return api.post('/produce/', produceData) // Default create
  },

  addCustomProduce(produceData) {
    return api.post('/produce/add_produce/', produceData) // Calls `add_produce` action
  },

  update(id, produceData) {
    return api.put(`/produce/${id}/`, produceData) // Default update
  },

  delete(id) {
    return api.delete(`/produce/${id}/`) // Default delete
  },
}

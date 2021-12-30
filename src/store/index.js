import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: 'myjmj',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
      state.inputValue = val
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ""
    },
    delItem (state, id) {
      // 根据id查找对应项的索引
      const i =  state.list.findIndex(x => x.id === id)
      // 根据索引删除对应的元素
      if (i != -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus (state, param) {
      const i =  state.list.findIndex(x => x.id === param.id)
      if (i != -1) {
        state.list[i].done = param.status
      }
    },
    clearDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey (state, key) {
      state.viewKey = key
    }

  },
  actions: {
    getList (context) {
      axios.get('/list.json').then((data) => {
        console.log(data)
        context.commit('initList', data.data)
      })

    }
  },
  modules: {
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'unDone') {
        return state.list.filter(x => !x.done)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      } else {
        return state.list
      }
    }
  }
})

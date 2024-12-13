import moment from 'moment'

export const useFilterTime = computed(() => {
  return (time: string) => {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  }
})

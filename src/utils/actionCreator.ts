export default function createAction<P>(actionType: string) {
  return (payload?: P) => ({
    type: actionType,
    payload,
  })
}

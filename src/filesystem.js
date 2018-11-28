import { FileSystem } from 'expo'

const file = `file://${FileSystem.documentDirectory}/campaigns.json`

export async function save(store) {
  return await FileSystem.writeAsStringAsync(file, JSON.stringify(store.data))
}

export async function load(store) {
  const info = await FileSystem.getInfoAsync(file)
  if (info.exists) {
    const data = await FileSystem.readAsStringAsync(file)
    return store.load(JSON.parse(data))
  }
  return false
}

import * as FileSystem from 'expo-file-system'

const file = `file://${FileSystem.documentDirectory}/campaigns.json`

export async function save(store) {
  return await FileSystem.writeAsStringAsync(file, JSON.stringify(store.data))
}

export async function load(store) {
  const info = await FileSystem.getInfoAsync(file)
  if (info.exists) {
    const data = await FileSystem.readAsStringAsync(file)
    try {
      return store.load(JSON.parse(data))
    } catch (e) {
      // make a copy of the store
      await FileSystem.writeAsStringAsync(`${file}.bak`, data)
      throw e // rethrow error so it can be handled by the UI
    }
  }
  return false
}

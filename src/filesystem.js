import Expo from 'expo'

const file = `file://${Expo.FileSystem.documentDirectory}/campaigns.json`

export async function save(store) {
  return await Expo.FileSystem.writeAsStringAsync(
    file,
    JSON.stringify(store.data)
  )
}

export async function load(store) {
  const info = await Expo.FileSystem.getInfoAsync(file)
  if (info.exists) {
    const data = await Expo.FileSystem.readAsStringAsync(file)
    return store.load(JSON.parse(data))
  }
  return false
}

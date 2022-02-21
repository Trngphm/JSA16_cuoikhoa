
const getAPI = async () => {
  const res = await fetch (
    "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/"
  )
  const data = await res.json()
  return data
  
}
import axios from "axios"



export const getApiwithToken = async (url) => {
  console.log(url)
  try {
    let response = await axios.get(url,{
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOTUsInByaW1hcnlfaWQiOjE5NSwibmFtZSI6IkFuYXMgQWhtZWQiLCJpbWFnZV91cmwiOiJodHRwczovL2RyaXZlLmdvb2dsZS5jb20vdWM_ZXhwb3J0PXZpZXcmaWQ9MVc4VDN2Qm9jVk9PM3FQSFNYQlpUaFRTTUJ5Z0JGemZ6IiwidHlwZSI6ImVtcGxveWVlIiwiZ2VuZGVyIjoiMCIsInN0YXR1c19pZCI6MSwic2Vjb25kYXJ5X251bWJlciI6IjAzMzMzNzQxODgxIiwicHJpbWFyeV9udW1iZXIiOiIwMzMyMjczMTY2MyIsInVzZXJzdGF0dXMiOnsibmFtZSI6IkFjdGl2ZSIsIm1lc3NhZ2UiOiJXZWxjb21lIFRvIENybSJ9LCJyZW1vdGVXb3JrIjoiMCIsImlwIjpbeyJpZCI6MSwiaXAiOiI1OS4xMDMuMTM4LjEzNSJ9LHsiaWQiOjcsImlwIjoiNTkxIC4gMDMxIC4gMzgxIC4gMzUifSx7ImlkIjo4LCJpcCI6Ijo6ZmZmZjoxMTUuMTg2LjQuMTU4In0seyJpZCI6OSwiaXAiOiIxMTUgLiAxODYgLiA0MTUgLiA4In0seyJpZCI6MTAsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxMSwiaXAiOiI3ODYuNzg1LjI1NS4xMzMifSx7ImlkIjoxMiwiaXAiOiI4OC45OS41NTUuNjY2In0seyJpZCI6MTQsImlwIjoiOjpmZmZmOjU5LjEwMy4xMzguNDgifSx7ImlkIjoxNSwiaXAiOiJzNDU0MzU0MzU0In0seyJpZCI6MTYsImlwIjoiMzI0IC4gMzI1IC4gMzI1IC4gMzI1In0seyJpZCI6MTcsImlwIjoiMTkzLjE3Ni44NC4xNTcifSx7ImlkIjoxOCwiaXAiOiI6OmZmZmY6MjAyLjQ3LjQ0LjUxIn0seyJpZCI6MTksImlwIjoiMjAyLjQ3LjQ0LjUxIn0seyJpZCI6MjAsImlwIjoiMTEzLjIwMy4yMDUuMTM3In0seyJpZCI6MjEsImlwIjoiOjpmZmZmOjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIyLCJpcCI6IjExMy4yMDMuMjA1LjEzNyJ9LHsiaWQiOjIzLCJpcCI6Ijo6ZmZmZjoxMTMuMjAzLjIwNS4xMzcifV0sInNoaWZ0TmFtZSI6Ik5ldyBhZnRlcm5vb24gU2hpZnQiLCJzaGlmdFN0YXJ0IjoiMTI6MDA6UE0iLCJzaGlmdEVuZCI6IjA4OjUwOlBNIiwic2hpZnRIb3VycyI6IjA4OjUwOjAwIiwic2hpZnRCcmVhayI6IjAxOjAwOjAwIiwic2hpZnRXb3JraW5nSG91cnMiOiIwNzo1MDowMCIsImVtcGxveWVlX3R5cGUiOiJtZW1iZXIiLCJzZWNvbmRhcnlfaWQiOjYxMCwiYnJlYWsiOiJmYWxzZSIsIk9mZmljaWFsYnJlYWsiOiJmYWxzZSJ9LCJpYXQiOjE2NDY2NDI5MTAsImV4cCI6MTY1MDA1NTcxMH0.whUlkp2ZsN9HYXr5WKEtt_qhi_DSwZq-b7gdLtE_KpE'
        }
  })
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    return Promise.reject(e)
  }
}


export const PostApiWithToken = async (url, bodyParameters) => {

  console.log("url", url)
  console.log("data", data)

  try {
    let response = await axios.post(url,bodyParameters,config)
    console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    return Promise.reject(e)
  }
}



module.exports = {
  getApiwithToken,
  PostApiWithToken
}

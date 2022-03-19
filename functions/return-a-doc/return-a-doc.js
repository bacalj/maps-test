const fetch = require('node-fetch')
const process = require('process')

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const theKey = process.env.GOOGLE_KEY

console.log("THE KEY: ", theKey)

const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];


const handler = async function () {
  try {
    const response = await fetch('https://icanhazdadjoke.com', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
    console.log(data)
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }

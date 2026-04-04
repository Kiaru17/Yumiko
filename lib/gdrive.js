import { join } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import { promisify } from 'util'
import { EventEmitter } from 'events'
import { google } from 'googleapis'

const __dirname = dirname(fileURLToPath(import.meta.url))

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = join(__dirname, '..', 'token.json')
const PORT = 3000 // Puerto por defecto para OAuth2

class GoogleAuth extends EventEmitter {
  constructor() {
    super()
    this.oAuth2Client = null
  }

  async authorize(credentials) {
    let token
    const { client_secret, client_id } = credentials
    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, `http://localhost:${PORT}`)
    try {
      token = JSON.parse(await fs.readFile(TOKEN_PATH, 'utf-8'))
    } catch (e) {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      })
      this.emit('auth', authUrl)
      let code = await new Promise((resolve) => {
        this.once('token', resolve)
      })
      const response = await this.oAuth2Client.getToken(code)
      token = response.tokens
      await fs.writeFile(TOKEN_PATH, JSON.stringify(token))
    }
    try {
      await this.oAuth2Client.setCredentials(token)
    } catch (e) {
      console.error('Error setting credentials:', e)
    }
  }

  token(code) {
    this.emit('token', code)
  }
}

class GoogleDrive extends GoogleAuth {
  constructor() {
    super()
    this.path = '/drive/api'
  }

  /**
   * Get Folder ID by path
   * @param {String} path Folder path
   * @returns {Promise<String>} Folder ID
   */
  async getFolderID(path) {
    try {
      if (!this.oAuth2Client) throw new Error('Not authenticated')
      // TODO: Implement folder ID retrieval
      return null
    } catch (e) {
      console.error('Error getting folder ID:', e)
      throw e
    }
  }

  /**
   * Get file information
   * @param {String} path File path
   * @returns {Promise<Object>} File information
   */
  async infoFile(path) {
    try {
      if (!this.oAuth2Client) throw new Error('Not authenticated')
      // TODO: Implement file info retrieval
      return null
    } catch (e) {
      console.error('Error getting file info:', e)
      throw e
    }
  }

  /**
   * List files in folder
   * @param {String} path Folder path
   * @returns {Promise<Array>} List of files
   */
  async folderList(path) {
    try {
      if (!this.oAuth2Client) throw new Error('Not authenticated')
      // TODO: Implement folder listing
      return []
    } catch (e) {
      console.error('Error listing folder:', e)
      throw e
    }
  }

  /**
   * Download file from Google Drive
   * @param {String} path File path
   * @returns {Promise<Buffer>} File buffer
   */
  async downloadFile(path) {
    try {
      if (!this.oAuth2Client) throw new Error('Not authenticated')
      // TODO: Implement file download
      return null
    } catch (e) {
      console.error('Error downloading file:', e)
      throw e
    }
  }

  /**
   * Upload file to Google Drive
   * @param {String} path File path
   * @returns {Promise<Object>} Upload result
   */
  async uploadFile(path) {
    try {
      if (!this.oAuth2Client) throw new Error('Not authenticated')
      // TODO: Implement file upload
      return null
    } catch (e) {
      console.error('Error uploading file:', e)
      throw e
    }
  }
}

export {
  GoogleAuth,
  GoogleDrive
}
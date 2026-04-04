let stdouts = []
let isModified = false
let disable = null

/**
 * Initialize log capturing system
 * @param {Number} maxLength Maximum number of log entries to keep in memory
 * @returns {Object} Object with disable function and logs
 */
export default (maxLength = 200) => {
  let oldWrite = process.stdout.write.bind(process.stdout)
  
  disable = () => {
    isModified = false
    process.stdout.write = oldWrite
    return oldWrite
  }
  
  process.stdout.write = (chunk, encoding, callback) => {
    try {
      stdouts.push(Buffer.from(chunk, encoding))
      oldWrite(chunk, encoding, callback)
      if (stdouts.length > maxLength) stdouts.shift()
    } catch (e) {
      console.error('Error in stdout capture:', e)
      oldWrite(chunk, encoding, callback)
    }
  }
  
  isModified = true
  
  return {
    disable,
    logs: () => Buffer.concat(stdouts),
    isModified: () => isModified,
    clear: () => {
      stdouts = []
    }
  }
}

/**
 * Get current log state
 * @returns {Boolean} Whether logs are being captured
 */
export function getIsModified() {
  return isModified
}

/**
 * Get all captured logs
 * @returns {Buffer} Concatenated buffer of all logs
 */
export function logs() {
  return Buffer.concat(stdouts)
}

/**
 * Clear all captured logs
 */
export function clearLogs() {
  stdouts = []
}
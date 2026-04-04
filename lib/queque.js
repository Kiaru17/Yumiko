import { EventEmitter } from 'events'

/**
 * Validate if value is a valid number
 * @param {*} x Value to check
 * @returns {Boolean} True if valid number
 */
const isNumber = x => typeof x === 'number' && !isNaN(x)

/**
 * Delay execution for specified milliseconds
 * @param {Number} ms Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after delay
 */
const delay = ms => {
  if (!isNumber(ms)) {
    return Promise.reject(new Error('Delay must be a valid number'))
  }
  return new Promise(resolve => setTimeout(resolve, ms))
}

const QUEUE_DELAY = 5 * 1000

/**
 * Queue manager using Set data structure
 * Extends EventEmitter for event handling
 */
export default class Queue extends EventEmitter {
  _queue = new Set()

  constructor() {
    super()
  }

  /**
   * Add item to queue
   * @param {*} item Item to add
   */
  add(item) {
    this._queue.add(item)
  }

  /**
   * Check if item exists in queue
   * @param {*} item Item to check
   * @returns {Boolean} True if item exists
   */
  has(item) {
    return this._queue.has(item)
  }

  /**
   * Delete item from queue
   * @param {*} item Item to delete
   */
  delete(item) {
    this._queue.delete(item)
  }

  /**
   * Get first item in queue
   * @returns {*} First item or undefined
   */
  first() {
    return [...this._queue][0]
  }

  /**
   * Check if item is first in queue
   * @param {*} item Item to check
   * @returns {Boolean} True if item is first
   */
  isFirst(item) {
    return this.first() === item
  }

  /**
   * Get last item in queue
   * @returns {*} Last item or undefined
   */
  last() {
    return [...this._queue][this._queue.size - 1]
  }

  /**
   * Check if item is last in queue
   * @param {*} item Item to check
   * @returns {Boolean} True if item is last
   */
  isLast(item) {
    return this.last() === item
  }

  /**
   * Get index of item in queue
   * @param {*} item Item to find
   * @returns {Number} Index of item or -1 if not found
   */
  getIndex(item) {
    return [...this._queue].indexOf(item)
  }

  /**
   * Get current queue size
   * @returns {Number} Number of items in queue
   */
  getSize() {
    return this._queue.size
  }

  /**
   * Check if queue is empty
   * @returns {Boolean} True if queue is empty
   */
  isEmpty() {
    return this.getSize() === 0
  }

  /**
   * Remove item from queue
   * @param {*} item Item to remove (optional, defaults to first)
   * @throws {Error} If item is not first in queue
   */
  unqueue(item) {
    let queueItem = null

    if (item) {
      if (!this.has(item)) {
        throw new Error(`Item not found in queue`)
      }
      if (!this.isFirst(item)) {
        throw new Error('Item is not first in queue')
      }
      queueItem = item
    } else {
      queueItem = this.first()
    }

    if (queueItem) {
      this.delete(queueItem)
      this.emit('dequeue', queueItem)
    }
  }

  /**
   * Wait for queue processing
   * @param {*} item Item to wait for
   * @returns {Promise<void>} Promise that resolves when item is processed
   * @throws {Error} If item not found in queue
   */
  async waitQueue(item) {
    if (!this.has(item)) {
      throw new Error('Item not found in queue')
    }

    return new Promise((resolve, reject) => {
      const process = async (removeItem = false) => {
        try {
          await delay(QUEUE_DELAY)
          if (removeItem) {
            this.unqueue(item)
          }
          if (!this.isEmpty()) {
            this.unqueue()
          }
          resolve()
        } catch (e) {
          reject(e)
        }
      }

      if (this.isFirst(item)) {
        process(true).catch(reject)
      } else {
        this.once(item, () => process().catch(reject))
      }
    })
  }
}
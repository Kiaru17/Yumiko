import mongoose from 'mongoose'

const { Schema, connect, model: _model } = mongoose
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true }

/**
 * MongoDB adapter for single collection storage
 */
export class MongoDB {
  constructor(url, options = defaultOptions) {
    /**
     * @type {string}
     */
    this.url = url
    /**
     * @type {mongoose.ConnectOptions}
     */
    this.options = options
    this.data = this._data = {}
    /**
     * @type {mongoose.Schema}
     */
    this._schema = {}
    /**
     * @type {mongoose.Model}
     */
    this._model = {}
    /**
     * @type {Promise<typeof mongoose>}
     */
    this.db = connect(this.url, { ...this.options }).catch(console.error)
  }

  async read() {
    try {
      this.conn = await this.db
      let schema = this._schema = new Schema({
        data: {
          type: Object,
          required: true,
          default: {}
        }
      })
      try {
        this._model = _model('data', schema)
      } catch (e) {
        this._model = _model('data')
      }
      this._data = await this._model.findOne({})
      if (!this._data) {
        this.data = {}
        const [_, _data] = await Promise.all([
          this.write(this.data),
          this._model.findOne({})
        ])
        this._data = _data
      } else {
        this.data = this._data.data
      }
      return this.data
    } catch (e) {
      console.error('Error reading from MongoDB:', e)
      throw e
    }
  }

  async write(data) {
    try {
      if (!data) throw new Error('Data cannot be null or undefined')
      if (!this._data) {
        const newDoc = new this._model({ data })
        await newDoc.save()
        return newDoc
      }
      const doc = await this._model.findById(this._data._id)
      if (!doc) throw new Error('Document not found')
      if (!doc.data) doc.data = {}
      doc.data = data
      this.data = data
      await doc.save()
      return doc
    } catch (e) {
      console.error('Error writing to MongoDB:', e)
      throw e
    }
  }
}

/**
 * MongoDB adapter for multiple collections storage
 */
export class MongoDBV2 {
  constructor(url, options = defaultOptions) {
    /**
     * @type {string}
     */
    this.url = url
    /**
     * @type {mongoose.ConnectOptions}
     */
    this.options = options
    /**
     * @type {{ name: string, model: mongoose.Model}[]}
     */
    this.models = []
    /**
     * @type {{ [Key: string]: any }}
     */
    this.data = {}
    /**
     * @type {mongoose.Model}
     */
    this.list = null
    /**
     * @type {any}
     */
    this.lists = null
    /**
     * @type {Promise<typeof mongoose>}
     */
    this.db = connect(this.url, { ...this.options }).catch(console.error)
  }

  async read() {
    try {
      this.conn = await this.db
      let schema = new Schema({
        data: [{
          name: String
        }]
      })
      try {
        this.list = _model('lists', schema)
      } catch (e) {
        this.list = _model('lists')
      }
      this.lists = await this.list.findOne({})
      if (!this.lists?.data || this.lists.data.length === 0) {
        await this.list.create({ data: [] })
        this.lists = await this.list.findOne({})
      }
      let garbage = []
      for (let { name } of this.lists.data) {
        /**
         * @type {mongoose.Model}
         */
        let collection
        try {
          collection = _model(name, new Schema({ data: Array }))
        } catch (e) {
          console.error('Error creating model:', e)
          try {
            collection = _model(name)
          } catch (e) {
            garbage.push(name)
            console.error('Error retrieving model:', e)
          }
        }
        if (collection) {
          this.models.push({ name, model: collection })
          let collectionsData = await collection.find({})
          this.data[name] = Object.fromEntries(collectionsData.map(v => v.data))
        }
      }
      try {
        let del = await this.list.findById(this.lists._id)
        del.data = del.data.filter(v => !garbage.includes(v.name))
        await del.save()
      } catch (e) {
        console.error('Error updating list:', e)
      }
      return this.data
    } catch (e) {
      console.error('Error reading from MongoDB:', e)
      throw e
    }
  }

  async write(data) {
    try {
      if (!this.lists || !data) throw new Error('Lists or data is missing')
      let collections = Object.keys(data), listDoc = []
      
      for (let key of collections) {
        if ((index = this.models.findIndex(v => v.name === key)) !== -1) {
          let doc = this.models[index].model
          await doc.deleteMany().catch(console.error)
          await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })))
          if (doc && key) listDoc.push({ name: key })
        } else {
          let schema = new Schema({
            data: Array
          })
          /**
           * @type {mongoose.Model}
           */
          let doc
          try {
            doc = _model(key, schema)
          } catch (e) {
            console.error('Error creating new model:', e)
            doc = _model(key)
          }
          let index = this.models.findIndex(v => v.name === key)
          this.models[index === -1 ? this.models.length : index] = { name: key, model: doc }
          await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })))
          if (doc && key) listDoc.push({ name: key })
        }
      }

      const listDoc2 = await this.list.findById(this.lists._id)
      if (!listDoc2) throw new Error('List document not found')
      listDoc2.data = listDoc
      await listDoc2.save()
      return true
    } catch (e) {
      console.error('Error writing to MongoDB:', e)
      throw e
    }
  }
}
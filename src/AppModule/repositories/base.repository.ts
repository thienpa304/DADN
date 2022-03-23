import { Injectable } from '@nestjs/common'
import { pick } from 'lodash'
import { Model, Document, QueryOptions } from 'mongoose'
import { AnyCatcher } from 'rxjs/internal/AnyCatcher'

@Injectable()
export class BaseRepository<T> {
  private _model: Model<Document>

  constructor(schemaModel: Model<Document<T>>) {
    this._model = schemaModel
  }
  public async findAll() {
    const item = await this._model.find({})

    return item
  }
  public async findById(id: string): Promise<T> {
    const item = await this._model.findById(id).exec()

    return item?.toObject<T>() ?? null
  }

  public async findOne(options?: {
    filter?: any
    selectedFields?: Array<string>
  }): Promise<T> {
    const { filter, selectedFields } = options ?? {}

    const query = this._model.findOne(filter)

    if (selectedFields?.length) {
      query.select(selectedFields.join(' '))
    }

    const item = await query.exec()

    return item?.toObject<T>() ?? null
  }

  public async create(data: Partial<T>): Promise<T> {
    const item = await this._model.create(data)

    return item.toObject<T>()
  }

  public async count(filter: any): Promise<number> {
    return await this._model.countDocuments(filter)
  }

  private populate(
    query: any,
    populates?: Array<{
      collection: string
      fields: Array<string>
    }>,
  ) {
    populates.forEach((populate) => {
      if (populate.collection) {
        let populateObj = { path: populate.collection }

        if (populate.fields) {
          populateObj['select'] = populate.fields.join(' ')
        }

        query = query.populate(populateObj)
      }
    })
  }

  public async find(options: {
    offset?: number
    limit?: number
    filter?: any
    sort?: any

    selectedFields?: Array<string>
    populates?: Array<{
      collection: string
      fields: Array<string>
    }>
  }): Promise<{
    total: number
    items: T[]
  }> {
    const {
      offset,
      limit = 10,
      filter,
      sort,
      selectedFields,
      populates,
    } = options ?? {}

    const query = this._model.find(filter)

    if (sort) {
      query.sort(sort)
    }

    if (offset) {
      query.skip((offset - 1) * limit)
      query.limit(limit)
    }

    if (selectedFields) {
      query.select(selectedFields.join(' '))
    }

    if (populates) {
      this.populate(query, populates)
    }

    const items = await query.exec()

    const total = await this._model.countDocuments(filter)

    return {
      total,
      items: items.map((item) => item.toObject<T>()) ?? [],
    }
  }

  public async updateById(
    id: string,
    data: Partial<T>,
    options?: QueryOptions,
  ): Promise<T> {
    const item = await this._model.findByIdAndUpdate(id, data, options).exec()

    return item?.toObject<T>() ?? null
  }
  public async update(filter: Partial<T>, data: Partial<T>): Promise<T> {
    const item = await this._model.findOneAndUpdate(filter, data).exec()

    return item?.toObject<T>() ?? null
  }

  public async updateMany(filter: Partial<T>, data: Partial<T>): Promise<void> {
    await this._model.updateMany(filter, data).exec()
  }

  public async deleteById(id: string): Promise<T> {
    const item = await this._model.findByIdAndDelete(id).exec()

    return item?.toObject<T>() ?? null
  }

  public async delete(filter: Partial<T>): Promise<T> {
    const item = await this._model.findOneAndDelete(filter).exec()

    return item?.toObject<T>() ?? null
  }

  public async bulkUpsert(
    docs: any[],
    upsert?: {
      conditions?: Array<string>
      operator?: string
      selectedFields?: Array<string>
    },
  ): Promise<void> {
    let { selectedFields, conditions, operator = 'set' } = upsert ?? {}

    try {
      docs = docs?.map((doc) => {
        return {
          updateOne: {
            filter: pick(doc, conditions ?? ['id']),
            update: {
              [`$${operator}`]: selectedFields
                ? pick(doc, selectedFields)
                : doc,
            },
            upsert: true,
          },
        }
      })

      await this._model.bulkWrite(docs)
    } catch (ex) {
      throw ex
    }
  }

  public async bulkWrite(data: Array<object>): Promise<void> {
    await this._model.bulkWrite(data)
  }

  public async aggregate(pipelines: any): Promise<Array<any>> {
    return await this._model.aggregate(pipelines).allowDiskUse(true).exec()
  }
}

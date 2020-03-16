"use strict";
import * as models from "../models";
export class BaseEntity {

	protected modelName: ModelNames;
    constructor(modelName) {
        this.modelName = modelName
    }

	async save(data: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await new ModelName(data).save();
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async find(query: any, projection: any, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.find(query, projection, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async distinct(path: string, query: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.distinct(path, query);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async findOne(query: any, projection: any, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.findOne(query, projection, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async findOneAndUpdate(query: any, update: any, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.findOneAndUpdate(query, update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async findAndRemove(query: any, update: any, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.findOneAndRemove(query, update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async update(query: any, update: any, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.update(query, update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async remove(query: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.remove(query);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async populateOne(query: any, projection: any, options: any, collectionOptions) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.findOne(query, projection, options).populate(collectionOptions).exec();
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async count(query: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.count(query);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async aggregate(aggPipe, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			let aggregation: any = ModelName.aggregate(aggPipe).allowDiskUse(true);
			if (options) {
				aggregation.options = options;
			}
			return await aggregation.exec();
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async insert(data, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			let obj = new ModelName(data);
			await obj.save();
			return obj;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async insertMany(data, options?: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.insertMany(data, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async aggregateDataWithPopulate(group, populateOptions) {
		try {
			let ModelName: any = models[this.modelName];
			let aggregate = await ModelName.aggregate(group);
			let populate = await ModelName.populate(aggregate, populateOptions);
			return populate;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async bulkFindAndUpdate(bulk, query: any, update: any, options: any) {
		try {
			return await bulk.find(query).upsert().update(update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async bulkFindAndUpdateOne(bulk, query: any, update: any, options: any) {
		try {
			return await bulk.find(query).upsert().updateOne(update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async findByIdAndUpdate(query: any, update: any, options: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.findByIdAndUpdate(query, update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async create(data: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.create(data);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
     * @name bulkWrite
     * @description Writes bulk data into the database
    */
	async bulkWrite(operations: any[], meta: any) {
		try {
			let ModelName: any = models[this.modelName];
			return await ModelName.bulkWrite(operations, meta);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	async aggregateWithPagination(pipeline?: Array<Object>, limit?: number, page?: number, pageCount = false) {
		try {
			let ModelName: any = models[this.modelName];
			if (limit) {
				limit = Math.abs(limit);

				// If limit exceeds max limit
				if (limit > 100) {
					limit = 100;
				}

			} else {
				limit = 10;
			}
			if (page && (page != 0)) {
				page = Math.abs(page);
			} else {
				page = 1;
			}
			let skip = (limit * (page - 1));
			console.log("skip==========>>", skip, limit);
			let promiseAll = [
				ModelName.aggregate(pipeline).allowDiskUse(true)
			];
			if (pageCount) {
				for (let index = 0; index < pipeline.length; index++) {
					if ('$skip' in pipeline[index]) {
						pipeline = pipeline.slice(0, index);
					} else {
						pipeline = pipeline
					}
				}
				pipeline.push({ $count: "total" });
				promiseAll.push(ModelName.aggregate(pipeline))
			}
			let result = await Promise.all(promiseAll);
			let next_hit = 0;
			let total = 0;
			let total_page = 0;

			if (pageCount) {
				total = result[1] && result[1][0] ? result[1][0]['total'] : 0;
				total_page = Math.ceil(total / limit);
			}

			let data: any = result[0];
			if (result[0].length > limit) {
				next_hit = page + 1;
				data = result[0].slice(0, limit);
			}
			return {
				data: data,
				total: total,
				page: page,
				total_page: total_page,
				next_hit: next_hit,
				limit: limit
			};
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}

	/**
	 * @description Add skip and limit to pipleine
	 */
	async addSkipLimit(limit, page) {
		if (limit) {
			limit = Math.abs(limit);
			// If limit exceeds max limit
			if (limit > 100) {
				limit = 100;
			}

		} else {
			limit = 10;
		}
		if (page && (page != 0)) {
			page = Math.abs(page);
		} else {
			page = 1;
		}
		let skip = (limit * (page - 1));
		return [
			{ $skip: skip },
			{ $limit: limit + 1 }
		]
	}

	async setTotalCountPipline(pipeline) {
		for (let index = 0; index < pipeline.length; index++) {
			if ('$skip' in pipeline[index]) {
				pipeline = pipeline.slice(0, index);
			} else {
				pipeline = pipeline
			}
		}
		return pipeline.push({ $count: "total" });
	}
}
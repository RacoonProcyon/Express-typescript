"use strict";
import { BaseEntity } from "../base.entity";
import * as mongoose from "mongoose";

/**
 * @description User entity module
 */
export class UserEntity extends BaseEntity {

	constructor() {
        super('User')
    }
    async findUser(query: any) {
        try {
            let user:any = await this.findOne(query, {}, {})
            return user;
        } catch (error) {
            console.error('User Entity find', error)
            return Promise.reject(error)
        }
	}
	
	async saveUser(data: any) {
        try {
            let user:any = await this.save(data);
            return user;
        } catch (error) {
            console.error('User Entity createUser', error)
            return Promise.reject(error)
        }
    }
}

export const userEntity = new UserEntity();
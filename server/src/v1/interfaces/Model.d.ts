declare interface Pagination {
	pageNo?: number;
	limit?: number;
}

declare namespace NodeJS {
	export interface Global {
		_redisClient: any;
	}
}

// Model Type For DAO manager
declare type ModelNames =
	"users" 
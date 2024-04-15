/**
 * sqlite数据库
 * @description 仅支持App端
 * @description 一但卸载的App的话sqlite的数据库会一起丢失
 * @Author lqd
 * @Date 2024-04-12 09:26:39
 * @LastEditors lqd
 * @LastEditTime 2024-04-13 16:26:39
 * @link https://www.runoob.com/sqlite/sqlite-tutorial.html
 */
export default {
	dbName: 'dianping_app', // 数据库名称
	dbPath: '_doc/dianping_app.db', // 数据库地址,推荐以下划线为开头   _doc/xxx.db
	/**
	 * 判断数据库是否打开
	 * @description 数据库打开了就返回 true,否则返回 false
	 * @returns Boolean
	 */
	isOpen() {
		var open = plus.sqlite.isOpenDatabase({
			name: this.dbName, // 数据库名称
			path: this.dbPath // 数据库地址
		})
		return open;
	},

	/**
	 * 创建数据库 或 有该数据库就打开
	 * @returns Promise
	 */
	openSqlite() {
		return new Promise((resolve, reject) => {
			// 打开数据库
			plus.sqlite.openDatabase({
				name: this.dbName,
				path: this.dbPath,
				success(e) {
					resolve(e); // 成功回调
				},
				fail(e) {
					reject(e); // 失败回调
				}
			})
		})
	},

	/**
	 * 关闭数据库
	 * @returns Promise
	 */
	closeSqlite() {
		return new Promise((resolve, reject) => {
			plus.sqlite.closeDatabase({
				name: this.dbName,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 * 数据库建表
	 * @description 数据库建表 sql:'CREATE TABLE IF NOT EXISTS dbTable("id" varchar(50),"name" TEXT) 
	 * @description 创建 CREATE TABLE IF NOT EXISTS 、 dbTable 是表名，不能用数字开头、括号里是表格的表头
	 * @param { String } dbTable 表名
	 * @param { String } data sql
	 * @returns 
	 */
	createTable(dbTable, data) {
		return new Promise((resolve, reject) => {
			// executeSql: 执行增删改等操作的SQL语句
			const baseSql = `
			"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			"create_time" DATETIME DEFAULT (datetime('now','localtime')),
			"update_time" DATETIME DEFAULT (datetime('now','localtime')),
			`;
			plus.sqlite.executeSql({
				name: this.dbName,
				sql: `CREATE TABLE IF NOT EXISTS ${dbTable}(${baseSql+data})`,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 * 数据库删表 sql:'DROP TABLE dbTable'
	 * @param {String} dbTable 表名
	 * @returns Promise
	 */
	dropTable(dbTable) {
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: this.dbName,
				sql: `DROP TABLE ${dbTable}`,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 * 向表格里添加数据
	 * @description 向表格里添加数据 sql:'INSERT INTO dbTable VALUES('x','x','x')'   对应新增
	 * @description 或者 sql:'INSERT INTO dbTable ('x','x','x') VALUES('x','x','x')'   具体新增
	 * @description 插入 INSERT INTO  、 dbTable 是表名、根据表头列名插入列值
	 * @param {String} dbTable 表名
	 * @param {String} data sql `'${item.name}','${item.content}','${time}'`
	 * @param {String} condition 字段名称 "'name','content','time'"
	 * @returns Promise
	 */
	insertTableData(dbTable, data, condition) {
		// 判断有没有传参
		if (dbTable !== undefined && data !== undefined) {
			// 判断传的参是否有值
			var bol = (JSON.stringify(data) == "{}");
			if (!bol) {
				if (condition == undefined) {
					var sql = `INSERT INTO ${dbTable} VALUES('${data}')`;
				} else {
					var sql = `INSERT INTO ${dbTable} (${condition}) VALUES(${data})`;
				}
				// console.log(sql);
				return new Promise((resolve, reject) => {
					// 表格添加数据
					plus.sqlite.executeSql({
						name: this.dbName,
						sql: sql,
						success(e) {
							resolve(e);
						},
						fail(e) {
							reject(e);
						}
					})
				})
			} else {
				return new Promise((resolve, reject) => {
					reject("错误添加")
				})
			}
		} else {
			return new Promise((resolve, reject) => {
				reject("错误添加")
			})
		}
	},

	/**
	 * 据条件向表格里添加数据  有数据更新、无数据插入
	 * @description (建表时需要设置主键) 例如 --- "roomid" varchar(50) PRIMARY KEY
	 * @param {String} dbTable 表名
	 * @param {String} data sql `'${item.name}','${item.content}','${time}'`
	 * @param {String} condition 字段名称 "'name','content','time'"
	 * @returns Promise
	 */
	insertOrReplaceData(dbTable, data, condition) {
		// 判断有没有传参
		if (dbTable !== undefined && data !== undefined) {
			if (condition == undefined) {
				var sql = `INSERT OR REPLACE INTO ${dbTable} VALUES('${data}')`;
			} else {
				var sql = `INSERT OR REPLACE INTO ${dbTable} (${condition}) VALUES(${data})`;
			}
			// console.log(sql);
			return new Promise((resolve, reject) => {
				// 表格添加数据
				plus.sqlite.executeSql({
					name: this.dbName,
					sql: sql,
					success(e) {
						resolve(e);
					},
					fail(e) {
						reject(e);
					}
				})
			})
		} else {
			return new Promise((resolve, reject) => {
				reject("错误添加")
			})
		}
	},

	/**
	 * 查询获取数据库里的数据 
	 * sql:'SELECT * FROM dbTable WHERE lname = 'lvalue''
	 * @description 查询 SELECT * FROM 、 dbTable 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
	 * @param {String} dbTable 表名
	 * @param {String} lname lname 是查询条件的列名
	 * @param {String} lvalue lvalue 是查询条件的列值
	 * @param {*} cc 
	 * @param {*} dd 
	 * @returns 
	 */
	selectTableData(dbTable, lname, lvalue, cc, dd) {
		if (dbTable !== undefined) {
			// 第一个是表单名称，后两个参数是列表名，用来检索
			if (lname !== undefined && cc !== undefined) {
				// 两个检索条件
				var sql = `SELECT * FROM ${dbTable} WHERE ${lname} = '${lvalue}' AND ${cc} = '${dd}'`;
			}
			if (lname !== undefined && cc == undefined) {
				// 一个检索条件
				var sql = `SELECT * FROM ${dbTable} WHERE ${lname} = '${lvalue}'`;
				// console.log(sql);
			}
			if (lname == undefined) {
				var sql = `SELECT * FROM ${dbTable}`;
			}
			return new Promise((resolve, reject) => {
				// 表格查询数据  执行查询的SQL语句
				plus.sqlite.selectSql({
					name: this.dbName,
					sql: sql,
					success(e) {
						resolve(e);
					},
					fail(e) {
						reject(e);
					}
				})
			})
		} else {
			return new Promise((resolve, reject) => {
				reject("错误查询")
			});
		}
	},

	/**
	 * 查询所有数据库表名
	 * @returns Promise
	 */
	queryDBTable() {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: this.dbName,
				sql: "select * FROM sqlite_master where type='table'",
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 * 查询表是否存在
	 * @param {*} tabName 表名
	 */
	queryIsTable(tabName) {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: this.dbName,
				sql: `select count(*) as isTable FROM sqlite_master where type='table' and name='${tabName}'`,
				success(e) {
					resolve(e[0].isTable ? true : false);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 *获取数据库分页数据 
	 * @param {*} tabName 
	 * @param {*} num 页码
	 * @param {*} size 页面大小返回条数
	 * @param {*} byName 排序主键字段
	 * @param {*} byType 排序类型 desc倒序 / asc正序
	 */
	async queryDataList(tabName, num, size, byName, byType) {
		let count = 0
		let sql = ''
		let numindex = 0
		await queryCount(tabName).then((resNum) => {
			count = Math.ceil(resNum[0].num / size)
		})
		if (((num - 1) * size) == 0) {
			numindex = 0
		} else {
			numindex = ((num - 1) * size) + 1
		}
		sql = `select * from ${tabName}`
		if (byName && byType) {
			// desc asc
			sql += ` order by ${byName} ${byType}`
		}
		sql += ` limit ${numindex},${size}`
		if (count < num - 1) {
			return new Promise((resolve, reject) => {
				reject("无数据")
			});
		} else {
			return new Promise((resolve, reject) => {
				plus.sqlite.selectSql({
					name: this.dbName,
					// sql: "select * from userInfo limit 3 offset 3",
					sql: sql,
					success(e) {
						resolve(e);
					},
					fail(e) {
						reject(e);
					}
				})
			})
		}
	},

	/**
	 * 查询表数据总条数
	 * @param {String} tabName 表名
	 * @returns Promise
	 */
	queryCount(tabName) {
		return new Promise((resolve, reject) => {
			// 表格查询数据  执行查询的SQL语句
			plus.sqlite.selectSql({
				name: this.dbName,
				sql: "select count(*) as num from " + tabName,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 * 删除表数据
	 * @description  删除表里的数据 sql:'DELETE FROM dbTable WHERE lname = 'lvalue''
	 * @description 删除 DELETE FROM 、 dbTable 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
	 * @param {String} dbTable 是表名、
	 * @param {String} lname lname 是查询条件的列名
	 * @param {String} lvalue lvalue 是查询条件的列值
	 * @param {*} ww 
	 * @param {*} ee 
	 * @returns 
	 */
	deleteTableData(dbTable, lname, lvalue, ww, ee) {
		if (dbTable !== undefined) {
			if (lname == undefined) {
				var sql = `DELETE FROM ${dbTable}`;
			} else {
				if (ww !== undefined) {
					// 两个检索条件
					var sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}' AND ${ww} = '${ee}'`;
				} else {
					// 一个检索条件
					var sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}'`;
				}
			}
			return new Promise((resolve, reject) => {
				// 删除表数据
				plus.sqlite.executeSql({
					name: this.dbName,
					sql: sql,
					success(e) {
						resolve(e);
					},
					fail(e) {
						reject(e);
					}
				})
			})
		} else {
			return new Promise((resolve, reject) => {
				reject("错误删除")
			});
		}
	},

	/**
	 * 修改数据表里的数据
	 * @description sql:"UPDATE dbTable SET 列名 = '列值',列名 = '列值' WHERE lname = 'lvalue'"
	 * @description 修改 UPDATE 、 dbTable 是表名, data: 要修改的列名=修改后列值, lname,lvalue 是查询条件的列名和列值
	 * @param {String} dbTable 表名
	 * @param {String} data  sql 要修改的列名=修改后列值 `content = '我被修改了',time = '${time}'`
	 * @param {String} lname lname 是查询条件的列名
	 * @param {String} lvalue lvalue 是查询条件的列值
	 * @returns Promise
	 */
	updateTableData(dbTable, data, lname, lvalue) {
		const update_time = `update_time = '${this.getCurrentDateTime()}',`
		data = update_time + data
		if (lname == undefined) {
			var sql = `UPDATE ${dbTable} SET ${data}`;
		} else {
			var sql = `UPDATE ${dbTable} SET ${data} WHERE ${lname} = '${lvalue}'`;
		}
		// WHERE 前面是要修改的列名、列值，后面是条件的列名、列值
		return new Promise((resolve, reject) => {
			// 修改表数据
			plus.sqlite.executeSql({
				name: this.dbName,
				sql: sql,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	// 获取指定数据条数  sql:"SELECT * FROM dbTable ORDER BY 'id' DESC LIMIT 15 OFFSET 'num'"
	// dbTable 表名, ORDER BY 代表排序默认正序, id 是排序的条件 DESC 代表倒序，从最后一条数据开始拿
	// LIMIT 15 OFFSET '${num}',这句的意思是跳过 num 条拿 15 条数据, num 为跳过多少条数据是动态值
	// 例 初始num设为0，就从最后的数据开始拿15条，下次不拿刚获取的数据，所以可以让num为15，这样就能一步一步的拿完所有的数据
	pullSQL(dbTable, id, num) {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: this.dbName,
				sql: `SELECT * FROM ${dbTable} ORDER BY '${id}' DESC LIMIT 15 OFFSET '${num}'`,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 * 开启事务
	 * @description 这个就是保证数据的一致性和原子性的，简单点来说，就是在一个事务里面做的多次sql操作，要么都成功，要么都不成功。
	 * @description 需要注意的是，开启事务后得记住关闭事务，要么提交要么回滚（回滚一般在异常情况下执行）。
	 * @param {String} operation 可选值：begin（开始事务）、commit（提交）、rollback（回滚）。
	 */
	transaction(operation) {
		return new Promise((resolve, reject) => {
			plus.sqlite.transaction({
				name: this.dbName,
				operation,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	},

	/**
	 * js获取当前时间 YYYY-MM-DD HH:mm:ss 输出类似 "2023-07-19 15:30:45" 的格式
	 */
	getCurrentDateTime() {
		let date = new Date();
		let year = date.getFullYear();
		let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份补零
		let day = String(date.getDate()).padStart(2, '0'); // 日期补零
		let hours = String(date.getHours()).padStart(2, '0'); // 小时补零
		let minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟补零
		let seconds = String(date.getSeconds()).padStart(2, '0'); // 秒数补零

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
}
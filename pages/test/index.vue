<template>
	<my-nav-bar>test</my-nav-bar>
	<view class="button" hover-class="checkActive">button</view>
	<view>
		<view class="uni-divider uni-divider__content">Demo</view>
		<button @click="openSQL">打开数据库</button>
		<button @click="createTable">创建表</button>
		<button @click="insertTableData">新增表数据</button>
		<button @click="selectTableData">查询表数据</button>
		<button @click="updateTableData">修改表数据</button>
		<button @click="deleteTableData">按条件删除表数据</button>
		<button @click="closeSQL">关闭数据库</button>
		<button @click="status">数据库状态</button>
		<button @click="queryDBTable">查询所有数据库表名</button>
		<button @click="queryIsTable">查询表是否存在</button>
		<button @click="insertDishesData">新增表菜品数据</button>
		<button @click="del">删除dp_dishes</button>
		<button @click="delAllTables">删除所有表</button>
		<button @click="createTableTest">创建测试表</button>
		<button @click="delTableTest">删除测试表</button>
		<button @click="delAllTables">修改测试表</button>
		<button @click="selectTableTest">查询测试表</button>
		<button @click="insertDishesDataTest">新增测试表数据</button>
		<button @click="updateTableDataTest">修改测试表数据</button>

		<view class="uni-divider__content" v-for="(item, index) in listData" :key="index">
			<view>名字:{{ item.name }}</view>
			<view>内容:{{ item.content }}</view>
			<view>时间:{{ item.time }}</view>
		</view>
	</view>
</template>
<script setup lang="ts">
import DB from '@/utils/sqlite.js';
onShow(() => {
	createTableTest();
});
// 创建表
const createTableTest = () => {
	let open = DB.isOpen();
	if (open) {
		openSQL();
		// 自动生成时间，但不是东八区 "2024-04-14 04:34:01"
		// let sql = '"id" INTEGER PRIMARY KEY AUTOINCREMENT,"name" TEXT,"created_at" TEXT DEFAULT CURRENT_TIMESTAMP';
		let sql = ` "name" TEXT`;
		// 创建表 DB.createTable(表名, 表的列)
		DB.createTable('test', sql)
			.then((res) => {
				console.log('创建test表成功');
				insertDishesDataTest();
			})
			.catch((error) => {
				console.log('创建表失败-error', error);
			});
	} else {
		showToast('数据库未打开');
	}
};
// 删除表
const delTableTest = () => {
	DB.dropTable('test');
};
// 查询表
const selectTableTest = () => {
	DB.selectTableData('test')
		.then((res) => {
			console.log('contact表数据', res);
			listData.value = res;
		})
		.catch((error) => {
			console.log('查询失败', error);
		});
};
// 新增测试表数据
const insertDishesDataTest = () => {
	const tableName = 'test';
	DB.insertTableData(tableName, `'小米'`, `'name'`)
		.then((res) => {
			console.log('新增测试表数据-res', res);
			DB.selectTableData(tableName).then((res) => {
				console.log('selectTableData', res);
			});
		})
		.catch((err) => {
			console.log('新增测试表数据-err', err);
		});
};
// 修改测试表数据
const updateTableDataTest = () => {
	let open = DB.isOpen();
	if (open) {
		let data = `name = '我被修改了2'`;
		// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
		DB.updateTableData('test', data, 'name', '小米')
			.then((res) => {
				console.log('更新test表成功');
				DB.selectTableData('test').then((res) => {
					console.log('selectTableData', res);
				});
			})
			.catch((error) => {
				console.log('修改失败', error);
			});
	} else {
		showToast('数据库未打开');
	}
};
const listData = ref([]);
const tables = [
	{
		tableName: 'dp_timeFrame',
		sql: `"name" TEXT NOT NULL`
	},
	{
		tableName: 'dp_chef',
		sql: `"name" TEXT NOT NULL`
	},
	{
		tableName: 'dp_dishes',
		sql: `
			"name" TEXT NOT NULL,
			"category_id" INTEGER NOT NULL,
			"chef_id" INTEGER NOT NULL,
			"vote_count" TEXT NOT NULL,
			"pic" TEXT NOT NULL,
			"timeFrame_id" TEXT NOT NULL
			`
	},
	{
		tableName: 'dp_dishes_category',
		sql: `"name" TEXT NOT NULL`
	},
	{
		tableName: 'dp_setting',
		sql: `"key" TEXT NOT NULL,"value" TEXT NOT NULL`
	}
];
const baseSql = `
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	"create_time" TEXT NOT NULL,
	"update_time" TEXT NOT NULL,
	`;
const del = () => {
	DB.dropTable('dp_dishes');
};
const delAllTables = () => {
	tables.forEach((item) => {
		DB.dropTable(item.tableName);
	});
};
const insertDishesData = () => {
	const tableName = 'dp_dishes';
	DB.insertTableData(
		tableName,
		`'create_time','update_time','name','1','2','3','pic','4'`,
		`'create_time','update_time','name','category_id','chef_id','vote_count','pic','timeFrame_id'`
	)
		.then((res) => {
			console.log('insertTableData-res', res);
			DB.selectTableData(tableName).then((res) => {
				console.log('selectTableData', res);
			});
		})
		.catch((err) => {
			console.log('insertTableData-err', err);
		});
};

// 提示框
const showToast = (str) => {
	uni.showToast({
		icon: 'none',
		title: str,
		mask: true
	});
};

const queryDBTable = () => {
	DB.queryDBTable().then((res) => {
		console.log('res', res);
	});
};
const queryIsTable = () => {
	DB.queryIsTable('chat').then((res) => {
		console.log('res', res);
	});
};
const status = () => {
	let open = DB.isOpen();
	console.log('数据库状态', open ? '开启' : '关闭');
};
// 打开数据库
const openSQL = () => {
	// 这个是查询有没有打开数据库
	let open = DB.isOpen();
	console.log('数据库状态', open ? '开启' : '关闭');
	if (!open) {
		DB.openSqlite()
			.then((res) => {
				showToast('数据库已打开', res);
			})
			.catch((error) => {
				console.log('数据库开启失败', error);
			});
	}
};

// 关闭数据库
const closeSQL = () => {
	// 这个是查询有没有打开数据库
	let open = DB.isOpen();
	if (open) {
		DB.closeSqlite()
			.then((res) => {
				showToast('数据库已关闭');
			})
			.catch((error) => {
				showToast('数据库关闭失败');
			});
	}
};

// 创建表
const createTable = () => {
	let open = DB.isOpen();
	if (open) {
		openSQL();
		let sql = '"id" INTEGER PRIMARY KEY AUTOINCREMENT,"name" TEXT,"content" TEXT,"time" TEXT';
		// 创建表 DB.createTable(表名, 表的列)
		DB.createTable('chat', sql)
			.then((res) => {
				showToast('创建chat表成功');
			})
			.catch((error) => {
				showToast('创建表失败', error);
			});
	} else {
		showToast('数据库未打开');
	}
};

// 新增表数据
const insertTableData = () => {
	let open = DB.isOpen();
	if (open) {
		let arr = [
			{
				name: '小明',
				content: '你好呀'
			},
			{
				name: '小红',
				content: 'HI'
			}
		];
		arr.map((item) => {
			let time = formatDate(new Date().getTime());
			let sql = `'${item.name}','${item.content}','${time}'`;
			let condition = "'name','content','time'";
			// 新增 DB.insertTableData(表名, 对应表头列的数据)
			DB.insertTableData('chat', sql, condition)
				.then((res) => {
					showToast('新增数据成功');
					selectTableData();
				})
				.catch((error) => {
					console.log('失败', error);
				});
		});
	} else {
		showToast('数据库未打开');
	}
};

// 查询表数据
const selectTableData = () => {
	let open = DB.isOpen();
	if (open) {
		// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
		DB.selectTableData('chat')
			.then((res) => {
				console.log('contact表数据', res);
				listData.value = res;
			})
			.catch((error) => {
				console.log('查询失败', error);
			});
	} else {
		showToast('数据库未打开');
	}
};

// 修改表数据
const updateTableData = () => {
	let open = DB.isOpen();
	if (open) {
		let time = formatDate(new Date().getTime());
		let data = `content = '我被修改了',time = '${time}'`;
		// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
		DB.updateTableData('chat', data, 'name', '小明')
			.then((res) => {
				showToast('更新chat表成功');
				selectTableData();
			})
			.catch((error) => {
				console.log('修改失败', error);
			});
	} else {
		showToast('数据库未打开');
	}
};

// 删除表数据
const deleteTableData = () => {
	let open = DB.isOpen();
	if (open) {
		// 删除表 DB.deleteTableData(表名,查询条件列名,查询条件列值)
		DB.deleteTableData('chat', 'name', '小红')
			.then((res) => {
				showToast('删除表数据成功');
				selectTableData();
			})
			.catch((error) => {
				console.log('删除失败', error);
			});
	} else {
		showToast('数据库未打开');
	}
};

// 时间戳转年月日
const formatDate = (data) => {
	let now = new Date(data);
	var year = now.getFullYear(); //取得4位数的年份
	var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
	var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
	var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
	var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
	var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
	return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
};
</script>

<style scoped lang="scss">
.button {
	font-size: 0.28rem;
	color: #fff;
	width: 2.7rem;
	height: 0.88rem;
	line-height: 0.88rem;
	background: #a8bc6d;
	text-align: center;
	border-radius: 1rem;
	margin-left: 0.13rem;
	transition: background 0.1s ease;
}

.checkActive {
	background: #91ab45;
	box-shadow: 0upx 0upx 0upx #91ab45;
	transition: background, box-shadow 0.1s ease;
}
</style>

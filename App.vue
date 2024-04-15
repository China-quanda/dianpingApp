<script setup lang="ts">
import type { ISetting, ITimeFrame, IDishesCategory, IChef } from '@/typings/common';
import sqlite from '@/utils/sqlite.js';
onLaunch(() => {
	initsqlite();
});

const initsqlite = () => {
	const isOpen = sqlite.isOpen();
	if (!isOpen) {
		return sqlite
			.openSqlite()
			.then((res) => {
				initsqlite();
			})
			.catch(() => {
				uni.showToast({ icon: 'none', title: '数据库打开失败！', mask: true });
			});
	}
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
			"timeFrame_id" INTEGER NOT NULL
			`
		},
		{
			tableName: 'dp_dishes_category',
			sql: `"name" TEXT NOT NULL`
		},
		{
			tableName: 'dp_setting',
			sql: `"key" TEXT NOT NULL UNIQUE,"value" TEXT NOT NULL`
		}
	];
	tables.forEach(async (tableItem) => {
		const isTable = await sqlite.queryIsTable(tableItem.tableName);
		if (!isTable) {
			sqlite
				.createTable(tableItem.tableName, tableItem.sql)
				.then((res) => {
					console.log(`===> tableName：${tableItem.tableName} 表已创建👌`);
					// 初始化 应用设置
					if (tableItem.tableName === 'dp_setting') initSetting();
					// 初始化 时间段数据
					if (tableItem.tableName === 'dp_timeFrame') initTimeFrame();
					// 初始化 菜品类别
					if (tableItem.tableName === 'dp_dishes_category') initDishesCategory();
					// 初始化 厨师 非必要
					if (tableItem.tableName === 'dp_chef') initChef();
				})
				.catch((error) => {
					uni.showToast({ icon: 'none', title: `创建${tableItem.tableName}表失败`, mask: true });
				});
		}
	});
};

// 初始化 应用设置
const initSetting = () => {
	const list: ISetting[] = [
		{
			key: 'admin',
			value: 'admin123'
		},
		{
			key: 'appName',
			value: '食堂名称'
		},
		{
			key: 'appBgPic',
			value: ''
		}
	];
	list.forEach((item) => {
		sqlite.insertTableData('dp_setting', `'${item.key}','${item.value}'`, `'key','value'`).then((res) => {
			console.log('s-res', res);
		});
	});
};
// 初始化 时间段数据
const initTimeFrame = () => {
	const list: ITimeFrame[] = [
		{
			name: '早餐'
		},
		{
			name: '午餐'
		},
		{
			name: '晚餐'
		}
	];
	list.forEach((timeFrameItem) => {
		sqlite.insertTableData('dp_timeFrame', `'${timeFrameItem.name}','${timeFrameItem.updateTime}'`, `'name'`);
	});
};
// 初始化 菜品类别
const initDishesCategory = () => {
	const list: IDishesCategory[] = [
		{
			name: '荤菜'
		},
		{
			name: '素菜'
		},
		{
			name: '凉菜'
		},
		{
			name: '主食'
		},
		{
			name: '甜品'
		},
		{
			name: '汤'
		},
		{
			name: '粥'
		}
	];
	list.forEach((item) => {
		sqlite.insertTableData('dp_dishes_category', `'${item.name}'`, `'name'`);
	});
};
// 初始化 厨师 非必要/Users/quanda/Desktop/news_project/news-uniapp/README.md
const initChef = () => {
	const list: IChef[] = [
		{
			name: '薛佛世'
		},
		{
			name: '舒凤祥'
		},
		{
			name: '陈国柏'
		},
		{
			name: '汤辟邦'
		},
		{
			name: '魏皑虎'
		},
		{
			name: '周卓浩'
		},
		{
			name: '潘恩依'
		},
		{
			name: '钱勤堃'
		},
		{
			name: '李鑫灏'
		},
		{
			name: '王生安'
		},
		{
			name: '舒展言'
		},
		{
			name: '刘明伟'
		},
		{
			name: '刘先生'
		},
		{
			name: '黄军'
		},
		{
			name: '张浩'
		},
		{
			name: '陈凯'
		},
		{
			name: '周灿'
		},
		{
			name: '肖建华'
		},
		{
			name: '李云龙'
		}
	];
	list.forEach((item) => {
		sqlite.insertTableData('dp_chef', `'${item.name}'`, `'name'`);
	});
	setTimeout(async () => {
		const list = await sqlite.selectTableData('dp_chef');
		console.log('list', list);
	}, 1000);
};
</script>

<style lang="scss">
/*每个页面公共css */
.ellipsis1 {
	overflow: hidden; //溢出内容隐藏
	text-overflow: ellipsis; //文本溢出部分用省略号表示
	display: -webkit-box; //特别显示模式
	-webkit-line-clamp: 1; //行数
	-webkit-box-orient: vertical; //盒子中内容竖直排列
}
</style>

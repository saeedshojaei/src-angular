// براساس title فیلتر میکنیم

removeOptionalKeysFromObj(object) {
	object.map(x => {
		for (const key in x) {
			if (Object.prototype.hasOwnProperty.call(x, key)) {
				if (key !== 'date' && key !== 'title' && key !== 'id') {
					delete x[key];
				}
			}
		}
	});
}
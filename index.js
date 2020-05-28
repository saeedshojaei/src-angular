console.log('hello world');
console.log('hello2')

selectItem(e) {
		this.items[e] = !this.items[e];
	}

// function for delete keys not select or null
// get 1 arguments which instanceForm 
	removeEmpty(obj) {
		Object.keys(obj).forEach( (key) =>{
			if (obj[key] && Object.prototype.toString
				.call(obj[key])
				.split(' ')[1]
				.replace(']', '') === 'Object') {
				this.removeEmpty(obj[key])
				if (!Object.keys(obj[key]).length) {
					delete obj[key]
				}
			}
			else if (!obj[key]) delete obj[key]
		});
	}

// set as function removeEmpty()

	// for (const item in instanceForm) {
		// 	if (!instanceForm[item]) {
		// 		delete instanceForm[item];
		// 	}

		// 	if (item === 'address') {
		// 		for (const addressItem in instanceForm[item]) {
		// 			if (!instanceForm[item][addressItem]) {
		// 				delete instanceForm[item][addressItem];
		// 			}
		// 		}
		// 	}
		// }

		// if (!Object.keys(instanceForm.address).length) {
		// 	delete instanceForm.address;
		// }




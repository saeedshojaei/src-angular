---------<< toturial angular >>--------
https://auth0.com/blog/real-world-angular-series-part-6/

// change class when select {
// ts
items = [false, false, false, false];
selectItem(e) {
		this.items[e] = !this.items[e];
	}
// html
<nb-card class="whiteBox col-sm-3" (click)="selectItem(0)" [class.active]="items[0]">
                            <nb-card-body>
                                <h6>گزارش دهنده</h6>
                                <p>کاربری با نقش "گزارش دهنده" دارای دسترسی هایی است که به شرح زیر است:</p>
                                <ul>
                                    <li>دسترسی به پنل فلان</li>
                                    <li>دسترسی به دانلود فلان</li>
                                    <li>توانایی دانلود اطلاعات فلان</li>
                                </ul>
                                <div class="whiteBox-bottom">
                                    <button nbButton hero
                                        fullWidth>{{items[0] ? 'دسترسی انتخاب شد' : 'افزودن دسترسی'}}</button>
                                    <span>لغو دسترسی</span>
                                </div>
                            </nb-card-body>
                        </nb-card>
// }

// function for delete keys not select or null {
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
// }
// set as function removeEmpty() {
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
// }

// checked id when select value and show on other element in html
// ts
showPhonePrefix: Object;
	getProvince(countryId) {
		if (this.previousCountry !== this.form.value.address.countryId) {
			this.previousCountry = this.form.value.address.countryId;
			this.cityService
				.getProvinceByCountries(countryId)
				.subscribe((data) => {
					this.provinceInput = false;
					this.mobileInput = false;
					this.provinces = data;
					this.showPhonePrefix = this.countrys.find(
						(item) => item.id.toString() === countryId.toString(),
					);
				});
		}
	}
// html
// when select item this element
<div class="form-group">
                                    <label for="inputCountry">{{'generic.country' | translate}}</label>
                                    <nb-select placeholder="{{'generic.countryPlaceholder' | translate}}" fullWidth
                                        dir="rtl" id="inputCountry" hero
                                        [status]="(f('address?.countryId')?.invalid || f('address?.countryId')?.errors) ? 'danger' : 'basic'"
                                        formControlName="countryId" (selectedChange)="getProvince($event)">
                                        <nb-option *ngFor="let showCountry of countrys; index as i"
                                            [value]="showCountry?.id">{{showCountry?.countryName}}</nb-option>
                                    </nb-select>
                                </div>

// chagne and show in here
 <span class="pl-3"  class="placeholder-dir phonePrefix">  {{showPhonePrefix?.phonePrefix}}</span> 

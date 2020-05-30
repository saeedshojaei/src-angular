sendForm() {
	const form = this.form.value;
	const instanceForm = {
		firstName: form.firstName,
		lastName: form.lastName,
		email: form.email,
		ssn: +form.ssn,
		birthDate: this.dateModel,
		positionId: 1,
		address: {
			countryId: +form.address.countryId,
			provinceId: +form.address.provinceId,
			cityId: +form.address.cityId,
			mobile: form.address.mobile,
			zipCode: form.address.zipCode,
			address: form.address.address,
		},
	};
	this.removeEmpty(instanceForm);
	this.userService.createUser(instanceForm).subscribe(data => {
		if (this.form.valid || !this.form.hasError) {
			this.form.reset();
		}
	}, error => {
		const errors = error.errors;
		errors.forEach(err => {
			const errParam = err.param;
			const errMsg = err.message;
			this.form.get(errParam).setErrors({ incorrect: true, msg: errMsg });
		});
	}
	);
}

// disable input when select is enable
// html
<nb-select placeholder="{{'generic.provincePlaceholder' | translate}}" fullWidth [disabled]="!provinces"
                                   
dir="rtl" id="inputProvince" hero formControlName="provinceId"
[status]="(f('address.provinceId').invalid || f('address.provinceId').errors) ? 'danger' : 'basic'"
(selectedChange)="getCities($event)">
<nb-option *ngFor="let showProvince of provinces; index as i"
[value]="showProvince.id">{{showProvince.provinceName}}</nb-option>
</nb-select>

// scss
::ng-deep .nb-theme-default nb-select.appearance-hero .select-button:disabled {
    background-color: #a29494;
   }
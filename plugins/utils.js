import Vue from 'vue'

Vue.mixin({

	methods: {
		_isEmail(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		},
		_splitString(str, size){
			if(size === -1) return str
			if(!str) return ''
			let newStr = str.substring(0, size);
			if(str.length > size) newStr += '...'
			return newStr
		},
		_createAlert(type, title, text){
			if(text.response){
				let dataError = text.response.data;
				if(dataError.error.code == 33){
					text = "";
					for (let err of dataError.details) {
						let property = err.property.toString().split('.')[1];
						text += property+" - "+err.message+". <br>";
					}
				} else {
					dataError = dataError.error;
					text = dataError.message;
				}
			}
			let durationTime = 4000;
			if(type != 'success'){
				durationTime = 10000;
			}
			this.$notify({
				type : type || 'info',
				group : 'alerts',
				title : title || '',
				text : text,
				duration : durationTime
			});
		},
		_createDialog(title, text, buttonText, cancelText, handler){
			this.$modal.show('dialog', {
				title: title,
				text: text,
				buttons: [
					{
						title: buttonText,
						default: true,
						handler: handler
					},
					{
						title: cancelText
					}
				]
			})
		},
		_toCurrency(value) {
			if (value)
				return parseFloat(value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
			return "-";
		}
	}

})

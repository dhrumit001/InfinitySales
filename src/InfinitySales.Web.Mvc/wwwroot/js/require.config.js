requirejs.config({
	baseUrl: '/lib/',
	paths: {

		//base js
		jquery: 'jquery/dist/jquery',
		knockout: 'knockout/dist/knockout',
		knockoutValidation: 'knockout-validation/dist/knockout.validation',
		knockoutValidationEx: '/js/knockout.validation.extensions',
		bootstrap: 'bootstrap/dist/js/bootstrap',

		//plugin js
		bootstrapSelect: 'bootstrap-select/dist/js/bootstrap-select',
		jqueryFlot: 'Flot/jquery.flot',
		jqueryFlotResize: 'Flot/jquery.flot.resize',
		jqueryFlotPie: 'Flot/jquery.flot.pie',
		jqueryFlotCategories: 'Flot/jquery.flot.categories',
		jqueryFlotTime: 'Flot/jquery.flot.time',
		jquerySparkLine: 'jquery-sparkline/dist/jquery.sparkline',
		jqueryBlockUi: 'blockUI/jquery.blockUI',
		jquerySpin: 'spin.js/jquery.spin',
		jqueryCountTo: 'jquery-countTo/jquery.countTo',
		json2: 'json2/json2',
		raphael: 'raphael/raphael',
		morris: 'morris.js/morris',
		chart: 'chart.js/dist/Chart.bundle',
		moment: 'moment/min/moment-with-locales',
		toastr: 'toastr/toastr',
		sweetAlert: 'sweetalert/dist/sweetalert.min',
		spin: 'spin.js/spin',
		slimScroll: 'jquery-slimscroll/jquery.slimscroll',
		waves: 'Waves/dist/waves',
		push: 'push.js/push',
		dxall: 'devextreme/js/dx.all',
		signalr: 'signalr-client/signalr.min',

		//abp global js
		abpJquery: 'abp-web-resources/Abp/Framework/scripts/libs/abp.jquery',
		abpToastr: 'abp-web-resources/Abp/Framework/scripts/libs/abp.toastr',
		abpBlockUi: 'abp-web-resources/Abp/Framework/scripts/libs/abp.blockUI',
		abpSpin: 'abp-web-resources/Abp/Framework/scripts/libs/abp.spin',
		abpSweetAlert: 'abp-web-resources/Abp/Framework/scripts/libs/abp.sweet-alert',
		abpSignalrClient: 'abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client',
		admin: '/js/admin',
		main: '/js/main',
		
		//viewmodel js
		homeIndex: '/view-resources/Views/Home/Index',
		roleIndex: '/view-resources/Views/Roles/Index',
		addEditRoleModel: '/view-resources/Views/Roles/_AddEditRoleModal',
		userIndex: '/view-resources/Views/Users/Index',
		addEditUserModel: '/view-resources/Views/Users/_AddEditUserModal',
		tenantSettingsIndex: '/view-resources/Views/TenantSettings/Index',
		userProfileSettings: '/view-resources/Views/UserSettings/Components/UserProfileSettings/Default',
		changePassword: '/view-resources/Views/UserSettings/Components/ChangePassword/Default',
		login: '/view-resources/Views/Account/Login',
		register: '/view-resources/Views/Account/Register',
		layout: '/view-resources/Views/Shared/_Layout'
	},
	shim: {
		morris: {
			deps: ['jquery', 'raphael'],
			exports: 'Morris',
			init: function ($, Raphael) {
				window.Raphael = Raphael;
			}
		},
		jqueryFlotTime: {
			deps: ["jqueryFlot"]
		},
		jqueryFlotResize: {
			deps: ["jqueryFlot"]
		},
		jqueryFlotPie: {
			deps: ["jqueryFlot"]
		},
		jqueryFlotCategories: {
			deps: ["jqueryFlot"]
		},
		slimScroll: {
			deps: ['jquery']
		}
	}
});

requirejs(['jquery', 'knockout', 'knockoutValidation', 'knockoutValidationEx'], function ($, ko) {

	//Knockout validation intialization
	ko.validation.init({
		registerExtenders: true,
		insertMessages: true,
		decorateInputElement: true,
		errorsAsTitle: true,
		messagesOnModified: false,
		decorateElementOnModified: false,
		errorMessageClass: "error",
		grouping: {
			deep: true,
			observable: false
		}
	});
});


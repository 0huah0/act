Ext.ns("App");
App.importJs = {

	Building : [ __ctxPath + '/js/frm/Building.js' ],

	AppRoleView : [ __ctxPath + '/js/frm/system/AppRoleView.js',
			__ctxPath + '/ext3/ux/CheckTreePanel.js',
			__ctxPath + '/js/frm/system/RoleGrantRightView.js',
			__ctxPath + '/js/frm/system/AppRoleForm.js' ],

	AppUserView : [ __ctxPath + '/js/frm/system/AppUserView.js',
			__ctxPath + '/js/frm/system/AppUserForm.js',
			__ctxPath + '/ext3/ux/ItemSelector.js',
			__ctxPath + '/ext3/ux/MultiSelect.js',
			__ctxPath + '/js/frm/system/ResetPasswordForm.js',
			__ctxPath + '/js/frm/system/changePasswordForm.js' ],

	ProfileForm : [ __ctxPath + '/js/frm/system/ProfileForm.js',
			__ctxPath + '/js/frm/system/ResetPasswordForm.js' ],

	DepartmentView : [ __ctxPath + '/js/frm/system/DepartmentView.js',
			__ctxPath + '/js/frm/system/DepartmentForm.js' ],

	AccountingTitleView : [ __ctxPath + '/js/act/AccountingTitleView.js',
			__ctxPath + '/js/act/AccountingTitleForm.js' ],

	JournalView : [ __ctxPath + '/js/act/JournalView.js',
			__ctxPath + '/js/act/JournalForm.js' ],

	JournalPostView : [ __ctxPath + '/js/act/JournalPostView.js' ],

	AccountingPeriodMgt : [ __ctxPath + '/js/act/AccountingPeriodMgtView.js',
			__ctxPath + '/js/act/AccountingPeriodMgtForm.js' ],

	JournalBackupView : [ __ctxPath + '/js/act/JournalBackupView.js' ],

	JournalRestoreView : [ __ctxPath + '/js/act/JournalRestoreView.js' ],

	JournalClearView : [ __ctxPath + '/js/act/JournalClearView.js' ],

	AccountingTitleExport : [ __ctxPath + '/js/act/AccountingTitleExport.js' ],

	ReportJournal : [ __ctxPath + '/js/act/ReportJournal.js' ],

	ReportActTitle : [ __ctxPath + '/js/act/ReportActTitle.js' ],

	ReportActTitleSum : [ __ctxPath + '/js/act/ReportActTitleSum.js' ],

	ReportIncomeStatement : [ __ctxPath + '/js/act/ReportIncomeStatement.js' ],

	ReportBalanceSheet : [ __ctxPath + '/js/act/ReportBalanceSheet.js' ],

	ReportCashFlow : [ __ctxPath + '/js/act/ReportCashFlow.js' ],

	
	/* PSS */
	PssCustomerView : [ __ctxPath + '/js/pss/PssCustomerView.js',
			__ctxPath + '/js/pss/PssCustomerForm.js' ],
	PssWarehouseView : [ __ctxPath + '/js/pss/PssWarehouseView.js',
			__ctxPath + '/js/pss/PssWarehouseForm.js' ],
	PssSupplierMaterialRelView : [
			__ctxPath + '/js/pss/PssSupplierMaterialRelView.js',
			__ctxPath + '/js/pss/PssSupplierMaterialRelForm.js' ],
	PssSupplierView : [ __ctxPath + '/js/pss/PssSupplierView.js',
			__ctxPath + '/js/pss/PssSupplierForm.js' ],
	PssSalesOrderHeadView : [ __ctxPath + '/js/pss/PssSalesOrderHeadView.js',
			__ctxPath + '/js/pss/PssSalesOrderHeadForm.js',
			__ctxPath + '/js/pss/selector/PssProductSelector.js' ],
	PssSalesOrderDetailView : [
			__ctxPath + '/js/pss/PssSalesOrderDetailView.js',
			__ctxPath + '/js/pss/PssSalesOrderDetailForm.js' ],
	PssPurchaseOrderHeadView : [
			__ctxPath + '/js/pss/PssPurchaseOrderHeadView.js',
			__ctxPath + '/js/pss/PssPurchaseOrderHeadForm.js' ],
	PssPurchaseOrderDetailView : [
			__ctxPath + '/js/pss/PssPurchaseOrderDetailView.js',
			__ctxPath + '/js/pss/PssPurchaseOrderDetailForm.js' ],
	PssProductMaterialRelView : [
			__ctxPath + '/js/pss/PssProductMaterialRelView.js',
			__ctxPath + '/js/pss/PssProductMaterialRelForm.js' ],
	PssProductView : [ __ctxPath + '/js/pss/PssProductView.js',
			__ctxPath + '/js/pss/PssProductForm.js' ],
	PssMatesReceiptHeadView : [
			__ctxPath + '/js/pss/PssMatesReceiptHeadView.js',
			__ctxPath + '/js/pss/PssMatesReceiptHeadForm.js' ],
	PssMatesReceiptDetailView : [
			__ctxPath + '/js/pss/PssMatesReceiptDetailView.js',
			__ctxPath + '/js/pss/PssMatesReceiptDetailForm.js' ],
	PssMaterialView : [ __ctxPath + '/js/pss/PssMaterialView.js',
			__ctxPath + '/js/pss/PssMaterialForm.js' ],
	PssInvoiceHeadView : [ __ctxPath + '/js/pss/PssInvoiceHeadView.js',
			__ctxPath + '/js/pss/PssInvoiceHeadForm.js' ],
	PssInventoryChangeView : [ __ctxPath + '/js/pss/PssInventoryChangeView.js',
			__ctxPath + '/js/pss/PssInventoryChangeForm.js' ],
	PssInventoryView : [ __ctxPath + '/js/pss/PssInventoryView.js',
			__ctxPath + '/js/pss/PssInventoryForm.js' ],
	PssDeliveryOrderHeadView : [
			__ctxPath + '/js/pss/PssDeliveryOrderHeadView.js',
			__ctxPath + '/js/pss/PssDeliveryOrderHeadForm.js' ],
	PssDeliveryOrderDetailView : [
			__ctxPath + '/js/pss/PssDeliveryOrderDetailView.js',
			__ctxPath + '/js/pss/PssDeliveryOrderDetailForm.js' ]

};

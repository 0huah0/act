Ext.ns("App");
App.importJs = {

	Building : [__ctxPath + '/js/frm/Building.js'],

	AppRoleView : [__ctxPath + '/js/frm/system/AppRoleView.js',
			__ctxPath + '/ext3/ux/CheckTreePanel.js',
			__ctxPath + '/js/frm/system/RoleGrantRightView.js',
			__ctxPath + '/js/frm/system/AppRoleForm.js'],

	AppUserView : [__ctxPath + '/js/frm/system/AppUserView.js',
			__ctxPath + '/js/frm/system/AppUserForm.js',
			__ctxPath + '/ext3/ux/ItemSelector.js',
			__ctxPath + '/ext3/ux/MultiSelect.js',
			__ctxPath + '/js/frm/system/ResetPasswordForm.js',
			__ctxPath + '/js/frm/system/changePasswordForm.js'],

	ProfileForm : [__ctxPath + '/js/frm/system/ProfileForm.js',
			__ctxPath + '/js/frm/system/ResetPasswordForm.js'],

	DepartmentView : [__ctxPath + '/js/frm/system/DepartmentView.js',
	      			__ctxPath + '/js/frm/system/DepartmentForm.js'],	
			
	AccountingTitleView:[__ctxPath + '/js/act/AccountingTitleView.js',
	                     __ctxPath + '/js/act/AccountingTitleForm.js'],
	                     
    JournalView:[__ctxPath + '/js/act/JournalView.js',
                 __ctxPath + '/js/act/JournalForm.js'],
                 
    JournalPostView:[__ctxPath + '/js/act/JournalPostView.js'],
    
    AccountingPeriodMgt:[__ctxPath + '/js/act/AccountingPeriodMgtView.js',
	                     __ctxPath + '/js/act/AccountingPeriodMgtForm.js'],
    
    JournalBackupView:[__ctxPath + '/js/act/JournalBackupView.js'],
    
    JournalRestoreView:[__ctxPath + '/js/act/JournalRestoreView.js'],
    
    JournalClearView:[__ctxPath + '/js/act/JournalClearView.js'],
    
    AccountingTitleExport:[__ctxPath + '/js/act/AccountingTitleExport.js'],
    
    ReportJournal:[__ctxPath + '/js/act/ReportJournal.js'],
    
    ReportActTitle:[__ctxPath + '/js/act/ReportActTitle.js'],
    
    ReportActTitleSum:[__ctxPath + '/js/act/ReportActTitleSum.js'],

    ReportIncomeStatement:[__ctxPath + '/js/act/ReportIncomeStatement.js'],
    
    ReportBalanceSheet:[__ctxPath + '/js/act/ReportBalanceSheet.js'],
    
    ReportCashFlow:[__ctxPath + '/js/act/ReportCashFlow.js']

};

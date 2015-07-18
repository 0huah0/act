drop table if exists act_accounting_title;

/*==============================================================*/
/* table: accounting_title                                      */
/*==============================================================*/
create table act_accounting_title
(
   act_title_id         bigint not null auto_increment,
   code                 varchar(20) not null,
   name                 varchar(40) not null,
   name_en              varchar(100),
   remark               varchar(500),
   parent_id            bigint,
   level                int comment '1：一級科目(資產、負債、業主權益)、2：二級科目、3：三級科目、4：四級科目',
   left_or_right        char(1) comment 'l：左方科目(借餘表示正值，貸餘表示負值)、r：右方科目(貸餘表示正值，借餘表示負值)',
   is_basic             int not null default 0 comment '0：非基礎資料、1：基礎資料',
   is_delete            int not null default 0 comment '0：未刪除、1：已刪除',
   create_date          datetime,
   create_by            varchar(50),
   update_date          datetime,
   update_by            varchar(50),
   primary key (act_title_id),
   unique key ak_code (code)
)ENGINE=InnoDB;

alter table act_accounting_title comment '會計科目表';

insert into act_accounting_title(act_title_id,code,name)values(-1,'root','root_system');
insert into act_accounting_title(code,name,level)values('testcode','testname',1);
insert into act_accounting_title(code,name,level)values('testcode2','testname2',2);
update act_accounting_title set parent_id = 1 where level=2;
select * from act_accounting_title






/*==============================================================*/
drop table if exists act_journal_head;
create table act_journal_head(
   journal_head_id      bigint not null auto_increment,
   ref_no               varchar(20) not null,
   ref_date             date not null,
   brief                varchar(100),
   journal_type         int not null comment '1：日常分錄、2：調整分錄、3：更新分錄、4：結帳分錄(結清)、5：結帳分錄(結轉)、6：開帳分錄',
   data_from            varchar(10) comment 'act：會計系統、erp：進銷存系統',
   is_post              int not null default 0 comment '0：未過帳、1：已過帳',
   is_delete            int not null default 0 comment '0：未刪除、1：已刪除',
   is_backup            int not null default 0 comment '0：未備份、1：已備份',
   create_date          datetime,
   create_by            varchar(50),
   update_date          datetime,
   update_by            varchar(50),
   primary key (journal_head_id),
   unique key ak_ref_no (ref_no)
)ENGINE=InnoDB;
alter table act_journal_head comment '日記帳表';

/*==============================================================*/
drop table if exists act_journal_detail;
create table act_journal_detail(
   journal_detail_id    bigint not null auto_increment,
   ref_no               varchar(20) not null,
   item_no              int,
   code                 varchar(20) not null,
   name                 varchar(40) not null,
   debit_amount         double(20,10),
   credit_amount        double(20,10),
   create_date          datetime,
   create_by            varchar(50),
   update_date          datetime,
   update_by            varchar(50),
   primary key (journal_detail_id)
)ENGINE=InnoDB;

alter table act_journal_detail comment '日記帳明細表';
alter table act_journal_detail add constraint fk_jldl_r_jlhd foreign key (ref_no)
      references act_journal_head (ref_no) on delete cascade on update cascade;


alter table act_journal_detail add constraint fk_jldl_r_agte foreign key (code)
      references act_accounting_title (code) on delete cascade on update cascade;

delete from act_accounting_title;
delete from act_journal_head;
delete from act_journal_detail;
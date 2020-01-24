--
-- Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
-- under one or more contributor license agreements. See the NOTICE file
-- distributed with this work for additional information regarding copyright
-- ownership. Camunda licenses this file to you under the Apache License,
-- Version 2.0; you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--

create table ACT_GE_PROPERTY (
    NAME_ NVARCHAR2(64),
    VALUE_ NVARCHAR2(300),
    REV_ INTEGER,
    primary key (NAME_)
);

insert into ACT_GE_PROPERTY
values ('schema.version', 'fox', 1);

insert into ACT_GE_PROPERTY
values ('schema.history', 'create(fox)', 1);

insert into ACT_GE_PROPERTY
values ('next.dbid', '1', 1);

insert into ACT_GE_PROPERTY
values ('deployment.lock', '0', 1);

insert into ACT_GE_PROPERTY
values ('history.cleanup.job.lock', '0', 1);

insert into ACT_GE_PROPERTY
values ('startup.lock', '0', 1);

create table ACT_GE_BYTEARRAY (
    ID_ NVARCHAR2(64),
    REV_ INTEGER,
    NAME_ NVARCHAR2(255),
    DEPLOYMENT_ID_ NVARCHAR2(64),
    BYTES_ BLOB,
    GENERATED_ NUMBER(1,0) CHECK (GENERATED_ IN (1,0)),
    TENANT_ID_ NVARCHAR2(64),
    TYPE_ INTEGER,
    CREATE_TIME_ TIMESTAMP(6),
    ROOT_PROC_INST_ID_ varchar(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_GE_SCHEMA_LOG (
    ID_ NVARCHAR2(64),
    TIMESTAMP_ TIMESTAMP(6),
    VERSION_ NVARCHAR2(255),
    primary key (ID_)
);

insert into ACT_GE_SCHEMA_LOG
values ('0', CURRENT_TIMESTAMP, '7.11.0');

create table ACT_RE_DEPLOYMENT (
    ID_ NVARCHAR2(64),
    NAME_ NVARCHAR2(255),
    DEPLOY_TIME_ TIMESTAMP(6),
    SOURCE_ NVARCHAR2(255),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_RU_EXECUTION (
    ID_ NVARCHAR2(64),
    REV_ INTEGER,
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    BUSINESS_KEY_ NVARCHAR2(255),
    PARENT_ID_ NVARCHAR2(64),
    PROC_DEF_ID_ NVARCHAR2(64),
    SUPER_EXEC_ NVARCHAR2(64),
    SUPER_CASE_EXEC_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    ACT_ID_ NVARCHAR2(255),
    ACT_INST_ID_ NVARCHAR2(64),
    IS_ACTIVE_ NUMBER(1,0) CHECK (IS_ACTIVE_ IN (1,0)),
    IS_CONCURRENT_ NUMBER(1,0) CHECK (IS_CONCURRENT_ IN (1,0)),
    IS_SCOPE_ NUMBER(1,0) CHECK (IS_SCOPE_ IN (1,0)),
    IS_EVENT_SCOPE_ NUMBER(1,0) CHECK (IS_EVENT_SCOPE_ IN (1,0)),
    SUSPENSION_STATE_ INTEGER,
    CACHED_ENT_STATE_ INTEGER,
    SEQUENCE_COUNTER_ NUMBER(19,0),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_RU_JOB (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    TYPE_ NVARCHAR2(255) NOT NULL,
    LOCK_EXP_TIME_ TIMESTAMP(6),
    LOCK_OWNER_ NVARCHAR2(255),
    EXCLUSIVE_ NUMBER(1,0) CHECK (EXCLUSIVE_ IN (1,0)),
    EXECUTION_ID_ NVARCHAR2(64),
    PROCESS_INSTANCE_ID_ NVARCHAR2(64),
    PROCESS_DEF_ID_ NVARCHAR2(64),
    PROCESS_DEF_KEY_ NVARCHAR2(255),
    RETRIES_ INTEGER,
    EXCEPTION_STACK_ID_ NVARCHAR2(64),
    EXCEPTION_MSG_ NVARCHAR2(2000),
    DUEDATE_ TIMESTAMP(6),
    REPEAT_ NVARCHAR2(255),
    HANDLER_TYPE_ NVARCHAR2(255),
    HANDLER_CFG_ NVARCHAR2(2000),
    DEPLOYMENT_ID_ NVARCHAR2(64),
    SUSPENSION_STATE_ INTEGER DEFAULT 1 NOT NULL,
    JOB_DEF_ID_ NVARCHAR2(64),
    PRIORITY_ NUMBER(19,0) DEFAULT 0 NOT NULL,
    SEQUENCE_COUNTER_ NUMBER(19,0),
    TENANT_ID_ NVARCHAR2(64),
    CREATE_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_RU_JOBDEF (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    PROC_DEF_ID_ NVARCHAR2(64),
    PROC_DEF_KEY_ NVARCHAR2(255),
    ACT_ID_ NVARCHAR2(255),
    JOB_TYPE_ NVARCHAR2(255) NOT NULL,
    JOB_CONFIGURATION_ NVARCHAR2(255),
    SUSPENSION_STATE_ INTEGER,
    JOB_PRIORITY_ NUMBER(19,0),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_RE_PROCDEF (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    CATEGORY_ NVARCHAR2(255),
    NAME_ NVARCHAR2(255),
    KEY_ NVARCHAR2(255) NOT NULL,
    VERSION_ INTEGER NOT NULL,
    DEPLOYMENT_ID_ NVARCHAR2(64),
    RESOURCE_NAME_ NVARCHAR2(2000),
    DGRM_RESOURCE_NAME_ NVARCHAR2(2000),
    HAS_START_FORM_KEY_ NUMBER(1,0) CHECK (HAS_START_FORM_KEY_ IN (1,0)),
    SUSPENSION_STATE_ INTEGER,
    TENANT_ID_ NVARCHAR2(64),
    VERSION_TAG_ NVARCHAR2(64),
    HISTORY_TTL_ integer,
    STARTABLE_ NUMBER(1,0) DEFAULT 1 NOT NULL CHECK (STARTABLE_ IN (1,0)),
    primary key (ID_)
);

create table ACT_RU_TASK (
    ID_ NVARCHAR2(64),
    REV_ INTEGER,
    EXECUTION_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    PROC_DEF_ID_ NVARCHAR2(64),
    CASE_EXECUTION_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    CASE_DEF_ID_ NVARCHAR2(64),
    NAME_ NVARCHAR2(255),
    PARENT_TASK_ID_ NVARCHAR2(64),
    DESCRIPTION_ NVARCHAR2(2000),
    TASK_DEF_KEY_ NVARCHAR2(255),
    OWNER_ NVARCHAR2(255),
    ASSIGNEE_ NVARCHAR2(255),
    DELEGATION_ NVARCHAR2(64),
    PRIORITY_ INTEGER,
    CREATE_TIME_ TIMESTAMP(6),
    DUE_DATE_ TIMESTAMP(6),
    FOLLOW_UP_DATE_ TIMESTAMP(6),
    SUSPENSION_STATE_ INTEGER,
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_RU_IDENTITYLINK (
    ID_ NVARCHAR2(64),
    REV_ INTEGER,
    GROUP_ID_ NVARCHAR2(255),
    TYPE_ NVARCHAR2(255),
    USER_ID_ NVARCHAR2(255),
    TASK_ID_ NVARCHAR2(64),
    PROC_DEF_ID_ NVARCHAR2(64),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_RU_VARIABLE (
    ID_ NVARCHAR2(64) not null,
    REV_ INTEGER,
    TYPE_ NVARCHAR2(255) not null,
    NAME_ NVARCHAR2(255) not null,
    EXECUTION_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    CASE_EXECUTION_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    TASK_ID_ NVARCHAR2(64),
    BYTEARRAY_ID_ NVARCHAR2(64),
    DOUBLE_ NUMBER(*,10),
    LONG_ NUMBER(19,0),
    TEXT_ NVARCHAR2(2000),
    TEXT2_ NVARCHAR2(2000),
    VAR_SCOPE_ NVARCHAR2(64) not null,
    SEQUENCE_COUNTER_ NUMBER(19,0),
    IS_CONCURRENT_LOCAL_ NUMBER(1,0) CHECK (IS_CONCURRENT_LOCAL_ IN (1,0)),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_RU_EVENT_SUBSCR (
    ID_ NVARCHAR2(64) not null,
    REV_ integer,
    EVENT_TYPE_ NVARCHAR2(255) not null,
    EVENT_NAME_ NVARCHAR2(255),
    EXECUTION_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    ACTIVITY_ID_ NVARCHAR2(255),
    CONFIGURATION_ NVARCHAR2(255),
    CREATED_ TIMESTAMP(6) not null,
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_RU_INCIDENT (
  ID_ NVARCHAR2(64) not null,
  REV_ integer not null,
  INCIDENT_TIMESTAMP_ TIMESTAMP(6) not null,
  INCIDENT_MSG_ NVARCHAR2(2000),
  INCIDENT_TYPE_ NVARCHAR2(255) not null,
  EXECUTION_ID_ NVARCHAR2(64),
  ACTIVITY_ID_ NVARCHAR2(255),
  PROC_INST_ID_ NVARCHAR2(64),
  PROC_DEF_ID_ NVARCHAR2(64),
  CAUSE_INCIDENT_ID_ NVARCHAR2(64),
  ROOT_CAUSE_INCIDENT_ID_ NVARCHAR2(64),
  CONFIGURATION_ NVARCHAR2(255),
  TENANT_ID_ NVARCHAR2(64),
  JOB_DEF_ID_ NVARCHAR2(64),
  primary key (ID_)
);

create table ACT_RU_AUTHORIZATION (
  ID_ NVARCHAR2(64) not null,
  REV_ integer not null,
  TYPE_ integer not null,
  GROUP_ID_ NVARCHAR2(255),
  USER_ID_ NVARCHAR2(255),
  RESOURCE_TYPE_ integer not null,
  RESOURCE_ID_ NVARCHAR2(255),
  PERMS_ integer,
  primary key (ID_)
);

create table ACT_RU_FILTER (
  ID_ NVARCHAR2(64) not null,
  REV_ integer not null,
  RESOURCE_TYPE_ NVARCHAR2(255) not null,
  NAME_ NVARCHAR2(255) not null,
  OWNER_ NVARCHAR2(255),
  QUERY_ NCLOB not null,
  PROPERTIES_ NCLOB,
  primary key (ID_)
);

create table ACT_RU_METER_LOG (
  ID_ NVARCHAR2(64) not null,
  NAME_ NVARCHAR2(64) not null,
  REPORTER_ NVARCHAR2(255),
  VALUE_ NUMBER(19,0),
  TIMESTAMP_ TIMESTAMP(6),
  MILLISECONDS_ NUMBER(19,0) DEFAULT 0,
  primary key (ID_)
);

create table ACT_RU_EXT_TASK (
  ID_ NVARCHAR2(64) not null,
  REV_ integer not null,
  WORKER_ID_ NVARCHAR2(255),
  TOPIC_NAME_ NVARCHAR2(255),
  RETRIES_ INTEGER,
  ERROR_MSG_ NVARCHAR2(2000),
  ERROR_DETAILS_ID_ NVARCHAR2(64),
  LOCK_EXP_TIME_ TIMESTAMP(6),
  SUSPENSION_STATE_ integer,
  EXECUTION_ID_ NVARCHAR2(64),
  PROC_INST_ID_ NVARCHAR2(64),
  PROC_DEF_ID_ NVARCHAR2(64),
  PROC_DEF_KEY_ NVARCHAR2(255),
  ACT_ID_ NVARCHAR2(255),
  ACT_INST_ID_ NVARCHAR2(64),
  TENANT_ID_ NVARCHAR2(64),
  PRIORITY_ NUMBER(19,0) DEFAULT 0 NOT NULL,
  primary key (ID_)
);

create table ACT_RU_BATCH (
  ID_ NVARCHAR2(64) NOT NULL,
  REV_ INTEGER NOT NULL,
  TYPE_ NVARCHAR2(255),
  TOTAL_JOBS_ INTEGER,
  JOBS_CREATED_ INTEGER,
  JOBS_PER_SEED_ INTEGER,
  INVOCATIONS_PER_JOB_ INTEGER,
  SEED_JOB_DEF_ID_ NVARCHAR2(64),
  BATCH_JOB_DEF_ID_ NVARCHAR2(64),
  MONITOR_JOB_DEF_ID_ NVARCHAR2(64),
  SUSPENSION_STATE_ INTEGER,
  CONFIGURATION_ NVARCHAR2(255),
  TENANT_ID_ NVARCHAR2(64),
  CREATE_USER_ID_ NVARCHAR2(255),
  primary key (ID_)
);

create index ACT_IDX_EXE_ROOT_PROCINST on ACT_RU_EXECUTION(ROOT_PROC_INST_ID_);
create index ACT_IDX_EXEC_BUSKEY on ACT_RU_EXECUTION(BUSINESS_KEY_);
create index ACT_IDX_EXEC_TENANT_ID on ACT_RU_EXECUTION(TENANT_ID_, 0);
create index ACT_IDX_TASK_CREATE on ACT_RU_TASK(CREATE_TIME_);
create index ACT_IDX_TASK_ASSIGNEE on ACT_RU_TASK(ASSIGNEE_);
create index ACT_IDX_TASK_TENANT_ID on ACT_RU_TASK(TENANT_ID_, 0);
create index ACT_IDX_IDENT_LNK_USER on ACT_RU_IDENTITYLINK(USER_ID_);
create index ACT_IDX_IDENT_LNK_GROUP on ACT_RU_IDENTITYLINK(GROUP_ID_);
create index ACT_IDX_EVENT_SUBSCR_CONFIG_ on ACT_RU_EVENT_SUBSCR(CONFIGURATION_);
create index ACT_IDX_EVENT_SUBSCR_TENANT_ID on ACT_RU_EVENT_SUBSCR(TENANT_ID_, 0);
create index ACT_IDX_VARIABLE_TASK_ID on ACT_RU_VARIABLE(TASK_ID_);
create index ACT_IDX_VARIABLE_TENANT_ID on ACT_RU_VARIABLE(TENANT_ID_, 0);
create index ACT_IDX_INC_CONFIGURATION on ACT_RU_INCIDENT(CONFIGURATION_);
create index ACT_IDX_INC_TENANT_ID on ACT_RU_INCIDENT(TENANT_ID_, 0);
-- CAM-5914
create index ACT_IDX_JOB_EXECUTION_ID on ACT_RU_JOB(EXECUTION_ID_);
create index ACT_IDX_JOB_HANDLER on ACT_RU_JOB(HANDLER_TYPE_,HANDLER_CFG_);
create index ACT_IDX_JOB_PROCINST on ACT_RU_JOB(PROCESS_INSTANCE_ID_);
create index ACT_IDX_JOB_TENANT_ID on ACT_RU_JOB(TENANT_ID_, 0);
create index ACT_IDX_JOBDEF_TENANT_ID on ACT_RU_JOBDEF(TENANT_ID_, 0);

-- new metric milliseconds column
CREATE INDEX ACT_IDX_METER_LOG_MS ON ACT_RU_METER_LOG(MILLISECONDS_);
CREATE INDEX ACT_IDX_METER_LOG_NAME_MS ON ACT_RU_METER_LOG(NAME_, MILLISECONDS_);
CREATE INDEX ACT_IDX_METER_LOG_REPORT ON ACT_RU_METER_LOG(NAME_, REPORTER_, MILLISECONDS_);

-- old metric timestamp column
CREATE INDEX ACT_IDX_METER_LOG_TIME ON ACT_RU_METER_LOG(TIMESTAMP_);
CREATE INDEX ACT_IDX_METER_LOG ON ACT_RU_METER_LOG(NAME_, TIMESTAMP_);

create index ACT_IDX_EXT_TASK_TOPIC on ACT_RU_EXT_TASK(TOPIC_NAME_);
create index ACT_IDX_EXT_TASK_TENANT_ID on ACT_RU_EXT_TASK(TENANT_ID_, 0);
create index ACT_IDX_EXT_TASK_PRIORITY ON ACT_RU_EXT_TASK(PRIORITY_);
create index ACT_IDX_EXT_TASK_ERR_DETAILS ON ACT_RU_EXT_TASK(ERROR_DETAILS_ID_);
create index ACT_IDX_AUTH_GROUP_ID on ACT_RU_AUTHORIZATION(GROUP_ID_);
create index ACT_IDX_JOB_JOB_DEF_ID on ACT_RU_JOB(JOB_DEF_ID_);

create index ACT_IDX_BYTEAR_DEPL on ACT_GE_BYTEARRAY(DEPLOYMENT_ID_);

alter table ACT_GE_BYTEARRAY
    add constraint ACT_FK_BYTEARR_DEPL
    foreign key (DEPLOYMENT_ID_)
    references ACT_RE_DEPLOYMENT (ID_);

create index ACT_IDX_EXE_PROCINST on ACT_RU_EXECUTION(PROC_INST_ID_);
alter table ACT_RU_EXECUTION
    add constraint ACT_FK_EXE_PROCINST
    foreign key (PROC_INST_ID_)
    references ACT_RU_EXECUTION (ID_);

create index ACT_IDX_EXE_PARENT on ACT_RU_EXECUTION(PARENT_ID_);
alter table ACT_RU_EXECUTION
    add constraint ACT_FK_EXE_PARENT
    foreign key (PARENT_ID_)
    references ACT_RU_EXECUTION (ID_);

create index ACT_IDX_EXE_SUPER on ACT_RU_EXECUTION(SUPER_EXEC_);
alter table ACT_RU_EXECUTION
    add constraint ACT_FK_EXE_SUPER
    foreign key (SUPER_EXEC_)
    references ACT_RU_EXECUTION (ID_);

create index ACT_IDX_EXE_PROCDEF on ACT_RU_EXECUTION(PROC_DEF_ID_);
alter table ACT_RU_EXECUTION
    add constraint ACT_FK_EXE_PROCDEF
    foreign key (PROC_DEF_ID_)
    references ACT_RE_PROCDEF (ID_);

create index ACT_IDX_TSKASS_TASK on ACT_RU_IDENTITYLINK(TASK_ID_);
alter table ACT_RU_IDENTITYLINK
    add constraint ACT_FK_TSKASS_TASK
    foreign key (TASK_ID_)
    references ACT_RU_TASK (ID_);

create index ACT_IDX_ATHRZ_PROCEDEF  on ACT_RU_IDENTITYLINK(PROC_DEF_ID_);
alter table ACT_RU_IDENTITYLINK
    add constraint ACT_FK_ATHRZ_PROCEDEF
    foreign key (PROC_DEF_ID_)
    references ACT_RE_PROCDEF (ID_);

create index ACT_IDX_TASK_EXEC on ACT_RU_TASK(EXECUTION_ID_);
alter table ACT_RU_TASK
    add constraint ACT_FK_TASK_EXE
    foreign key (EXECUTION_ID_)
    references ACT_RU_EXECUTION (ID_);

create index ACT_IDX_TASK_PROCINST on ACT_RU_TASK(PROC_INST_ID_);
alter table ACT_RU_TASK
    add constraint ACT_FK_TASK_PROCINST
    foreign key (PROC_INST_ID_)
    references ACT_RU_EXECUTION (ID_);

create index ACT_IDX_TASK_PROCDEF on ACT_RU_TASK(PROC_DEF_ID_);
alter table ACT_RU_TASK
  add constraint ACT_FK_TASK_PROCDEF
  foreign key (PROC_DEF_ID_)
  references ACT_RE_PROCDEF (ID_);

create index ACT_IDX_VAR_EXE on ACT_RU_VARIABLE(EXECUTION_ID_);
alter table ACT_RU_VARIABLE
    add constraint ACT_FK_VAR_EXE
    foreign key (EXECUTION_ID_)
    references ACT_RU_EXECUTION (ID_);

create index ACT_IDX_VAR_PROCINST on ACT_RU_VARIABLE(PROC_INST_ID_);
alter table ACT_RU_VARIABLE
    add constraint ACT_FK_VAR_PROCINST
    foreign key (PROC_INST_ID_)
    references ACT_RU_EXECUTION(ID_);

create index ACT_IDX_VAR_BYTEARRAY on ACT_RU_VARIABLE(BYTEARRAY_ID_);
alter table ACT_RU_VARIABLE
    add constraint ACT_FK_VAR_BYTEARRAY
    foreign key (BYTEARRAY_ID_)
    references ACT_GE_BYTEARRAY (ID_);

create index ACT_IDX_JOB_EXCEPTION on ACT_RU_JOB(EXCEPTION_STACK_ID_);
alter table ACT_RU_JOB
    add constraint ACT_FK_JOB_EXCEPTION
    foreign key (EXCEPTION_STACK_ID_)
    references ACT_GE_BYTEARRAY (ID_);

create index ACT_IDX_EVENT_SUBSCR on ACT_RU_EVENT_SUBSCR(EXECUTION_ID_);
alter table ACT_RU_EVENT_SUBSCR
    add constraint ACT_FK_EVENT_EXEC
    foreign key (EXECUTION_ID_)
    references ACT_RU_EXECUTION(ID_);

alter table ACT_RU_INCIDENT
    add constraint ACT_FK_INC_EXE
    foreign key (EXECUTION_ID_)
    references ACT_RU_EXECUTION (ID_);

alter table ACT_RU_INCIDENT
    add constraint ACT_FK_INC_PROCINST
    foreign key (PROC_INST_ID_)
    references ACT_RU_EXECUTION (ID_);

alter table ACT_RU_INCIDENT
    add constraint ACT_FK_INC_PROCDEF
    foreign key (PROC_DEF_ID_)
    references ACT_RE_PROCDEF (ID_);

alter table ACT_RU_INCIDENT
    add constraint ACT_FK_INC_CAUSE
    foreign key (CAUSE_INCIDENT_ID_)
    references ACT_RU_INCIDENT (ID_);

alter table ACT_RU_INCIDENT
    add constraint ACT_FK_INC_RCAUSE
    foreign key (ROOT_CAUSE_INCIDENT_ID_)
    references ACT_RU_INCIDENT (ID_);

alter table ACT_RU_EXT_TASK
    add constraint ACT_FK_EXT_TASK_ERROR_DETAILS
    foreign key (ERROR_DETAILS_ID_)
    references ACT_GE_BYTEARRAY (ID_);

create index ACT_IDX_INC_JOB_DEF on ACT_RU_INCIDENT(JOB_DEF_ID_);
alter table ACT_RU_INCIDENT
    add constraint ACT_FK_INC_JOB_DEF
    foreign key (JOB_DEF_ID_)
    references ACT_RU_JOBDEF (ID_);

-- see http://stackoverflow.com/questions/675398/how-can-i-constrain-multiple-columns-to-prevent-duplicates-but-ignore-null-value
create unique index ACT_UNIQ_AUTH_USER on ACT_RU_AUTHORIZATION
   (case when USER_ID_ is null then null else TYPE_ end,
    case when USER_ID_ is null then null else RESOURCE_TYPE_ end,
    case when USER_ID_ is null then null else RESOURCE_ID_ end,
    case when USER_ID_ is null then null else USER_ID_ end);

create unique index ACT_UNIQ_AUTH_GROUP on ACT_RU_AUTHORIZATION
   (case when GROUP_ID_ is null then null else TYPE_ end,
    case when GROUP_ID_ is null then null else RESOURCE_TYPE_ end,
    case when GROUP_ID_ is null then null else RESOURCE_ID_ end,
    case when GROUP_ID_ is null then null else GROUP_ID_ end);

alter table ACT_RU_VARIABLE
    add constraint ACT_UNIQ_VARIABLE
    unique (VAR_SCOPE_, NAME_);

alter table ACT_RU_EXT_TASK
    add constraint ACT_FK_EXT_TASK_EXE
    foreign key (EXECUTION_ID_)
    references ACT_RU_EXECUTION (ID_);

create index ACT_IDX_BATCH_SEED_JOB_DEF ON ACT_RU_BATCH(SEED_JOB_DEF_ID_);
alter table ACT_RU_BATCH
    add constraint ACT_FK_BATCH_SEED_JOB_DEF
    foreign key (SEED_JOB_DEF_ID_)
    references ACT_RU_JOBDEF (ID_);

create index ACT_IDX_BATCH_MONITOR_JOB_DEF ON ACT_RU_BATCH(MONITOR_JOB_DEF_ID_);
alter table ACT_RU_BATCH
    add constraint ACT_FK_BATCH_MONITOR_JOB_DEF
    foreign key (MONITOR_JOB_DEF_ID_)
    references ACT_RU_JOBDEF (ID_);

create index ACT_IDX_BATCH_JOB_DEF ON ACT_RU_BATCH(BATCH_JOB_DEF_ID_);
alter table ACT_RU_BATCH
    add constraint ACT_FK_BATCH_JOB_DEF
    foreign key (BATCH_JOB_DEF_ID_)
    references ACT_RU_JOBDEF (ID_);

-- indexes for deadlock problems - https://app.camunda.com/jira/browse/CAM-2567 --
create index ACT_IDX_INC_CAUSEINCID on ACT_RU_INCIDENT(CAUSE_INCIDENT_ID_);
create index ACT_IDX_INC_EXID on ACT_RU_INCIDENT(EXECUTION_ID_);
create index ACT_IDX_INC_PROCDEFID on ACT_RU_INCIDENT(PROC_DEF_ID_);
create index ACT_IDX_INC_PROCINSTID on ACT_RU_INCIDENT(PROC_INST_ID_);
create index ACT_IDX_INC_ROOTCAUSEINCID on ACT_RU_INCIDENT(ROOT_CAUSE_INCIDENT_ID_);
-- index for deadlock problem - https://app.camunda.com/jira/browse/CAM-4440 --
create index ACT_IDX_AUTH_RESOURCE_ID on ACT_RU_AUTHORIZATION(RESOURCE_ID_);
-- index to prevent deadlock on fk constraint - https://app.camunda.com/jira/browse/CAM-5440 --
create index ACT_IDX_EXT_TASK_EXEC on ACT_RU_EXT_TASK(EXECUTION_ID_);

-- indexes to improve deployment
create index ACT_IDX_BYTEARRAY_ROOT_PI on ACT_GE_BYTEARRAY(ROOT_PROC_INST_ID_);
create index ACT_IDX_BYTEARRAY_RM_TIME on ACT_GE_BYTEARRAY(REMOVAL_TIME_);
create index ACT_IDX_BYTEARRAY_NAME on ACT_GE_BYTEARRAY(NAME_);
create index ACT_IDX_DEPLOYMENT_NAME on ACT_RE_DEPLOYMENT(NAME_);
create index ACT_IDX_DEPLOYMENT_TENANT_ID on ACT_RE_DEPLOYMENT(TENANT_ID_, 0);
create index ACT_IDX_JOBDEF_PROC_DEF_ID ON ACT_RU_JOBDEF(PROC_DEF_ID_);
create index ACT_IDX_JOB_HANDLER_TYPE ON ACT_RU_JOB(HANDLER_TYPE_);
create index ACT_IDX_EVENT_SUBSCR_EVT_NAME ON ACT_RU_EVENT_SUBSCR(EVENT_NAME_);
create index ACT_IDX_PROCDEF_DEPLOYMENT_ID ON ACT_RE_PROCDEF(DEPLOYMENT_ID_);
create index ACT_IDX_PROCDEF_TENANT_ID ON ACT_RE_PROCDEF(TENANT_ID_, 0);
create index ACT_IDX_PROCDEF_VER_TAG ON ACT_RE_PROCDEF(VERSION_TAG_);
--
-- Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
-- under one or more contributor license agreements. See the NOTICE file
-- distributed with this work for additional information regarding copyright
-- ownership. Camunda licenses this file to you under the Apache License,
-- Version 2.0; you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--

-- create case definition table --

create table ACT_RE_CASE_DEF (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    CATEGORY_ NVARCHAR2(255),
    NAME_ NVARCHAR2(255),
    KEY_ NVARCHAR2(255) NOT NULL,
    VERSION_ INTEGER NOT NULL,
    DEPLOYMENT_ID_ NVARCHAR2(64),
    RESOURCE_NAME_ NVARCHAR2(2000),
    DGRM_RESOURCE_NAME_ NVARCHAR2(2000),
    TENANT_ID_ NVARCHAR2(64),
    HISTORY_TTL_ INTEGER,
    primary key (ID_)
);

-- create case execution table --

create table ACT_RU_CASE_EXECUTION (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    CASE_INST_ID_ NVARCHAR2(64),
    SUPER_CASE_EXEC_ NVARCHAR2(64),
    SUPER_EXEC_ NVARCHAR2(64),
    BUSINESS_KEY_ NVARCHAR2(255),
    PARENT_ID_ NVARCHAR2(64),
    CASE_DEF_ID_ NVARCHAR2(64),
    ACT_ID_ NVARCHAR2(255),
    PREV_STATE_ INTEGER,
    CURRENT_STATE_ INTEGER,
    REQUIRED_ NUMBER(1,0) CHECK (REQUIRED_ IN (1,0)),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

-- create case sentry part table --

create table ACT_RU_CASE_SENTRY_PART (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    CASE_INST_ID_ NVARCHAR2(64),
    CASE_EXEC_ID_ NVARCHAR2(64),
    SENTRY_ID_ NVARCHAR2(255),
    TYPE_ NVARCHAR2(255),
    SOURCE_CASE_EXEC_ID_ NVARCHAR2(64),
    STANDARD_EVENT_ NVARCHAR2(255),
    SOURCE_ NVARCHAR2(255),
    VARIABLE_EVENT_ NVARCHAR2(255),
    VARIABLE_NAME_ NVARCHAR2(255),
    SATISFIED_ NUMBER(1,0) CHECK (SATISFIED_ IN (1,0)),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

-- create index on business key --
create index ACT_IDX_CASE_EXEC_BUSKEY on ACT_RU_CASE_EXECUTION(BUSINESS_KEY_);

-- create foreign key constraints on ACT_RU_CASE_EXECUTION --
create index ACT_IDX_CASE_EXE_CASE_INST on ACT_RU_CASE_EXECUTION(CASE_INST_ID_);
alter table ACT_RU_CASE_EXECUTION
    add constraint ACT_FK_CASE_EXE_CASE_INST
    foreign key (CASE_INST_ID_)
    references ACT_RU_CASE_EXECUTION(ID_);

create index ACT_IDX_CASE_EXE_PARENT on ACT_RU_CASE_EXECUTION(PARENT_ID_);
alter table ACT_RU_CASE_EXECUTION
    add constraint ACT_FK_CASE_EXE_PARENT
    foreign key (PARENT_ID_)
    references ACT_RU_CASE_EXECUTION(ID_);

create index ACT_IDX_CASE_EXE_CASE_DEF on ACT_RU_CASE_EXECUTION(CASE_DEF_ID_);
alter table ACT_RU_CASE_EXECUTION
    add constraint ACT_FK_CASE_EXE_CASE_DEF
    foreign key (CASE_DEF_ID_)
    references ACT_RE_CASE_DEF(ID_);

-- create foreign key constraints on ACT_RU_VARIABLE --
create index ACT_IDX_VAR_CASE_EXE on ACT_RU_VARIABLE(CASE_EXECUTION_ID_);
alter table ACT_RU_VARIABLE
    add constraint ACT_FK_VAR_CASE_EXE
    foreign key (CASE_EXECUTION_ID_)
    references ACT_RU_CASE_EXECUTION(ID_);

create index ACT_IDX_VAR_CASE_INST_ID on ACT_RU_VARIABLE(CASE_INST_ID_);
alter table ACT_RU_VARIABLE
    add constraint ACT_FK_VAR_CASE_INST
    foreign key (CASE_INST_ID_)
    references ACT_RU_CASE_EXECUTION(ID_);

-- create foreign key constraints on ACT_RU_TASK --
create index ACT_IDX_TASK_CASE_EXEC on ACT_RU_TASK(CASE_EXECUTION_ID_);
alter table ACT_RU_TASK
    add constraint ACT_FK_TASK_CASE_EXE
    foreign key (CASE_EXECUTION_ID_)
    references ACT_RU_CASE_EXECUTION(ID_);

create index ACT_IDX_TASK_CASE_DEF_ID on ACT_RU_TASK(CASE_DEF_ID_);
alter table ACT_RU_TASK
  add constraint ACT_FK_TASK_CASE_DEF
  foreign key (CASE_DEF_ID_)
  references ACT_RE_CASE_DEF(ID_);

-- create foreign key constraints on ACT_RU_CASE_SENTRY_PART --
create index ACT_IDX_CASE_SENTRY_CASE_INST on ACT_RU_CASE_SENTRY_PART(CASE_INST_ID_);
alter table ACT_RU_CASE_SENTRY_PART
    add constraint ACT_FK_CASE_SENTRY_CASE_INST
    foreign key (CASE_INST_ID_)
    references ACT_RU_CASE_EXECUTION(ID_);

create index ACT_IDX_CASE_SENTRY_CASE_EXEC on ACT_RU_CASE_SENTRY_PART(CASE_EXEC_ID_);
alter table ACT_RU_CASE_SENTRY_PART
    add constraint ACT_FK_CASE_SENTRY_CASE_EXEC
    foreign key (CASE_EXEC_ID_)
    references ACT_RU_CASE_EXECUTION(ID_);

create index ACT_IDX_CASE_DEF_TENANT_ID on ACT_RE_CASE_DEF(TENANT_ID_, 0);
create index ACT_IDX_CASE_EXEC_TENANT_ID on ACT_RU_CASE_EXECUTION(TENANT_ID_, 0);
--
-- Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
-- under one or more contributor license agreements. See the NOTICE file
-- distributed with this work for additional information regarding copyright
-- ownership. Camunda licenses this file to you under the Apache License,
-- Version 2.0; you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--

-- create decision definition table --
create table ACT_RE_DECISION_DEF (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    CATEGORY_ NVARCHAR2(255),
    NAME_ NVARCHAR2(255),
    KEY_ NVARCHAR2(255) NOT NULL,
    VERSION_ INTEGER NOT NULL,
    DEPLOYMENT_ID_ NVARCHAR2(64),
    RESOURCE_NAME_ NVARCHAR2(2000),
    DGRM_RESOURCE_NAME_ NVARCHAR2(2000),
    DEC_REQ_ID_ NVARCHAR2(64),
    DEC_REQ_KEY_ NVARCHAR2(255),
    TENANT_ID_ NVARCHAR2(64),
    HISTORY_TTL_ integer,
    VERSION_TAG_ NVARCHAR2(64),
    primary key (ID_)
);

-- create decision requirements definition table --
create table ACT_RE_DECISION_REQ_DEF (
    ID_ NVARCHAR2(64) NOT NULL,
    REV_ INTEGER,
    CATEGORY_ NVARCHAR2(255),
    NAME_ NVARCHAR2(255),
    KEY_ NVARCHAR2(255) NOT NULL,
    VERSION_ INTEGER NOT NULL,
    DEPLOYMENT_ID_ NVARCHAR2(64),
    RESOURCE_NAME_ NVARCHAR2(2000),
    DGRM_RESOURCE_NAME_ NVARCHAR2(2000),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

alter table ACT_RE_DECISION_DEF
    add constraint ACT_FK_DEC_REQ
    foreign key (DEC_REQ_ID_)
    references ACT_RE_DECISION_REQ_DEF(ID_);

create index ACT_IDX_DEC_DEF_TENANT_ID on ACT_RE_DECISION_DEF(TENANT_ID_, 0);
create index ACT_IDX_DEC_DEF_REQ_ID on ACT_RE_DECISION_DEF(DEC_REQ_ID_);
create index ACT_IDX_DEC_REQ_DEF_TENANT_ID on ACT_RE_DECISION_REQ_DEF(TENANT_ID_, 0);
--
-- Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
-- under one or more contributor license agreements. See the NOTICE file
-- distributed with this work for additional information regarding copyright
-- ownership. Camunda licenses this file to you under the Apache License,
-- Version 2.0; you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--

create table ACT_HI_PROCINST (
    ID_ NVARCHAR2(64) not null,
    PROC_INST_ID_ NVARCHAR2(64) not null,
    BUSINESS_KEY_ NVARCHAR2(255),
    PROC_DEF_KEY_ NVARCHAR2(255),
    PROC_DEF_ID_ NVARCHAR2(64) not null,
    START_TIME_ TIMESTAMP(6) not null,
    END_TIME_ TIMESTAMP(6),
    REMOVAL_TIME_ TIMESTAMP(6),
    DURATION_ NUMBER(19,0),
    START_USER_ID_ NVARCHAR2(255),
    START_ACT_ID_ NVARCHAR2(255),
    END_ACT_ID_ NVARCHAR2(255),
    SUPER_PROCESS_INSTANCE_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    SUPER_CASE_INSTANCE_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    DELETE_REASON_ NVARCHAR2(2000),
    TENANT_ID_ NVARCHAR2(64),
    STATE_ NVARCHAR2(255),
    primary key (ID_),
    unique (PROC_INST_ID_)
);

create table ACT_HI_ACTINST (
    ID_ NVARCHAR2(64) not null,
    PARENT_ACT_INST_ID_ NVARCHAR2(64),
    PROC_DEF_KEY_ NVARCHAR2(255),
    PROC_DEF_ID_ NVARCHAR2(64) not null,
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64) not null,
    EXECUTION_ID_ NVARCHAR2(64) not null,
    ACT_ID_ NVARCHAR2(255) not null,
    TASK_ID_ NVARCHAR2(64),
    CALL_PROC_INST_ID_ NVARCHAR2(64),
    CALL_CASE_INST_ID_ NVARCHAR2(64),
    ACT_NAME_ NVARCHAR2(255),
    ACT_TYPE_ NVARCHAR2(255) not null,
    ASSIGNEE_ NVARCHAR2(64),
    START_TIME_ TIMESTAMP(6) not null,
    END_TIME_ TIMESTAMP(6),
    DURATION_ NUMBER(19,0),
    ACT_INST_STATE_ INTEGER,
    SEQUENCE_COUNTER_ NUMBER(19,0),
    TENANT_ID_ NVARCHAR2(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_TASKINST (
    ID_ NVARCHAR2(64) not null,
    TASK_DEF_KEY_ NVARCHAR2(255),
    PROC_DEF_KEY_ NVARCHAR2(255),
    PROC_DEF_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    EXECUTION_ID_ NVARCHAR2(64),
    CASE_DEF_KEY_ NVARCHAR2(255),
    CASE_DEF_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    CASE_EXECUTION_ID_ NVARCHAR2(64),
    ACT_INST_ID_ NVARCHAR2(64),
    PARENT_TASK_ID_ NVARCHAR2(64),
    NAME_ NVARCHAR2(255),
    DESCRIPTION_ NVARCHAR2(2000),
    OWNER_ NVARCHAR2(255),
    ASSIGNEE_ NVARCHAR2(255),
    START_TIME_ TIMESTAMP(6) not null,
    END_TIME_ TIMESTAMP(6),
    DURATION_ NUMBER(19,0),
    DELETE_REASON_ NVARCHAR2(2000),
    PRIORITY_ INTEGER,
    DUE_DATE_ TIMESTAMP(6),
    FOLLOW_UP_DATE_ TIMESTAMP(6),
    TENANT_ID_ NVARCHAR2(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_VARINST (
    ID_ NVARCHAR2(64) not null,
    PROC_DEF_KEY_ NVARCHAR2(255),
    PROC_DEF_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    EXECUTION_ID_ NVARCHAR2(64),
    ACT_INST_ID_ NVARCHAR2(64),
    CASE_DEF_KEY_ NVARCHAR2(255),
    CASE_DEF_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    CASE_EXECUTION_ID_ NVARCHAR2(64),
    TASK_ID_ NVARCHAR2(64),
    NAME_ NVARCHAR2(255) not null,
    VAR_TYPE_ NVARCHAR2(100),
    CREATE_TIME_ TIMESTAMP(6),
    REV_ INTEGER,
    BYTEARRAY_ID_ NVARCHAR2(64),
    DOUBLE_ NUMBER(*,10),
    LONG_ NUMBER(19,0),
    TEXT_ NVARCHAR2(2000),
    TEXT2_ NVARCHAR2(2000),
    TENANT_ID_ NVARCHAR2(64),
    STATE_ NVARCHAR2(20),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_DETAIL (
    ID_ NVARCHAR2(64) not null,
    TYPE_ NVARCHAR2(255) not null,
    PROC_DEF_KEY_ NVARCHAR2(255),
    PROC_DEF_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    EXECUTION_ID_ NVARCHAR2(64),
    CASE_DEF_KEY_ NVARCHAR2(255),
    CASE_DEF_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    CASE_EXECUTION_ID_ NVARCHAR2(64),
    TASK_ID_ NVARCHAR2(64),
    ACT_INST_ID_ NVARCHAR2(64),
    VAR_INST_ID_ NVARCHAR2(64),
    NAME_ NVARCHAR2(255) not null,
    VAR_TYPE_ NVARCHAR2(64),
    REV_ INTEGER,
    TIME_ TIMESTAMP(6) not null,
    BYTEARRAY_ID_ NVARCHAR2(64),
    DOUBLE_ NUMBER(*,10),
    LONG_ NUMBER(19,0),
    TEXT_ NVARCHAR2(2000),
    TEXT2_ NVARCHAR2(2000),
    SEQUENCE_COUNTER_ NUMBER(19,0),
    TENANT_ID_ NVARCHAR2(64),
    OPERATION_ID_ NVARCHAR2(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_IDENTITYLINK (
    ID_ NVARCHAR2(64) not null,
    TIMESTAMP_ TIMESTAMP(6) not null,
    TYPE_ NVARCHAR2(255),
    USER_ID_ NVARCHAR2(255),
    GROUP_ID_ NVARCHAR2(255),
    TASK_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_DEF_ID_ NVARCHAR2(64),
    OPERATION_TYPE_ NVARCHAR2(64),
    ASSIGNER_ID_ NVARCHAR2(64),
    PROC_DEF_KEY_ NVARCHAR2(255),
    TENANT_ID_ NVARCHAR2(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_COMMENT (
    ID_ NVARCHAR2(64) not null,
    TYPE_ NVARCHAR2(255),
    TIME_ TIMESTAMP(6) not null,
    USER_ID_ NVARCHAR2(255),
    TASK_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    ACTION_ NVARCHAR2(255),
    MESSAGE_ NVARCHAR2(2000),
    FULL_MSG_ BLOB,
    TENANT_ID_ NVARCHAR2(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_ATTACHMENT (
    ID_ NVARCHAR2(64) not null,
    REV_ INTEGER,
    USER_ID_ NVARCHAR2(255),
    NAME_ NVARCHAR2(255),
    DESCRIPTION_ NVARCHAR2(2000),
    TYPE_ NVARCHAR2(255),
    TASK_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    URL_ NVARCHAR2(2000),
    CONTENT_ID_ NVARCHAR2(64),
    TENANT_ID_ NVARCHAR2(64),
    CREATE_TIME_ TIMESTAMP(6),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_OP_LOG (
    ID_ NVARCHAR2(64) not null,
    DEPLOYMENT_ID_ NVARCHAR2(64),
    PROC_DEF_ID_ NVARCHAR2(64),
    PROC_DEF_KEY_ NVARCHAR2(255),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    EXECUTION_ID_ NVARCHAR2(64),
    CASE_DEF_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    CASE_EXECUTION_ID_ NVARCHAR2(64),
    TASK_ID_ NVARCHAR2(64),
    JOB_ID_ NVARCHAR2(64),
    JOB_DEF_ID_ NVARCHAR2(64),
    BATCH_ID_ NVARCHAR2(64),
    USER_ID_ NVARCHAR2(255),
    TIMESTAMP_ TIMESTAMP(6) not null,
    OPERATION_TYPE_ NVARCHAR2(255),
    OPERATION_ID_ NVARCHAR2(64),
    ENTITY_TYPE_ NVARCHAR2(30),
    PROPERTY_ NVARCHAR2(64),
    ORG_VALUE_ NVARCHAR2(2000),
    NEW_VALUE_ NVARCHAR2(2000),
    TENANT_ID_ NVARCHAR2(64),
    REMOVAL_TIME_ TIMESTAMP(6),
	CATEGORY_ NVARCHAR2(64),
	EXTERNAL_TASK_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create table ACT_HI_INCIDENT (
  ID_ NVARCHAR2(64) not null,
  PROC_DEF_KEY_ NVARCHAR2(255),
  PROC_DEF_ID_ NVARCHAR2(64),
  ROOT_PROC_INST_ID_ NVARCHAR2(64),
  PROC_INST_ID_ NVARCHAR2(64),
  EXECUTION_ID_ NVARCHAR2(64),
  CREATE_TIME_ TIMESTAMP(6) not null,
  END_TIME_ TIMESTAMP(6),
  INCIDENT_MSG_ NVARCHAR2(2000),
  INCIDENT_TYPE_ NVARCHAR2(255) not null,
  ACTIVITY_ID_ NVARCHAR2(255),
  CAUSE_INCIDENT_ID_ NVARCHAR2(64),
  ROOT_CAUSE_INCIDENT_ID_ NVARCHAR2(64),
  CONFIGURATION_ NVARCHAR2(255),
  INCIDENT_STATE_ INTEGER,
  TENANT_ID_ NVARCHAR2(64),
  JOB_DEF_ID_ NVARCHAR2(64),
  REMOVAL_TIME_ TIMESTAMP(6),
  primary key (ID_)
);

create table ACT_HI_JOB_LOG (
    ID_ NVARCHAR2(64) not null,
    TIMESTAMP_ TIMESTAMP(6) not null,
    JOB_ID_ NVARCHAR2(64) not null,
    JOB_DUEDATE_ TIMESTAMP(6),
    JOB_RETRIES_ INTEGER,
    JOB_PRIORITY_ NUMBER(19,0) DEFAULT 0 NOT NULL,
    JOB_EXCEPTION_MSG_ NVARCHAR2(2000),
    JOB_EXCEPTION_STACK_ID_ NVARCHAR2(64),
    JOB_STATE_ INTEGER,
    JOB_DEF_ID_ NVARCHAR2(64),
    JOB_DEF_TYPE_ NVARCHAR2(255),
    JOB_DEF_CONFIGURATION_ NVARCHAR2(255),
    ACT_ID_ NVARCHAR2(255),
    EXECUTION_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROCESS_INSTANCE_ID_ NVARCHAR2(64),
    PROCESS_DEF_ID_ NVARCHAR2(64),
    PROCESS_DEF_KEY_ NVARCHAR2(255),
    DEPLOYMENT_ID_ NVARCHAR2(64),
    SEQUENCE_COUNTER_ NUMBER(19,0),
    TENANT_ID_ NVARCHAR2(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_BATCH (
    ID_ NVARCHAR2(64) not null,
    TYPE_ NVARCHAR2(255),
    TOTAL_JOBS_ INTEGER,
    JOBS_PER_SEED_ INTEGER,
    INVOCATIONS_PER_JOB_ INTEGER,
    SEED_JOB_DEF_ID_ NVARCHAR2(64),
    MONITOR_JOB_DEF_ID_ NVARCHAR2(64),
    BATCH_JOB_DEF_ID_ NVARCHAR2(64),
    TENANT_ID_  NVARCHAR2(64),
    CREATE_USER_ID_ NVARCHAR2(255),
    START_TIME_ TIMESTAMP(6) NOT NULL,
    END_TIME_ TIMESTAMP(6),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create table ACT_HI_EXT_TASK_LOG (
    ID_ NVARCHAR2(64) not null,
    TIMESTAMP_ TIMESTAMP(6) not null,
    EXT_TASK_ID_ NVARCHAR2(64) not null,
    RETRIES_ integer,
    TOPIC_NAME_ NVARCHAR2(255),
    WORKER_ID_ NVARCHAR2(255),
    PRIORITY_ NUMBER(19,0) DEFAULT 0 NOT NULL,
    ERROR_MSG_ NVARCHAR2(2000),
    ERROR_DETAILS_ID_ NVARCHAR2(64),
    ACT_ID_ NVARCHAR2(255),
    ACT_INST_ID_ NVARCHAR2(64),
    EXECUTION_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    PROC_DEF_ID_ NVARCHAR2(64),
    PROC_DEF_KEY_ NVARCHAR2(255),
    TENANT_ID_ NVARCHAR2(64),
    STATE_ INTEGER,
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

create index ACT_IDX_HI_PRO_INST_END on ACT_HI_PROCINST(END_TIME_);
create index ACT_IDX_HI_PRO_I_BUSKEY on ACT_HI_PROCINST(BUSINESS_KEY_);
create index ACT_IDX_HI_PRO_INST_TENANT_ID on ACT_HI_PROCINST(TENANT_ID_, 0);
create index ACT_IDX_HI_PRO_INST_PROC_KEY on ACT_HI_PROCINST(PROC_DEF_KEY_);
create index ACT_IDX_HI_PRO_INST_PROC_TIME on ACT_HI_PROCINST(START_TIME_, END_TIME_);
create index ACT_IDX_HI_PI_PDEFID_END_TIME on ACT_HI_PROCINST(PROC_DEF_ID_, END_TIME_);
create index ACT_IDX_HI_PRO_INST_ROOT_PI on ACT_HI_PROCINST(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_PRO_INST_RM_TIME on ACT_HI_PROCINST(REMOVAL_TIME_);

create index ACT_IDX_HI_ACTINST_ROOT_PI on ACT_HI_ACTINST(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_ACT_INST_START on ACT_HI_ACTINST(START_TIME_);
create index ACT_IDX_HI_ACT_INST_END on ACT_HI_ACTINST(END_TIME_);
create index ACT_IDX_HI_ACT_INST_PROCINST on ACT_HI_ACTINST(PROC_INST_ID_, ACT_ID_);
create index ACT_IDX_HI_ACT_INST_COMP on ACT_HI_ACTINST(EXECUTION_ID_, ACT_ID_, END_TIME_, ID_);
create index ACT_IDX_HI_ACT_INST_STATS on ACT_HI_ACTINST(PROC_DEF_ID_, PROC_INST_ID_, ACT_ID_, END_TIME_, ACT_INST_STATE_);
create index ACT_IDX_HI_ACT_INST_TENANT_ID on ACT_HI_ACTINST(TENANT_ID_, 0);
create index ACT_IDX_HI_ACT_INST_PROC_KEY on ACT_HI_ACTINST(PROC_DEF_KEY_);
create index ACT_IDX_HI_AI_PDEFID_END_TIME on ACT_HI_ACTINST(PROC_DEF_ID_, END_TIME_);
create index ACT_IDX_HI_ACT_INST_RM_TIME on ACT_HI_ACTINST(REMOVAL_TIME_);

create index ACT_IDX_HI_TASKINST_ROOT_PI on ACT_HI_TASKINST(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_TASK_INST_TENANT_ID on ACT_HI_TASKINST(TENANT_ID_, 0);
create index ACT_IDX_HI_TASK_INST_PROC_KEY on ACT_HI_TASKINST(PROC_DEF_KEY_);
create index ACT_IDX_HI_TASKINST_PROCINST on ACT_HI_TASKINST(PROC_INST_ID_);
create index ACT_IDX_HI_TASKINSTID_PROCINST on ACT_HI_TASKINST(ID_,PROC_INST_ID_);
create index ACT_IDX_HI_TASK_INST_RM_TIME on ACT_HI_TASKINST(REMOVAL_TIME_);
create index ACT_IDX_HI_TASK_INST_START on ACT_HI_TASKINST(START_TIME_);
create index ACT_IDX_HI_TASK_INST_END on ACT_HI_TASKINST(END_TIME_);

create index ACT_IDX_HI_DETAIL_ROOT_PI on ACT_HI_DETAIL(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_DETAIL_PROC_INST on ACT_HI_DETAIL(PROC_INST_ID_);
create index ACT_IDX_HI_DETAIL_ACT_INST on ACT_HI_DETAIL(ACT_INST_ID_);
create index ACT_IDX_HI_DETAIL_CASE_INST on ACT_HI_DETAIL(CASE_INST_ID_);
create index ACT_IDX_HI_DETAIL_CASE_EXEC on ACT_HI_DETAIL(CASE_EXECUTION_ID_);
create index ACT_IDX_HI_DETAIL_TIME on ACT_HI_DETAIL(TIME_);
create index ACT_IDX_HI_DETAIL_NAME on ACT_HI_DETAIL(NAME_);
create index ACT_IDX_HI_DETAIL_TASK_ID on ACT_HI_DETAIL(TASK_ID_);
create index ACT_IDX_HI_DETAIL_TENANT_ID on ACT_HI_DETAIL(TENANT_ID_, 0);
create index ACT_IDX_HI_DETAIL_PROC_KEY on ACT_HI_DETAIL(PROC_DEF_KEY_);
create index ACT_IDX_HI_DETAIL_BYTEAR on ACT_HI_DETAIL(BYTEARRAY_ID_);
create index ACT_IDX_HI_DETAIL_RM_TIME on ACT_HI_DETAIL(REMOVAL_TIME_);
create index ACT_IDX_HI_DETAIL_TASK_BYTEAR on ACT_HI_DETAIL(BYTEARRAY_ID_, TASK_ID_);

create index ACT_IDX_HI_IDENT_LNK_ROOT_PI on ACT_HI_IDENTITYLINK(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_IDENT_LNK_USER on ACT_HI_IDENTITYLINK(USER_ID_);
create index ACT_IDX_HI_IDENT_LNK_GROUP on ACT_HI_IDENTITYLINK(GROUP_ID_);
create index ACT_IDX_HI_IDENT_LNK_TENANT_ID on ACT_HI_IDENTITYLINK(TENANT_ID_, 0);
create index ACT_IDX_HI_IDENT_LNK_PROC_KEY on ACT_HI_IDENTITYLINK(PROC_DEF_KEY_);
create index ACT_IDX_HI_IDENT_LINK_TASK on ACT_HI_IDENTITYLINK(TASK_ID_);
create index ACT_IDX_HI_IDENT_LINK_RM_TIME on ACT_HI_IDENTITYLINK(REMOVAL_TIME_);
create index ACT_IDX_HI_IDENT_LNK_TIMESTAMP on ACT_HI_IDENTITYLINK(TIMESTAMP_);

create index ACT_IDX_HI_VARINST_ROOT_PI on ACT_HI_VARINST(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_PROCVAR_PROC_INST on ACT_HI_VARINST(PROC_INST_ID_);
create index ACT_IDX_HI_PROCVAR_NAME_TYPE on ACT_HI_VARINST(NAME_, VAR_TYPE_);
create index ACT_IDX_HI_CASEVAR_CASE_INST on ACT_HI_VARINST(CASE_INST_ID_);
create index ACT_IDX_HI_VAR_INST_TENANT_ID on ACT_HI_VARINST(TENANT_ID_, 0);
create index ACT_IDX_HI_VAR_INST_PROC_KEY on ACT_HI_VARINST(PROC_DEF_KEY_);
create index ACT_IDX_HI_VARINST_BYTEAR on ACT_HI_VARINST(BYTEARRAY_ID_);
create index ACT_IDX_HI_VARINST_RM_TIME on ACT_HI_VARINST(REMOVAL_TIME_);

create index ACT_IDX_HI_INCIDENT_TENANT_ID on ACT_HI_INCIDENT(TENANT_ID_, 0);
create index ACT_IDX_HI_INCIDENT_PROC_KEY on ACT_HI_INCIDENT(PROC_DEF_KEY_);
create index ACT_IDX_HI_INCIDENT_ROOT_PI on ACT_HI_INCIDENT(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_INCIDENT_PROCINST on ACT_HI_INCIDENT(PROC_INST_ID_);
create index ACT_IDX_HI_INCIDENT_RM_TIME on ACT_HI_INCIDENT(REMOVAL_TIME_);

create index ACT_IDX_HI_JOB_LOG_ROOT_PI on ACT_HI_JOB_LOG(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_JOB_LOG_PROCINST on ACT_HI_JOB_LOG(PROCESS_INSTANCE_ID_);
create index ACT_IDX_HI_JOB_LOG_PROCDEF on ACT_HI_JOB_LOG(PROCESS_DEF_ID_);
create index ACT_IDX_HI_JOB_LOG_TENANT_ID on ACT_HI_JOB_LOG(TENANT_ID_, 0);
create index ACT_IDX_HI_JOB_LOG_JOB_DEF_ID on ACT_HI_JOB_LOG(JOB_DEF_ID_);
create index ACT_IDX_HI_JOB_LOG_PROC_KEY on ACT_HI_JOB_LOG(PROCESS_DEF_KEY_);
create index ACT_IDX_HI_JOB_LOG_EX_STACK on ACT_HI_JOB_LOG(JOB_EXCEPTION_STACK_ID_);
create index ACT_IDX_HI_JOB_LOG_RM_TIME on ACT_HI_JOB_LOG(REMOVAL_TIME_);

create index ACT_HI_BAT_RM_TIME on ACT_HI_BATCH(REMOVAL_TIME_);

create index ACT_HI_EXT_TASK_LOG_ROOT_PI on ACT_HI_EXT_TASK_LOG(ROOT_PROC_INST_ID_);
create index ACT_HI_EXT_TASK_LOG_PROCINST on ACT_HI_EXT_TASK_LOG(PROC_INST_ID_);
create index ACT_HI_EXT_TASK_LOG_PROCDEF on ACT_HI_EXT_TASK_LOG(PROC_DEF_ID_);
create index ACT_HI_EXT_TASK_LOG_PROC_KEY on ACT_HI_EXT_TASK_LOG(PROC_DEF_KEY_);
create index ACT_HI_EXT_TASK_LOG_TENANT_ID on ACT_HI_EXT_TASK_LOG(TENANT_ID_);
create index ACT_IDX_HI_EXTTASKLOG_ERRORDET on ACT_HI_EXT_TASK_LOG(ERROR_DETAILS_ID_);
create index ACT_HI_EXT_TASK_LOG_RM_TIME on ACT_HI_EXT_TASK_LOG(REMOVAL_TIME_);

create index ACT_IDX_HI_OP_LOG_ROOT_PI on ACT_HI_OP_LOG(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_OP_LOG_PROCINST on ACT_HI_OP_LOG(PROC_INST_ID_);
create index ACT_IDX_HI_OP_LOG_PROCDEF on ACT_HI_OP_LOG(PROC_DEF_ID_);
create index ACT_IDX_HI_OP_LOG_TASK on ACT_HI_OP_LOG(TASK_ID_);
create index ACT_IDX_HI_OP_LOG_RM_TIME on ACT_HI_OP_LOG(REMOVAL_TIME_);
create index ACT_IDX_HI_OP_LOG_TIMESTAMP on ACT_HI_OP_LOG(TIMESTAMP_);
create index ACT_IDX_HI_OP_LOG_USER_ID on ACT_HI_OP_LOG(USER_ID_);
create index ACT_IDX_HI_OP_LOG_OP_TYPE on ACT_HI_OP_LOG(OPERATION_TYPE_);
create index ACT_IDX_HI_OP_LOG_ENTITY_TYPE on ACT_HI_OP_LOG(ENTITY_TYPE_);

create index ACT_IDX_HI_COMMENT_TASK on ACT_HI_COMMENT(TASK_ID_);
create index ACT_IDX_HI_COMMENT_ROOT_PI on ACT_HI_COMMENT(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_COMMENT_PROCINST on ACT_HI_COMMENT(PROC_INST_ID_);
create index ACT_IDX_HI_COMMENT_RM_TIME on ACT_HI_COMMENT(REMOVAL_TIME_);

create index ACT_IDX_HI_ATTACHMENT_CONTENT on ACT_HI_ATTACHMENT(CONTENT_ID_);
create index ACT_IDX_HI_ATTACHMENT_ROOT_PI on ACT_HI_ATTACHMENT(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_ATTACHMENT_PROCINST on ACT_HI_ATTACHMENT(PROC_INST_ID_);
create index ACT_IDX_HI_ATTACHMENT_TASK on ACT_HI_ATTACHMENT(TASK_ID_);
create index ACT_IDX_HI_ATTACHMENT_RM_TIME on ACT_HI_ATTACHMENT(REMOVAL_TIME_);
--
-- Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
-- under one or more contributor license agreements. See the NOTICE file
-- distributed with this work for additional information regarding copyright
-- ownership. Camunda licenses this file to you under the Apache License,
-- Version 2.0; you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--

create table ACT_HI_CASEINST (
    ID_ NVARCHAR2(64) not null,
    CASE_INST_ID_ NVARCHAR2(64) not null,
    BUSINESS_KEY_ NVARCHAR2(255),
    CASE_DEF_ID_ NVARCHAR2(64) not null,
    CREATE_TIME_ TIMESTAMP(6) not null,
    CLOSE_TIME_ TIMESTAMP(6),
    DURATION_ NUMBER(19,0),
    STATE_ INTEGER,
    CREATE_USER_ID_ NVARCHAR2(255),
    SUPER_CASE_INSTANCE_ID_ NVARCHAR2(64),
    SUPER_PROCESS_INSTANCE_ID_ NVARCHAR2(64),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_),
    unique (CASE_INST_ID_)
);

create table ACT_HI_CASEACTINST (
    ID_ NVARCHAR2(64) not null,
    PARENT_ACT_INST_ID_ NVARCHAR2(64),
    CASE_DEF_ID_ NVARCHAR2(64) not null,
    CASE_INST_ID_ NVARCHAR2(64) not null,
    CASE_ACT_ID_ NVARCHAR2(255) not null,
    TASK_ID_ NVARCHAR2(64),
    CALL_PROC_INST_ID_ NVARCHAR2(64),
    CALL_CASE_INST_ID_ NVARCHAR2(64),
    CASE_ACT_NAME_ NVARCHAR2(255),
    CASE_ACT_TYPE_ NVARCHAR2(255),
    CREATE_TIME_ TIMESTAMP(6) not null,
    END_TIME_ TIMESTAMP(6),
    DURATION_ NUMBER(19,0),
    STATE_ INTEGER,
    REQUIRED_ NUMBER(1,0) CHECK (REQUIRED_ IN (1,0)),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

create index ACT_IDX_HI_CAS_I_CLOSE on ACT_HI_CASEINST(CLOSE_TIME_);
create index ACT_IDX_HI_CAS_I_BUSKEY on ACT_HI_CASEINST(BUSINESS_KEY_);
create index ACT_IDX_HI_CAS_I_TENANT_ID on ACT_HI_CASEINST(TENANT_ID_, 0);
create index ACT_IDX_HI_CAS_A_I_CREATE on ACT_HI_CASEACTINST(CREATE_TIME_);
create index ACT_IDX_HI_CAS_A_I_END on ACT_HI_CASEACTINST(END_TIME_);
create index ACT_IDX_HI_CAS_A_I_COMP on ACT_HI_CASEACTINST(CASE_ACT_ID_, END_TIME_, ID_);
create index ACT_IDX_HI_CAS_A_I_TENANT_ID on ACT_HI_CASEACTINST(TENANT_ID_, 0);
--
-- Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
-- under one or more contributor license agreements. See the NOTICE file
-- distributed with this work for additional information regarding copyright
-- ownership. Camunda licenses this file to you under the Apache License,
-- Version 2.0; you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--

-- create history decision instance table --
create table ACT_HI_DECINST (
    ID_ NVARCHAR2(64) NOT NULL,
    DEC_DEF_ID_ NVARCHAR2(64) NOT NULL,
    DEC_DEF_KEY_ NVARCHAR2(255) NOT NULL,
    DEC_DEF_NAME_ NVARCHAR2(255),
    PROC_DEF_KEY_ NVARCHAR2(255),
    PROC_DEF_ID_ NVARCHAR2(64),
    PROC_INST_ID_ NVARCHAR2(64),
    CASE_DEF_KEY_ NVARCHAR2(255),
    CASE_DEF_ID_ NVARCHAR2(64),
    CASE_INST_ID_ NVARCHAR2(64),
    ACT_INST_ID_ NVARCHAR2(64),
    ACT_ID_ NVARCHAR2(255),
    EVAL_TIME_ TIMESTAMP(6) not null,
    REMOVAL_TIME_ TIMESTAMP(6),
    COLLECT_VALUE_ NUMBER(*,10),
    USER_ID_ NVARCHAR2(255),
    ROOT_DEC_INST_ID_ NVARCHAR2(64),
    ROOT_PROC_INST_ID_ NVARCHAR2(64),
    DEC_REQ_ID_ NVARCHAR2(64),
    DEC_REQ_KEY_ NVARCHAR2(255),
    TENANT_ID_ NVARCHAR2(64),
    primary key (ID_)
);

-- create history decision input table --
create table ACT_HI_DEC_IN (
    ID_ NVARCHAR2(64) NOT NULL,
    DEC_INST_ID_ NVARCHAR2(64) NOT NULL,
    CLAUSE_ID_ NVARCHAR2(64),
    CLAUSE_NAME_ NVARCHAR2(255),
    VAR_TYPE_ NVARCHAR2(100),
    BYTEARRAY_ID_ NVARCHAR2(64),
    DOUBLE_ NUMBER(*,10),
    LONG_ NUMBER(19,0),
    TEXT_ NVARCHAR2(2000),
    TEXT2_ NVARCHAR2(2000),
    TENANT_ID_ NVARCHAR2(64),
    CREATE_TIME_ TIMESTAMP(6),
    ROOT_PROC_INST_ID_ varchar(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);

-- create history decision output table --
create table ACT_HI_DEC_OUT (
    ID_ NVARCHAR2(64) NOT NULL,
    DEC_INST_ID_ NVARCHAR2(64) NOT NULL,
    CLAUSE_ID_ NVARCHAR2(64),
    CLAUSE_NAME_ NVARCHAR2(255),
    RULE_ID_ NVARCHAR2(64),
    RULE_ORDER_ INTEGER,
    VAR_NAME_ NVARCHAR2(255),
    VAR_TYPE_ NVARCHAR2(100),
    BYTEARRAY_ID_ NVARCHAR2(64),
    DOUBLE_ NUMBER(*,10),
    LONG_ NUMBER(19,0),
    TEXT_ NVARCHAR2(2000),
    TEXT2_ NVARCHAR2(2000),
    TENANT_ID_ NVARCHAR2(64),
    CREATE_TIME_ TIMESTAMP(6),
    ROOT_PROC_INST_ID_ varchar(64),
    REMOVAL_TIME_ TIMESTAMP(6),
    primary key (ID_)
);


create index ACT_IDX_HI_DEC_INST_ID on ACT_HI_DECINST(DEC_DEF_ID_);
create index ACT_IDX_HI_DEC_INST_KEY on ACT_HI_DECINST(DEC_DEF_KEY_);
create index ACT_IDX_HI_DEC_INST_PI on ACT_HI_DECINST(PROC_INST_ID_);
create index ACT_IDX_HI_DEC_INST_CI on ACT_HI_DECINST(CASE_INST_ID_);
create index ACT_IDX_HI_DEC_INST_ACT on ACT_HI_DECINST(ACT_ID_);
create index ACT_IDX_HI_DEC_INST_ACT_INST on ACT_HI_DECINST(ACT_INST_ID_);
create index ACT_IDX_HI_DEC_INST_TIME on ACT_HI_DECINST(EVAL_TIME_);
create index ACT_IDX_HI_DEC_INST_TENANT_ID on ACT_HI_DECINST(TENANT_ID_, 0);
create index ACT_IDX_HI_DEC_INST_ROOT_ID on ACT_HI_DECINST(ROOT_DEC_INST_ID_);
create index ACT_IDX_HI_DEC_INST_REQ_ID on ACT_HI_DECINST(DEC_REQ_ID_);
create index ACT_IDX_HI_DEC_INST_REQ_KEY on ACT_HI_DECINST(DEC_REQ_KEY_);
create index ACT_IDX_HI_DEC_INST_ROOT_PI on ACT_HI_DECINST(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_DEC_INST_RM_TIME on ACT_HI_DECINST(REMOVAL_TIME_);

create index ACT_IDX_HI_DEC_IN_INST on ACT_HI_DEC_IN(DEC_INST_ID_);
create index ACT_IDX_HI_DEC_IN_CLAUSE on ACT_HI_DEC_IN(DEC_INST_ID_, CLAUSE_ID_);
create index ACT_IDX_HI_DEC_IN_ROOT_PI on ACT_HI_DEC_IN(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_DEC_IN_RM_TIME on ACT_HI_DEC_IN(REMOVAL_TIME_);

create index ACT_IDX_HI_DEC_OUT_INST on ACT_HI_DEC_OUT(DEC_INST_ID_);
create index ACT_IDX_HI_DEC_OUT_RULE on ACT_HI_DEC_OUT(RULE_ORDER_, CLAUSE_ID_);
create index ACT_IDX_HI_DEC_OUT_ROOT_PI on ACT_HI_DEC_OUT(ROOT_PROC_INST_ID_);
create index ACT_IDX_HI_DEC_OUT_RM_TIME on ACT_HI_DEC_OUT(REMOVAL_TIME_);

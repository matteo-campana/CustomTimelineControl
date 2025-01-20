/// <reference path="../node_modules/@types/xrm/index.d.ts" />
declare namespace EmailEnum {
    const enum notifications {
        None = 0,
        TheMessageWasSavedAsAMicrosoftDynamics365EmailRecordButNotAllTheAttachmentsCouldBeSavedWithItAnAttachmentCannotBeSavedIfItIsBlockedOrIfItsFileTypeIsInvalid = 1,
        TruncatedBody = 2,
    }

    const enum correlationmethod {
        None = 0,
        Skipped = 1,
        Xheader = 2,
        Inreplyto = 3,
        Trackingtoken = 4,
        Conversationindex = 5,
        Smartmatching = 6,
        Customcorrelation = 7,
    }

    const enum emailreminderstatus {
        Notset = 0,
        Reminderset = 1,
        Reminderexpired = 2,
        Reminderinvalid = 3,
    }

    const enum prioritycode {
        Low = 0,
        Normal = 1,
        High = 2,
    }

    const enum statuscode {
        Draft = 1,
        Completed = 2,
        Sent = 3,
        Received = 4,
        Canceled = 5,
        PendingSend = 6,
        Sending = 7,
        Failed = 8,
    }

    const enum statecode {
        Open = 0,
        Completed = 1,
        Canceled = 2,
    }

    const enum msdyn_sentiment {
        NA = 0,
        VeryNegative = 7,
        Negative = 8,
        SlightlyNegative = 9,
        Neutral = 10,
        SlightlyPositive = 11,
        Positive = 12,
        VeryPositive = 13,
    }

    const enum emailremindertype {
        IfIDoNotReceiveAReplyBy = 0,
        IfTheEmailIsNotOpenedBy = 1,
        RemindMeAnywaysAt = 2,
    }

    const enum deliveryprioritycode {
        Low = 0,
        Normal = 1,
        High = 2,
    }

}

declare namespace Xrm {
    type Email = Omit<FormContext, 'getAttribute'> & Omit<FormContext, 'getControl'> & EmailAttributes;

    interface EventContext {
        getFormContext(): Email;
    }

    interface EmailAttributes {
        getAttribute(name: "acceptingentityid"): Attributes.LookupAttribute;
        getAttribute(name: "acceptingentityidname"): Attributes.StringAttribute;
        getAttribute(name: "activityid"): Attributes.StringAttribute;
        getAttribute(name: "activitytypecode"): Attributes.Attribute;
        getAttribute(name: "actualdurationminutes"): Attributes.NumberAttribute;
        getAttribute(name: "actualend"): Attributes.DateAttribute;
        getAttribute(name: "actualstart"): Attributes.DateAttribute;
        getAttribute(name: "attachmentcount"): Attributes.NumberAttribute;
        getAttribute(name: "attachmentopencount"): Attributes.NumberAttribute;
        getAttribute(name: "baseconversationindexhash"): Attributes.NumberAttribute;
        getAttribute(name: "bcc"): Attributes.LookupAttribute;
        getAttribute(name: "category"): Attributes.StringAttribute;
        getAttribute(name: "cc"): Attributes.LookupAttribute;
        getAttribute(name: "compressed"): Attributes.BooleanAttribute;
        getAttribute(name: "conversationindex"): Attributes.StringAttribute;
        getAttribute(name: "correlatedactivityidname"): Attributes.StringAttribute;
        getAttribute(name: "correlationmethod"): Attributes.OptionSetAttribute;
        getAttribute(name: "createdby"): Attributes.LookupAttribute;
        getAttribute(name: "createdon"): Attributes.DateAttribute;
        getAttribute(name: "createdonbehalfby"): Attributes.LookupAttribute;
        getAttribute(name: "delayedemailsendtime"): Attributes.DateAttribute;
        getAttribute(name: "deliveryattempts"): Attributes.NumberAttribute;
        getAttribute(name: "deliveryprioritycode"): Attributes.OptionSetAttribute;
        getAttribute(name: "deliveryreceiptrequested"): Attributes.BooleanAttribute;
        getAttribute(name: "description"): Attributes.StringAttribute;
        getAttribute(name: "directioncode"): Attributes.BooleanAttribute;
        getAttribute(name: "emailreminderexpirytime"): Attributes.DateAttribute;
        getAttribute(name: "emailreminderstatus"): Attributes.OptionSetAttribute;
        getAttribute(name: "emailremindertext"): Attributes.StringAttribute;
        getAttribute(name: "emailremindertype"): Attributes.OptionSetAttribute;
        getAttribute(name: "emailsenderobjecttypecode"): Attributes.Attribute;
        getAttribute(name: "exchangerate"): Attributes.NumberAttribute;
        getAttribute(name: "followemailuserpreference"): Attributes.BooleanAttribute;
        getAttribute(name: "from"): Attributes.LookupAttribute;
        getAttribute(name: "importsequencenumber"): Attributes.NumberAttribute;
        getAttribute(name: "inreplyto"): Attributes.StringAttribute;
        getAttribute(name: "isbilled"): Attributes.BooleanAttribute;
        getAttribute(name: "isemailfollowed"): Attributes.BooleanAttribute;
        getAttribute(name: "isemailreminderset"): Attributes.BooleanAttribute;
        getAttribute(name: "isregularactivity"): Attributes.BooleanAttribute;
        getAttribute(name: "isworkflowcreated"): Attributes.BooleanAttribute;
        getAttribute(name: "lastonholdtime"): Attributes.DateAttribute;
        getAttribute(name: "lastopenedtime"): Attributes.DateAttribute;
        getAttribute(name: "linksclickedcount"): Attributes.NumberAttribute;
        getAttribute(name: "messageid"): Attributes.StringAttribute;
        getAttribute(name: "mimetype"): Attributes.StringAttribute;
        getAttribute(name: "modifiedby"): Attributes.LookupAttribute;
        getAttribute(name: "modifiedon"): Attributes.DateAttribute;
        getAttribute(name: "modifiedonbehalfby"): Attributes.LookupAttribute;
        getAttribute(name: "msdyn_sentiment"): Attributes.OptionSetAttribute;
        getAttribute(name: "notifications"): Attributes.OptionSetAttribute;
        getAttribute(name: "onholdtime"): Attributes.NumberAttribute;
        getAttribute(name: "opencount"): Attributes.NumberAttribute;
        getAttribute(name: "overriddencreatedon"): Attributes.DateAttribute;
        getAttribute(name: "ownerid"): Attributes.LookupAttribute;
        getAttribute(name: "owningbusinessunit"): Attributes.LookupAttribute;
        getAttribute(name: "owningbusinessunitname"): Attributes.StringAttribute;
        getAttribute(name: "owningteam"): Attributes.LookupAttribute;
        getAttribute(name: "owninguser"): Attributes.LookupAttribute;
        getAttribute(name: "prioritycode"): Attributes.OptionSetAttribute;
        getAttribute(name: "readreceiptrequested"): Attributes.BooleanAttribute;
        getAttribute(name: "receivingmailboxidname"): Attributes.StringAttribute;
        getAttribute(name: "regardingobjectid"): Attributes.LookupAttribute;
        getAttribute(name: "related"): Attributes.LookupAttribute;
        getAttribute(name: "replycount"): Attributes.NumberAttribute;
        getAttribute(name: "reservedforinternaluse"): Attributes.StringAttribute;
        getAttribute(name: "safedescription"): Attributes.StringAttribute;
        getAttribute(name: "scheduleddurationminutes"): Attributes.NumberAttribute;
        getAttribute(name: "scheduledend"): Attributes.DateAttribute;
        getAttribute(name: "scheduledstart"): Attributes.DateAttribute;
        getAttribute(name: "sender"): Attributes.StringAttribute;
        getAttribute(name: "sendersaccountobjecttypecode"): Attributes.Attribute;
        getAttribute(name: "senton"): Attributes.DateAttribute;
        getAttribute(name: "serviceid"): Attributes.LookupAttribute;
        getAttribute(name: "serviceidname"): Attributes.StringAttribute;
        getAttribute(name: "slaid"): Attributes.LookupAttribute;
        getAttribute(name: "slainvokedid"): Attributes.LookupAttribute;
        getAttribute(name: "sortdate"): Attributes.DateAttribute;
        getAttribute(name: "statecode"): Attributes.OptionSetAttribute;
        getAttribute(name: "statuscode"): Attributes.OptionSetAttribute;
        getAttribute(name: "subcategory"): Attributes.StringAttribute;
        getAttribute(name: "subject"): Attributes.StringAttribute;
        getAttribute(name: "submittedby"): Attributes.StringAttribute;
        getAttribute(name: "timezoneruleversionnumber"): Attributes.NumberAttribute;
        getAttribute(name: "to"): Attributes.LookupAttribute;
        getAttribute(name: "torecipients"): Attributes.StringAttribute;
        getAttribute(name: "trackingtoken"): Attributes.StringAttribute;
        getAttribute(name: "transactioncurrencyid"): Attributes.LookupAttribute;
        getAttribute(name: "traversedpath"): Attributes.StringAttribute;
        getAttribute(name: "utcconversiontimezonecode"): Attributes.NumberAttribute;
        getControl(name: "acceptingentityid"): Controls.LookupControl;
        getControl(name: "acceptingentityidname"): Controls.StringControl;
        getControl(name: "activityid"): Controls.StringControl;
        getControl(name: "activitytypecode"): Controls.Control;
        getControl(name: "actualdurationminutes"): Controls.NumberControl;
        getControl(name: "actualend"): Controls.DateControl;
        getControl(name: "actualstart"): Controls.DateControl;
        getControl(name: "attachmentcount"): Controls.NumberControl;
        getControl(name: "attachmentopencount"): Controls.NumberControl;
        getControl(name: "baseconversationindexhash"): Controls.NumberControl;
        getControl(name: "bcc"): Controls.LookupControl;
        getControl(name: "category"): Controls.StringControl;
        getControl(name: "cc"): Controls.LookupControl;
        getControl(name: "compressed"): Controls.StandardControl;
        getControl(name: "conversationindex"): Controls.StringControl;
        getControl(name: "correlatedactivityidname"): Controls.StringControl;
        getControl(name: "correlationmethod"): Controls.OptionSetControl;
        getControl(name: "createdby"): Controls.LookupControl;
        getControl(name: "createdon"): Controls.DateControl;
        getControl(name: "createdonbehalfby"): Controls.LookupControl;
        getControl(name: "delayedemailsendtime"): Controls.DateControl;
        getControl(name: "deliveryattempts"): Controls.NumberControl;
        getControl(name: "deliveryprioritycode"): Controls.OptionSetControl;
        getControl(name: "deliveryreceiptrequested"): Controls.StandardControl;
        getControl(name: "description"): Controls.StringControl;
        getControl(name: "directioncode"): Controls.StandardControl;
        getControl(name: "emailreminderexpirytime"): Controls.DateControl;
        getControl(name: "emailreminderstatus"): Controls.OptionSetControl;
        getControl(name: "emailremindertext"): Controls.StringControl;
        getControl(name: "emailremindertype"): Controls.OptionSetControl;
        getControl(name: "emailsenderobjecttypecode"): Controls.Control;
        getControl(name: "exchangerate"): Controls.NumberControl;
        getControl(name: "followemailuserpreference"): Controls.StandardControl;
        getControl(name: "from"): Controls.LookupControl;
        getControl(name: "importsequencenumber"): Controls.NumberControl;
        getControl(name: "inreplyto"): Controls.StringControl;
        getControl(name: "isbilled"): Controls.StandardControl;
        getControl(name: "isemailfollowed"): Controls.StandardControl;
        getControl(name: "isemailreminderset"): Controls.StandardControl;
        getControl(name: "isregularactivity"): Controls.StandardControl;
        getControl(name: "isworkflowcreated"): Controls.StandardControl;
        getControl(name: "lastonholdtime"): Controls.DateControl;
        getControl(name: "lastopenedtime"): Controls.DateControl;
        getControl(name: "linksclickedcount"): Controls.NumberControl;
        getControl(name: "messageid"): Controls.StringControl;
        getControl(name: "mimetype"): Controls.StringControl;
        getControl(name: "modifiedby"): Controls.LookupControl;
        getControl(name: "modifiedon"): Controls.DateControl;
        getControl(name: "modifiedonbehalfby"): Controls.LookupControl;
        getControl(name: "msdyn_sentiment"): Controls.OptionSetControl;
        getControl(name: "notifications"): Controls.OptionSetControl;
        getControl(name: "onholdtime"): Controls.NumberControl;
        getControl(name: "opencount"): Controls.NumberControl;
        getControl(name: "overriddencreatedon"): Controls.DateControl;
        getControl(name: "ownerid"): Controls.LookupControl;
        getControl(name: "owningbusinessunit"): Controls.LookupControl;
        getControl(name: "owningbusinessunitname"): Controls.StringControl;
        getControl(name: "owningteam"): Controls.LookupControl;
        getControl(name: "owninguser"): Controls.LookupControl;
        getControl(name: "prioritycode"): Controls.OptionSetControl;
        getControl(name: "readreceiptrequested"): Controls.StandardControl;
        getControl(name: "receivingmailboxidname"): Controls.StringControl;
        getControl(name: "regardingobjectid"): Controls.LookupControl;
        getControl(name: "related"): Controls.LookupControl;
        getControl(name: "replycount"): Controls.NumberControl;
        getControl(name: "reservedforinternaluse"): Controls.StringControl;
        getControl(name: "safedescription"): Controls.StringControl;
        getControl(name: "scheduleddurationminutes"): Controls.NumberControl;
        getControl(name: "scheduledend"): Controls.DateControl;
        getControl(name: "scheduledstart"): Controls.DateControl;
        getControl(name: "sender"): Controls.StringControl;
        getControl(name: "sendersaccountobjecttypecode"): Controls.Control;
        getControl(name: "senton"): Controls.DateControl;
        getControl(name: "serviceid"): Controls.LookupControl;
        getControl(name: "serviceidname"): Controls.StringControl;
        getControl(name: "slaid"): Controls.LookupControl;
        getControl(name: "slainvokedid"): Controls.LookupControl;
        getControl(name: "sortdate"): Controls.DateControl;
        getControl(name: "statecode"): Controls.OptionSetControl;
        getControl(name: "statuscode"): Controls.OptionSetControl;
        getControl(name: "subcategory"): Controls.StringControl;
        getControl(name: "subject"): Controls.StringControl;
        getControl(name: "submittedby"): Controls.StringControl;
        getControl(name: "timezoneruleversionnumber"): Controls.NumberControl;
        getControl(name: "to"): Controls.LookupControl;
        getControl(name: "torecipients"): Controls.StringControl;
        getControl(name: "trackingtoken"): Controls.StringControl;
        getControl(name: "transactioncurrencyid"): Controls.LookupControl;
        getControl(name: "traversedpath"): Controls.StringControl;
        getControl(name: "utcconversiontimezonecode"): Controls.NumberControl;
    }

}


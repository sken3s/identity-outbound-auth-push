/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


 import {KJUR} from "jsrsasign";
 import uuid from "uuid-random";
 import {DateTimeUtil, RequestSenderUtil} from "../utils";
 import { ConsentInterface } from "../models/consent";
 
 export class ConsentService {
 
     /**
      * Process the authntication data as a consent object.
      *
      * 
      */


     public static processConsentData(
         authData: any
     ): ConsentInterface  {
 
       
        let metadata = JSON.parse(authData.metadata);
        let consentData: ConsentInterface;
        let organizedConsentData = {"permissions":[],"expiration":{}};

        metadata.consentData.map(function(element:any, index: any){
            if (element.title ==="Permissions"){
                organizedConsentData.permissions = element.data;
            }
            if (element.title ==="Expiration Date Time"){
                let timestamp = Date.parse(element.data[0]);
                let dateObject = new Date(timestamp);
    
                organizedConsentData.expiration = {
                    "date": dateObject.toDateString(),
                    "time": dateObject.toTimeString().split(" ")[0]
                }
            }
        });

        consentData = {
            permissions :organizedConsentData.permissions,
            expiration : organizedConsentData.expiration,
            appliation: metadata.appliation,
            accounts: metadata.accounts,
            approvedAccountIds: [],
            type: metadata.type,
            additionalInformation: ""
        };

        if (metadata.additionalInformation) {
            consentData.additionalInformation = metadata.additionalInformation;
        }
 
        return consentData;
     }
 

 }
 
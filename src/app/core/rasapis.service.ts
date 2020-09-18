/*
 * Licensed Materials - Property of IBM
 * 
 * (c) Copyright IBM Corp. 2020.
 */
import { Injectable } from '@angular/core';

import { Configuration, ConfigurationParameters, RasRequestorsApi, RasTestclassesApi } from 'galasa-ras-api-ts-rxjs';
import { BootstrapService } from './bootstrap.service';

import { SecurityService } from './security.service';

//
// 
// Service to get the RAS APIs.
// Used so the complexity of the authentication tokens and the BASE URIs are hidden from the
// calling functions.
// 
// 

@Injectable({
  providedIn: 'root'
})
export class RasApisService {

  rasRequestorsApi: RasRequestorsApi;
  rasTestclassesApi: RasTestclassesApi;

  constructor(private securityService :SecurityService, // So we can get the necessary security information
              private bootstrapService :BootstrapService ) {  // So we can get the BASE URL
  }

  // TODO, needs to be an observable
  public getRasRequestors() :Promise<RasRequestorsApi> {

    // If we have already resolved the URI, dont do it again

    if (this.rasRequestorsApi != null) {
      return new Promise((resolve, reject) => {
        resolve(this.rasRequestorsApi);
      });
    }

    // Need to resolve the ras uri and return the api
    return new Promise((resolve, reject) => {
      this.bootstrapService.getRasBase().then(
        rasBase => {
          var configParams :ConfigurationParameters = {'basePath' : rasBase.toString()}
          var configuration :Configuration = new Configuration(configParams);
      
          this.rasRequestorsApi = new RasRequestorsApi(configuration);
      
          resolve(this.rasRequestorsApi);
        }
      )
    });
  }

  // TODO, needs to be an observable
  public getRasTestclasses() :Promise<RasTestclassesApi> {
    // If we have already resolved the URI, dont do it again

    if (this.rasTestclassesApi != null) {
      return new Promise((resolve, reject) => {
        resolve(this.rasTestclassesApi);
      });
    }

    // Need to resolve the ras uri and return the api
    return new Promise((resolve, reject) => {
      this.bootstrapService.getRasBase().then(
        rasBase => {
          var configParams :ConfigurationParameters = {'basePath' : rasBase.toString()}
          var configuration :Configuration = new Configuration(configParams);
      
          this.rasTestclassesApi = new RasTestclassesApi(configuration);
      
          resolve(this.rasTestclassesApi);
        }
      )
    });
  }
}
